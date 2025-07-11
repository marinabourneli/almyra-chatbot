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
      keywords: ['seafood', 'fish'],
      reply: "For seafood, definitely try 'Gorgona' and 'Vira Potzi' — fresh, local, and right by the port."
    },
    {
      keywords: ['cocktail', 'drinks', 'bar'],
      reply: "For great cocktails and bites, check out 'Kale'. It’s a favorite hangout spot."
    },
    {
      keywords: ['italian', 'pizza', 'pasta'],
      reply: "'Signorino' is perfect for authentic Italian cuisine — especially their wood-fired pizza."
    },
    {
      keywords: ['dessert', 'ice cream', 'sweet'],
      reply: "For dessert or something sweet, try 'Chocolicious' – homemade ice cream and treats 🍨."
    },
    {
      keywords: ['meze', 'traditional', 'greek food'],
      reply: "For meze and wine by the sea, locals love 'Koumpares' and 'Kokos'."
    },
    // word matching for general food
    {
      keywords: ['food', 'restaurant', 'eat', 'dinner', 'lunch'],
      reply:
        "Here are top dining options:\n• Seafood: Gorgona & Vira Potzi\n• Cocktails & bites: Kale\n• Italian: Signorino\n• Meze & wine: Koumpares & Kokos\n• Budget pizza: Il Gusto (1+1 Margarita offers)\n\nCraving sweets? Chocolicious or Papadaki’s. For burgers/mix‑grill: Massati."
    },
    {
      keywords: ['baklava', 'baclava', 'galaktoboureko', 'kalitsouni', 'sweet hall', 'papadakis'],
      reply: "Craving traditional sweets like baklava or galaktoboureko? Head to Papadakis Sweet Hall 🍰."
    },
    {
      keywords: ['burger', 'burgers', 'fast food', 'street food'],
      reply: "For burgers and street food, there are many local spots nearby — just ask for today's best option!"
    },
    {
      keywords: ['burger', 'burgers', 'massati'],
      reply: "For burgers and mix-grill, check out 'Massati' – great flavors & atmosphere."  /* :contentReference[oaicite:1]{index=1} */
    },
    {
      keywords: ['pizza', 'il gusto'],
      reply: "On a budget? 'Il Gusto' pizzeria offers 1+1 margarita pizza deals and tasty options!"  /* :contentReference[oaicite:2]{index=2} */
    },
    {
      keywords: ['coffee', 'cafe', 'kermen', 'wikiki', 'boheme', 'casablanca', 'brunch'],
      reply: "Good choice! For coffee or brunch, guests often enjoy:\n" +
             "• Kermen – cozy spot with great breakfast\n" +
             "• WiKiKi – relaxed café atmosphere\n" +
             "• Boheme – stylish place for a morning treat\n" +
             "• Casablanca – branch café good for breakfast & drinks"
    },
     {
      keywords: ['cocktail', 'caravan', 'afro music', 'english music'],
      reply: "Looking for an early‑evening cocktail with English/Afro tunes? Try 'Caravan' – perfect vibes!"
    },
    // βραδινό ποτό
    {
      keywords: ['saxo', 'soxo', 'bar', 'nightlife'],
      reply: "For a proper night‑out drink:\n• Saxo Bar — lively atmosphere\n• Soxo — great cocktails, fun vibe!"
    },
    // Χρυσή το νησί
    {
      keywords: ['chrisi', 'chrysi', 'island', 'boat', 'beach trip'],
      reply: "Fancy a day‑trip? Chrisi Island is a stunning tiny island with turquoise waters — boats run daily from the port in the morning until afternoon."
    },
    {
      keywords: ['computer', 'internet', 'gaming', 'gspot', 'board games', 'playstation'],
      reply: "'GSpot' offers computers, PlayStations, and board games — great for kids or teens on a break! 🎮"
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

  const found = responses.find(r =>
    r.keywords.some(keyword => lower.includes(keyword))
  );

  const reply = found
    ? found.reply
    : "I’m here to help! Try asking about check-in, food, activities, spa, or the beach.";

  addMessage('bot', reply);
}