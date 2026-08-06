import { useState } from "react";
import { askAI } from "../services/openrouter";
import "../css/ChatBot.css";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
 const [loading,setLoading]=useState(false);

 const handleSend = async () => {
  if (!message.trim()) return;

  const userMessage = message;

  // Show user's message
  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: userMessage,
    },
  ]);

  // Clear input
  setMessage("");

  // Ask AI
  const result = await askAI(userMessage);

  // Show AI reply
  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      text: result,
    },
  ]);
};

  

const [messages, setMessages] = useState([
  {
    role: "assistant",
    text: "Hello! I'm SAFE BANK AI. Ask me anything about the SAFE BANK project."
  }
]);

  

  return (
    <>
      {/* Floating Button */}
      <button
        className="chat-icon"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chat-window">

          <div className="chat-header">

    <div className="chat-left">

        <div className="bot-avatar">
            🤖
        </div>

        <div className="chat-title">
            <h3>SAFE BANK AI</h3>
            <p>Online • Banking Assistant</p>
        </div>

    </div>

    <div
        className="chat-close"
        onClick={() => setOpen(false)}
    >
        ✕
    </div>

</div>


          <div className="chat-suggestions">

<button onClick={()=>setMessage("How do I create an account?")}>
Create Account
</button>

<button onClick={()=>setMessage("How can I deposit money?")}>
Deposit
</button>

<button onClick={()=>setMessage("How do I send money?")}>
Send Money
</button>

<button onClick={()=>setMessage("How do I edit my profile?")}>
Profile
</button>

</div>

          <div className="chat-body">
            {messages.map((msg, index) => (

  <div
    key={index}
    className={
      msg.role === "user"
        ? "user-message"
        : "ai-message"
    }
  >
    {msg.text}
  </div>

))}
{loading && (
<div className="typing">
<span></span>
<span></span>
<span></span>
</div>
)}
           
          </div>

          <div className="chat-footer">

            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={handleSend}>
              ➤
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;