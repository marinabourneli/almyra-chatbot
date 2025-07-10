document.getElementById('chat-toggle').onclick = () => {
  document.getElementById('chat-container').classList.toggle('hidden');
};

document.getElementById('send-btn').onclick = sendMessage;
document.getElementById('chat-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  addMessage('user', msg);
  input.value = '';
  setTimeout(() => generateBotReply(msg), 500);
}

function addMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add(`${sender}-message`);
  msgDiv.textContent = text;
  const chatBox = document.getElementById('chat-box');
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateBotReply(userText) {
  const lower = userText.toLowerCase();

  const responses = [
    {
      keywords: ['check-in', 'check out', 'check-out'],
      reply: "Check-in starts at 15:00. Check-out is at 11:00."
    },
    {
      keywords: ['late check', 'late checkout'],
      reply: "Late checkout until 7:00 PM costs €60. Full-day until the evening costs €120."
    },
    {
      keywords: ['all inclusive', 'bracelet', 'wristband'],
      reply: "Keeping your all-inclusive bracelet after 11:00 AM costs an extra €50."
    },
    {
      keywords: ['restaurant', 'food', 'eat', 'dinner', 'lunch'],
      reply: "You can try 'Gorgona', 'Vira Potzi', 'Signorino' or 'Kale'. For ice cream: 'Chocolicious'."
    },
    {
      keywords: ['activities', 'kids', 'children', 'games', 'fun'],
      reply: "We have a kids’ pool shaped like an octopus 🐙, mini football fields, and an indoor playroom with trained staff."
    },
    {
      keywords: ['pool', 'swimming'],
      reply: "Our main pool has a small waterslide and there’s a dedicated kids' pool as well!"
    },
    {
      keywords: ['beach'],
      reply: "The beach is just 3 minutes away. It’s Blue Flag certified and has free sunbeds for guests."
    },
    {
      keywords: ['spa'],
      reply: "You can enjoy massages, facials, and relaxing treatments at our spa. Ask at the front desk or type 'book spa'."
    },
    {
      keywords: ['feedback', 'complaint', 'cleaning'],
      reply: "We’re sorry to hear that. Would you like us to notify housekeeping or management?"
    }
  ];

  // Find matching response
  const found = responses.find(r =>
    r.keywords.some(keyword => lower.includes(keyword))
  );

  const reply = found ? found.reply : "I’m here to help! Try asking about check-in, spa, food, activities, etc.";
  addMessage('bot', reply);
}

