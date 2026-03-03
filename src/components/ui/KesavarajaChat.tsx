"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content: "Hey there! I'm Kesavaraja 👋 — Ask me anything about my work, projects, or how we can collaborate.",
};

export default function KesavarajaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated.slice(1) }), // skip greeting
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text ?? "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hmm, looks like I ran into an error. Try again?" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="fixed bottom-24 right-5 md:right-8 z-[9990] w-[340px] md:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(12,12,15,0.97) 0%, rgba(20,20,28,0.97) 100%)",
              border: "1px solid rgba(0,255,204,0.15)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 40px rgba(0,255,204,0.08), 0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "linear-gradient(90deg, rgba(0,255,204,0.05) 0%, transparent 100%)",
              }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #00FFCC 0%, #7000FF 100%)",
                    color: "#0C0C0F",
                  }}
                >
                  K
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 bg-green-400"
                  style={{ borderColor: "#0C0C0F" }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm leading-tight">Kesavaraja</p>
                <p className="text-[11px] text-[#00FFCC] font-mono mt-0.5">AI Engineer · Online</p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white/80 transition-colors ml-2"
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ maxHeight: "340px", minHeight: "200px" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] text-sm leading-relaxed px-3.5 py-2.5 rounded-2xl"
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #00FFCC 0%, #00ccaa 100%)",
                            color: "#0C0C0F",
                            borderBottomRightRadius: "4px",
                            fontWeight: 500,
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(235,235,235,0.9)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderBottomLeftRadius: "4px",
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading dots */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="flex items-center gap-1 px-4 py-3 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderBottomLeftRadius: "4px",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#00FFCC]"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none py-1"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: !input.trim() || isLoading
                    ? "rgba(255,255,255,0.08)"
                    : "linear-gradient(135deg, #00FFCC 0%, #00ccaa 100%)",
                  color: !input.trim() || isLoading ? "rgba(255,255,255,0.3)" : "#0C0C0F",
                }}
                aria-label="Send message"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>

            {/* Subtle branding */}
            <div className="pb-2 text-center">
              <span className="text-[10px] text-white/20 font-mono">Powered by Gemini AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 md:right-8 z-[9991] w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: isOpen
            ? "rgba(20,20,28,0.95)"
            : "linear-gradient(135deg, #00FFCC 0%, #7000FF 100%)",
          border: isOpen ? "1px solid rgba(0,255,204,0.3)" : "none",
          boxShadow: isOpen
            ? "0 0 20px rgba(0,255,204,0.2)"
            : "0 0 30px rgba(0,255,204,0.4), 0 8px 24px rgba(0,0,0,0.5)",
        }}
        aria-label="Chat with Kesavaraja AI"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(0,255,204,0.9)"
              strokeWidth="2.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="#0C0C0F"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: "linear-gradient(135deg, #00FFCC 0%, #7000FF 100%)" }}
            animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </>
  );
}
