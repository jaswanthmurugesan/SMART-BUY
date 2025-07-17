import React, { useState } from 'react';
import '../styles/Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    // Here you would call your AI/sentiment API and add the bot response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'This is a sample AI response.' }]);
    }, 800);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-msg chatbot-msg-${msg.from}`}>{msg.text}</div>
        ))}
      </div>
      <div className="chatbot-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
