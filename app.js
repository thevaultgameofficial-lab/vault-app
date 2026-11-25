
const ARTIFACTS = [
  {id:'coin',name:{en:'Ancient Coin',fr:'Pièce antique'},desc:{en:'A small token from a forgotten age.',fr:'Un petit vestige d’une époque oubliée.'},rarity:'COMMON',symbol:'◉',xp:0},
  {id:'shard',name:{en:'Dusk Shard',fr:'Éclat du crépuscule'},desc:{en:'A fragment that catches the last light.',fr:'Un fragment qui capte la dernière lumière.'},rarity:'COMMON',symbol:'✦',xp:50},
  {id:'seal',name:{en:'Royal Seal',fr:'Sceau royal'},desc:{en:'The mark of an unnamed dynasty.',fr:'La marque d’une dynastie oubliée.'},rarity:'UNCOMMON',symbol:'❖',xp:100},
  {id:'key',name:{en:'Silent Key',fr:'Clé silencieuse'},desc:{en:'It opens a door no map remembers.',fr:'Elle ouvre une porte qu’aucune carte ne connaît.'},rarity:'UNCOMMON',symbol:'⚿',xp:150},
  {id:'lens',name:{en:'Moon Lens',fr:'Lentille lunaire'},desc:{en:'A lens made for seeing beyond.',fr:'Une lentille conçue pour voir au-delà.'},rarity:'RARE',symbol:'◈',xp:200},
  {id:'compass',name:{en:'Astral Compass',fr:'Boussole astrale'},desc:{en:'A relic said to point toward forgotten places.',fr:'Une relique qui indiquerait les lieux oubliés.'},rarity:'RARE',symbol:'✥',xp:250},
  {id:'crown',name:{en:'Forgotten Crown',fr:'Couronne oubliée'},desc:{en:'Its kingdom has vanished from history.',fr:'Son royaume a disparu de l’histoire.'},rarity:'EPIC',symbol:'♕',xp:300},
  {id:'hourglass',name:{en:'Glass of Hours',fr:'Sablier des heures'},desc:{en:'Its sand never falls the same way twice.',fr:'Son sable ne s’écoule jamais deux fois pareil.'},rarity:'EPIC',symbol:'⌛',xp:350},
  {id:'heart',name:{en:'Ember Heart',fr:'Cœur de braise'},desc:{en:'A warm light sealed in ancient stone.',fr:'Une lumière chaude scellée dans la pierre.'},rarity:'LEGENDARY',symbol:'♥',xp:400},
  {id:'star',name:{en:'Eternal Star',fr:'Étoile éternelle'},desc:{en:'The final piece of the First Archive.',fr:'La dernière pièce des Archives premières.'},rarity:'LEGENDARY',symbol:'✧',xp:500}
];

const I18N = {
 en:{season:'SEASON 01 · THE FIRST ARCHIVE',heroTitle:'Your legacy<br><em>starts here.</em>',heroText:'Discover artifacts. Master challenges. Build a collection worth remembering.',startChallenge:'Start today’s challenge',overview:'OVERVIEW',yourProgress:'Your progress',artifacts:'ARTIFACTS',complete:'COMPLETE',featured:'FEATURED',featuredArtifact:'Featured artifact',viewAll:'View all ↗',rare:'RARE',featuredDescription:'A relic said to point toward forgotten places.',theArchive:'THE ARCHIVE',collectionTitle:'Your collection',collectionText:'Ten artifacts. One archive. Every discovery is earned.',archiveProgress:'ARCHIVE PROGRESS',dailyTrial:'DAILY TRIAL',challengeTitle:'The daily challenge',challengeText:'Solve the puzzle to earn XP. One completed challenge per day.',logicTrial:'LOGIC TRIAL',yourQuestion:'YOUR QUESTION',checkAnswer:'Check answer',fairPlay:'Fair play: the answer and reward are fixed. No paid chance mechanics.',identity:'IDENTITY',yourProfile:'Your profile',profileText:'Your progress is saved on this device.',archivist:'New Archivist',foundingMember:'FOUNDING MEMBER · SEASON 01',nextLevel:'NEXT LEVEL',yourData:'Your data',dataText:'This prototype stores progress locally in your browser. No account or server is connected.',resetProgress:'Reset progress',navHome:'Home',navCollection:'Archive',navChallenge:'Challenge',navProfile:'Profile',streak:'challenge completed',days:'challenges completed',locked:'LOCKED',unlockAt:'Unlock at',correct:'Correct. +50 XP added to your archive.',wrong:'Not quite. Try again.',alreadyDone:'Today’s challenge is complete. Come back tomorrow.',choose:'Choose an answer first.',resetConfirm:'Reset all local VAULT progress?',resetDone:'Your progress has been reset.',level:'LEVEL',levelUp:'Level up!',challengeDone:'Completed today',notYet:'Not unlocked yet'},
 fr:{season:'SAISON 01 · LES PREMIÈRES ARCHIVES',heroTitle:'Votre héritage<br><em>commence ici.</em>',heroText:'Découvrez des artefacts. Relevez des défis. Construisez une collection mémorable.',startChallenge:'Lancer le défi du jour',overview:'APERÇU',yourProgress:'Votre progression',artifacts:'ARTEFACTS',complete:'COMPLÉTÉ',featured:'À LA UNE',featuredArtifact:'Artefact à découvrir',viewAll:'Tout voir ↗',rare:'RARE',featuredDescription:'Une relique qui indiquerait les lieux oubliés.',theArchive:'LES ARCHIVES',collectionTitle:'Votre collection',collectionText:'Dix artefacts. Une archive. Chaque découverte se mérite.',archiveProgress:'PROGRESSION DES ARCHIVES',dailyTrial:'ÉPREUVE DU JOUR',challengeTitle:'Le défi quotidien',challengeText:'Résolvez l’énigme pour gagner des XP. Un défi validé par jour.',logicTrial:'ÉPREUVE DE LOGIQUE',yourQuestion:'VOTRE QUESTION',checkAnswer:'Vérifier la réponse',fairPlay:'Jeu équitable : réponse et récompense fixes. Aucun hasard payant.',identity:'IDENTITÉ',yourProfile:'Votre profil',profileText:'Votre progression est enregistrée sur cet appareil.',archivist:'Nouvel archiviste',foundingMember:'MEMBRE FONDATEUR · SAISON 01',nextLevel:'NIVEAU SUIVANT',yourData:'Vos données',dataText:'Cette version enregistre votre progression dans le navigateur. Aucun compte ni serveur connecté.',resetProgress:'Réinitialiser',navHome:'Accueil',navCollection:'Archives',navChallenge:'Défi',navProfile:'Profil',streak:'défi terminé',days:'défis terminés',locked:'VERROUILLÉ',unlockAt:'Débloqué à',correct:'Exact. +50 XP ajoutés à vos archives.',wrong:'Pas tout à fait. Réessayez.',alreadyDone:'Le défi du jour est terminé. Revenez demain.',choose:'Choisissez d’abord une réponse.',resetConfirm:'Réinitialiser toute la progression VAULT locale ?',resetDone:'Votre progression a été réinitialisée.',level:'NIVEAU',levelUp:'Nouveau niveau !',challengeDone:'Terminé aujourd’hui',notYet:'Pas encore débloqué'}
};

const QUESTION = {
 en:{q:'Which number comes next?',rule:'Add 3 to each number to get the next one.',prompt:'Select your answer:',sequence:['18','21','24','27'],answers:['30','31','32','33'],correct:0},
 fr:{q:'Quel nombre vient ensuite ?',rule:'On ajoute 3 à chaque nombre pour obtenir le suivant.',prompt:'Sélectionnez votre réponse :',sequence:['18','21','24','27'],answers:['30','31','32','33'],correct:0}
};

const STORAGE_KEY='vault_mvp_01';
let state=loadState();
let language=state.language||'en';
let selectedAnswer=null;
let toastTimer;

function freshState(){
 return {
  xp:0,
  completedDays:[],
  unlocked:['coin'],
  language:'en',
  profileName:'Archiviste',
  avatar:'🗝️'
 };
}function loadState(){try{return {...freshState(),...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}}catch{return freshState()}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function t(key){return I18N[language][key]??key}
function todayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function level(){return Math.floor(state.xp/100)+1}
function unlockedCount(){return state.unlocked.length}

function render(){
 document.documentElement.lang=language;
 document.querySelectorAll('[data-i18n]').forEach(el=>{
  const key=el.dataset.i18n;
  if(I18N[language][key]!==undefined)el.innerHTML=I18N[language][key]
 });
 document.getElementById('languageButton').textContent=language==='en'?'FR':'EN';
 document.getElementById('levelChip').textContent=`${t('level')} ${level()}`;
 document.getElementById('xpValue').textContent=state.xp;
 document.getElementById('artifactValue').textContent=`${unlockedCount()}/10`;
 document.getElementById('collectionValue').textContent=`${Math.round(unlockedCount()/10*100)}%`;
 document.getElementById('collectionProgressText').textContent=`${unlockedCount()} / 10`;
 document.getElementById('collectionProgressBar').style.width=`${unlockedCount()*10}%`;
 document.getElementById('profileLevel').textContent=String(level()).padStart(2,'0');
 const inLevel=state.xp%100;
 document.getElementById('levelProgressText').textContent=`${inLevel} / 100 XP`;
 document.getElementById('levelProgressBar').style.width=`${inLevel}%`;
 document.getElementById('streakLabel').textContent=`${state.completedDays.length} ${state.completedDays.length===1?t('streak'):t('days')}`;
 renderArtifacts();
 renderChallenge();
}

function renderArtifacts(){
 const grid=document.getElementById('artifactGrid');
 grid.innerHTML='';
 ARTIFACTS.forEach(a=>{
  const unlocked=state.unlocked.includes(a.id);
  const card=document.createElement('article');
  card.className=`artifact-card panel ${unlocked?'':'locked'}`;
  card.innerHTML=`<span class="unlock-tag">${unlocked?'✓':t('locked')}</span><div class="artifact-symbol">${unlocked?a.symbol:'?'}</div><span class="rarity">${a.rarity}</span><h3>${unlocked?a.name[language]:'???'}</h3><p class="muted">${unlocked?a.desc[language]:`${t('unlockAt')} ${a.xp} XP`}</p>`;
  grid.appendChild(card)
 });
 const featured=ARTIFACTS[5];
 const has=state.unlocked.includes(featured.id);
 document.getElementById('featuredName').textContent=has?featured.name[language]:'???';
 document.getElementById('featuredLock').textContent=has?'✓':'⌑'
}

function renderChallenge(){
 const done=state.completedDays.includes(todayKey());
 const q=QUESTION[language];
 document.getElementById('questionText').textContent=q.q;
 document.getElementById('sequenceRule').textContent=q.rule;
 document.getElementById('answerPrompt').textContent=q.prompt;
 document.getElementById('numberSequence').innerHTML=q.sequence.map(n=>`<span>${n}</span>`).join('<i>→</i>')+'<i>→</i><strong>?</strong>';
 const grid=document.getElementById('answerGrid');
 grid.innerHTML='';
 q.answers.forEach((answer,index)=>{
  const b=document.createElement('button');
  b.className='answer-option'+(selectedAnswer===index?' selected':'');
  b.textContent=answer;
  b.disabled=done;
  b.addEventListener('click',()=>{selectedAnswer=index;renderChallenge()});
  grid.appendChild(b)
 });
 document.getElementById('submitAnswer').disabled=done;
 document.getElementById('submitAnswer').style.opacity=done?'.5':'1';
 document.getElementById('challengeFoot').textContent=done?t('challengeDone'):'+50 XP · '+(language==='fr'?'Une seule validation par jour':'One completion per day');
 if(done){
  document.getElementById('feedback').textContent=t('alreadyDone');
  document.getElementById('feedback').className='feedback'
 }else if(!document.getElementById('feedback').classList.contains('error')){
  document.getElementById('feedback').textContent='';
  document.getElementById('feedback').className='feedback'
 }
}

function completeChallenge(){
 if(state.completedDays.includes(todayKey())){showToast(t('alreadyDone'));return}
 if(selectedAnswer===null){showToast(t('choose'));return}
 if(selectedAnswer!==QUESTION[language].correct){
  const f=document.getElementById('feedback');
  f.textContent=t('wrong');
  f.className='feedback error';
  return
 }
 const oldLevel=level();
const earnedXP=getVaultDifficultyReward13();

state.xp+=earnedXP;
state.completedDays.push(todayKey());
 ARTIFACTS.forEach(a=>{
  if(state.xp>=a.xp&&!state.unlocked.includes(a.id))state.unlocked.push(a.id)
 });
 saveState();
 render();
 showToast(
 level()>oldLevel
  ?t("levelUp")
  :text("Bravo ! +"+earnedXP+" XP","Well done! +"+earnedXP+" XP")
)
 selectedAnswer=null;
}

function showToast(message){
 const el=document.getElementById('toast');
 el.textContent=message;
 el.classList.add('show');
 clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>el.classList.remove('show'),2400)
}

function go(tab){
 document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
 document.getElementById(`${tab}View`).classList.add('active');
 document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
 window.scrollTo({top:0,behavior:'smooth'})
}

document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.tab)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
document.getElementById('submitAnswer').addEventListener('click',completeChallenge);

document.getElementById('languageButton').addEventListener('click',()=>{
 language=language==='en'?'fr':'en';
 state.language=language;
 selectedAnswer=null;
 document.getElementById('feedback').textContent='';
 document.getElementById('feedback').className='feedback';
 saveState();
 render()
});

document.getElementById('resetButton').addEventListener('click',()=>{
 if(confirm(t('resetConfirm'))){
  state=freshState();
  state.language=language;
  selectedAnswer=null;
  saveState();
  render();
  showToast(t('resetDone'))
 }
});

render();

if('serviceWorker' in navigator && location.protocol.startsWith('http')){
 window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))
}


/* =========================================
   VAULT — DEVELOPER EDITION 0.2
========================================= */

