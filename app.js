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
