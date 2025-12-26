const ADMIN_LOGIN="admin";
const ADMIN_PASS="1234";
let isAdmin=false;

const defaultData={
  seconde:{Mathématiques:{},Français:{},"Histoire-Géo":{},"Physique-Chimie":{},SVT:{},SES:{},SNT:{}},
  premiere:{Mathématiques:{},Français:{},"Histoire-Géo":{},"Physique-Chimie":{},SVT:{},SES:{}},
  terminale:{Mathématiques:{},Philosophie:{},"Histoire-Géo":{},"Physique-Chimie":{},SVT:{},SES:{}}
};

let data=JSON.parse(localStorage.getItem('coursData'))||defaultData;

function save(){
  localStorage.setItem('coursData',JSON.stringify(data));
}

function render(){
  ['seconde','premiere','terminale'].forEach(level=>{
    const container=document.getElementById(level);
    container.innerHTML='';
    for(const subject in data[level]){
      const sDiv=document.createElement('div');
      sDiv.className='subject';
      sDiv.innerHTML=`<h3>${subject}</h3>`;
      for(const chap in data[level][subject]){
        const cDiv=document.createElement('div');
        cDiv.className='chapter';
        cDiv.innerHTML=`<h4>${chap}</h4>`;
        for(const sub in data[level][subject][chap]){
          const sc=document.createElement('div');
          sc.className='subchapter';
          sc.innerHTML=`<a href='${data[level][subject][chap][sub]}' target='_blank'>${sub}</a>${isAdmin?` <button onclick=\"deleteSub('${level}','${subject}','${chap}','${sub}')\">X</button>`:''}`;
          cDiv.appendChild(sc);
        }
        sDiv.appendChild(cDiv);
      }
      container.appendChild(sDiv);
    }
  });
}

function showLevel(id,btn){
  document.querySelectorAll('.level').forEach(l=>l.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function toggleLogin(){loginBox.style.display='block'}

function loginAdmin(){
  if(login.value===ADMIN_LOGIN && password.value===ADMIN_PASS){
    isAdmin=true;
    loginBox.style.display='none';
    adminPanel.style.display='block';
    initAdmin();
    render();
  } else alert('Identifiants incorrects');
}

function initAdmin(){
  levelSelect.innerHTML='';
  Object.keys(data).forEach(l=>levelSelect.innerHTML+=`<option value='${l}'>${l}</option>`);
  updateSubjects();
  levelSelect.onchange=updateSubjects;
}

function updateSubjects(){
  subjectSelect.innerHTML='';
  Object.keys(data[levelSelect.value]).forEach(s=>subjectSelect.innerHTML+=`<option>${s}</option>`);
}

function addSubChapter(){
  const l=levelSelect.value;
  const s=subjectSelect.value;
  const c=chapterInput.value.trim();
  const sc=subchapterInput.value.trim();
  const f=fileInput.files[0];
  if(!c||!sc||!f) return alert('Champs manquants');
  const url=URL.createObjectURL(f);
  if(!data[l][s][c]) data[l][s][c]={};
  data[l][s][c][sc]=url;
  save();
  render();
  chapterInput.value=subchapterInput.value=fileInput.value='';
}

function deleteSub(l,s,c,sc){
  delete data[l][s][c][sc];
  if(Object.keys(data[l][s][c]).length===0) delete data[l][s][c];
  save();
  render();
}

render();