(()=>{
 const DEV={enabled:true,logs:[],panel:null};

 const devText={
  en:{
   title:"DEVELOPER CONSOLE",subtitle:"VAULT SYSTEM CONTROL",xp:"EXPERIENCE CONTROL",
   add:"ADD XP",remove:"REMOVE XP",amount:"XP amount",inventory:"ARTIFACT CONTROL",
   artifact:"Select artifact",unlock:"UNLOCK ARTIFACT",lock:"LOCK ARTIFACT",
   tests:"TEST ENVIRONMENT",reward:"SIMULATE +50 XP",clearDay:"RESET DAILY CHALLENGE",
   data:"DATA INSPECTOR",refresh:"REFRESH DATA",copy:"COPY SAVE DATA",
   reset:"RESET ALL PROGRESS",close:"CLOSE CONSOLE",logs:"SYSTEM LOG",
   success:"Operation completed",confirm:"Are you sure?",copied:"Save data copied"
  },
  fr:{
   title:"CONSOLE DÉVELOPPEUR",subtitle:"CONTRÔLE DU SYSTÈME VAULT",
   xp:"GESTION DE L'EXPÉRIENCE",add:"AJOUTER DES XP",remove:"RETIRER DES XP",
   amount:"Quantité de XP",inventory:"GESTION DES ARTEFACTS",
   artifact:"Sélectionner un artefact",unlock:"DÉBLOQUER",lock:"VERROUILLER",
   tests:"ENVIRONNEMENT DE TEST",reward:"SIMULER +50 XP",
   clearDay:"RÉINITIALISER LE DÉFI DU JOUR",data:"INSPECTEUR DE DONNÉES",
   refresh:"ACTUALISER",copy:"COPIER LA SAUVEGARDE",
   reset:"RÉINITIALISER TOUTE LA PARTIE",close:"FERMER LA CONSOLE",
   logs:"JOURNAL SYSTÈME",success:"Opération effectuée",
   confirm:"Êtes-vous sûr ?",copied:"Sauvegarde copiée"
  }
 };

 const tx=key=>devText[language][key]||key;

 function log(message){
  DEV.logs.unshift({time:new Date().toLocaleTimeString(),message});
  DEV.logs=DEV.logs.slice(0,30);
  const area=document.getElementById("devLogs");
  if(area){
   area.innerHTML=DEV.logs.map(item=>`<div class="dev-log-line"><span>${item.time}</span> ${item.message}</div>`).join("")
  }
 }

 function addStyles(){
  if(document.getElementById("vaultDevStyles"))return;
  const style=document.createElement("style");
  style.id="vaultDevStyles";
  style.textContent=`
   #vaultDevButton{position:fixed;bottom:22px;right:22px;z-index:9000;background:#171c2b;color:#b7a5ff;border:1px solid #6654a8;border-radius:10px;padding:11px 16px;font-size:11px;font-weight:800;letter-spacing:1.5px;cursor:pointer;box-shadow:0 8px 30px #0008}
   #vaultDevOverlay{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(3,5,12,.88);backdrop-filter:blur(12px)}
   #vaultDevOverlay.active{display:flex}
   #vaultDevPanel{width:min(760px,100%);max-height:90vh;overflow-y:auto;background:#101522;color:#f2f3fa;border:1px solid #343d54;border-radius:18px;padding:25px;box-shadow:0 25px 100px #000b;font-family:inherit}
   .vault-library-field textarea{width:100%;box-sizing:border-box;padding:11px;background:#0c1220;border:1px solid #3a4660;border-radius:7px;color:white;font-size:13px;font-family:inherit;resize:vertical;line-height:1.5}
   .dev-header{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:24px}
   .dev-header h2{font-size:20px;letter-spacing:2px;margin:0}
   .dev-subtitle{color:#929db5;font-size:10px;letter-spacing:2px;margin-top:7px}
   .dev-status{color:#77e6b0;font-size:10px;letter-spacing:1px}
   .dev-section{background:#171f30;border:1px solid #2d374c;border-radius:12px;padding:17px;margin-bottom:13px}
   .dev-section h3{color:#b7a5ff;font-size:11px;letter-spacing:1.5px;margin:0 0 15px}
   .dev-row{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:10px}
   .dev-row:last-child{margin-bottom:0}
   .dev-input,.dev-select{min-width:0;flex:1;padding:11px;background:#0c1220;border:1px solid #3a4660;border-radius:7px;color:white}
   .dev-action{padding:11px 14px;border-radius:7px;border:1px solid #6654a8;background:#30264f;color:white;font-size:10px;font-weight:800;letter-spacing:.6px;cursor:pointer}
   .dev-action:hover{background:#493875}
   .dev-action.danger{background:#40212c;border-color:#854052}
   .dev-data{white-space:pre-wrap;overflow-wrap:anywhere;max-height:180px;overflow:auto;background:#090e18;padding:12px;border-radius:8px;color:#a9bdd8;font-size:11px}
   .dev-log-line{padding:5px 0;border-bottom:1px solid #293246;color:#c6d1e5;font-size:11px}
   .dev-log-line span{color:#8794ac;margin-right:8px}
   @media(max-width:500px){#vaultDevPanel{padding:16px}.dev-row{flex-direction:column}.dev-action{width:100%}}
  `;
  document.head.appendChild(style)
 }

 function createConsole(){
  if(document.getElementById("vaultDevOverlay"))return;
  const button=document.createElement("button");
  button.id="vaultDevButton";
  button.textContent="⚙ DEV MODE";
  button.addEventListener("click",openConsole);
  document.body.appendChild(button);

  const overlay=document.createElement("div");
  overlay.id="vaultDevOverlay";
  overlay.innerHTML=`
   <div id="vaultDevPanel">
    <div class="dev-header">
     <div><h2 id="devTitle"></h2><div class="dev-subtitle">${tx("subtitle")}</div></div>
     <span class="dev-status">● SYSTEM ONLINE</span>
    </div>
    <div class="dev-section">
     <h3>${tx("xp")}</h3>
     <div class="dev-row">
      <input id="devXpAmount" class="dev-input" type="number" min="1" value="50">
      <button class="dev-action" id="devAddXp">${tx("add")}</button>
      <button class="dev-action danger" id="devRemoveXp">${tx("remove")}</button>
     </div>
    </div>
    <div class="dev-section">
     <h3>${tx("inventory")}</h3>
     <div class="dev-row">
      <select id="devArtifact" class="dev-select"></select>
      <button class="dev-action" id="devUnlock">${tx("unlock")}</button>
      <button class="dev-action danger" id="devLock">${tx("lock")}</button>
     </div>
    </div>
    <div class="dev-section">
     <h3>${tx("tests")}</h3>
     <div class="dev-row">
      <button class="dev-action" id="devReward">${tx("reward")}</button>
      <button class="dev-action" id="devClearDay">${tx("clearDay")}</button>
     </div>
    </div>
    <div class="dev-section">
     <h3>${tx("data")}</h3>
     <div class="dev-row">
      <button class="dev-action" id="devRefresh">${tx("refresh")}</button>
      <button class="dev-action" id="devCopy">${tx("copy")}</button>
     </div>
     <pre class="dev-data" id="devData"></pre>
    </div>
    <div class="dev-section"><h3>${tx("logs")}</h3><div id="devLogs"></div></div>
    <div class="dev-row">
     <button class="dev-action danger" id="devReset">${tx("reset")}</button>
     <button class="dev-action" id="devClose">${tx("close")}</button>
    </div>
   </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("devClose").onclick=closeConsole;
  overlay.addEventListener("click",event=>{if(event.target===overlay)closeConsole()});

  document.getElementById("devAddXp").onclick=()=>{
   const amount=Math.floor(Number(document.getElementById("devXpAmount").value));
   if(!Number.isFinite(amount)||amount<1)return;
   const previous=level();
   state.xp+=amount;
   unlockEligibleArtifacts();
   saveState();
   render();
   log(`+${amount} XP`);
   if(level()>previous)log("LEVEL UP");
   refreshData()
  };

  document.getElementById("devRemoveXp").onclick=()=>{
   const amount=Math.floor(Number(document.getElementById("devXpAmount").value));
   if(!Number.isFinite(amount)||amount<1)return;
   state.xp=Math.max(0,state.xp-amount);
   saveState();
   render();
   log(`-${amount} XP`);
   refreshData()
  };

  document.getElementById("devUnlock").onclick=()=>{
   const id=document.getElementById("devArtifact").value;
   if(!state.unlocked.includes(id)){
    state.unlocked.push(id);
    saveState();
    render();
    log(`ARTIFACT UNLOCKED: ${id}`)
   }
   refreshData()
  };

  document.getElementById("devLock").onclick=()=>{
   const id=document.getElementById("devArtifact").value;
   if(id==="coin"){log("BASE ARTIFACT CANNOT BE LOCKED");return}
   state.unlocked=state.unlocked.filter(item=>item!==id);
   saveState();
   render();
   log(`ARTIFACT LOCKED: ${id}`);
   refreshData()
  };

  document.getElementById("devReward").onclick=()=>{
   state.xp+=50;
   unlockEligibleArtifacts();
   saveState();
   render();
   log("TEST REWARD: +50 XP");
   refreshData()
  };

  document.getElementById("devClearDay").onclick=()=>{
   state.completedDays=state.completedDays.filter(day=>day!==todayKey());
   saveState();
   render();
   log("TODAY'S CHALLENGE RESET");
   refreshData()
  };

  document.getElementById("devRefresh").onclick=refreshData;

  document.getElementById("devCopy").onclick=async()=>{
   try{
    await navigator.clipboard.writeText(JSON.stringify(state,null,2));
    log(tx("copied"))
   }catch{log("CLIPBOARD ACCESS DENIED")}
  };

  document.getElementById("devReset").onclick=()=>{
   if(!confirm(t("resetConfirm")))return;
   state=freshState();
   state.language=language;
   selectedAnswer=null;
   saveState();
   render();
   log("SAVE RESET");
   refreshData()
  };

  populateArtifactSelect();
  refreshData();
  log("DEVELOPER CONSOLE INITIALIZED")
 }

 function unlockEligibleArtifacts(){
  ARTIFACTS.forEach(artifact=>{
   if(state.xp>=artifact.xp&&!state.unlocked.includes(artifact.id)){
    state.unlocked.push(artifact.id);
    log(`AUTO UNLOCK: ${artifact.id}`)
   }
  })
 }

 function populateArtifactSelect(){
  const select=document.getElementById("devArtifact");
  if(!select)return;
  select.innerHTML="";
  ARTIFACTS.forEach(artifact=>{
   const option=document.createElement("option");
   option.value=artifact.id;
   option.textContent=artifact.name[language];
   select.appendChild(option)
  })
 }

 function refreshData(){
  const area=document.getElementById("devData");
  if(!area)return;
  area.textContent=JSON.stringify({
   storageKey:STORAGE_KEY,
   xp:state.xp,
   level:level(),
   unlockedArtifacts:state.unlocked,
   completedDays:state.completedDays,
   language:language,
   artifactCount:state.unlocked.length,
   saved:Boolean(localStorage.getItem(STORAGE_KEY))
  },null,2);
  const logs=document.getElementById("devLogs");
  if(logs){
   logs.innerHTML=DEV.logs.map(item=>`<div class="dev-log-line"><span>${item.time}</span>${item.message}</div>`).join("")
  }
 }

 function openConsole(){
  document.getElementById("vaultDevOverlay").classList.add("active");
  refreshData()
 }

 function closeConsole(){
  document.getElementById("vaultDevOverlay").classList.remove("active")
 }

 document.addEventListener("keydown",event=>{
  if(event.ctrlKey&&event.shiftKey&&event.key.toLowerCase()==="d"){
   event.preventDefault();
   openConsole()
  }
  if(event.key==="Escape")closeConsole()
 });

 function init(){addStyles();createConsole()}
 init();

 const originalRender=render;
 render=function(){
  originalRender();
  const title=document.getElementById("devTitle");
  if(title)title.textContent=tx("title");
  const overlay=document.getElementById("vaultDevOverlay");
  if(overlay){
   overlay.querySelectorAll("[data-dev-label]").forEach(el=>{
    el.textContent=tx(el.dataset.devLabel)
   })
  }
  populateArtifactSelect();
  refreshData()
 };
})();


/* =========================================
   VAULT — DEVELOPER EDITION 0.4
   CHALLENGE LIBRARY + TITLES + IMAGES
========================================= */

(()=>{
 const LIBRARY_KEY="vault_challenge_library_01";
 const LEGACY_KEY="vault_custom_challenge_01";

 function clone(value){return JSON.parse(JSON.stringify(value))}

 function loadLibrary(){
  try{
   const saved=JSON.parse(localStorage.getItem(LIBRARY_KEY));
   if(saved&&Array.isArray(saved.items))return saved;

   const legacy=localStorage.getItem(LEGACY_KEY);
   if(legacy){
    const question=JSON.parse(legacy);
    const item={
     id:"challenge_"+Date.now(),
     name:"Mon premier défi",
     question
    };
    return {items:[item],activeId:item.id}
   }
  }catch(error){
   console.error("VAULT library loading error:",error)
  }
  return {items:[],activeId:null}
 }

 let library=loadLibrary();
 let selectedId=library.activeId;

 function saveLibrary(){
  localStorage.setItem(LIBRARY_KEY,JSON.stringify(library))
 }

 function activeItem(){
  return library.items.find(item=>item.id===library.activeId)||null
 }

 function selectedItem(){
  return library.items.find(item=>item.id===selectedId)||null
 }

 function activeQuestion(){
  const item=activeItem();
  return item?item.question:QUESTION
 }

  /* VAULT 1.3 — DIFFICULTY DATA */

const VAULT_DIFFICULTIES_13={
 easy:{xp:25,fr:"Facile",en:"Easy"},
 normal:{xp:50,fr:"Normal",en:"Normal"},
 hard:{xp:100,fr:"Difficile",en:"Hard"}
};

function vaultDifficultyKey13(){
 return todayKey()+"_"+(activeItem()?.id||"original")
}

function getVaultDifficulty13(){
 if(!state.vaultDifficulty13){
  state.vaultDifficulty13={}
 }

 const saved=state.vaultDifficulty13[vaultDifficultyKey13()];

 return VAULT_DIFFICULTIES_13[saved]?saved:"normal"
}

function setVaultDifficulty13(value){
 if(!VAULT_DIFFICULTIES_13[value])return;

 if(!state.vaultDifficulty13){
  state.vaultDifficulty13={}
 }

 state.vaultDifficulty13[vaultDifficultyKey13()]=value;
 saveState()
}

  function createVaultDifficultyUI13(){
 const questionText=document.getElementById("questionText");
 if(!questionText)return;

 const parent=questionText.parentElement;
 if(document.getElementById("vaultDifficultyPanel13"))return;

 const panel=document.createElement("div");
 panel.id="vaultDifficultyPanel13";
 panel.className="vault-difficulty13";

panel.innerHTML=`
  <label for="vaultDifficultySelect13" id="vaultDifficultyLabel13"></label>
  <select id="vaultDifficultySelect13">
   <option value="easy">🟢 Easy — 25 XP</option>
   <option value="normal">🔵 Normal — 50 XP</option>
   <option value="hard">🟣 Hard — 100 XP</option>
  </select>
  <div id="vaultDifficultyReward13"></div>
 `;

 parent.insertBefore(panel,questionText);

 const select=panel.querySelector("select");

 select.addEventListener("change",()=>{
  setVaultDifficulty13(select.value);
  updateVaultDifficultyUI13()
 });

 updateVaultDifficultyUI13()
}
  function getVaultDifficultyReward13(){
 return VAULT_DIFFICULTIES_13[getVaultDifficulty13()].xp
}

function updateVaultDifficultyUI13(){
 const panel=document.getElementById("vaultDifficultyPanel13");
 if(!panel)return;

 const select=document.getElementById("vaultDifficultySelect13");
 const label=document.getElementById("vaultDifficultyLabel13");
 const reward=document.getElementById("vaultDifficultyReward13");

 const difficulty=getVaultDifficulty13();
 const info=VAULT_DIFFICULTIES_13[difficulty];

 label.textContent=language==="fr"?"CHOISIS TA DIFFICULTÉ":"CHOOSE YOUR DIFFICULTY";

 const options={
  easy:language==="fr"?"🟢 Facile — 25 XP":"🟢 Easy — 25 XP",
  normal:language==="fr"?"🔵 Normal — 50 XP":"🔵 Normal — 50 XP",
  hard:language==="fr"?"🟣 Difficile — 100 XP":"🟣 Hard — 100 XP"
 };

 Object.keys(options).forEach(key=>{
  select.querySelector('option[value="'+key+'"]').textContent=options[key];
 });

 select.value=difficulty;
 select.disabled=state.completedDays.includes(todayKey());

 reward.textContent=info[language]+" · "+info.xp+" XP";
}

function previewVaultDifficulties13(){
 const current=getVaultDifficulty13();

 const choices=[
  {label:"Facile",xp:25},
  {label:"Normal",xp:50},
  {label:"Difficile",xp:100}
 ];

 const message=choices.map(item=>
  item.label+" : "+item.xp+" XP"
 ).join("\n");

 alert("APERÇU DES DIFFICULTÉS\n\n"+message+
  "\n\nDifficulté actuellement choisie : "+current.toUpperCase()+
  "\n\nAucun XP attribué.");
}

function addDifficultyPreviewButton13(){
 const panel=document.getElementById("vaultDevPanel");
 if(!panel)return;

 if(document.getElementById("devDifficultyPreview13"))return;

 const button=document.createElement("button");
 button.id="devDifficultyPreview13";
 button.textContent="🎚️ Aperçu des difficultés";

 button.style.cssText=`
  display:block;
  width:100%;
  margin:12px 0;
  padding:12px;
  border:1px solid #8b5cf6;
  border-radius:10px;
  background:#211638;
  color:#fff;
  cursor:pointer;
 `;

 button.onclick=previewVaultDifficulties13;
 panel.appendChild(button);
}
  
 function text(fr,en){return language==="fr"?fr:en}

 function getImagePath(filename){
  if(!filename)return "";
  if(/^https?:\/\//i.test(filename))return filename;
  const clean=filename.trim().replace(/^\.?\//,"");
  return clean.startsWith("images/")?"./"+clean:"./images/"+clean
 }

 function addLibraryStyles(){
  if(document.getElementById("vaultLibraryStyles"))return;
  const style=document.createElement("style");
  style.id="vaultLibraryStyles";
  style.textContent=`
   .vault-library-field{display:flex;flex-direction:column;gap:6px;margin-bottom:12px;color:#aebbd2;font-size:11px;font-weight:700}
   .vault-library-field input,.vault-library-field select{width:100%;box-sizing:border-box;padding:11px;background:#0c1220;border:1px solid #3a4660;border-radius:7px;color:white;font-size:13px}
   .vault-library-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
   .vault-library-note{color:#929db5;font-size:11px;line-height:1.5;margin:10px 0}
   .vault-library-status{color:#77e6b0;font-size:11px;margin-top:12px}
   #editorImagePreview{display:none;width:100%;max-height:180px;object-fit:contain;margin-top:8px;border:1px solid #3a4660;border-radius:8px;background:#0c1220}
   .vault-challenge-title{text-align:center;font-size:13px;font-weight:800;letter-spacing:3px;color:#b7a5ff;margin:0 0 16px;text-transform:uppercase}
   .vault-challenge-image{display:block;width:100%;max-height:340px;object-fit:cover;border-radius:12px;margin:0 auto 20px;border:1px solid #343d54}
   @media(max-width:500px){.vault-library-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style)
 }

 function updateImagePreview(){
  const input=document.getElementById("editorImage");
  const preview=document.getElementById("editorImagePreview");
  if(!input||!preview)return;
  const filename=input.value.trim();
  if(!filename){
   preview.style.display="none";
   preview.removeAttribute("src");
   return
  }
  preview.onerror=()=>{preview.style.display="none"};
  preview.onload=()=>{preview.style.display="block"};
  preview.src=getImagePath(filename)
 }

function createLibraryUI(){
  const panel=document.getElementById("vaultDevPanel");
  if(!panel)return;

  addDifficultyPreviewButton13();

  if(document.getElementById("vaultChallengeLibrary"))return;

  const section=document.createElement("div");
  section.className="dev-section";
  section.id="vaultChallengeLibrary";

  section.innerHTML=`
   <h3 id="libraryHeading"></h3>
   <div class="vault-library-field">
    <label id="librarySelectLabel"></label>
    <select id="librarySelect"></select>
   </div>
   <div class="dev-row">
    <button class="dev-action" id="libraryNew"></button>
    <button class="dev-action" id="libraryActivate"></button>
    <button class="dev-action danger" id="libraryDelete"></button>
   </div>
   <div class="vault-library-note" id="libraryActiveInfo"></div>
   <hr style="border-color:#293246;margin:18px 0">
   <h3 id="editorHeading"></h3>

   <div class="vault-library-field">
    <label id="editorNameLabel"></label>
    <input id="editorName" maxlength="60">
   </div>

   <div class="vault-library-field">
    <label id="editorTitleFrLabel"></label>
    <input id="editorTitleFr" maxlength="60">
   </div>

   <div class="vault-library-field">
    <label id="editorTitleEnLabel"></label>
    <input id="editorTitleEn" maxlength="60">
   </div>

   <div class="vault-library-field">
    <label id="editorImageLabel"></label>
    <input id="editorImage" maxlength="200" placeholder="coffre.jpg">
    <div class="vault-library-note">Place l'image dans le dossier images/ à la racine du projet. Tu peux aussi coller une URL d'image.</div>
    <img id="editorImagePreview" alt="Aperçu de l'image du défi">
   </div>

   <div class="vault-library-field">
    <label id="editorQuestionFrLabel"></label>
    <textarea id="editorQuestionFr" maxlength="1000"></textarea>
   </div>
   <div class="vault-library-field">
    <label id="editorQuestionEnLabel"></label>
    <textarea id="editorQuestionEn" maxlength="1000"></textarea>
   </div>
   <div class="vault-library-field">
    <label id="editorRuleFrLabel"></label>
    <textarea id="editorRuleFr" maxlength="600"></textarea>
   </div>
   <div class="vault-library-field">
    <label id="editorRuleEnLabel"></label>
    <textarea id="editorRuleEn" maxlength="600"></textarea>
   </div>
   <div class="vault-library-field">
    <label id="editorSequenceLabel"></label>
    <div class="vault-library-grid">
     <input id="editorSeq0" maxlength="12">
     <input id="editorSeq1" maxlength="12">
     <input id="editorSeq2" maxlength="12">
     <input id="editorSeq3" maxlength="12">
    </div>
   </div>
   <div class="vault-library-field">
    <label id="editorAnswersLabel"></label>
    <div class="vault-library-grid">
     <input id="editorAnswer0" maxlength="40">
     <input id="editorAnswer1" maxlength="40">
     <input id="editorAnswer2" maxlength="40">
     <input id="editorAnswer3" maxlength="40">
    </div>
   </div>
   <div class="vault-library-field">
    <label id="editorCorrectLabel"></label>
    <select id="editorCorrect">
     <option value="0">Réponse 1</option>
     <option value="1">Réponse 2</option>
     <option value="2">Réponse 3</option>
     <option value="3">Réponse 4</option>
    </select>
   </div>
   <div class="dev-row">
    <button class="dev-action" id="editorSave"></button>
    <button class="dev-action danger" id="libraryRestore"></button>
   </div>
   <div id="editorStatus" class="vault-library-status"></div>
  `;

  const dataSection=panel.querySelector("#devData")?.closest(".dev-section");
  if(dataSection)panel.insertBefore(section,dataSection);
  else panel.appendChild(section);

  document.getElementById("librarySelect").onchange=event=>{
   selectedId=event.target.value||null;
   fillEditor();
   updateLibraryUI()
  };

  document.getElementById("libraryNew").onclick=createNewChallenge;
  document.getElementById("libraryActivate").onclick=activateChallenge;
  document.getElementById("libraryDelete").onclick=deleteChallenge;
  document.getElementById("editorSave").onclick=saveEditor;
  document.getElementById("libraryRestore").onclick=restoreOriginal;
  document.getElementById("editorImage").addEventListener("input",updateImagePreview);

  fillEditor();
  updateLibraryLanguage();
  updateLibraryUI()
 }

 function createNewChallenge(){
  const id="challenge_"+Date.now();
  const question={
   fr:{
    q:"Nouvelle question",
    rule:"Écris ton indice ici.",
    prompt:"Sélectionnez votre réponse :",
    sequence:["1","2","3","4"],
    answers:["5","6","7","8"],
    correct:0
   },
   en:{
    q:"New question",
    rule:"Write your hint here.",
    prompt:"Select your answer:",
    sequence:["1","2","3","4"],
    answers:["5","6","7","8"],
    correct:0
   }
  };

  library.items.push({
   id,
   name:"Nouveau défi",
   titleFr:"Nouveau défi",
   titleEn:"New challenge",
   image:"",
   question
  });

  selectedId=id;
  saveLibrary();
  fillEditor();
  updateLibraryUI();
  updateLibraryLanguage();

  document.getElementById("editorStatus").textContent=
   text("Nouveau défi créé. Tu peux maintenant le modifier.","New challenge created. You can now edit it.")
 }

 function fillEditor(){
  const item=selectedItem();
  if(!item)return;
  const q=item.question;

  document.getElementById("editorName").value=item.name||"";
  document.getElementById("editorTitleFr").value=item.titleFr||item.name||"";
  document.getElementById("editorTitleEn").value=item.titleEn||item.name||"";
  document.getElementById("editorImage").value=item.image||"";
  updateImagePreview();

  document.getElementById("editorQuestionFr").value=q.fr.q;
  document.getElementById("editorQuestionEn").value=q.en.q;
  document.getElementById("editorRuleFr").value=q.fr.rule;
  document.getElementById("editorRuleEn").value=q.en.rule;

  q.fr.sequence.forEach((value,index)=>{
   document.getElementById("editorSeq"+index).value=value
  });

  q.fr.answers.forEach((value,index)=>{
   document.getElementById("editorAnswer"+index).value=value
  });

  document.getElementById("editorCorrect").value=String(q.fr.correct)
 }

 function readEditor(){
  const value=id=>document.getElementById(id).value.trim();

  const name=value("editorName");
  const titleFr=value("editorTitleFr")||name;
  const titleEn=value("editorTitleEn")||name;
  const image=value("editorImage");

  const question={
   fr:{
    q:value("editorQuestionFr"),
    rule:value("editorRuleFr"),
    prompt:"Sélectionnez votre réponse :",
    sequence:[0,1,2,3].map(i=>value("editorSeq"+i)),
    answers:[0,1,2,3].map(i=>value("editorAnswer"+i)),
    correct:Number(value("editorCorrect"))
   },
   en:{
    q:value("editorQuestionEn"),
    rule:value("editorRuleEn"),
    prompt:"Select your answer:",
    sequence:[0,1,2,3].map(i=>value("editorSeq"+i)),
    answers:[0,1,2,3].map(i=>value("editorAnswer"+i)),
    correct:Number(value("editorCorrect"))
   }
  };

  const allFields=[
   name,titleFr,titleEn,
   question.fr.q,question.en.q,
   question.fr.rule,question.en.rule,
   ...question.fr.sequence,
   ...question.fr.answers
  ];

  if(allFields.some(field=>!field)){
   throw new Error(text("Tous les champs doivent être remplis.","All fields must be completed."))
  }

  if(question.fr.correct<0||question.fr.correct>3){
   throw new Error("Invalid answer.")
  }

  return {name,titleFr,titleEn,image,question}
 }

 function saveEditor(){
  const item=selectedItem();
  if(!item){
   document.getElementById("editorStatus").textContent=text("Crée d'abord un défi.","Create a challenge first.");
   return
  }

  try{
   const data=readEditor();
   item.name=data.name;
   item.titleFr=data.titleFr;
   item.titleEn=data.titleEn;
   item.image=data.image;
   item.question=data.question;

   saveLibrary();
   updateLibraryUI();

   document.getElementById("editorStatus").textContent=text("Défi enregistré.","Challenge saved.");

   if(library.activeId===item.id)renderChallenge()
  }catch(error){
   document.getElementById("editorStatus").textContent=error.message
  }
 }

 function activateChallenge(){
  const item=selectedItem();
  if(!item){
   document.getElementById("editorStatus").textContent=text("Sélectionne un défi.","Select a challenge.");
   return
  }

  try{
   const data=readEditor();
   item.name=data.name;
   item.titleFr=data.titleFr;
   item.titleEn=data.titleEn;
   item.image=data.image;
   item.question=data.question;
   library.activeId=item.id;

   saveLibrary();
   selectedAnswer=null;
   document.getElementById("feedback").textContent="";
   document.getElementById("feedback").className="feedback";
   render();
   updateLibraryUI();

   document.getElementById("editorStatus").textContent=text("Défi activé dans le jeu.","Challenge activated in the game.")
  }catch(error){
   document.getElementById("editorStatus").textContent=error.message
  }
 }

 function deleteChallenge(){
  const item=selectedItem();
  if(!item)return;

  if(!confirm(text("Supprimer ce défi définitivement ?","Permanently delete this challenge?")))return;

  library.items=library.items.filter(entry=>entry.id!==item.id);
  if(library.activeId===item.id)library.activeId=null;
  selectedId=library.items[0]?.id||null;

  saveLibrary();
  fillEditor();
  updateLibraryUI();
  selectedAnswer=null;
  render();

  document.getElementById("editorStatus").textContent=text("Défi supprimé.","Challenge deleted.")
 }

 function restoreOriginal(){
  if(!confirm(text("Supprimer tous les défis personnalisés et réactiver le défi original ?","Delete all custom challenges and restore the original challenge?")))return;

  library={items:[],activeId:null};
  selectedId=null;
  localStorage.removeItem(LIBRARY_KEY);
  localStorage.removeItem(LEGACY_KEY);
  selectedAnswer=null;
  render();
  fillEditor();
  updateLibraryUI();

  document.getElementById("editorStatus").textContent=text("Défi original restauré.","Original challenge restored.")
 }

 function updateLibraryUI(){
  const select=document.getElementById("librarySelect");
  if(!select)return;

  select.innerHTML="";
  library.items.forEach(item=>{
   const option=document.createElement("option");
   option.value=item.id;
   option.textContent=(item.id===library.activeId?"✓ ":"")+item.name;
   select.appendChild(option)
  });

  select.value=selectedId||"";
  const active=activeItem();

  document.getElementById("libraryActiveInfo").textContent=active
   ?text("Défi actuellement actif : ","Currently active challenge: ")+active.name
   :text("Défi original actuellement actif.","Original challenge currently active.");

  document.getElementById("libraryActivate").disabled=!selectedId||selectedId===library.activeId;
  document.getElementById("libraryDelete").disabled=!selectedId;
  document.getElementById("editorSave").disabled=!selectedId
 }

 function updateLibraryLanguage(){
  const labels={
   libraryHeading:["BIBLIOTHÈQUE DE DÉFIS","CHALLENGE LIBRARY"],
   librarySelectLabel:["CHOISIR UN DÉFI","SELECT A CHALLENGE"],
   libraryNew:["CRÉER UN DÉFI","CREATE CHALLENGE"],
   libraryActivate:["ACTIVER CE DÉFI","ACTIVATE CHALLENGE"],
   libraryDelete:["SUPPRIMER","DELETE"],
   editorHeading:["ÉDITEUR DE DÉFIS","CHALLENGE EDITOR"],
   editorNameLabel:["NOM DU DÉFI (INTERNE)","CHALLENGE NAME (INTERNAL)"],
   editorTitleFrLabel:["TITRE DU DÉFI — FRANÇAIS","CHALLENGE TITLE — FRENCH"],
   editorTitleEnLabel:["TITRE DU DÉFI — ANGLAIS","CHALLENGE TITLE — ENGLISH"],
   editorImageLabel:["IMAGE DU DÉFI","CHALLENGE IMAGE"],
   editorQuestionFrLabel:["QUESTION EN FRANÇAIS","QUESTION IN FRENCH"],
   editorQuestionEnLabel:["QUESTION EN ANGLAIS","QUESTION IN ENGLISH"],
   editorRuleFrLabel:["INDICE EN FRANÇAIS","HINT IN FRENCH"],
   editorRuleEnLabel:["INDICE EN ANGLAIS","HINT IN ENGLISH"],
   editorSequenceLabel:["SÉQUENCE — 4 NOMBRES","SEQUENCE — 4 NUMBERS"],
   editorAnswersLabel:["LES 4 RÉPONSES","THE 4 ANSWERS"],
   editorCorrectLabel:["NUMÉRO DE LA BONNE RÉPONSE","CORRECT ANSWER NUMBER"],
   editorSave:["ENREGISTRER LES MODIFICATIONS","SAVE CHANGES"],
   libraryRestore:["RESTAURER LE DÉFI ORIGINAL","RESTORE ORIGINAL CHALLENGE"]
  };

  Object.entries(labels).forEach(([id,values])=>{
   const element=document.getElementById(id);
   if(element)element.textContent=values[language==="fr"?0:1]
  });

  const correct=document.getElementById("editorCorrect");
  if(correct){
   [...correct.options].forEach((option,index)=>{
    option.textContent=text("Réponse "+(index+1),"Answer "+(index+1))
   })
  }

  updateLibraryUI()
 }

 // Affichage du défi actif : titre, image, puis question.
 renderChallenge=function(){
  const done=state.completedDays.includes(todayKey());
const q=activeQuestion()[language];
createVaultDifficultyUI13();
updateVaultDifficultyUI13();
const item=activeItem();

  const questionText=document.getElementById("questionText");
  const parent=questionText.parentElement;

  let titleElement=document.getElementById("vaultChallengeTitle");
  if(!titleElement){
   titleElement=document.createElement("div");
   titleElement.id="vaultChallengeTitle";
   titleElement.className="vault-challenge-title";
   parent.insertBefore(titleElement,questionText)
  }

  let imageElement=document.getElementById("vaultChallengeImage");
  if(!imageElement){
   imageElement=document.createElement("img");
   imageElement.id="vaultChallengeImage";
   imageElement.className="vault-challenge-image";
   imageElement.alt="";
   parent.insertBefore(imageElement,questionText)
  }

  const title=item
   ?(language==="fr"?(item.titleFr||item.name):(item.titleEn||item.name))
   :"";

  if(title){
   titleElement.textContent="⌘ "+title+" ⌘";
   titleElement.style.display="block"
  }else{
   titleElement.style.display="none"
  }

  const imagePath=item?.image?getImagePath(item.image):"";

  if(imagePath){
   imageElement.onerror=()=>{imageElement.style.display="none"};
   imageElement.onload=()=>{imageElement.style.display="block"};
   imageElement.src=imagePath;
  }else{
   imageElement.removeAttribute("src");
   imageElement.style.display="none"
  }

  questionText.textContent=q.q;
  document.getElementById("sequenceRule").textContent=q.rule;
  document.getElementById("answerPrompt").textContent=q.prompt;

  const sequence=document.getElementById("numberSequence");
  sequence.innerHTML="";

  q.sequence.forEach(number=>{
   const span=document.createElement("span");
   span.textContent=number;
   sequence.appendChild(span);

   const arrow=document.createElement("i");
   arrow.textContent="→";
   sequence.appendChild(arrow)
  });

  const questionMark=document.createElement("strong");
  questionMark.textContent="?";
  sequence.appendChild(questionMark);

  const grid=document.getElementById("answerGrid");
  grid.innerHTML="";

  q.answers.forEach((answer,index)=>{
   const button=document.createElement("button");
   button.className="answer-option"+(selectedAnswer===index?" selected":"");
   button.textContent=answer;
   button.disabled=done;
   button.addEventListener("click",()=>{
    selectedAnswer=index;
    renderChallenge()
   });
   grid.appendChild(button)
  });

  document.getElementById("submitAnswer").disabled=done;
  document.getElementById("submitAnswer").style.opacity=done?".5":"1";

 document.getElementById("challengeFoot").textContent=done
 ?t("challengeDone")
 :getVaultDifficultyReward13()+" XP · "+(language==="fr"?"Une seule validation par jour":"One completion per day");

  const feedback=document.getElementById("feedback");
  if(done){
   feedback.textContent=t("alreadyDone");
   feedback.className="feedback"
  }else if(!feedback.classList.contains("error")){
   feedback.textContent="";
   feedback.className="feedback"
  }
 };

 // Validation du défi actif.
 completeChallenge=function(){
  if(state.completedDays.includes(todayKey())){
   showToast(t("alreadyDone"));
   return
  }

  if(selectedAnswer===null){
   showToast(t("choose"));
   return
  }

  if(selectedAnswer!==activeQuestion()[language].correct){
   const feedback=document.getElementById("feedback");
   feedback.textContent=t("wrong");
   feedback.className="feedback error";
   return
  }

  const oldLevel=level();
  const earnedXP=getVaultDifficultyReward13();

  state.xp+=earnedXP;
  state.completedDays.push(todayKey());

  ARTIFACTS.forEach(artifact=>{
   if(state.xp>=artifact.xp&&!state.unlocked.includes(artifact.id)){
    state.unlocked.push(artifact.id)
   }
  });

  saveState();
  selectedAnswer=null;
  render();
  showToast(
   level()>oldLevel
    ?t("levelUp")
    :text("Bravo ! +"+earnedXP+" XP","Well done! +"+earnedXP+" XP")
  )
 };


/* =========================================
   VAULT — PLAYER PROFILE 0.5
========================================= */

(()=>{
 const STYLE_ID="vaultPlayerProfileStyles";
 const CARD_ID="vaultPlayerProfile";

 function addProfileStyles(){
  if(document.getElementById(STYLE_ID))return;

  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
   #vaultPlayerProfile{
    background:linear-gradient(135deg,#171c2b,#24203b);
    border:1px solid #6654a8;
    border-radius:16px;
    padding:22px;
    margin-bottom:22px;
   }
   .vp-identity{
    display:flex;
    align-items:center;
    gap:16px;
    margin-bottom:22px;
   }
   .vp-avatar{
    width:65px;
    height:65px;
    flex-shrink:0;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:32px;
    background:#30264f;
    border:1px solid #806acb;
    border-radius:15px;
   }
   .vp-name{
    font-size:20px;
    font-weight:800;
    color:#fff;
    margin-bottom:5px;
   }
   .vp-rank{
    font-size:10px;
    letter-spacing:2px;
    color:#b7a5ff;
   }
   .vp-edit{
    display:grid;
    grid-template-columns:1fr 110px;
    gap:9px;
    margin-bottom:20px;
   }
   .vp-edit input,.vp-edit select{
    min-width:0;
    padding:11px;
    border-radius:7px;
    border:1px solid #3a4660;
    background:#0c1220;
    color:white;
   }
   .vp-save{
    grid-column:1/-1;
    padding:11px;
    border-radius:7px;
    border:1px solid #6654a8;
    background:#30264f;
    color:white;
    font-weight:800;
    cursor:pointer;
   }
   .vp-stats{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:9px;
   }
   .vp-stat{
    background:#0c1220;
    border:1px solid #30394e;
    border-radius:10px;
    padding:13px 8px;
    text-align:center;
   }
   .vp-stat strong{
    display:block;
    font-size:21px;
    color:#b7a5ff;
    margin-bottom:5px;
   }
   .vp-stat span{
    font-size:9px;
    letter-spacing:1px;
    color:#aebbd2;
   }
   @media(max-width:450px){
    .vp-stats{grid-template-columns:1fr 1fr}
   }
  `;
  document.head.appendChild(style);
 }

 function createProfile(){
  const view=document.getElementById("profileView");
  if(!view||document.getElementById(CARD_ID))return;

  const card=document.createElement("section");
  card.id=CARD_ID;

  card.innerHTML=`
   <div class="vp-identity">
    <div class="vp-avatar" id="vpAvatar"></div>
    <div>
     <div class="vp-name" id="vpName"></div>
     <div class="vp-rank" id="vpRank"></div>
    </div>
   </div>

   <div class="vp-edit">
    <input id="vpNameInput" maxlength="24">
    <select id="vpAvatarInput">
     <option value="🗝️">🗝️</option>
     <option value="🏛️">🏛️</option>
     <option value="🧭">🧭</option>
     <option value="🔮">🔮</option>
     <option value="👑">👑</option>
     <option value="⚔️">⚔️</option>
     <option value="🌙">🌙</option>
     <option value="🐉">🐉</option>
     <option value="📜">📜</option>
     <option value="💎">💎</option>
    </select>
    <button class="vp-save" id="vpSave"></button>
   </div>

   <div class="vp-stats">
    <div class="vp-stat">
     <strong id="vpXP">0</strong>
     <span id="vpXPLabel"></span>
    </div>
    <div class="vp-stat">
     <strong id="vpChallenges">0</strong>
     <span id="vpChallengeLabel"></span>
    </div>
    <div class="vp-stat">
     <strong id="vpArtifacts">0/10</strong>
     <span id="vpArtifactLabel"></span>
    </div>
   </div>
  `;

  view.prepend(card);

 
  document.getElementById("vpSave").onclick=()=>{
   const name=document.getElementById("vpNameInput").value.trim();

   if(!name){
    showToast(language==="fr"?"Choisis un pseudonyme.":"Choose a username.");
    return;
   }

   // Préserver les données du système de titres
   try{
    const saved=JSON.parse(localStorage.getItem("vault_mvp_01"))||{};

    if(saved.selectedVaultTitle){
     state.selectedVaultTitle=saved.selectedVaultTitle;
    }

    if(saved.vaultTitles){
     state.vaultTitles=saved.vaultTitles;
    }
   }catch(error){}

   state.profileName=name.slice(0,24);
   state.avatar=document.getElementById("vpAvatarInput").value;

   saveState();
   render();

   showToast(language==="fr"?"Profil enregistré.":"Profile saved.");
  };

 }

function updateProfile(){
  if(!document.getElementById(CARD_ID))return;

  const name=state.profileName||"Archiviste";
  const avatar=state.avatar||"🗝️";

  let selectedTitleId="archivist";

  try{
   const saved=JSON.parse(localStorage.getItem("vault_mvp_01"));
   selectedTitleId=saved?.selectedVaultTitle||"archivist";
  }catch(error){}

  const titleNames={
   archivist:{fr:"ARCHIVISTE",en:"ARCHIVIST"},
   explorer:{fr:"EXPLORATEUR",en:"EXPLORER"},
   regular:{fr:"HABITUÉ",en:"REGULAR"},
   veteran:{fr:"VÉTÉRAN",en:"VETERAN"},
   collector:{fr:"COLLECTIONNEUR",en:"COLLECTOR"},
   master:{fr:"ARCHIVISTE SUPRÊME",en:"GRAND ARCHIVIST"},
   experienced:{fr:"ÉRUDIT",en:"SCHOLAR"},
   guardian:{fr:"GARDIEN DES RELIQUES",en:"RELIC GUARDIAN"}
  };

  const lang=language==="fr"?"fr":"en";
  const title=titleNames[selectedTitleId]||titleNames.archivist;

  document.getElementById("vpAvatar").textContent=avatar;
  document.getElementById("vpName").textContent=name;
  document.getElementById("vpRank").textContent=
   `${title[lang]} · ${lang==="fr"?"SAISON 01":"SEASON 01"}`;

  document.getElementById("vpNameInput").value=name;
  document.getElementById("vpAvatarInput").value=avatar;

  document.getElementById("vpSave").textContent=
   lang==="fr"?"ENREGISTRER LE PROFIL":"SAVE PROFILE";

  document.getElementById("vpXP").textContent=state.xp;
  document.getElementById("vpChallenges").textContent=state.completedDays.length;
  document.getElementById("vpArtifacts").textContent=
   state.unlocked.length+"/10";

  document.getElementById("vpXPLabel").textContent=
   lang==="fr"?"XP TOTAL":"TOTAL XP";

  document.getElementById("vpChallengeLabel").textContent=
   lang==="fr"?"DÉFIS TERMINÉS":"CHALLENGES";

  document.getElementById("vpArtifactLabel").textContent=
   lang==="fr"?"ARTEFACTS":"ARTIFACTS";
}

 addProfileStyles();
 createProfile();

 const previousRender=render;

 render=function(){
  previousRender();
  updateProfile();
 };

 render();
})();


/* ==========================================
   VAULT — ACHIEVEMENTS 0.6
========================================== */

(function () {
  const STORAGE_KEY = "vault_mvp_01";

  const TROPHIES = [
    {
      id: "first_day",
      icon: "🌱",
      name: { fr: "Premier pas", en: "First Steps" },
      desc: { fr: "Terminer ton premier défi.", en: "Complete your first challenge." },
      goal: 1,
      getValue: s => (s.completedDays || []).length
    },
    {
      id: "three_days",
      icon: "🔥",
      name: { fr: "En route", en: "Getting Started" },
      desc: { fr: "Terminer 3 défis.", en: "Complete 3 challenges." },
      goal: 3,
      getValue: s => (s.completedDays || []).length
    },
    {
      id: "seven_days",
      icon: "📅",
      name: { fr: "Une semaine", en: "One Week" },
      desc: { fr: "Terminer 7 défis.", en: "Complete 7 challenges." },
      goal: 7,
      getValue: s => (s.completedDays || []).length
    },
    {
      id: "fourteen_days",
      icon: "🏅",
      name: { fr: "Habitué", en: "Regular" },
      desc: { fr: "Terminer 14 défis.", en: "Complete 14 challenges." },
      goal: 14,
      getValue: s => (s.completedDays || []).length
    },
    {
      id: "thirty_days",
      icon: "👑",
      name: { fr: "Discipline", en: "Dedicated" },
      desc: { fr: "Terminer 30 défis.", en: "Complete 30 challenges." },
      goal: 30,
      getValue: s => (s.completedDays || []).length
    },
    {
      id: "xp_100",
      icon: "✨",
      name: { fr: "Étincelle", en: "Spark" },
      desc: { fr: "Atteindre 100 XP.", en: "Reach 100 XP." },
      goal: 100,
      getValue: s => s.xp || 0
    },
    {
      id: "xp_500",
      icon: "💎",
      name: { fr: "Expérimenté", en: "Experienced" },
      desc: { fr: "Atteindre 500 XP.", en: "Reach 500 XP." },
      goal: 500,
      getValue: s => s.xp || 0
    },
    {
      id: "xp_1000",
      icon: "🌟",
      name: { fr: "Maître de l'Archive", en: "Master of the Archive" },
      desc: { fr: "Atteindre 1 000 XP.", en: "Reach 1,000 XP." },
      goal: 1000,
      getValue: s => s.xp || 0
    },
    {
      id: "five_artifacts",
      icon: "🗝️",
      name: { fr: "Collectionneur", en: "Collector" },
      desc: { fr: "Débloquer 5 artefacts.", en: "Unlock 5 artifacts." },
      goal: 5,
      getValue: s => (s.unlocked || []).length
    },
    {
      id: "all_artifacts",
      icon: "🏛️",
      name: { fr: "Archiviste suprême", en: "Grand Archivist" },
      desc: { fr: "Débloquer les 10 artefacts.", en: "Unlock all 10 artifacts." },
      goal: 10,
      getValue: s => (s.unlocked || []).length
    },
    {
      id: "xp_2000",
      icon: "🌌",
      name: { fr: "Légende de VAULT", en: "VAULT Legend" },
      desc: { fr: "Atteindre 2 000 XP.", en: "Reach 2,000 XP." },
      goal: 2000,
      getValue: s => s.xp || 0
    }
  ];

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    } catch (e) {
      return null;
    }
  }

  function saveAchievements(state, unlocked) {
    state.achievements = unlocked;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function syncAchievements() {
    const state = readState();
    const profile = document.getElementById("profileView");

    if (!state || !profile) return;

    if (!Array.isArray(state.achievements)) {
      state.achievements = [];
    }

    const lang = state.language === "fr" ? "fr" : "en";
    let changed = false;

    TROPHIES.forEach(trophy => {
      const value = trophy.getValue(state);

      if (value >= trophy.goal &&
          !state.achievements.includes(trophy.id)) {
        state.achievements.push(trophy.id);
        changed = true;
      }
    });

    if (changed) {
      saveAchievements(state, state.achievements);
    }

    const unlockedCount = state.achievements.length;

    const cards = TROPHIES.map(trophy => {
      const value = trophy.getValue(state);
      const unlocked = state.achievements.includes(trophy.id);
      const progress = Math.min(100, Math.round((value / trophy.goal) * 100));

      return `
        <div style="
          display:flex;
          align-items:center;
          gap:12px;
          padding:13px;
          border:1px solid ${unlocked ? '#8065c9' : 'rgba(255,255,255,.10)'};
          border-radius:12px;
          background:${unlocked ? 'rgba(128,101,201,.13)' : 'rgba(255,255,255,.025)'};
          opacity:${unlocked ? '1' : '.65'};
        ">
          <div style="
            font-size:27px;
            width:42px;
            text-align:center;
            filter:${unlocked ? 'none' : 'grayscale(1)'};
          ">${trophy.icon}</div>

          <div style="flex:1;min-width:0;">
            <div style="font-weight:700;font-size:13px;">
              ${trophy.name[lang]}
              ${unlocked ? ' ✓' : ''}
            </div>

            <div style="font-size:11px;opacity:.7;margin-top:3px;">
              ${trophy.desc[lang]}
            </div>

            <div style="
              height:4px;
              background:rgba(255,255,255,.12);
              border-radius:5px;
              margin-top:8px;
              overflow:hidden;
            ">
              <div style="
                height:100%;
                width:${progress}%;
                background:#9b80e8;
                border-radius:5px;
              "></div>
            </div>

            <div style="font-size:10px;opacity:.55;margin-top:4px;">
              ${Math.min(value, trophy.goal)} / ${trophy.goal}
            </div>
          </div>
        </div>
      `;
    }).join("");

    const html = `
      <div style="margin-top:22px;" id="vaultAchievements06">
        <div style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          margin-bottom:13px;
          gap:10px;
        ">
          <div>
            <div style="font-size:17px;font-weight:800;">
              🏆 ${lang === "fr" ? "Succès & trophées" : "Achievements"}
            </div>
            <div style="font-size:11px;opacity:.6;margin-top:3px;">
              ${lang === "fr" ? "Ta progression personnelle" : "Your personal progress"}
            </div>
          </div>

          <div style="
            font-size:12px;
            font-weight:700;
            padding:7px 11px;
            border-radius:20px;
            background:rgba(128,101,201,.2);
          ">
            ${unlockedCount} / ${TROPHIES.length}
          </div>
        </div>

        <div style="
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:9px;
        ">
          ${cards}
        </div>
      </div>
    `;

    let container = document.getElementById("vaultAchievements06");

    if (!container) {
      profile.insertAdjacentHTML("beforeend", html);
    } else if (container.outerHTML !== html) {
      container.outerHTML = html;
    }
  }

  // Observe les changements de l'application
  // pour actualiser les trophées automatiquement.
  let scheduled = false;

  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;

    requestAnimationFrame(() => {
      scheduled = false;
      syncAchievements();
    });
  });

  function start() {
    syncAchievements();

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

})();


/* ==========================================
   VAULT — SEASON 0.7
   Season 1: The Forgotten Relics
========================================== */

(function () {
  const STORAGE_KEY = "vault_mvp_01";
  const SEASON_DURATION = 30 * 24 * 60 * 60 * 1000;

  const RELICS = [
    { id: "medal", icon: "🏵️", goal: 1,
      fr: "Médaille oubliée", en: "Forgotten Medal" },
    { id: "crystal", icon: "💠", goal: 3,
      fr: "Cristal du crépuscule", en: "Twilight Crystal" },
    { id: "key", icon: "🗝️", goal: 5,
      fr: "Clé des anciens", en: "Key of the Ancients" },
    { id: "compass", icon: "🧭", goal: 7,
      fr: "Boussole perdue", en: "Lost Compass" },
    { id: "crown", icon: "👑", goal: 10,
      fr: "Couronne oubliée", en: "Forgotten Crown" }
  ];

  function getState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function saveState(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  function initializeSeason(s) {
    if (!s.season07) {
      const now = Date.now();

      s.season07 = {
        start: now,
        progress: 0,
        lastCompletedCount: (s.completedDays || []).length,
        relics: []
      };

      saveState(s);
    }

    if (!Array.isArray(s.season07.relics)) {
      s.season07.relics = [];
    }

    return s.season07;
  }

  function updateSeason() {
    const s = getState();
    const profile = document.getElementById("profileView");

    if (!s || !profile) return;

    const season = initializeSeason(s);
    const completed = (s.completedDays || []).length;

    // Détecte les nouveaux défis terminés
    if (completed > season.lastCompletedCount) {
      season.progress += completed - season.lastCompletedCount;
    }

    season.lastCompletedCount = completed;

    // Débloque les reliques automatiquement
    RELICS.forEach(relic => {
      if (
        season.progress >= relic.goal &&
        !season.relics.includes(relic.id)
      ) {
        season.relics.push(relic.id);
      }
    });

    saveState(s);

    const lang = s.language === "fr" ? "fr" : "en";
    const elapsed = Date.now() - season.start;
    const remaining = Math.max(
      0,
      Math.ceil((SEASON_DURATION - elapsed) / 86400000)
    );

    const active = elapsed < SEASON_DURATION;
    const unlocked = season.relics.length;

    const relicCards = RELICS.map(relic => {
      const obtained = season.relics.includes(relic.id);
      const progress = Math.min(
        100,
        Math.round((season.progress / relic.goal) * 100)
      );

      return `
        <div style="
          border:1px solid ${obtained ? '#a184dc' : 'rgba(255,255,255,.1)'};
          border-radius:12px;
          padding:12px;
          text-align:center;
          background:${obtained ? 'rgba(128,101,201,.15)' : 'rgba(255,255,255,.025)'};
          opacity:${obtained ? '1' : '.65'};
        ">
          <div style="
            font-size:30px;
            filter:${obtained ? 'none' : 'grayscale(1)'};
          ">${relic.icon}</div>

          <div style="font-size:12px;font-weight:700;margin-top:7px;">
            ${relic[lang]}
          </div>

          <div style="font-size:10px;opacity:.65;margin-top:5px;">
            ${obtained
              ? (lang === "fr" ? "Obtenue ✓" : "Obtained ✓")
              : `${Math.min(season.progress, relic.goal)} / ${relic.goal}`}
          </div>

          <div style="
            height:4px;
            background:rgba(255,255,255,.12);
            border-radius:5px;
            margin-top:9px;
            overflow:hidden;
          ">
            <div style="
              height:100%;
              width:${progress}%;
              background:#a184dc;
            "></div>
          </div>
        </div>
      `;
    }).join("");

    const html = `
      <div id="vaultSeason07" style="margin-top:25px;">

        <div style="
          border:1px solid rgba(161,132,220,.4);
          border-radius:15px;
          padding:16px;
          background:linear-gradient(135deg,rgba(91,65,145,.2),rgba(20,20,35,.3));
        ">

          <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:10px;
          ">
            <div>
              <div style="font-size:17px;font-weight:800;">
                🏺 ${lang === "fr" ? "Les Reliques oubliées" : "The Forgotten Relics"}
              </div>

              <div style="font-size:11px;opacity:.65;margin-top:4px;">
                ${lang === "fr" ? "SAISON 01 · COLLECTION EXCLUSIVE" : "SEASON 01 · EXCLUSIVE COLLECTION"}
              </div>
            </div>

            <div style="
              font-size:12px;
              font-weight:700;
              white-space:nowrap;
              padding:7px 10px;
              border-radius:20px;
              background:rgba(161,132,220,.2);
            ">
              ${unlocked} / 5
            </div>
          </div>

          <div style="font-size:12px;margin-top:16px;opacity:.8;">
            ${active
              ? (lang === "fr"
                ? `⏳ ${remaining} jour${remaining > 1 ? "s" : ""} restant${remaining > 1 ? "s" : ""}`
                : `⏳ ${remaining} day${remaining > 1 ? "s" : ""} remaining`)
              : (lang === "fr" ? "Saison terminée" : "Season ended")}
          </div>

          <div style="
            height:7px;
            border-radius:10px;
            background:rgba(255,255,255,.12);
            overflow:hidden;
            margin-top:9px;
          ">
            <div style="
              height:100%;
              width:${Math.min(100, season.progress / 10 * 100)}%;
              background:#a184dc;
            "></div>
          </div>

          <div style="font-size:11px;opacity:.65;margin-top:6px;">
            ${lang === "fr"
              ? `${Math.min(season.progress, 10)} / 10 défis saisonniers`
              : `${Math.min(season.progress, 10)} / 10 seasonal challenges`}
          </div>

          <div style="
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(105px,1fr));
            gap:9px;
            margin-top:16px;
          ">
            ${relicCards}
          </div>

          <div style="
            font-size:11px;
            opacity:.6;
            text-align:center;
            margin-top:14px;
          ">
            ${lang === "fr"
              ? "Les reliques obtenues restent dans ta collection après la saison."
              : "Obtained relics remain in your collection after the season."}
          </div>

        </div>
      </div>
    `;

    const existing = document.getElementById("vaultSeason07");

    if (!existing) {
      profile.insertAdjacentHTML("beforeend", html);
    } else if (existing.outerHTML !== html) {
      existing.outerHTML = html;
    }
  }

  let scheduled = false;

  const observer = new MutationObserver(() => {
    if (scheduled) return;

    scheduled = true;

    requestAnimationFrame(() => {
      scheduled = false;
      updateSeason();
    });
  });

  function start() {
    updateSeason();

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

})();



/* ==========================================
   VAULT — PLAYER TITLES 0.8.2
   Fixed stable title selector
========================================== */

(function () {
  const STORAGE_KEY = "vault_mvp_01";

  const TITLES = [
    {
      id: "explorer", icon: "🧭",
      fr: "Explorateur", en: "Explorer",
      descFr: "Terminer ton premier défi.",
      descEn: "Complete your first challenge.",
      goal: 1,
      value: s => (s.completedDays || []).length
    },
    {
      id: "regular", icon: "🔥",
      fr: "Habitué", en: "Regular",
      descFr: "Terminer 5 défis.",
      descEn: "Complete 5 challenges.",
      goal: 5,
      value: s => (s.completedDays || []).length
    },
    {
      id: "veteran", icon: "⚔️",
      fr: "Vétéran", en: "Veteran",
      descFr: "Terminer 10 défis.",
      descEn: "Complete 10 challenges.",
      goal: 10,
      value: s => (s.completedDays || []).length
    },
    {
      id: "collector", icon: "🗝️",
      fr: "Collectionneur", en: "Collector",
      descFr: "Débloquer 5 artefacts.",
      descEn: "Unlock 5 artifacts.",
      goal: 5,
      value: s => (s.unlocked || []).length
    },
    {
      id: "master", icon: "🏛️",
      fr: "Archiviste suprême", en: "Grand Archivist",
      descFr: "Débloquer les 10 artefacts.",
      descEn: "Unlock all 10 artifacts.",
      goal: 10,
      value: s => (s.unlocked || []).length
    },
    {
      id: "experienced", icon: "💎",
      fr: "Érudit", en: "Scholar",
      descFr: "Atteindre 500 XP.",
      descEn: "Reach 500 XP.",
      goal: 500,
      value: s => s.xp || 0
    },
    {
      id: "guardian", icon: "👑",
      fr: "Gardien des reliques", en: "Relic Guardian",
      descFr: "Obtenir les 5 reliques de la saison 1.",
      descEn: "Collect all 5 Season 1 relics.",
      goal: 5,
      value: s => (s.season07?.relics || []).length
    }
  ];

  const DEFAULT_TITLE = {
    id: "archivist",
    icon: "📜",
    fr: "Archiviste",
    en: "Archivist"
  };

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    } catch (e) {
      return null;
    }
  }

  function saveState(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  function getTitle(id) {
    return id === "archivist"
      ? DEFAULT_TITLE
      : TITLES.find(t => t.id === id) || DEFAULT_TITLE;
  }

  function createPanel(profile) {
    if (document.getElementById("vaultTitles082")) return;

    profile.insertAdjacentHTML("beforeend", `
      <div id="vaultTitles082" style="margin-top:24px;">
        <div style="
          border:1px solid rgba(161,132,220,.35);
          border-radius:15px;
          padding:15px;
          background:rgba(91,65,145,.10);
        ">
          <div style="font-size:17px;font-weight:800;">
            🎖️ <span id="vaultTitlesHeading082"></span>
          </div>

          <div id="vaultTitlesDescription082"
            style="font-size:11px;opacity:.65;margin-top:4px;">
          </div>

          <div style="
            text-align:center;
            padding:17px 10px;
            margin-top:12px;
            border-radius:12px;
            background:rgba(128,101,201,.14);
          ">
            <div id="vaultEquippedIcon082" style="font-size:30px;"></div>
            <div id="vaultEquippedName082"
              style="font-size:16px;font-weight:800;margin-top:5px;">
            </div>
            <div id="vaultEquippedLabel082"
              style="font-size:10px;opacity:.6;margin-top:4px;">
            </div>
          </div>

          <div id="vaultChooseLabel082"
            style="font-size:12px;font-weight:700;margin-top:15px;">
          </div>

          <select id="vaultTitleSelect082" style="
            width:100%;
            padding:11px;
            margin-top:7px;
            border-radius:9px;
            border:1px solid rgba(161,132,220,.4);
            background:#211c30;
            color:white;
            font-size:13px;
          "></select>

          <div style="font-size:11px;font-weight:700;margin-top:19px;">
            <span id="vaultCollectionLabel082"></span>
            <span id="vaultCollectionCount082"
              style="opacity:.6;"></span>
          </div>

          <div id="vaultTitleCards082" style="
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(190px,1fr));
            gap:8px;
            margin-top:10px;
          "></div>
        </div>
      </div>
    `);

    const select = document.getElementById("vaultTitleSelect082");

    select.addEventListener("change", function () {
      const latest = readState();
      if (!latest) return;

      const choice = this.value;
      const allowed = [
        DEFAULT_TITLE.id,
        ...(latest.vaultTitles || [])
      ];

      if (!allowed.includes(choice)) return;

    latest.selectedVaultTitle = choice;
saveState(latest);

updateTitles();
render();
    });
  }

  function updateTitles() {
    const profile = document.getElementById("profileView");
    const s = readState();

    if (!profile || !s) return;

    if (!Array.isArray(s.vaultTitles)) {
      s.vaultTitles = [];
    }

    let changed = false;

    TITLES.forEach(title => {
      if (
        title.value(s) >= title.goal &&
        !s.vaultTitles.includes(title.id)
      ) {
        s.vaultTitles.push(title.id);
        changed = true;
      }
    });

    if (!s.selectedVaultTitle) {
      s.selectedVaultTitle = DEFAULT_TITLE.id;
      changed = true;
    }

    const available = [
      DEFAULT_TITLE.id,
      ...s.vaultTitles
    ];

    if (!available.includes(s.selectedVaultTitle)) {
      s.selectedVaultTitle = DEFAULT_TITLE.id;
      changed = true;
    }

    if (changed) saveState(s);

    const lang = s.language === "fr" ? "fr" : "en";
    const selected = getTitle(s.selectedVaultTitle);

    createPanel(profile);

    // Textes du profil
    document.getElementById("vaultTitlesHeading082").textContent =
      lang === "fr" ? "Titres de joueur" : "Player Titles";

    document.getElementById("vaultTitlesDescription082").textContent =
      lang === "fr"
        ? "Débloque des titres et choisis celui qui te représente."
        : "Unlock titles and choose the one that represents you.";

    document.getElementById("vaultEquippedIcon082").textContent =
      selected.icon;

    document.getElementById("vaultEquippedName082").textContent =
      selected[lang];

    document.getElementById("vaultEquippedLabel082").textContent =
      lang === "fr" ? "TITRE ÉQUIPÉ" : "EQUIPPED TITLE";

    document.getElementById("vaultChooseLabel082").textContent =
      lang === "fr" ? "Choisir mon titre" : "Choose my title";

    document.getElementById("vaultCollectionLabel082").textContent =
      lang === "fr" ? "Collection de titres " : "Title Collection ";

    document.getElementById("vaultCollectionCount082").textContent =
      `(${s.vaultTitles.length + 1} / ${TITLES.length + 1})`;

    // Menu : ne jamais le remplacer pendant son utilisation
    const select = document.getElementById("vaultTitleSelect082");

    if (document.activeElement !== select) {
      const options = [
        DEFAULT_TITLE,
        ...TITLES.filter(t => s.vaultTitles.includes(t.id))
      ].map(title => `
        <option value="${title.id}">
          ${title.icon} ${title[lang]}
        </option>
      `).join("");

      if (select.innerHTML !== options) {
        select.innerHTML = options;
      }

      select.value = s.selectedVaultTitle;
    }

    // Collection des titres
    const cards = `
      <div style="
        display:flex;align-items:center;gap:10px;padding:10px;
        border:1px solid #8065c9;border-radius:11px;
        background:rgba(128,101,201,.13);
      ">
        <div style="font-size:25px;">📜</div>
        <div style="font-size:12px;font-weight:700;">
          ${DEFAULT_TITLE[lang]} ✓
          <div style="font-size:10px;opacity:.6;font-weight:400;">
            ${lang === "fr" ? "Titre de départ" : "Starting title"}
          </div>
        </div>
      </div>
      ${TITLES.map(title => {
        const unlocked = s.vaultTitles.includes(title.id);
        const value = title.value(s);
        const progress = Math.min(
          100,
          Math.round(value / title.goal * 100)
        );

        return `
          <div style="
            display:flex;align-items:center;gap:10px;padding:10px;
            border:1px solid ${unlocked ? '#8065c9' : 'rgba(255,255,255,.1)'};
            border-radius:11px;
            background:${unlocked ? 'rgba(128,101,201,.13)' : 'rgba(255,255,255,.025)'};
            opacity:${unlocked ? '1' : '.65'};
          ">
            <div style="
              font-size:25px;
              filter:${unlocked ? 'none' : 'grayscale(1)'};
            ">${title.icon}</div>

            <div style="flex:1;min-width:0;">
              <div style="font-size:12px;font-weight:700;">
                ${title[lang]} ${unlocked ? "✓" : ""}
              </div>
              <div style="font-size:10px;opacity:.65;margin-top:3px;">
                ${lang === "fr" ? title.descFr : title.descEn}
              </div>

              ${!unlocked ? `
                <div style="
                  height:4px;background:rgba(255,255,255,.12);
                  border-radius:5px;margin-top:7px;overflow:hidden;
                ">
                  <div style="
                    width:${progress}%;height:100%;
                    background:#9b80e8;
                  "></div>
                </div>
                <div style="font-size:9px;opacity:.5;margin-top:3px;">
                  ${Math.min(value, title.goal)} / ${title.goal}
                </div>
              ` : ""}
            </div>
          </div>
        `;
      }).join("")}
    `;

    const cardsContainer = document.getElementById("vaultTitleCards082");

    if (cardsContainer.innerHTML !== cards) {
      cardsContainer.innerHTML = cards;
    }
  }

  let scheduled = false;

  const observer = new MutationObserver(() => {
    if (scheduled) return;

    scheduled = true;

    requestAnimationFrame(() => {
      scheduled = false;
      updateTitles();
    });
  });

  function start() {
    updateTitles();

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

})();


/* =========================================
   VAULT — ARCHIVIST RANKS 0.9
========================================= */

(()=>{
 const PANEL_ID="vaultRanks09";
 const STYLE_ID="vaultRanks09Styles";

 const RANKS=[
  {id:"novice",fr:"Novice",en:"Novice",icon:"📜",points:0},
  {id:"explorer",fr:"Explorateur",en:"Explorer",icon:"🧭",points:100},
  {id:"collector",fr:"Collectionneur",en:"Collector",icon:"🗝️",points:250},
  {id:"guardian",fr:"Gardien",en:"Guardian",icon:"🛡️",points:500},
  {id:"master",fr:"Maître archiviste",en:"Master Archivist",icon:"🏛️",points:900},
  {id:"legend",fr:"Légende",en:"Legend",icon:"👑",points:1500},
  {id:"mythic",fr:"Archiviste mythique",en:"Mythic Archivist",icon:"💎",points:2500}
 ];

 function getScore(){
  return (Number(state.xp)||0)
   +((state.completedDays||[]).length*10)
   +((state.unlocked||[]).length*25)
   +((state.achievements||[]).length*50);
 }

 function getRank(score){
  let result=RANKS[0];

  RANKS.forEach(rank=>{
   if(score>=rank.points)result=rank;
  });

  return result;
 }

 function addStyles(){
  if(document.getElementById(STYLE_ID))return;

  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
   #${PANEL_ID}{
    background:linear-gradient(135deg,#171c2b,#29213e);
    border:1px solid #6654a8;
    border-radius:16px;
    padding:20px;
    margin:0 0 22px;
    color:white;
   }
   #${PANEL_ID} .vr-heading{
    font-size:11px;
    letter-spacing:2px;
    color:#b7a5ff;
    font-weight:800;
    margin-bottom:18px;
   }
   #${PANEL_ID} .vr-current{
    display:flex;
    align-items:center;
    gap:14px;
    margin-bottom:18px;
   }
   #${PANEL_ID} .vr-icon{
    width:58px;
    height:58px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#30264f;
    border:1px solid #806acb;
    border-radius:14px;
    font-size:29px;
    flex-shrink:0;
   }
   #${PANEL_ID} .vr-name{
    font-size:19px;
    font-weight:800;
   }
   #${PANEL_ID} .vr-score{
    color:#b7a5ff;
    font-size:11px;
    margin-top:5px;
   }
   #${PANEL_ID} .vr-progress-info{
    display:flex;
    justify-content:space-between;
    gap:10px;
    font-size:10px;
    color:#aebbd2;
    margin-bottom:8px;
   }
   #${PANEL_ID} .vr-track{
    height:9px;
    background:#0c1220;
    border-radius:20px;
    overflow:hidden;
    border:1px solid #30394e;
   }
   #${PANEL_ID} .vr-fill{
    height:100%;
    width:0%;
    background:linear-gradient(90deg,#806acb,#c2a5ff);
    border-radius:20px;
    transition:width .3s ease;
   }
   #${PANEL_ID} .vr-next{
    font-size:10px;
    color:#aebbd2;
    margin-top:8px;
   }
   #${PANEL_ID} .vr-history-title{
    font-size:10px;
    letter-spacing:1.5px;
    color:#b7a5ff;
    margin:22px 0 10px;
    font-weight:800;
   }
   #${PANEL_ID} .vr-history{
    display:grid;
    gap:7px;
   }
   #${PANEL_ID} .vr-history-item{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
    padding:9px 11px;
    background:#0c1220;
    border:1px solid #30394e;
    border-radius:8px;
    font-size:11px;
   }
   #${PANEL_ID} .vr-history-item span:last-child{
    color:#9b8acb;
    font-size:10px;
   }
  `;
  document.head.appendChild(style);
 }

 function createPanel(){
  const view=document.getElementById("profileView");
  if(!view||document.getElementById(PANEL_ID))return;

  const panel=document.createElement("section");
  panel.id=PANEL_ID;

  panel.innerHTML=`
   <div class="vr-heading">🏆 <span id="vrHeading"></span></div>

   <div class="vr-current">
    <div class="vr-icon" id="vrIcon"></div>
    <div>
     <div class="vr-name" id="vrName"></div>
     <div class="vr-score" id="vrScore"></div>
    </div>
   </div>

   <div class="vr-progress-info">
    <span id="vrProgressLabel"></span>
    <span id="vrProgressNumbers"></span>
   </div>

   <div class="vr-track">
    <div class="vr-fill" id="vrProgressBar"></div>
   </div>

   <div class="vr-next" id="vrNext"></div>

   <div class="vr-history-title" id="vrHistoryTitle"></div>
   <div class="vr-history" id="vrHistory"></div>
  `;

  const profile=document.getElementById("vaultPlayerProfile");

  if(profile){
   profile.insertAdjacentElement("afterend",panel);
  }else{
   view.prepend(panel);
  }
 }

 function setText(id,value){
  const element=document.getElementById(id);
  if(element&&element.textContent!==String(value)){
   element.textContent=value;
  }
 }

 function updateRanks(){
  const panel=document.getElementById(PANEL_ID);
  if(!panel)return;

  const lang=language==="fr"?"fr":"en";
  const score=getScore();

  if(!Array.isArray(state.vaultRankHistory)){
   state.vaultRankHistory=[];
  }

  let changed=false;

  // Enregistrer les nouveaux rangs obtenus
  RANKS.forEach(rank=>{
   if(score>=rank.points&&
      !state.vaultRankHistory.some(item=>item.id===rank.id)){
    state.vaultRankHistory.push({
     id:rank.id,
     date:new Date().toISOString()
    });
    changed=true;
   }
  });

  if(changed)saveState();

  const history=state.vaultRankHistory;
  const highestHistory=history.reduce((highest,item)=>{
   const found=RANKS.find(rank=>rank.id===item.id);
   return found&&found.points>highest.points?found:highest;
  },RANKS[0]);

  const currentRank=getRank(Math.max(score,highestHistory.points));
  const currentIndex=RANKS.findIndex(rank=>rank.id===currentRank.id);
  const nextRank=RANKS[currentIndex+1];

  setText("vrHeading",lang==="fr"?"VOTRE RANG":"YOUR RANK");
  setText("vrIcon",currentRank.icon);
  setText("vrName",currentRank[lang]);
  setText("vrScore",score+" "+(lang==="fr"?"POINTS DE RANG":"RANK POINTS"));

  let percentage=100;
  let remaining=0;

  if(nextRank){
   const range=nextRank.points-currentRank.points;
   const progress=score-currentRank.points;
   percentage=Math.max(0,Math.min(100,(progress/range)*100));
   remaining=Math.max(0,nextRank.points-score);
  }

  const bar=document.getElementById("vrProgressBar");
  if(bar)bar.style.width=percentage+"%";

  setText("vrProgressLabel",
   lang==="fr"?"PROCHAIN RANG":"NEXT RANK");

  setText("vrProgressNumbers",
   nextRank?score+"/"+nextRank.points:"MAXIMUM");

  setText("vrNext",
   nextRank
    ?(lang==="fr"
      ?"Encore "+remaining+" points pour devenir "+nextRank.fr
      :remaining+" more points to become "+nextRank.en)
    :(lang==="fr"?"Rang maximum atteint !":"Maximum rank reached!"));

  setText("vrHistoryTitle",
   lang==="fr"?"HISTORIQUE DES RANGS":"RANK HISTORY");

  const historyElement=document.getElementById("vrHistory");

  const historyHTML=history
   .slice()
   .sort((a,b)=>{
    const rankA=RANKS.find(r=>r.id===a.id);
    const rankB=RANKS.find(r=>r.id===b.id);
    return (rankB?.points||0)-(rankA?.points||0);
   })
   .map(item=>{
    const rank=RANKS.find(r=>r.id===item.id);
    if(!rank)return "";

    const date=new Date(item.date).toLocaleDateString(
     lang==="fr"?"fr-FR":"en-GB"
    );

    return `
     <div class="vr-history-item">
      <span>${rank.icon} ${rank[lang]}</span>
      <span>${date}</span>
     </div>
    `;
   }).join("");

  if(historyElement&&historyElement.innerHTML!==historyHTML){
   historyElement.innerHTML=historyHTML;
  }
 }

 addStyles();
 createPanel();

 const previousRender=render;

 render=function(){
  previousRender();
  createPanel();
  updateRanks();
 };

 const observer=new MutationObserver(()=>{
  if(!document.getElementById(PANEL_ID)){
   createPanel();
  }
  updateRanks();
 });

 observer.observe(document.body,{
  childList:true,
  subtree:true
 });

 render();
})();


/* =========================================
   VAULT — DAILY REWARDS 1.0 SAFE
   No additional MutationObserver
========================================= */

(()=>{
 const PANEL_ID="vaultDailyRewards10";
 const STYLE_ID="vaultDailyRewards10Styles";
 const STORAGE_KEY="vault_mvp_01";

 function todayKey(){
  const d=new Date();
  return [
   d.getFullYear(),
   String(d.getMonth()+1).padStart(2,"0"),
   String(d.getDate()).padStart(2,"0")
  ].join("-");
 }

 function dayNumber(date){
  const p=date.split("-").map(Number);
  return Math.floor(Date.UTC(p[0],p[1]-1,p[2])/86400000);
 }

 function rewardForDay(day){
  if(day===1)return 15;
  if(day===2)return 20;
  if(day===3)return 30;
  if(day===7)return 75;
  if(day===14)return 100;
  if(day===30)return 200;
  if(day>=4&&day<=6)return 35;
  if(day>=8&&day<=13)return 40;
  if(day>=15&&day<=29)return 50;
  return 50;
 }

 function getDaily(){
  if(!state.vaultDaily10){
   state.vaultDaily10={
    lastClaimDate:"",
    streak:0,
    totalClaims:0
   };
  }
  return state.vaultDaily10;
 }

 function saveDaily(){
  try{
   const saved=JSON.parse(localStorage.getItem(STORAGE_KEY))||{};

   if(saved.selectedVaultTitle){
    state.selectedVaultTitle=saved.selectedVaultTitle;
   }

   if(saved.vaultTitles){
    state.vaultTitles=saved.vaultTitles;
   }
  }catch(e){}

  saveState();
 }

 function addStyles(){
  if(document.getElementById(STYLE_ID))return;

  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
   #${PANEL_ID}{
    background:linear-gradient(135deg,#171c2b,#30213d);
    border:1px solid #806acb;
    border-radius:16px;
    padding:20px;
    margin:0 0 22px;
    color:white;
   }
   #${PANEL_ID} .dr-heading{
    color:#d4c5ff;
    font-size:11px;
    font-weight:800;
    letter-spacing:2px;
    margin-bottom:17px;
   }
   #${PANEL_ID} .dr-main{
    display:flex;
    align-items:center;
    gap:14px;
    margin-bottom:17px;
   }
   #${PANEL_ID} .dr-icon{
    width:58px;height:58px;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;border-radius:14px;
    background:#3a2b55;border:1px solid #806acb;
    font-size:29px;
   }
   #${PANEL_ID} .dr-title{font-size:18px;font-weight:800}
   #${PANEL_ID} .dr-description{
    color:#b9b5cc;font-size:11px;margin-top:5px;
   }
   #${PANEL_ID} .dr-stats{
    display:grid;grid-template-columns:1fr 1fr;
    gap:9px;margin-bottom:17px;
   }
   #${PANEL_ID} .dr-stat{
    background:#0c1220;border:1px solid #30394e;
    border-radius:9px;padding:12px;text-align:center;
   }
   #${PANEL_ID} .dr-stat strong{
    display:block;color:#c2a5ff;font-size:20px;margin-bottom:4px;
   }
   #${PANEL_ID} .dr-stat span{
    color:#aebbd2;font-size:9px;letter-spacing:1px;
   }
   #${PANEL_ID} .dr-days{
    display:grid;grid-template-columns:repeat(7,1fr);
    gap:5px;margin-bottom:17px;
   }
   #${PANEL_ID} .dr-day{
    min-width:0;padding:9px 2px;text-align:center;
    background:#0c1220;border:1px solid #30394e;
    border-radius:8px;
   }
   #${PANEL_ID} .dr-day.active{
    background:#3a2b55;border-color:#a58be9;
   }
   #${PANEL_ID} .dr-day strong{display:block;font-size:13px}
   #${PANEL_ID} .dr-day span{
    display:block;font-size:8px;color:#b9b5cc;margin-top:5px;
   }
   #${PANEL_ID} .dr-button{
    width:100%;padding:13px;border-radius:8px;
    border:1px solid #a58be9;background:#49356b;
    color:white;font-weight:800;cursor:pointer;font-size:12px;
   }
   #${PANEL_ID} .dr-button:disabled{opacity:.55;cursor:default}
   #${PANEL_ID} .dr-message{
    text-align:center;color:#c2b6e8;
    font-size:10px;margin-top:10px;min-height:14px;
   }
  `;
  document.head.appendChild(style);
 }

 function createPanel(){
  const view=document.getElementById("profileView");
  if(!view||document.getElementById(PANEL_ID))return;

  const panel=document.createElement("section");
  panel.id=PANEL_ID;

  panel.innerHTML=`
   <div class="dr-heading" id="drHeading10"></div>
   <div class="dr-main">
    <div class="dr-icon">🎁</div>
    <div>
     <div class="dr-title" id="drTitle10"></div>
     <div class="dr-description" id="drDescription10"></div>
    </div>
   </div>
   <div class="dr-stats">
    <div class="dr-stat">
     <strong id="drStreak10">0</strong>
     <span id="drStreakLabel10"></span>
    </div>
    <div class="dr-stat">
     <strong id="drTotal10">0</strong>
     <span id="drTotalLabel10"></span>
    </div>
   </div>
   <div class="dr-days" id="drDays10"></div>
   <button class="dr-button" id="drClaim10"></button>
   <div class="dr-message" id="drMessage10"></div>
  `;

  const profile=document.getElementById("vaultPlayerProfile");

  if(profile)profile.insertAdjacentElement("afterend",panel);
  else view.prepend(panel);

  document.getElementById("drClaim10").addEventListener("click",claim);
 }

 function setText(id,value){
  const el=document.getElementById(id);
  if(el&&el.textContent!==String(value)){
   el.textContent=value;
  }
 }

 function claim(){
  const data=getDaily();
  const today=todayKey();

  if(data.lastClaimDate===today)return;

  if(data.lastClaimDate){
   const difference=dayNumber(today)-dayNumber(data.lastClaimDate);
   data.streak=difference===1?data.streak+1:1;
  }else{
   data.streak=1;
  }

  const reward=rewardForDay(data.streak);

  data.lastClaimDate=today;
  data.totalClaims=(data.totalClaims||0)+1;

  state.xp=(Number(state.xp)||0)+reward;

  saveDaily();
  render();

  if(typeof showToast==="function"){
   showToast(language==="fr"
    ?"Récompense quotidienne : +"+reward+" XP !"
    :"Daily reward: +"+reward+" XP!");
  }
 }

 function updatePanel(){
  const panel=document.getElementById(PANEL_ID);
  if(!panel)return;

  const lang=language==="fr"?"fr":"en";
  const data=getDaily();
  const today=todayKey();
  const claimed=data.lastClaimDate===today;

  const currentStreak=claimed?data.streak:
   (data.lastClaimDate&&dayNumber(today)-dayNumber(data.lastClaimDate)===1
    ?data.streak+1:1);

  const reward=rewardForDay(currentStreak);

  setText("drHeading10",lang==="fr"?"🎁 RÉCOMPENSES QUOTIDIENNES":"🎁 DAILY REWARDS");
  setText("drTitle10",lang==="fr"?"Votre récompense vous attend":"Your reward is waiting");
  setText("drDescription10",lang==="fr"
   ?"Revenez chaque jour pour faire grandir votre série."
   :"Return every day to build your streak.");

  setText("drStreak10",data.streak||0);
  setText("drTotal10",data.totalClaims||0);
  setText("drStreakLabel10",lang==="fr"?"JOURS CONSÉCUTIFS":"DAILY STREAK");
  setText("drTotalLabel10",lang==="fr"?"RÉCOMPENSES RÉCLAMÉES":"REWARDS CLAIMED");

  const days=document.getElementById("drDays10");
  const html=[1,2,3,4,5,6,7].map(day=>`
   <div class="dr-day ${currentStreak>=day?"active":""}">
    <strong>${day}</strong>
    <span>+${rewardForDay(day)} XP</span>
   </div>
  `).join("");

  if(days&&days.innerHTML!==html)days.innerHTML=html;

  const button=document.getElementById("drClaim10");
  if(button){
   button.disabled=claimed;
   button.textContent=claimed
    ?(lang==="fr"?"✓ RÉCOMPENSE RÉCUPÉRÉE":"✓ REWARD CLAIMED")
    :(lang==="fr"?"RÉCUPÉRER +"+reward+" XP":"CLAIM +"+reward+" XP");
  }

  setText("drMessage10",claimed
   ?(lang==="fr"?"Revenez demain pour votre prochaine récompense."
    :"Come back tomorrow for your next reward.")
   :(lang==="fr"?"Jour "+currentStreak+" de votre prochaine série"
    :"Day "+currentStreak+" of your next streak"));
 }

 addStyles();

 const previousRender=render;

 render=function(){
  previousRender();
  createPanel();
  updatePanel();
 };

 render();
})();


/* =========================================
   VAULT 1.1 — WEEKLY SIDE MISSIONS
========================================= */

(()=>{
 const PANEL_ID = "vaultMissions11";
 const STYLE_ID = "vaultMissions11Styles";

 const MISSIONS = [
  {
   id:"challenges",
   icon:"⚔️",
   name:"Persévérant",
   description:"Terminer 3 défis",
   target:3,
   reward:50,
   type:"challenges"
  },
  {
   id:"xp",
   icon:"✨",
   name:"Enrichissement",
   description:"Gagner 100 XP",
   target:100,
   reward:75,
   type:"xp"
  },
  {
   id:"artifacts",
   icon:"🗝️",
   name:"Collectionneur",
   description:"Débloquer 1 artefact",
   target:1,
   reward:50,
   type:"artifacts"
  }
 ];

 function weekKey(){
  const d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() - ((d.getDay()+6)%7));
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
 }

 function counts(){
  return {
   challenges:Array.isArray(state.completedDays) ? state.completedDays.length : 0,
   xp:Number(state.xp)||0,
   artifacts:Array.isArray(state.unlocked) ? state.unlocked.length : 0
  };
 }

 function saveMissions(){
  saveState();
 }

 function ensureData(){
  const currentWeek = weekKey();
  const current = counts();

  if(!state.vaultMissions11 || state.vaultMissions11.week !== currentWeek){
   state.vaultMissions11 = {
    week:currentWeek,
    baseChallenges:current.challenges,
    baseXp:current.xp,
    baseArtifacts:current.artifacts,
    claimed:[]
   };
   saveMissions();
  }

  if(!Array.isArray(state.vaultMissions11.claimed)){
   state.vaultMissions11.claimed = [];
  }
 }

 function getProgress(mission){
  const data = state.vaultMissions11;
  const current = counts();

  if(mission.type==="challenges"){
   return Math.max(0,current.challenges-data.baseChallenges);
  }

  if(mission.type==="xp"){
   return Math.max(0,current.xp-data.baseXp);
  }

  if(mission.type==="artifacts"){
   return Math.max(0,current.artifacts-data.baseArtifacts);
  }

  return 0;
 }

 function addStyles(){
  if(document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
   #${PANEL_ID}{
    margin:18px 0;
    padding:20px;
    border:1px solid rgba(255,255,255,.12);
    border-radius:16px;
    background:rgba(20,25,45,.72);
    color:inherit;
   }
   #${PANEL_ID} .vm11-subtitle{
    opacity:.65;
    font-size:12px;
    margin:5px 0 18px;
   }
   #${PANEL_ID} .vm11-mission{
    padding:14px 0;
    border-top:1px solid rgba(255,255,255,.09);
   }
   #${PANEL_ID} .vm11-top{
    display:flex;
    justify-content:space-between;
    gap:10px;
    align-items:center;
   }
   #${PANEL_ID} .vm11-name{
    font-weight:700;
   }
   #${PANEL_ID} .vm11-description{
    opacity:.7;
    font-size:13px;
    margin-top:4px;
   }
   #${PANEL_ID} .vm11-reward{
    font-size:12px;
    white-space:nowrap;
    opacity:.85;
   }
   #${PANEL_ID} .vm11-progress{
    height:6px;
    background:rgba(255,255,255,.12);
    border-radius:10px;
    overflow:hidden;
    margin:12px 0 8px;
   }
   #${PANEL_ID} .vm11-progress-fill{
    height:100%;
    background:#a78bfa;
    border-radius:10px;
    transition:width .25s;
   }
   #${PANEL_ID} .vm11-bottom{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
    font-size:12px;
    opacity:.8;
   }
   #${PANEL_ID} .vm11-claim{
    border:0;
    border-radius:8px;
    padding:8px 13px;
    background:#a78bfa;
    color:#171326;
    font-weight:700;
    cursor:pointer;
   }
   #${PANEL_ID} .vm11-claim:disabled{
    opacity:.4;
    cursor:default;
   }
  `;
  document.head.appendChild(style);
 }

 function createPanel(){
  if(document.getElementById(PANEL_ID)) return;

  const profile = document.getElementById("profileView");
  if(!profile) return;

  const panel = document.createElement("section");
  panel.id = PANEL_ID;

  panel.innerHTML = `
   <div style="font-size:18px;font-weight:800">
    📜 MISSIONS SECONDAIRES
   </div>
   <div class="vm11-subtitle">
    De nouveaux objectifs chaque semaine
   </div>
   <div id="vm11List"></div>
  `;

  const profileCard = document.getElementById("vaultPlayerProfile");

  if(profileCard && profileCard.parentElement === profile){
   profileCard.insertAdjacentElement("afterend",panel);
  }else{
   profile.prepend(panel);
  }

  panel.addEventListener("click",function(event){
   const button = event.target.closest("[data-vm11-claim]");
   if(!button) return;

   const mission = MISSIONS.find(m=>m.id===button.dataset.vm11Claim);
   if(!mission) return;

   ensureData();

   const progress = getProgress(mission);
   const data = state.vaultMissions11;

   if(progress < mission.target) return;
   if(data.claimed.includes(mission.id)) return;

   data.claimed.push(mission.id);
   state.xp = (Number(state.xp)||0) + mission.reward;

   // Ne pas compter les XP de cette récompense
   // dans la progression de la mission XP.
   if(mission.type==="xp"){
    data.baseXp += mission.reward;
   }

   saveMissions();
   render();
  });
 }

 function updatePanel(){
  ensureData();
  createPanel();

  const list = document.getElementById("vm11List");
  if(!list) return;

  list.innerHTML = MISSIONS.map(mission=>{
   const progress = getProgress(mission);
   const completed = progress >= mission.target;
   const claimed = state.vaultMissions11.claimed.includes(mission.id);
   const percent = Math.min(100,(progress/mission.target)*100);

   let buttonText = "En cours";
   if(claimed) buttonText = "Réclamée ✓";
   else if(completed) buttonText = "Réclamer";

   return `
    <div class="vm11-mission">
     <div class="vm11-top">
      <div>
       <div class="vm11-name">${mission.icon} ${mission.name}</div>
       <div class="vm11-description">${mission.description}</div>
      </div>
      <div class="vm11-reward">+${mission.reward} XP</div>
     </div>

     <div class="vm11-progress">
      <div class="vm11-progress-fill" style="width:${percent}%"></div>
     </div>

     <div class="vm11-bottom">
      <span>${Math.min(progress,mission.target)} / ${mission.target}</span>
      <button
       class="vm11-claim"
       data-vm11-claim="${mission.id}"
       ${(!completed || claimed)?"disabled":""}>
       ${buttonText}
      </button>
     </div>
    </div>
   `;
  }).join("");
 }

 addStyles();
 ensureData();

 if(typeof render === "function"){
  const previousRender = render;

  render = function(){
   previousRender();
   updatePanel();
  };

  render();
 }
})();


