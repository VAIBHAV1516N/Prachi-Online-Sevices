import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";

// ── Knowledge Base ────────────────────────────────────────────────────────────
const SERVICES_INFO = [
  {
    name: "Aadhar Card",
    price: 50,
    keywords: [
      "aadhar",
      "aadhaar",
      "uid",
      "biometric",
      "enrollment",
      "correction",
    ],
    desc: "New enrollment, address/biometric corrections & updates.",
  },
  {
    name: "PAN Card",
    price: 110,
    keywords: ["pan", "income tax", "tan"],
    desc: "Apply for new PAN or make name/DOB corrections.",
  },
  {
    name: "Ration Card",
    price: 30,
    keywords: ["ration", "bpl", "food", "antyodaya"],
    desc: "New ration card, member addition & family modifications.",
  },
  {
    name: "Bank Account Opening",
    price: 0,
    keywords: ["bank", "account", "jan dhan", "savings", "zero balance"],
    desc: "Zero-balance Jan Dhan & savings account opening. Free!",
  },
  {
    name: "PM Kisan",
    price: 0,
    keywords: ["pm kisan", "kisan", "farmer", "krishi", "agriculture"],
    desc: "PM Kisan Samman Nidhi Yojana registration. Free!",
  },
  {
    name: "PMJJBY Insurance",
    price: 20,
    keywords: ["insurance", "jeevan jyoti", "pmjjby", "life insurance", "bima"],
    desc: "Pradhan Mantri Jeevan Jyoti Bima Yojana enrollment.",
  },
  {
    name: "Income Certificate",
    price: 60,
    keywords: ["income", "income certificate", "salary certificate"],
    desc: "Application and processing of income certificates.",
  },
  {
    name: "Caste Certificate",
    price: 80,
    keywords: ["caste", "sc", "st", "obc", "nt", "category certificate"],
    desc: "SC/ST/OBC/NT caste certificate application.",
  },
  {
    name: "Domicile Certificate",
    price: 60,
    keywords: ["domicile", "residence", "rahivasi", "local certificate"],
    desc: "Apply for domicile/residence certificate online.",
  },
  {
    name: "Scholarship Form",
    price: 40,
    keywords: ["scholarship", "shishyavrutti", "student", "education", "form"],
    desc: "Maharashtra state scholarship form filling & submission.",
  },
  {
    name: "Electricity Bill",
    price: 10,
    keywords: ["electricity", "light bill", "msedcl", "bijli", "current bill"],
    desc: "Pay MSEDCL & other utility bills quickly.",
  },
  {
    name: "Mobile/DTH Recharge",
    price: 5,
    keywords: ["recharge", "mobile", "dth", "topup", "sim"],
    desc: "Recharge any mobile number or DTH service.",
  },
];

const QUICK_REPLIES_HOME = [
  { label: "📋 Our Services", action: "services" },
  { label: "💰 Pricing", action: "pricing" },
  { label: "📍 Location & Hours", action: "location" },
  { label: "📝 How to Apply", action: "howto" },
  { label: "📞 Contact", action: "contact" },
];

