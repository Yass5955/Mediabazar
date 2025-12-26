<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Bibliothèque de cours</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    :root {
      --primary:#4f46e5;--secondary:#1e293b;--bg:#f8fafc;--card:#fff;--text:#0f172a
    }
    *{box-sizing:border-box}
    body{margin:0;font-family:Segoe UI,system-ui;background:var(--bg);color:var(--text)}
    header{background:linear-gradient(135deg,var(--primary),#6366f1);color:#fff;padding:30px;text-align:center}
    nav{display:flex;justify-content:center;gap:10px;padding:15px;background:var(--secondary);flex-wrap:wrap}
    nav button{background:transparent;border:none;color:#fff;padding:10px 18px;border-radius:8px;cursor:pointer}
    nav button.active,nav button:hover{background:#fff;color:var(--secondary)}
    .container{max-width:1200px;margin:auto;padding:25px}

    /* LOGIN */
    .login-box{max-width:400px;margin:40px auto;background:#fff;padding:25px;border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,.1)}
    .login-box input,.login-box button{width:100%;padding:12px;margin-bottom:12px;border-radius:6px;border:1px solid #c7d2fe}
    .login-box button{background:var(--primary);color:#fff;border:none;cursor:pointer}

    /* ADMIN */
    .admin-panel{display:none;background:#eef2ff;border-radius:12px;padding:20px;margin-bottom:30px}
    .admin-panel input,.admin-panel select,.admin-panel button{width:100%;padding:10px;margin-bottom:10px;border-radius:6px;border:1px solid #c7d2fe}
    .admin-panel button{background:var(--primary);color:#fff;border:none}

    /* CONTENT */
    .level{display:none}
    .level.active{display:block}
    .subject{background:var(--card);border-radius:12px;padding:20px;margin-bottom:20px;box-shadow:0 8px 20px rgba(0,0,0,.05)}
    .subject h3{margin:0;cursor:pointer;display:flex;justify-content:space-between}
    .pdf-list{list-style:none;padding:0;margin-top:15px;display:none}
    .pdf-list.show{display:block}
    .pdf-list li{display:flex;justify-content:space-between;margin-bottom:8px}
    .pdf-list button{background:red;color:#fff;border:none;border-radius:4px;cursor:pointer;padding:4px 8px}

    footer{text-align:center;padding:20px;color:#64748b}
  </style>
</head>
<body>

<header>
  <h1>Bibliothèque de cours</h1>
  <p>Accès élève & administrateur</p>
</header>

<nav>
  <button class="active" onclick="showLevel('seconde',this)">Seconde</button>
  <button onclick="showLevel('premiere',this)">Première</button>
  <button onclick="showLevel('terminale',this)">Terminale</button>
  <button onclick="toggleLogin()">Admin</button>
</nav>

<div class="container">

<!-- LOGIN -->
<div id="loginBox" class="login-box" style="display:none">
  <h2>Connexion admin</h2>
  <input type="text" id="login" placeholder="Identifiant">
  <input type="password" id="password" placeholder="Mot de passe">
  <button onclick="loginAdmin()">Se connecter</button>
</div>

<!-- ADMIN PANEL -->
<div id="adminPanel" class="admin-panel">
  <h2>Gestion des cours</h2>
  <select id="levelSelect"><option value="seconde">Seconde</option><option value="premiere">Première</option><option value="terminale">Terminale</option></select>
  <select id="subjectSelect"></select>
  <input type="text" id="titleInput" placeholder="Titre du cours">
  <input type="file" id="fileInput" accept="application/pdf">
  <button onclick="addCourse()">Ajouter le cours</button>
</div>

<!-- CONTENT -->
<div id="seconde" class="level active"></div>
<div id="premiere" class="level"></div>
<div id="terminale" class="level"></div>

</div>

<footer>© 2025 – Plateforme scolaire</footer>

<script>
  const ADMIN_LOGIN="admin";
  const ADMIN_PASS="1234";
  let isAdmin=false;

  const subjects={
    seconde:["Mathématiques","Français","Histoire-Géo","Physique-Chimie","SVT","SES","SNT"],
    premiere:["Mathématiques","Français","Histoire-Géo","Physique-Chimie","SVT","SES"],
    terminale:["Mathématiques","Philosophie","Histoire-Géo","Physique-Chimie","SVT","SES"]
  };

  function init(){
    for(const level in subjects){
      const div=document.getElementById(level);
      subjects[level].forEach(s=>{
        div.innerHTML+=`<div class="subject" data-subject="${s}"><h3 onclick="togglePDF(this)">${s} <span>▼</span></h3><ul class="pdf-list"></ul></div>`
      })
    }
    updateSubjects();
  }

  function showLevel(id,btn){
    document.querySelectorAll('.level').forEach(l=>l.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    updateSubjects();
  }

  function togglePDF(el){el.nextElementSibling.classList.toggle('show')}

  function toggleLogin(){
    document.getElementById('loginBox').style.display='block'
  }

  function loginAdmin(){
    if(login.value===ADMIN_LOGIN && password.value===ADMIN_PASS){
      isAdmin=true;
      loginBox.style.display='none';
      adminPanel.style.display='block';
      alert('Mode administrateur activé');
    } else alert('Identifiants incorrects')
  }

  function updateSubjects(){
    const level=levelSelect.value;
    subjectSelect.innerHTML='';
    subjects[level].forEach(s=>subjectSelect.innerHTML+=`<option>${s}</option>`)
  }

  function addCourse(){
    if(!isAdmin)return;
    const level=levelSelect.value;
    const subject=subjectSelect.value;
    const title=titleInput.value;
    const file=fileInput.files[0];
    if(!title||!file)return alert('Champs manquants');
    const url=URL.createObjectURL(file);
    const div=[...document.querySelectorAll(`#${level} .subject`)].find(d=>d.dataset.subject===subject);
    const li=document.createElement('li');
    li.innerHTML=`<a href="${url}" target="_blank">${title}</a> <button onclick="this.parentElement.remove()">X</button>`;
    div.querySelector('.pdf-list').appendChild(li);
    div.querySelector('.pdf-list').classList.add('show');
  }

  init();
</script>

</body>
</html>
