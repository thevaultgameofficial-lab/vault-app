
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

function freshState(){return {xp:0,completedDays:[],unlocked:['coin'],language:'en'};}
function loadState(){try{return {...freshState(),...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}}catch{return freshState()}}
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
 state.xp+=50;
 state.completedDays.push(todayKey());
 ARTIFACTS.forEach(a=>{
  if(state.xp>=a.xp&&!state.unlocked.includes(a.id))state.unlocked.push(a.id)
 });
 saveState();
 render();
 showToast(level()>oldLevel?t('levelUp'):t('correct'));
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
  if(!panel||document.getElementById("vaultChallengeLibrary"))return;

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
   :"+50 XP · "+(language==="fr"?"Une seule validation par jour":"One completion per day");

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
  state.xp+=50;
  state.completedDays.push(todayKey());

  ARTIFACTS.forEach(artifact=>{
   if(state.xp>=artifact.xp&&!state.unlocked.includes(artifact.id)){
    state.unlocked.push(artifact.id)
   }
  });

  saveState();
  selectedAnswer=null;
  render();
  showToast(level()>oldLevel?t("levelUp"):t("correct"))
 };

 addLibraryStyles();
 createLibraryUI();

 const previousRender=render;
 render=function(){
  previousRender();
  renderChallenge();
  updateLibraryLanguage()
 };

 render();
})();
