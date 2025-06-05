function resolvePath(section) {
    const mappings = {
        'home': 'pages/home.html',
        'apropos': 'pages/apropos.html',
        'corps': 'pages/corps.html',
        'base': 'pages/base-de-connaissance/base.html',
        'exchange': 'pages/base-de-connaissance/exchange.html',
        'projets': 'pages/projets/projets.html',
        'stormshield': 'pages/reseaux/stormshield.html',
        'supervision': 'pages/reseaux/supervision.html',
        'scripting': 'pages/scripting/scripting.html',
        'powershell': 'pages/scripting/powershell.html'
    };

    const homelabFiles = ['centreon_grafana', 'guacamole', 'homelab', 'proxmox', 'sauvegardes', 'serveur_mail', 'truenas', 'vpn_wireguard'];
    const scriptingFiles = ['audit_acces', 'copie_utilisateurs', 'creation_comptes', 'exports', 'gestion_droits', 'gestion_groupes', 'liste_groupes'];

    if (homelabFiles.includes(section)) {
        return `pages/projets/homelab/${section}.md`;
    } else if (scriptingFiles.includes(section)) {
        return `pages/scripting/${section}.md`;
    } else {
        return mappings[section] || '';
    }
}

function loadContent(section) {
    const path = resolvePath(section);

    if (path.endsWith('.md')) {
        fetch(path)
            .then(response => response.ok ? response.text() : Promise.reject())
            .then(markdown => {
                document.getElementById("content").innerHTML = marked.parse(markdown);
                addCopyButtons();
                if (section === 'projets') openSubmenu('projetsSubmenu');
            })
            .catch(() => {
                document.getElementById("content").innerHTML = "<h2>Erreur</h2><p>Impossible de charger le fichier Markdown.</p>";
            });
    } else if (path.endsWith('.html')) {
        fetch(path)
            .then(response => response.ok ? response.text() : Promise.reject())
            .then(html => {
                document.getElementById("content").innerHTML = html;
                addCopyButtons();
                if (section === 'projets') openSubmenu('projetsSubmenu');
            })
            .catch(() => {
                document.getElementById("content").innerHTML = "<h2>Erreur</h2><p>Impossible de charger le fichier HTML.</p>";
            });
    } else {
        document.getElementById("content").innerHTML = "<h2>Erreur</h2><p>Contenu non trouvé.</p>";
    }
}

function addCopyButtons() {
    document.querySelectorAll('pre').forEach((pre) => {
        if (pre.querySelector('.copy-btn')) return;
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerText = 'Copier';
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(pre.innerText);
            button.innerText = 'Copié !';
            setTimeout(() => button.innerText = 'Copier', 2000);
        });
        pre.appendChild(button);
    });
}

function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    const chevron = document.getElementById(`chevron-${id.replace('Submenu','')}`);
    
    if (submenu.style.display === 'none') {
        submenu.style.display = 'block';
        if (chevron) chevron.style.transform = 'rotate(90deg)';
    } else {
        submenu.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
}

function openSubmenu(id) {
    const submenu = document.getElementById(id);
    const chevron = document.getElementById(`chevron-${id.replace('Submenu','')}`);
    
    if (submenu) submenu.style.display = 'block';
    if (chevron) chevron.style.transform = 'rotate(90deg)';
}

// Gestion du toggle des blocs compétences dans la page "à propos"
function toggleProjects(id) {
    const el = document.getElementById(id);
    el.classList.toggle('open');
}

window.onload = () => loadContent('home');