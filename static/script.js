// static/script.js
function typeText(element, text, speed = 7) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

async function sendMessage() {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();

    if (userMessage === '') return;

    // Display user message
    const userMessageElement = document.createElement('p');
    userMessageElement.className = 'user message';
    userMessageElement.innerText = userMessage;
    chatBox.appendChild(userMessageElement);

    userInput.value = '';

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;

    // Display typing indicator
    const botMessageElement = document.createElement('p');
    botMessageElement.className = 'bot message';
    chatBox.appendChild(botMessageElement);

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send the message to the backend
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    // Type out the bot response
    typeText(botMessageElement, data.reply);

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;
}
