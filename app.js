// 1. DATA REPOSITORY
const weeklyRituals = {
    Monday: { title: "Monday Momentum", tag: "THE $5 WIN", desc: "What's one tiny treat you can 'skip' to pay yourself today?", icon: "💰" },
    Wednesday: { title: "Wisdom Wednesday", tag: "SKILL SWAP", desc: "Learn how to read a bank statement in 60 seconds.", icon: "📚" },
    Friday: { title: "The Story Circle", tag: "FRIDAY RITUAL", desc: "Join Sister Margaret: 'How I spotted a phone scam.'", icon: "🕯️" }
};

const scamDeck = [
    {
        sender: "Service@PayPal-Security.net",
        body: "Urgent: Your payment of $499.00 to 'CryptoExchange' is pending. Click here to cancel.",
        type: "scam",
        explanation: "Red Flag! PayPal won't use a '.net' address or ask you to click a link for crypto."
    },
    {
        sender: "Sister Mary",
        body: "Hey! Are we still on for tea at 3 PM? I'll bring the lemon squares.",
        type: "safe",
        explanation: "This is safe! It's personal and mentions a specific detail only a friend would know."
    },
    {
        sender: "IRS-Tax-Refunds-Dept",
        body: "We found an error in your 2024 filing. Please text your PIN to this number to receive your check.",
        type: "scam",
        explanation: "Red Flag! The IRS never initiates contact by text or email to ask for a PIN."
    }
];

const vibeQuestions = [
    {
        q: "When you find an extra $20 in an old coat pocket, what do you do?",
        options: [
            { text: "Put it straight into the 'rainy day' jar.", type: "squirrel" },
            { text: "Buy a treat for a grandchild or friend.", type: "gardener" },
            { text: "Check my budget to see where it fits best.", type: "sage" }
        ]
    },
    {
        q: "How often do you check your bank balance?",
        options: [
            { text: "Every single morning without fail.", type: "squirrel" },
            { text: "Only when I'm at the store or paying a bill.", type: "gardener" },
            { text: "Once a week during my 'money hour'.", type: "sage" }
        ]
    }
];

const results = {
    squirrel: { name: "Saver Squirrel", icon: "🐿️", desc: "You are the master of the 'Nest Egg.' You find security in watching your savings grow!" },
    gardener: { name: "Giving Gardener", icon: "🌻", desc: "You see money as a tool to help others grow. You are the heart of your family!" },
    sage: { name: "Secure Sage", icon: "🦉", desc: "You are balanced and wise. You know exactly where every dollar goes and why." }
};

// 2. STATE MANAGEMENT
let currentCardIndex = 0;
let currentVibeIndex = 0;
let scores = { squirrel: 0, gardener: 0, sage: 0 };

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    renderCard();
});

function initDashboard() {
    const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    const ritual = weeklyRituals[today] || weeklyRituals['Monday'];
    
    document.getElementById('ritual-title').innerText = ritual.title;
    document.getElementById('ritual-day-tag').innerText = ritual.tag;
    document.getElementById('ritual-description').innerText = ritual.desc;
    document.querySelector('.ritual-icon').innerText = ritual.icon;
}

// 4. ONBOARDING
function completeQuiz(feeling) {
    const overlay = document.getElementById('quiz-overlay');
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    showToast(`Welcome, Sister! Let's grow together. ✨`);
    setTimeout(() => overlay.style.display = "none", 500);
}

// 5. SCAM GAME LOGIC (Sky Blue Theme Optimized)
function playTurn(choice) {
    const card = scamDeck[currentCardIndex];
    const feedback = document.getElementById('game-feedback');
    const cardElement = document.getElementById('scam-card');
    
    if (choice === card.type) {
        feedback.style.color = "#1E8E3E"; // Accessible Dark Green
        feedback.innerText = "⭐ Brilliant! " + card.explanation;
        cardElement.classList.add('correct-flash');
        updateSeeds(50);
    } else {
        feedback.style.color = "#D93025"; // Accessible Dark Red
        feedback.innerText = "Wait! " + card.explanation;
        cardElement.classList.add('wrong-flash');
    }
    
    setTimeout(() => {
        cardElement.classList.remove('correct-flash', 'wrong-flash');
        currentCardIndex = (currentCardIndex + 1) % scamDeck.length;
        renderCard();
        feedback.innerText = "";
    }, 4000);
}

function renderCard() {
    const card = scamDeck[currentCardIndex];
    document.getElementById('card-sender').innerText = `From: ${card.sender}`;
    document.getElementById('card-body').innerText = `"${card.body}"`;
}

// 6. VIBE QUIZ ENGINE
function startVibeQuiz() {
    document.getElementById('quiz-intro').classList.add('hidden');
    document.getElementById('quiz-question-container').classList.remove('hidden');
    showVibeQuestion();
}

function showVibeQuestion() {
    const q = vibeQuestions[currentVibeIndex];
    document.getElementById('vibe-q-text').innerText = q.q;
    const optionsDiv = document.getElementById('vibe-options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'vibe-btn';
        btn.innerText = opt.text;
        btn.onclick = () => selectVibeOption(opt.type);
        optionsDiv.appendChild(btn);
    });
}

function selectVibeOption(type) {
    scores[type]++;
    currentVibeIndex++;
    if (currentVibeIndex < vibeQuestions.length) {
        showVibeQuestion();
    } else {
        showVibeResult();
    }
}

function showVibeResult() {
    document.getElementById('quiz-question-container').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');
    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const res = results[winner];
    
    document.getElementById('result-icon').innerText = res.icon;
    document.getElementById('result-name').innerText = res.name;
    document.getElementById('result-desc').innerText = res.desc;
    updateSeeds(150);
}

// 7. UTILITIES
function updateSeeds(amount) {
    const seedEl = document.getElementById('seed-total');
    let currentSeeds = parseInt(seedEl.innerText);
    seedEl.innerText = currentSeeds + amount;
}

function showToast(message) {
    const toast = document.createElement("div");
    // Updated styling to match Sky Blue Garden theme
    toast.style.cssText = `
        position: fixed; 
        bottom: 30px; 
        left: 50%; 
        transform: translateX(-50%); 
        background: #1DA1F2; 
        color: white; 
        padding: 16px 32px; 
        border-radius: 50px; 
        z-index: 9999; 
        font-weight: bold; 
        box-shadow: 0 10px 25px rgba(29, 161, 242, 0.3);
        font-family: 'Fredoka', sans-serif;
        transition: opacity 0.5s ease;
    `;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function inviteSister() {
    const shareData = { title: 'Money Wise Sisters', text: "Join our safe circle! 🌸", url: window.location.href };
    if (navigator.share) {
        navigator.share(shareData).then(() => {
            showToast("Invite sent! +100 Seeds 🌸");
            updateSeeds(100);
        });
    } else {
        alert("Copy this link: " + window.location.href);
    }
}

function joinCircle() {
    showToast("Connecting you to the Sisterhood... ☕");
}
