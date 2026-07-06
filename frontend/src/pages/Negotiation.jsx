import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaUserCircle, FaPaperPlane } from "react-icons/fa";

const API = "http://127.0.0.1:8000";

function Negotiation() {
  const [offer, setOffer] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! 👋 I'm your AI Debt Negotiation Assistant. Tell me your settlement offer and I'll negotiate with the bank on your behalf.",
    },
  ]);

  const [history, setHistory] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const negotiate = async () => {
    if (!offer.trim()) {
      alert("Please enter your settlement offer.");
      return;
    }

    const userOffer = offer;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userOffer,
      },
    ]);

    setOffer("");

    setLoading(true);

    try {
      const conversation =
        history +
        `

Customer:
${userOffer}

`;

      const res = await axios.post(`${API}/ai/negotiate`, {
        lender_name: "HDFC Bank",
        loan_type: "Personal Loan",
        outstanding_amount: 500000,
        monthly_income: 45000,
        overdue_months: 4,
        message: conversation,
      });

      const aiReply = res.data.reply;

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
        },
      ]);

      setHistory(
        conversation +
          `

Bank:
${aiReply}

`
      );
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to negotiate at the moment. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
  <div className="min-h-screen bg-slate-100 py-10">

    <div className="max-w-7xl mx-auto px-8">

      <h1 className="text-4xl font-bold text-slate-800 mb-3">
        🤖 AI Debt Negotiation
      </h1>

      <p className="text-gray-500 mb-8">
        Negotiate your settlement amount with our AI Bank Officer.
      </p>

      <div className="bg-white rounded-3xl shadow-xl h-[70vh] flex flex-col overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 flex items-center gap-4">

          <FaRobot className="text-3xl" />

          <div>

            <h2 className="text-xl font-bold">
              AI Bank Officer
            </h2>

            <p className="text-sm opacity-90">
              Online
            </p>

          </div>

        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex mb-6 ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`flex gap-3 max-w-[75%] ${
                  msg.sender === "user"
                    ? "flex-row-reverse"
                    : ""
                }`}
              >

                <div className="text-3xl">

                  {msg.sender === "user" ? (
                    <FaUserCircle className="text-blue-600" />
                  ) : (
                    <FaRobot className="text-green-600" />
                  )}

                </div>

                <div
                  className={`rounded-2xl px-5 py-4 leading-7 shadow-md ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {msg.text}
                </div>

              </div>

            </div>

          ))}

          {loading && (

            <div className="flex items-center gap-3 text-green-600 font-semibold">

              <FaRobot />

              AI is typing...

            </div>

          )}

          <div ref={chatEndRef}></div>

        </div>

       <div className="mt-6 flex gap-4">

  <input
  type="text"
  placeholder="Type your message..."
  value={offer}
  onChange={(e) => setOffer(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") negotiate();
  }}
  className="flex-1 rounded-xl border border-slate-300 px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

  <button
    onClick={negotiate}
    disabled={loading}
    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
  >
    <FaPaperPlane />

    {loading ? "Sending..." : "Send"}
  </button>

</div>

     </div>

</div>

</div>

);
}

export default Negotiation;