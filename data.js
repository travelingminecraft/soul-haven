export const TOTAL_FLOORS = 12;
export const CLASSES = {
 warrior: {name:'전사',icon:'⚔',hp:85,passive:'공격 피해 +2 · 출혈과 분노',starter:['cleave','rend','warcry','riposte'],color:'#ef9c7f',title:'붉은 맹세',summary:'상처를 남기고, 분노를 쌓아 강력한 일격을 날립니다.'},
 mage: {name:'마법사',icon:'✦',hp:60,passive:'매 턴 에너지 +1 · 원소 연계',starter:['flame','frost','focus','arcane'],color:'#a6bafa',title:'별의 기억',summary:'화상과 냉기로 적을 제어하고, 마력을 폭발시킵니다.'},
 rogue: {name:'도적',icon:'⌁',hp:65,passive:'매 턴 카드 +1 · 독과 연속 공격',starter:['dagger','venom','rush','ambush'],color:'#9ce1b1',title:'녹빛 속삭임',summary:'빠른 연속 공격으로 독을 쌓고 빈틈을 노립니다.'},
 reaper: {name:'사신',icon:'☾',hp:70,passive:'승리 시 체력 +7 · 영혼 수확',starter:['drain','harvest','hex','soulguard'],color:'#ceb0f1',title:'마지막 인도자',summary:'영혼을 모아 죽음의 낫을 강화하고 생명을 흡수합니다.'},
 knight: {name:'기사',icon:'⬡',hp:95,passive:'매 턴 방어도 +4 · 보호와 반격',starter:['bastion','shieldbash','rally','thorns'],color:'#ead39a',title:'새벽의 서약',summary:'동료를 보호하고, 쌓인 방어도를 공격으로 바꿉니다.'}
};
export const STATUS = {
 poison:{name:'독',icon:'☠',text:'적 행동 전 수치만큼 방어 무시 피해. 발동 후 1 감소.',color:'#9fe2a0'},
 burn:{name:'화상',icon:'♨',text:'적 행동 전 수치만큼 방어 무시 피해. 발동 후 절반으로 감소.',color:'#f4ae78'},
 bleed:{name:'출혈',icon:'滴',text:'적이 공격하려 할 때 수치만큼 방어 무시 피해. 발동 후 1 감소.',color:'#f093a2'},
 weak:{name:'약화',icon:'↘',text:'공격 피해 25% 감소. 적 행동 후 1턴 감소.',color:'#bdb6d0'},
 vulnerable:{name:'취약',icon:'◎',text:'받는 공격 피해 50% 증가. 적 행동 후 1턴 감소.',color:'#e5be88'},
 frost:{name:'냉기',icon:'❄',text:'적의 이번 행동 공격을 수치만큼 감소. 적 행동 후 모두 해제.',color:'#a5dfee'},
 strength:{name:'힘',icon:'↑',text:'각 공격 타격 피해 증가. 전투가 끝날 때 해제.',color:'#f3ab8c'},
 dexterity:{name:'민첩',icon:'◇',text:'카드로 얻는 방어도 증가. 전투가 끝날 때 해제.',color:'#a5c6e5'},
 thorns:{name:'반격',icon:'✹',text:'적에게 공격받을 때 타격마다 해당 피해를 돌려줍니다.',color:'#d7ce8f'},
 regen:{name:'재생',icon:'✚',text:'턴 시작 시 수치만큼 회복하고 1 감소.',color:'#abd7b5'},
 dodge:{name:'회피',icon:'◌',text:'수치만큼 다음 적 타격을 피해 없이 회피합니다.',color:'#adc4d2'},
 soul:{name:'영혼',icon:'☾',text:'수확 카드로 획득. 영혼 계수 카드의 피해를 높입니다.',color:'#d5b4ef'}
};
const defs = [
 ['strike','영혼 베기',1,'neutral','attack',{damage:7},'slash'],
 ['guard','잔영의 보호',1,'neutral','skill',{block:6},'shield'],
 ['mend','안식의 빛',1,'neutral','skill',{heal:7,exhaust:true},'heal'],
 ['insight','되찾은 기억',0,'neutral','skill',{draw:2,exhaust:true},'draw'],
 ['expose','빈틈 찾기',1,'neutral','attack',{damage:4,vulnerable:2},'slash'],
 ['feint','흐릿한 잔상',1,'neutral','skill',{block:5,weak:2},'shield'],
 ['secondwind','다시 일어서기',0,'neutral','skill',{energy:2,exhaust:true},'aura','rare'],
 ['shelter','안식의 장막',2,'neutral','skill',{block:16,heal:4},'shield','rare'],
 ['renew','생명의 맥동',1,'neutral','power',{regen:4,exhaust:true},'heal','uncommon'],
 ['comet','유성의 파편',2,'neutral','attack',{damage:19,draw:1},'arcane','uncommon'],
 ['cleave','분노의 일격',2,'warrior','attack',{damage:17},'slash'],
 ['rend','붉은 상처',1,'warrior','attack',{damage:6,bleed:4},'blood'],
 ['warcry','전장의 포효',1,'warrior','power',{strength:3,exhaust:true},'aura'],
 ['riposte','맞받아치기',1,'warrior','attack',{damage:6,block:6},'slash'],
 ['bloodprice','피의 대가',0,'warrior','skill',{selfDamage:4,energy:2,exhaust:true},'blood','uncommon'],
 ['execute','처형',2,'warrior','attack',{damage:15,execute:15},'slash','rare'],
 ['berserk','광전사의 혼',2,'warrior','power',{strength:5,selfDamage:6,exhaust:true},'aura','rare'],
 ['twinstrike','쌍격',1,'warrior','attack',{damage:4,hits:2},'slash'],
 ['hemorrhage','깊어지는 상처',1,'warrior','attack',{damage:5,bleed:3,bleedBonus:2},'blood','uncommon'],
 ['ironwill','꺾이지 않는 의지',1,'warrior','skill',{block:9,draw:1},'shield'],
 ['flame','푸른 불꽃',1,'mage','attack',{damage:8,burn:3},'fire'],
 ['frost','서리의 창',1,'mage','attack',{damage:6,frost:4},'frost'],
 ['focus','정신 집중',0,'mage','skill',{energy:1,draw:1,exhaust:true},'arcane'],
 ['arcane','마력 화살',1,'mage','attack',{damage:3,hits:3},'arcane'],
 ['nova','별의 붕괴',2,'mage','attack',{damage:21,burn:3},'arcane','rare'],
 ['combust','연소',1,'mage','attack',{damage:5,burnBonus:2},'fire','uncommon'],
 ['blizzard','얼어붙은 시간',2,'mage','skill',{frost:10,block:8},'frost','rare'],
 ['manawell','마력의 샘',1,'mage','power',{channel:1,exhaust:true},'aura','uncommon'],
 ['overload','과부하',0,'mage','attack',{damage:2,allEnergy:9},'arcane','rare'],
 ['mirror','수정 장벽',1,'mage','skill',{block:8,draw:1},'frost'],
 ['dagger','그림자 칼날',0,'rogue','attack',{damage:4},'dagger'],
 ['venom','맹독 바르기',1,'rogue','attack',{damage:4,poison:5},'poison'],
 ['rush','찰나의 틈',1,'rogue','attack',{damage:7,draw:2},'dagger'],
 ['ambush','매복',1,'rogue','attack',{damage:8,comboBonus:8},'dagger'],
 ['smoke','연막',1,'rogue','skill',{dodge:1,draw:1},'smoke','uncommon'],
 ['catalyst','독의 촉매',1,'rogue','skill',{doublePoison:true,exhaust:true},'poison','rare'],
 ['flurry','칼날 폭풍',2,'rogue','attack',{damage:3,hits:5},'dagger','rare'],
 ['backstab','급소 찌르기',1,'rogue','attack',{damage:7,vulnerable:2},'dagger','uncommon'],
 ['agility','밤의 발걸음',1,'rogue','power',{dexterity:3,exhaust:true},'smoke'],
 ['toxicmist','독안개',1,'rogue','skill',{poison:4,weak:2},'poison','uncommon'],
 ['drain','혼의 수확',1,'reaper','attack',{damage:7,heal:3},'soul'],
 ['harvest','영혼 거두기',1,'reaper','attack',{damage:6,soul:2},'soul'],
 ['hex','죽음의 낙인',1,'reaper','skill',{vulnerable:2,soul:2},'soul'],
 ['soulguard','망자의 수호',1,'reaper','skill',{block:7,soul:1},'shield'],
 ['reap','종말의 낫',2,'reaper','attack',{damage:10,soulBonus:4},'soul','rare'],
 ['sacrifice','금지된 의식',0,'reaper','skill',{selfDamage:5,soul:3,draw:2,exhaust:true},'blood','uncommon'],
 ['lifetap','생명의 갈증',2,'reaper','attack',{damage:12,lifesteal:true},'soul','rare'],
 ['wither','시들어가는 숨',1,'reaper','attack',{damage:4,weak:3,poison:2},'soul'],
 ['soullantern','영혼의 등불',1,'reaper','power',{soulFlow:1,exhaust:true},'aura','uncommon'],
 ['gravebloom','무덤에 핀 꽃',1,'reaper','skill',{heal:5,soulHeal:2,exhaust:true},'heal'],
 ['bastion','서약의 방패',1,'knight','skill',{block:11},'shield'],
 ['shieldbash','방패 강타',1,'knight','attack',{damage:4,blockBonus:.7},'shield'],
 ['rally','수호의 맹세',1,'knight','skill',{teamBlock:6},'shield'],
 ['thorns','가시의 갑주',1,'knight','power',{thorns:3,exhaust:true},'aura'],
 ['judgment','새벽의 심판',2,'knight','attack',{damage:12,block:10},'holy','rare'],
 ['consecrate','축성',1,'knight','skill',{teamHeal:4,exhaust:true},'heal','uncommon'],
 ['fortress','움직이는 성채',2,'knight','skill',{block:22,retainBlock:true},'shield','rare'],
 ['aegis','불멸의 방벽',1,'knight','power',{plating:3,exhaust:true},'aura','uncommon'],
 ['smite','빛의 검',1,'knight','attack',{damage:8,weak:1},'holy'],
 ['bulwark','철벽 전진',1,'knight','skill',{block:7,draw:2},'shield']
];
const labels={attack:'공격',skill:'기술',power:'능력'};
export const CARDS = {};
function description(c){const t=[];
 if(c.damage)t.push(`피해 ${c.damage}${c.hits?` × ${c.hits}`:''}`);
 if(c.block)t.push(`방어도 ${c.block}`);
 for(const k of ['poison','burn','bleed','frost','weak','vulnerable','strength','dexterity','thorns','regen','dodge','soul'])if(c[k])t.push(`${STATUS[k].name} ${c[k]}`);
 if(c.heal)t.push(`회복 ${c.heal}`);if(c.draw)t.push(`카드 ${c.draw}장 뽑기`);if(c.energy)t.push(`에너지 +${c.energy}`);
 if(c.teamBlock)t.push(`살아 있는 아군 모두 방어도 ${c.teamBlock}`);if(c.teamHeal)t.push(`살아 있는 아군 모두 회복 ${c.teamHeal}`);
 if(c.comboBonus)t.push(`이번 턴 3번째 카드부터 피해 +${c.comboBonus}`);
 if(c.soulBonus)t.push(`영혼당 피해 +${c.soulBonus}`);if(c.soulHeal)t.push(`영혼당 회복 +${c.soulHeal}`);
 if(c.burnBonus)t.push(`적 화상당 피해 +${c.burnBonus}`);if(c.bleedBonus)t.push(`적 출혈당 피해 +${c.bleedBonus}`);
 if(c.execute)t.push(`적 체력 40% 이하: 피해 +${c.execute}`);
 if(c.blockBonus)t.push(`현재 방어도의 ${Math.round(c.blockBonus*100)}% 추가 피해`);
 if(c.allEnergy)t.push(`남은 에너지 전부 소비 · 1당 피해 +${c.allEnergy}`);
 if(c.doublePoison)t.push(`적의 독 ${c.poisonMultiplier||2}배`);if(c.lifesteal)t.push('실제 HP 피해만큼 흡혈');
 if(c.channel)t.push(`매 턴 에너지 +${c.channel}`);if(c.soulFlow)t.push(`매 턴 영혼 +${c.soulFlow}`);if(c.plating)t.push(`매 턴 방어도 +${c.plating}`);
 if(c.retainBlock)t.push('방어도를 다음 턴에 1회 유지');if(c.selfDamage)t.push(`자신의 체력 ${c.selfDamage} 소모 (최소 1)`);if(c.exhaust)t.push('소멸');return t.join(' · ');
}
for(const [id,name,cost,classId,kind,effects,fx,rarity='common'] of defs){const c={id,name,cost,classId,kind,type:labels[kind],...effects,fx,rarity,upgraded:false};c.text=description(c);CARDS[id]=c;
 const u={...c,id:id+'+',name:name+'+',upgraded:true};
 for(const key of ['damage','block','heal','teamBlock','teamHeal'])if(u[key])u[key]+=u.hits?1:3;
 for(const key of ['poison','burn','bleed','frost','strength','dexterity','thorns','regen','soul'])if(u[key])u[key]+=1;
 if(!u.damage&&!u.block&&!u.heal&&!u.poison&&!u.burn&&!u.soul&&!u.strength&&!u.dexterity&&!u.thorns&&!u.regen&&!u.teamBlock&&!u.teamHeal){if(u.cost>0)u.cost--;else if(u.draw)u.draw++;else if(u.energy)u.energy++;}
 if(u.doublePoison)u.poisonMultiplier=3;
 u.text=description(u);CARDS[u.id]=u;
}
export const RELICS={
 ember:{name:'꺼지지 않는 불씨',icon:'♨',text:'매 전투 시작 시 힘 +1',price:90},
 dew:{name:'새벽의 이슬',icon:'♧',text:'전투 승리 시 체력 5 회복',price:90},
 hourglass:{name:'멈춘 모래시계',icon:'⌛',text:'매 전투 첫 턴 에너지 +1',price:95},
 lens:{name:'기억의 렌즈',icon:'◎',text:'매 턴 카드 1장 추가',price:110},
 shell:{name:'성자의 조각',icon:'⬡',text:'매 턴 방어도 +3',price:100},
 fang:{name:'창백한 송곳니',icon:'⋈',text:'매 턴 3번째 카드 사용 시 체력 3 회복',price:90},
 coin:{name:'길잡이의 동전',icon:'◈',text:'전투 승리 시 추가 골드 12',price:80},
 feather:{name:'은빛 깃털',icon:'❧',text:'휴식 회복량 +15',price:75}
};
export const ENEMIES={
 hound:{name:'공허의 사냥개',art:0,pattern:['attack','multi','charge'],bio:'낮게 으르렁거리는 소리, 그 뒤에는 아무것도 없다.'},
 wraith:{name:'울음의 잔상',art:1,pattern:['curse','attack','ward','multi'],bio:'잊힌 이름들을 노래하는 망령.'},
 sentinel:{name:'길 잃은 파수꾼',art:2,pattern:['attack','ward','heavy'],bio:'지켜야 할 주인을 잊은 채, 문 앞을 서성인다.'},
 executioner:{name:'속박된 집행자',art:2,pattern:['heavy','curse','multi','charge'],bio:'녹슨 도끼 위에 수많은 맹세가 새겨져 있다.'},
 boss:{name:'망각의 왕',art:3,pattern:['heavy','curse','multi','ward','charge'],bio:'“네가 지켜온 기억도, 결국 내 것이 된다.”'}
};
export const priceOf=id=>({common:45,uncommon:65,rare:90})[CARDS[id].rarity];
