// AFFICHER LES PAGES

fetch('home.html')
.then(response => response.text())
.then(data => {
    document.getElementById('main_content').innerHTML = data;
})
.catch(error => console.error('Erreur lors du chargement du contenu:', error));

fetch('about_me.html')
.then(response => response.text())
.then(data => {
    document.getElementById('about_content').innerHTML = data;
})
.catch(error => console.error('Erreur lors du chargement du contenu:', error));

fetch('projects.html')
.then(response => response.text())
.then(data => {
    document.getElementById('projects_content').innerHTML = data;
})
.catch(error => console.error('Erreur lors du chargement du contenu:', error));

fetch('skills.html')
.then(response => response.text())
.then(data => {
    document.getElementById('skills_content').innerHTML = data;
})
.catch(error => console.error('Erreur lors du chargement du contenu:', error));

fetch('experience.html')
.then(response => response.text())
.then(data => {
    document.getElementById('experience_content').innerHTML = data;
})
.catch(error => console.error('Erreur lors du chargement du contenu:', error));

// Extention de hr

// Observer les mutations du DOM
const observer = new MutationObserver((mutationsList, observer) => {
    const hrElement = document.getElementById('animated-hr');
    if (hrElement) {
        setTimeout(() => {
            hrElement.classList.add('expand');
        }, 500); // Ajoute un délai avant de déclencher l'animation (1s ici)
        observer.disconnect(); // Arrêter d'observer une fois que l'élément est trouvé
    }
});

// Démarrer l'observation sur le document entier
observer.observe(document.body, { childList: true, subtree: true });

// ANNIMATION TRIANGLES (FOND PAGE PRINCIPALE)
window.onload = () => {
    const triangles = document.querySelectorAll('.triangle');
    const container = document.getElementById('about_content');

    if (container) {
        let lastMouseX = 0;
        let lastMouseY = 0;
        let mouseSpeedX = 0;
        let mouseSpeedY = 0;
        let mouseMoving = false;
        let mouseMoveTimeout;
        let firstMove = false; // Flag pour éviter le premier calcul de mouvement

        // Initialiser les coordonnées de la souris
        window.addEventListener('mousemove', (event) => {
            if (!firstMove) {
                // Ne fait rien sur le premier mouvement pour éviter la téléportation
                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
                firstMove = true; // Active les mouvements suivants
                return;
            }

            const deltaX = event.clientX - lastMouseX;
            const deltaY = event.clientY - lastMouseY;

            mouseSpeedX = deltaX * 0.05;
            mouseSpeedY = deltaY * 0.05;

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;

            mouseMoving = true;

            clearTimeout(mouseMoveTimeout);
            mouseMoveTimeout = setTimeout(() => {
                mouseMoving = false;
            }, 100);
        });

        triangles.forEach((triangle, index) => {
            const radius = 100 + index * 20;
            const baseSpeed = 0.01 + (index * 0.002);
            const direction = index % 2 === 0 ? 1 : -1; // Alterne entre +1 et -1 en fonction de l'index
            let angle = index * Math.PI / 4; // Définir un angle initial basé sur l'index, ici 45° entre chaque triangle

            // Enregistrer la position initiale du triangle
            const initialTop = parseFloat(getComputedStyle(triangle).top);
            const initialLeft = parseFloat(getComputedStyle(triangle).left);

            function animate() {
                if (mouseMoving) {
                    angle += (mouseSpeedX + mouseSpeedY) * 0.05 * direction;

                    // Calculer la nouvelle position en restant dans les limites du conteneur
                    const x = Math.max(0, Math.min(container.offsetWidth - 40, initialLeft + (radius * Math.cos(angle)) + mouseSpeedX));
                    const y = Math.max(0, Math.min(container.offsetHeight - 40, initialTop + (radius * Math.sin(angle)) + mouseSpeedY));

                    // Appliquer la transformation avec les limites du conteneur
                    triangle.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;

                    // Assurer que les triangles ne se superposent pas avec les autres éléments
                    triangle.style.zIndex = '1'; // Garde les triangles sous les autres éléments
                }

                requestAnimationFrame(animate);
            }

            animate();
        });
    } else {
        console.error("Le conteneur 'about_content' n'existe pas.");
    }
};


// SCRAWL VERS LES SECTIONS

document.addEventListener('DOMContentLoaded', () => {
    const navbarLinks = document.querySelectorAll('.navbar a');

    navbarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le comportement par défaut du lien

            const targetId = link.getAttribute('href').substring(1); // Récupère l'ID de la section cible
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth' // Défilement fluide
                });
            }
        });
    });
});


// ANNIMATION CARTES

// Fonction pour vérifier si une carte est visible à l'écran
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
    );
}

// Ajouter la classe pour l'animation si dans la zone visible
function animateCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        if (isInViewport(card)) {
            card.style.transform = 'scale(1)';
        } else {
            card.style.transform = 'scale(0)';
        }
    });
}

// Exécuter l'animation lors du défilement
window.addEventListener('scroll', animateCards);

// Exécuter une fois au chargement de la page
window.addEventListener('load', animateCards);
