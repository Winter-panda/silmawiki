const BASE_PATH = window.location.hostname === 'winter-panda.github.io' ? '/silmawiki/' : '/';

function resolvePath(section) {
    const mappings = {
        'home': `${BASE_PATH}pages/home.html`,
        'apropos': `${BASE_PATH}pages/apropos.html`,
        'corps': `${BASE_PATH}pages/corps.html`,
        'base': `${BASE_PATH}pages/Base%20de%20connaissance/base.html`,
        'exchange': `${BASE_PATH}pages/Base%20de%20connaissance/exchange.html`,
        'projets': `${BASE_PATH}pages/Projets/projets.html`,
        'stormshield': `${BASE_PATH}pages/Reseaux/stormshield.html`,
        'supervision': `${BASE_PATH}pages/Reseaux/supervision.html`,
        'scripting': `${BASE_PATH}pages/scripting/scripting.html`,
        'powershell': `${BASE_PATH}pages/scripting/powershell.html`,
        'bases-powershell': `${BASE_PATH}pages/Base%20de%20connaissance/bases-powershell.md`,
        'bases-active-directory': `${BASE_PATH}pages/Base%20de%20connaissance/bases-active-directory.md`,
        'bases-reseau': `${BASE_PATH}pages/Base%20de%20connaissance/bases-reseau.md`,
        'bases-vmware': `${BASE_PATH}pages/Base%20de%20connaissance/bases-vmware.md`,
        'bases-securite': `${BASE_PATH}pages/Base%20de%20connaissance/bases-securite.md`,

    };

    const homelabFiles = ['centreon_grafana', 'guacamole', 'homelab', 'proxmox', 'sauvegardes', 'serveur_mail', 'truenas', 'vpn_wireguard'];
    const scriptingFiles = ['audit_acces', 'copie_utilisateurs', 'creation_comptes', 'exports', 'gestion_droits', 'gestion_groupes', 'liste_groupes'];

    if (homelabFiles.includes(section)) {
        return `${BASE_PATH}pages/Projets/homelab/${section}.md`;
    } else if (scriptingFiles.includes(section)) {
        return `${BASE_PATH}pages/scripting/${section}.md`;
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
        document.getElementById("content").innerHTML = "<h2>Erreur</h2><p>Contenu non trouvé.</p>"
    }
}

function addCopyButtons() {
    document.querySelectorAll('pre').forEach((pre) => {
        // Ne pas dupliquer les boutons
        if (pre.nextElementSibling && pre.nextElementSibling.classList.contains('copy-btn')) return;

        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerText = 'Copier';
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(pre.innerText);
            button.innerText = 'Copié !';
            setTimeout(() => button.innerText = 'Copier', 2000);
        });

        // On insère le bouton juste après le bloc <pre>
        pre.insertAdjacentElement('afterend', button);
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

// Gestion des compétences "A propos"
function toggleProjects(id) {
    const el = document.getElementById(id);
    el.classList.toggle('open');
}

window.onload = () => loadContent('home');
