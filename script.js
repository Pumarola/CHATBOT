const chatWindow = document.getElementById('chat-window');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.innerHTML = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
  const content = input.value.trim();
  if (!content) return;

  addMessage(content, 'user');
  input.value = '';

  try {
    const response = await fetch('chat.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content })
    });
    const data = await response.json();
    const reply = data.choices[0].message.content.trim();
    addMessage(reply, 'assistant');
  } catch (err) {
    addMessage('Error connecting to KOA.', 'assistant');
  }
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});
