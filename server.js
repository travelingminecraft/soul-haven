import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { STATUS, ENEMIES, RELICS, TOTAL_FLOORS } from './data.js';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, extname } from 'node:path';
import { randomBytes, randomUUID } from 'node:crypto';
import { room, player, act, view, tick, CARDS, CLASSES } from './game.js';

const rooms = new Map(), sessions = new Map(), rates = new Map();

// ES Module 환경에서 실행 위치 기반으로 절대 경로 생성
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicRoot = resolve(__dirname, 'public');

const json = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
};

function joinRoom(r, name, classId) {
  if (r.phase !== 'lobby') throw Error('이미 시작된 방입니다.');
  if (r.players.length >= 8) throw Error('방이 가득 찼습니다.');
  const p = player(name, classId);
  r.players.push(p);
  r.host ||= p.id;
  const token = randomUUID();
  sessions.set(token, { code: r.code, id: p.id });
  return { token, id: p.id, room: view(r, p.id) };
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.wav': 'audio/wav',
};

export const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');

    // --- API 라우팅 ---
    if (url.pathname.startsWith('/api/')) {
      if (req.method === 'GET' && url.pathname === '/api/catalog') {
        return json(res, 200, { cards: CARDS, classes: CLASSES, status: STATUS, enemies: ENEMIES, relics: RELICS, totalFloors: TOTAL_FLOORS });
      }

      const token = (req.headers.authorization || '').replace(/^Bearer /, '');
      const session = sessions.get(token);
      const r = session && rooms.get(session.code);
      const p = r?.players.find(x => x.id === session.id);

      if (req.method === 'GET' && url.pathname === '/api/state') {
        if (!p) return json(res, 401, { error: '참여 중인 방이 없습니다.' });
        p.lastSeen = Date.now();
        return json(res, 200, { id: p.id, room: view(r, p.id) });
      }

      if (req.method !== 'POST') return json(res, 405, { error: '허용되지 않는 요청입니다.' });

      if (req.headers.origin && req.headers.origin !== `http://${req.headers.host}` && req.headers.origin !== `https://${req.headers.host}`) {
        return json(res, 403, { error: '요청 출처를 확인해주세요.' });
      }

      const key = req.socket.remoteAddress;
      const rate = rates.get(key) || { time: Date.now(), count: 0 };
      if (Date.now() - rate.time > 1000) {
        rate.time = Date.now();
        rate.count = 0;
      }
      rates.set(key, rate);
      if (++rate.count > 100) return json(res, 429, { error: '잠시 후 다시 시도해주세요.' });

      let body = '';
      for await (const chunk of req) {
        body += chunk;
        if (body.length > 8192) return json(res, 413, { error: '요청이 너무 큽니다.' });
      }
      const a = JSON.parse(body || '{}');

      if (url.pathname === '/api/join') {
        if (p) return json(res, 200, { token, id: p.id, room: view(r, p.id) });
        let target;
        if (a.mode === 'join') {
          target = rooms.get(String(a.code || '').toUpperCase());
          if (!target) throw Error('방 코드를 확인해주세요.');
        } else if (a.mode === 'queue') {
          target = [...rooms.values()].find(x => x.publicQueue && x.phase === 'lobby' && x.players.length < 8);
        } else if (a.mode !== 'create') {
          throw Error('참여 방식을 선택해주세요.');
        }

        if (!target) {
          const code = randomBytes(3).toString('hex').toUpperCase();
          target = room(code, a.mode === 'queue');
          rooms.set(code, target);
        }

        const result = joinRoom(target, a.name, a.classId);

        if (a.mode === 'queue') {
          target.players.at(-1).ready = true;
          if (target.players.length === 8 && target.players.every(x => x.ready)) {
            act(target, target.players.find(x => x.id === target.host), { type: 'start' });
          }
          result.room = view(target, result.id);
        }
        return json(res, 200, result);
      }

      if (!p) return json(res, 401, { error: '먼저 방에 참여해주세요.' });
      p.lastSeen = Date.now();

      if (url.pathname === '/api/leave') {
        if (r.phase === 'lobby' || ['victory', 'defeat'].includes(r.phase)) {
          r.players = r.players.filter(x => x.id !== p.id);
          if (r.host === p.id) r.host = r.players[0]?.id;
          if (!r.players.length) rooms.delete(r.code);
        } else {
          p.lastSeen = 0;
          p.ended = true;
          p.done = true;
        }
        sessions.delete(token);
        return json(res, 200, { ok: true });
      }

      if (url.pathname === '/api/action') {
        act(r, p, a);
        if (r.publicQueue && r.phase === 'lobby' && r.players.length === 8 && r.players.every(x => x.ready)) {
          act(r, r.players.find(x => x.id === r.host), { type: 'start' });
        }
        return json(res, 200, { id: p.id, room: view(r, p.id) });
      }

      return json(res, 404, { error: '없는 요청입니다.' });
    }

    // --- 정적 파일(Assets) 서빙 ---
    const relPath = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\//, '');
    const filePath = join(publicRoot, relPath);

    // 보안: public 디렉토리 외부 파일 접근 방지
    if (!filePath.startsWith(publicRoot)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    try {
      const data = await readFile(filePath);
      const ext = extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff'
      });
      res.end(data);
    } catch (err) {
      res.writeHead(404);
      res.end('File not found');
    }

  } catch (e) {
    json(res, 400, { error: e instanceof SyntaxError ? '요청 형식을 확인해주세요.' : e.message });
  }
});

setInterval(() => {
  for (const [code, r] of rooms) {
    if (r.players.every(p => Date.now() - p.lastSeen > 3600000)) {
      rooms.delete(code);
      for (const [t, s] of sessions) if (s.code === code) sessions.delete(t);
    } else {
      tick(r);
    }
  }
  for (const [ip, v] of rates) {
    if (Date.now() - v.time > 60000) rates.delete(ip);
  }
}, 3000).unref();

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = Number(process.env.PORT || 3000);
  server.listen(PORT, '0.0.0.0', () => console.log(`영혼의 쉼터 · http://localhost:${PORT}`));
}