/* =========================================
   VAULT 1.2 — SPECIAL EVENT
   THE AWAKENING OF RELICS
========================================= */

(()=>{
 const PANEL_ID = "vaultEvent12";
 const STYLE_ID = "vaultEvent12Styles";
 const EVENT_DURATION = 7 * 24 * 60 * 60 * 1000;

 const OBJECTIVES = [
  {id:"first",icon:"📜",name:"Le premier éveil",desc:"Terminer 1 défi",target:1,type:"challenges",reward:50},
  {id:"three",icon:"⚔️",name:"La persévérance",desc:"Terminer 3 défis",target:3,type:"challenges",reward:100},
  {id:"xp",icon:"✨",name:"Énergie ancienne",desc:"Gagner 150 XP",target:150,type:"xp",reward:100},
  {id:"artifact",icon:"🗝️",name:"La découverte",desc:"Débloquer 1 artefact",target:1,type:"artifacts",reward:100},
  {id:"final",icon:"🏛️",name:"L'éveil ultime",desc:"Terminer 5 défis",target:5,type:"challenges",reward:200}
 ];

 function count(){
  return {
   challenges:Array.isArray(state.completedDays)?state.completedDays.length:0,
   xp:Number(state.xp)||0,
   artifacts:Array.isArray(state.unlocked)?state.unlocked.length:0
  };
 }

 function init(){
  if(!state.vaultEvent12){
   const c=count();
   state.vaultEvent12={
    start:Date.now(),
    baseChallenges:c.challenges,
    baseXp:c.xp,
    baseArtifacts:c.artifacts,
    claimed:[],
    completed:false
   };
   saveState();
  }
 }

 function expired(){
  return Date.now() >= state.vaultEvent12.start + EVENT_DURATION;
 }

 function progress(m){
  const c=count();
  const e=state.vaultEvent12;

  if(m.type==="challenges")
   return Math.max(0,c.challenges-e.baseChallenges);

  if(m.type==="xp")
   return Math.max(0,c.xp-e.baseXp);

  if(m.type==="artifacts")
   return Math.max(0,c.artifacts-e.baseArtifacts);

  return 0;
 }

 function styles(){
  if(document.getElementById(STYLE_ID))return;

  const s=document.createElement("style");
  s.id=STYLE_ID;
  s.textContent=`
   #${PANEL_ID}{
    margin:20px 0;
    padding:22px;
    border:1px solid rgba(167,139,250,.35);
    border-radius:18px;
    background:linear-gradient(145deg,rgba(42,30,65,.95),rgba(17,24,39,.95));
    color:inherit;
   }
   #${PANEL_ID} .ve12-muted{
    opacity:.7;
    font-size:12px;
   }
   #${PANEL_ID} .ve12-objective{
    padding:15px 0;
    border-top:1px solid rgba(255,255,255,.1);
   }
   #${PANEL_ID} .ve12-head{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
   }
   #${PANEL_ID} .ve12-progress{
    height:6px;
    border-radius:10px;
    background:rgba(255,255,255,.12);
    overflow:hidden;
    margin:10px 0;
   }
   #${PANEL_ID} .ve12-fill{
    height:100%;
    background:linear-gradient(90deg,#8b5cf6,#c4b5fd);
   }
   #${PANEL_ID} .ve12-btn{
    border:0;
    border-radius:8px;
    padding:8px 13px;
    font-weight:700;
    background:#c4b5fd;
    color:#241638;
    cursor:pointer;
   }
   #${PANEL_ID} .ve12-btn:disabled{
    opacity:.4;
    cursor:default;
   }
   #${PANEL_ID} .ve12-banner{
    padding:15px;
    border-radius:12px;
    background:rgba(167,139,250,.12);
    margin:15px 0;
   }
  `;
  document.head.appendChild(s);
 }

 function create(){
  if(document.getElementById(PANEL_ID))return;

  const profile=document.getElementById("profileView");
  if(!profile)return;

  const panel=document.createElement("section");
  panel.id=PANEL_ID;

  panel.innerHTML=`
   <div style="font-size:20px;font-weight:900">
    ✦ ÉVEIL DES RELIQUES
   </div>
   <div class="ve12-muted" style="margin-top:5px">
    ÉVÉNEMENT SPÉCIAL · ÉDITION 01
   </div>
   <div id="ve12Countdown" class="ve12-banner"></div>
   <div id="ve12Objectives"></div>
   <div id="ve12Exclusive"></div>
  `;

  const profileCard=document.getElementById("vaultPlayerProfile");

  if(profileCard && profileCard.parentElement===profile){
   profileCard.insertAdjacentElement("afterend",panel);
  }else{
   profile.prepend(panel);
  }

  panel.addEventListener("click",function(event){
   const btn=event.target.closest("[data-ve12]");
   if(!btn)return;

   const id=btn.dataset.ve12;
   const obj=OBJECTIVES.find(x=>x.id===id);
   if(!obj)return;

   if(expired())return;

   const e=state.vaultEvent12;
   if(e.claimed.includes(id))return;
   if(progress(obj)<obj.target)return;

   e.claimed.push(id);
   state.xp=(Number(state.xp)||0)+obj.reward;

   if(id==="final"){
    e.completed=true;
    e.exclusiveRelic="🌌";
   }

   saveState();
   render();
  });
 }

 function update(){
  init();
  create();

  const panel=document.getElementById(PANEL_ID);
  if(!panel)return;

  const countdown=document.getElementById("ve12Countdown");
  const list=document.getElementById("ve12Objectives");
  const exclusive=document.getElementById("ve12Exclusive");

  if(expired()){
   countdown.innerHTML="<strong>⏳ Événement terminé</strong><br><span class='ve12-muted'>L'Éveil des reliques est clos.</span>";
  }else{
   const remaining=state.vaultEvent12.start+EVENT_DURATION-Date.now();
   const days=Math.floor(remaining/86400000);
   const hours=Math.floor((remaining%86400000)/3600000);
   const mins=Math.floor((remaining%3600000)/60000);

   countdown.innerHTML=
    "<strong>⏳ Temps restant</strong><br>"+
    days+" j · "+hours+" h · "+mins+" min";
  }

  list.innerHTML=OBJECTIVES.map(m=>{
   const p=progress(m);
   const done=p>=m.target;
   const claimed=state.vaultEvent12.claimed.includes(m.id);
   const pct=Math.min(100,p/m.target*100);

   let label="En cours";
   if(claimed)label="Réclamé ✓";
   else if(done)label="Réclamer";

   return `
    <div class="ve12-objective">
     <div class="ve12-head">
      <div>
       <strong>${m.icon} ${m.name}</strong>
       <div class="ve12-muted">${m.desc}</div>
      </div>
      <strong>+${m.reward} XP</strong>
     </div>
     <div class="ve12-progress">
      <div class="ve12-fill" style="width:${pct}%"></div>
     </div>
     <div class="ve12-head">
      <span class="ve12-muted">${Math.min(p,m.target)} / ${m.target}</span>
      <button class="ve12-btn"
       data-ve12="${m.id}"
       ${(!done||claimed||expired())?"disabled":""}>
       ${label}
      </button>
     </div>
    </div>
   `;
  }).join("");

  exclusive.innerHTML=state.vaultEvent12.completed?`
   <div class="ve12-banner">
    <div style="font-size:22px">🌌</div>
    <strong>Relique exclusive obtenue</strong>
    <div class="ve12-muted">Le Sceau de l'Éveil — Édition 01</div>
   </div>
  `:`
   <div class="ve12-banner">
    <strong>🌌 Récompense ultime</strong>
    <div class="ve12-muted">
     Terminez l'objectif final pour obtenir le Sceau de l'Éveil.
    </div>
   </div>
  `;
 }

 styles();
 init();

 if(typeof render==="function"){
  const previousRender=render;

  render=function(){
   previousRender();
   update();
  };

  render();
 }
})();
