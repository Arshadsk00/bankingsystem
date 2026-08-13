import { useState ,useEffect} from "react";
import { askAI } from "../services/openrouter";
import "../css/ChatBot.css";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
 const [loading,setLoading]=useState(false);

 const handleSend = async () => {
  if (!message.trim() || loading) return;

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

  // Show typing/loading
  setLoading(true);

  try {
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
  } catch (error) {
    console.error("AI Error:", error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "Sorry, I'm unable to respond right now. Please try again.",
      },
    ]);
  } finally {
    // Stop typing/loading
    setLoading(false);
  }
};
 // ==========================================
  // OPEN CHAT FROM SETTINGS
  // ==========================================

  useEffect(() => {

    const openChat = () => {
      setOpen(true);
    };

    window.addEventListener(
      "open-safe-bank-ai",
      openChat
    );

    return () => {

      window.removeEventListener(
        "open-safe-bank-ai",
        openChat
      );

    };

  }, []);

 

  

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
      className={`chat-message ${msg.role}`}
    >
      {msg.text}
    </div>
  ))}

  {/* AI TYPING INDICATOR */}
  {loading && (
    <div className="chat-message assistant typing-message">

      <div className="typing-avatar">
        🤖
      </div>

      <div className="typing-content">

        <span>Typing</span>

{/* SAFE BANK AI is typing */}
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

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

            <button 
            type="submit" onClick={handleSend}>
              ➤
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;