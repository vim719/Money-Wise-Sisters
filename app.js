const ritualData = {
    Monday: { title: "The $5 Monday", desc: "Small wins today. What's one tiny thing you skipped?", icon: "💰" },
    Wednesday: { title: "Skill-Swap Wednesday", desc: "Learn a new term in 2 minutes.", icon: "🤝" },
    Friday: { title: "Friday Story Circle", desc: "Sister Rosa shares her Medicare journey.", icon: "🔥" }
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    const ritual = ritualData[day] || ritualData['Monday'];
    
    document.getElementById('ritual-title').innerText = ritual.title;
    document.getElementById('ritual-desc').innerText = ritual.desc;
    document.getElementById('ritual-icon').innerText = ritual.icon;
});

function nextStep(feeling) {
    const quizArea = document.getElementById('onboarding');
    // Save feeling to state for personalization
    console.log(`User feels: ${feeling}`);
    
    // Transition to Dashboard
    quizArea.style.opacity = '0';
    setTimeout(() => {
        quizArea.style.display = 'none';
        triggerWelcome(feeling);
    }, 500);
}

function triggerWelcome(feeling) {
    let msg = feeling === 'anxious' ? "You're safe here. Let's take it slow." : "Love that energy! Let's dive in.";
    alert(msg); // Placeholder for a beautiful custom toast
}

// Ritual Content Repository
const weeklyRituals = {
    Monday: { title: "Monday Momentum", tag: "THE $5 WIN", desc: "What's one tiny coffee or treat you can 'skip' to pay yourself today?", icon: "🌱" },
    Wednesday: { title: "Wisdom Wednesday", tag: "SKILL SWAP", desc: "Learn how to read a bank statement in 60 seconds.", icon: "📚" },
    Friday: { title: "The Story Circle", tag: "FRIDAY RITUAL", desc: "Join Sister Margaret: 'How I spotted a phone scam.'", icon: "🕯️" }
};

// Onboarding Logic
function completeQuiz(feeling) {
    console.log("Member feels:", feeling);
    const overlay = document.getElementById('quiz-overlay');
    overlay.style.transition = "opacity 0.5s ease";
    overlay.style.opacity = "0";
    setTimeout(() => overlay.style.display = "none", 500);
}

// Ritual Engine
function initDashboard() {
    const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    const ritual = weeklyRituals[today] || weeklyRituals['Monday'];
    
    document.getElementById('ritual-title').innerText = ritual.title;
    document.getElementById('ritual-day-tag').innerText = ritual.tag;
    document.getElementById('ritual-description').innerText = ritual.desc;
    document.querySelector('.ritual-icon').innerText = ritual.icon;
}

function joinCircle() {
    alert("Connecting you to the Sisterhood live stream... Get your tea ready! ☕");
}

window.onload = initDashboard;

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
        body: "We found an error in your 2024 filing. Please text your PIN to this number to receive your $1,200 check.",
        type: "scam",
        explanation: "Red Flag! The IRS never initiates contact by text or email to ask for a PIN."
    }
];

let currentCardIndex = 0;

function playTurn(choice) {
    const card = scamDeck[currentCardIndex];
    const feedback = document.getElementById('game-feedback');
    const cardElement = document.getElementById('scam-card');
    
    if (choice === card.type) {
        feedback.style.color = "#1e8e3e";
        feedback.innerText = "⭐ Brilliant! " + card.explanation;
        cardElement.classList.add('correct-flash');
        updateSeeds(50); // Reward the user
    } else {
        feedback.style.color = "#d93025";
        feedback.innerText = "Wait! " + card.explanation;
        cardElement.classList.add('wrong-flash');
    }

    // Move to next card after 4 seconds
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

function updateSeeds(amount) {
    let currentSeeds = parseInt(document.getElementById('seed-total').innerText);
    document.getElementById('seed-total').innerText = currentSeeds + amount;
}

// Ensure the first card loads
window.onload = () => {
    initDashboard(); // from previous code
    renderCard();
};

function inviteSister() {
    const shareData = {
        title: 'Money Wise Sisters',
        text: "Hi! I joined this lovely group called Money Wise Sisters. It's a safe place to learn about money and protect ourselves from scams. I'd love for you to join me for the next 'Story Circle'! Here is the link:",
        url: window.location.href, // This automatically grabs your GitHub Pages link
    };

    // Check if the browser supports the native share menu (most mobile phones do)
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => {
                showToast("Invite sent! +100 Seeds 🌸");
                updateSeeds(100);
            })
            .catch((err) => console.log("Error sharing:", err));
    } else {
        // Fallback for desktop browsers
        alert("Copy this link to send to a friend: " + window.location.href);
    }
}

// Add a simple toast notification function if you don't have one
function showToast(message) {
    const toast = document.createElement("div");
    toast.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#4A306D; color:white; padding:15px 30px; border-radius:50px; z-index:2000; font-weight:bold;";
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

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

let currentVibeIndex = 0;
let scores = { squirrel: 0, gardener: 0, sage: 0 };

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
    
    // Find highest score
    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const res = results[winner];
    
    document.getElementById('result-icon').innerText = res.icon;
    document.getElementById('result-name').innerText = res.name;
    document.getElementById('result-desc').innerText = res.desc;
    
    updateSeeds(150); // Massive bonus for finishing!
}

function resetQuiz() {
    currentVibeIndex = 0;
    scores = { squirrel: 0, gardener: 0, sage: 0 };
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-intro').classList.remove('hidden');
}