// ── Bot Logic ─────────────────────────────────────────────────────────────────
function getBotResponse(input) {
  const msg = input.toLowerCase().trim();

  // Greetings
  if (
    /^(hi|hello|hey|namaste|namaskar|hii|helo|good morning|good afternoon|good evening|kem cho|kasa ahe)/.test(
      msg,
    )
  ) {
    return {
      text: "🙏 Namaste! Welcome to **Prachi Online Services**!\n\nMai aapki kaise madad kar sakta hun? Please choose an option below or type your question:",
      quickReplies: QUICK_REPLIES_HOME,
    };
  }

  // Services list
  if (
    /service|kya karte|kya kaam|sab service|all service|list/.test(msg) ||
    msg === "services"
  ) {
    return {
      text:
        "🛠️ **Humare Services:**\n\n" +
        SERVICES_INFO.map(
          (s) => `• ${s.name} — ${s.price === 0 ? "🆓 Free" : `₹${s.price}`}`,
        ).join("\n") +
        "\n\nKisi specific service ke baare mein jaanna chahte hain?",
      quickReplies: [
        { label: "🪪 Aadhar Card", action: "aadhar" },
        { label: "💳 PAN Card", action: "pan" },
        { label: "🏦 Bank Account", action: "bank" },
        { label: "🌾 Ration Card", action: "ration" },
        { label: "🎓 Scholarship", action: "scholarship" },
        { label: "🏠 Main Menu", action: "home" },
      ],
    };
  }

  // Pricing
  if (
    /price|pricing|kitna|fees|charge|cost|rate|paisa|rupee|₹/.test(msg) ||
    msg === "pricing"
  ) {
    return {
      text:
        "💰 **Humare Service Charges:**\n\n" +
        SERVICES_INFO.map(
          (s) =>
            `• ${s.name}: ${s.price === 0 ? "🆓 **Free**" : `₹${s.price}`}`,
        ).join("\n") +
        "\n\n✅ Koi hidden charges nahi hain!",
      quickReplies: [
        { label: "📝 Apply Karo", action: "apply" },
        { label: "📞 Contact", action: "contact" },
        { label: "🏠 Main Menu", action: "home" },
      ],
    };
  }

  // Location & Hours
  if (
    /location|address|kahan|where|timing|hours|time|open|office|jalgaon/.test(
      msg,
    ) ||
    msg === "location"
  ) {
    return {
      text: "📍 **Humare Office ki Details:**\n\n🏛️ Prachi Online Services\n📍 AT.Ghodgaon TAL.Chopda DIST.Jalgaon, Maharashtra\n\n🕐 **Timings:**\nSomvar – Shanivar: 9:00 AM – 6:00 PM\nRavivar: Band\n\n📞 +91 89566-47264\n✉️ barelaakash254@gmail.com",
      quickReplies: [
        { label: "📞 Call Karo", action: "contact" },
        { label: "📝 Request Karo", action: "apply" },
        { label: "🏠 Main Menu", action: "home" },
      ],
    };
  }

  // How to apply
  if (
    /how|kaise|apply|process|steps|procedure|kya karna|request/.test(msg) ||
    msg === "howto"
  ) {
    return {
      text: '📝 **Service Lene ke 3 Steps:**\n\n**Step 1 — 🔍 Service Choose Karo**\nHumare website pe ya chatbot mein apni zaroorat ki service chuniye.\n\n**Step 2 — 📋 Form Bharo**\n"Request Service" page pe simple form bharo — naam, phone, service.\n\n**Step 3 — ✅ Ho Jayega!**\nHumari team aapki request process karegi aur update degi.\n\n⏱️ Processing time: 1–3 working days',
      quickReplies: [
        { label: "📋 Request Now", action: "apply" },
        { label: "💰 Pricing", action: "pricing" },
        { label: "🏠 Main Menu", action: "home" },
      ],
    };
  }

  // Contact
  if (
    /contact|phone|call|number|email|whatsapp|baat|sampark/.test(msg) ||
    msg === "contact"
  ) {
    return {
      text: "📞 **Humse Sampark Karo:**\n\n📱 **Phone/WhatsApp:** +91 89566-47264\n✉️ **Email:** barelaakash254@gmail.com\n\n🕐 Available: Mon–Sat, 9AM – 6PM\n\nYa **Contact Us** page pe message bhejo!",
      quickReplies: [
        { label: "📝 Request Karo", action: "apply" },
        { label: "🏠 Main Menu", action: "home" },
      ],
    };
  }

  // Apply / Request
  if (/apply|request|submit|bharo|start|shuru/.test(msg) || msg === "apply") {
    return {
      text: '✅ **Service Request karne ke liye ready hain!**\n\nNeeche "Request Now" button dabao — ek simple form milega jisme apna naam, phone number aur service select karein.\n\nYa hum seedha aapko wahan le jaate hain! 👇',
      quickReplies: [
        { label: "🚀 Request Now →", action: "navigate:/request" },
        { label: "💰 Pehle Price Check Karo", action: "pricing" },
        { label: "🏠 Main Menu", action: "home" },
      ],
    };
  }

  // Specific service lookups
  for (const svc of SERVICES_INFO) {
    if (svc.keywords.some((k) => msg.includes(k))) {
      return {
        text: `📌 **${svc.name}**\n\n📝 ${svc.desc}\n\n💰 **Charge:** ${svc.price === 0 ? "🆓 Free" : `₹${svc.price}`}\n\n**Kya chahiye:**\n• Original documents\n• 1 Passport size photo\n• Phone number\n\n📍 Seedha hamare office aao ya online request karo!`,
        quickReplies: [
          { label: "📋 Request Now", action: "navigate:/request" },
          { label: "📍 Office Location", action: "location" },
          { label: "🛠️ All Services", action: "services" },
          { label: "🏠 Main Menu", action: "home" },
        ],
      };
    }
  }

  // Thanks
  if (
    /thank|thanks|shukriya|dhanyawad|ok|okay|acha|accha|good|great/.test(msg)
  ) {
    return {
      text: "😊 **Aapka Swagat Hai!**\n\nKoi aur sawal ho toh zaroor puchiye. PRAchi Online Services mein aapki seva karna hamara farz hai! 🙏",
      quickReplies: QUICK_REPLIES_HOME,
    };
  }

  // Bye
  if (/bye|goodbye|alvida|band karo|close/.test(msg)) {
    return {
      text: "👋 **Alvida!**\n\nKisi bhi help ke liye hum hamesha yahan hain. PRAchi Online Services mein phir aayiye! 🙏",
      quickReplies: [],
    };
  }

  // Default fallback
  return {
    text: '🤔 Mujhe samajh nahi aaya. Please kisi option pe click karo ya alag tarike se puchiye:\n\n💡 **Aap pooch sakte ho:**\n• "Aadhar card ke liye kya karna hoga?"\n• "PAN card ki fees kitni hai?"\n• "Office kahan hai?"',
    quickReplies: QUICK_REPLIES_HOME,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────
const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Welcome message on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      const welcome = {
        id: Date.now(),
        sender: "bot",
        text: "🙏 Namaste! Main **Prachi CSC Assistant** hun.\n\nAapki kaise madad kar sakta hun?",
        quickReplies: QUICK_REPLIES_HOME,
        time: new Date(),
      };
      setMessages([welcome]);
      setUnread(0);
    }
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const addBotMessage = (response) => {
    setTyping(true);
    const delay = 600 + Math.min(response.text.length * 8, 1200);
    setTimeout(() => {
      setTyping(false);
      const msg = {
        id: Date.now(),
        sender: "bot",
        text: response.text,
        quickReplies: response.quickReplies || [],
        time: new Date(),
      };
      setMessages((prev) => [...prev, msg]);
      if (!open) setUnread((u) => u + 1);
    }, delay);
  };

  const handleSend = (text) => {
    const txt = (text || input).trim();
    if (!txt) return;

    // User message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: txt,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Get bot response
    const response = getBotResponse(txt);
    addBotMessage(response);
  };

  const handleQuickReply = (action) => {
    if (action.startsWith("navigate:")) {
      const path = action.replace("navigate:", "");
      setOpen(false);
      navigate(path);
      return;
    }
    if (action === "home") {
      const userMsg = {
        id: Date.now(),
        sender: "user",
        text: "🏠 Main Menu",
        time: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      addBotMessage({
        text: "🏠 **Main Menu** — Kya chahiye aapko?",
        quickReplies: QUICK_REPLIES_HOME,
      });
      return;
    }
    handleSend(action);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format bold text **word**
  const formatText = (text) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
          )}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div className="chatbot-header-info">
              <div className="chatbot-name">PRAchi Assistant</div>
              <div className="chatbot-status">
                <span className="online-dot"></span> Online • Always here to
                help
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                {msg.sender === "bot" && <div className="bot-avatar">🤖</div>}
                <div className="msg-bubble-wrap">
                  <div className="msg-bubble">{formatText(msg.text)}</div>
                  <div className="msg-time">{formatTime(msg.time)}</div>
                  {/* Quick replies after bot message */}
                  {msg.sender === "bot" && msg.quickReplies?.length > 0 && (
                    <div className="quick-replies">
                      {msg.quickReplies.map((qr, i) => (
                        <button
                          key={i}
                          className="qr-btn"
                          onClick={() => handleQuickReply(qr.action)}
                        >
                          {qr.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="chat-msg bot">
                <div className="bot-avatar">🤖</div>
                <div className="msg-bubble typing-bubble">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Apna sawal likho..."
            />
            <button
              className="chatbot-send"
              onClick={() => handleSend()}
              disabled={!input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        className="chatbot-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with us"
      >
        {open ? "✕" : "💬"}
        {!open && unread > 0 && <span className="fab-badge">{unread}</span>}
        {!open && <span className="fab-label">Help?</span>}
      </button>
    </>
  );
};

export default Chatbot;
