const buttons = document.querySelectorAll('.light-btn');

// Mapping : Couleur du bouton => Nom dans l'URL
const LED_MAPPING = {
    'red': 'led1',   // Rouge = led1
    'green': 'led2', // Vert = led2
    'blue': 'led3'   // Bleu = led3
};

// Ton IP Node-RED
const BASE_URL = 'http://172.16.15.34:1880/api'; 

buttons.forEach(button => {
    button.addEventListener('click', () => {
        
        // 1. On récupère la couleur
        const color = button.dataset.color;
        
        // 2. On bascule l'état visuel
        button.classList.toggle('active');
        
        // 3. On détermine si on allume ou on éteint
        const isOn = button.classList.contains('active');
        const stateString = isOn ? 'on' : 'off'; 
        
        // 4. Mise à jour du texte
        updateText(color, isOn);

        // 5. Envoi de la requête en GET
        sendSpecificUrlRequest(color, stateString);
    });
});

function updateText(color, isOn) {
    const textElement = document.getElementById('text-' + color);
    if (textElement) {
        if (isOn) {
            textElement.textContent = "Allumée 🔥";
            textElement.classList.add('active');
        } else {
            textElement.textContent = "Éteinte";
            textElement.classList.remove('active');
        }
    }
}

async function sendSpecificUrlRequest(color, state) {
    // On récupère le nom de la led (led1, led2...)
    const ledName = LED_MAPPING[color]; 

    // Construction de l'URL : http://172.16.15.34:1880/api/led1/on
    const FINAL_URL = `${BASE_URL}/${ledName}/${state}`;
    
    console.log("Appel de l'URL (GET) :", FINAL_URL);
    
    try {
        // --- MODIFICATION ICI : METHOD GET ---
        await fetch(FINAL_URL, {
            method: 'GET', 
            mode: 'no-cors' // Important pour éviter les blocages de sécurité
        });
        
        console.log("Envoyé avec succès !");
    } catch (error) {
        console.error("Erreur :", error);
    }
}