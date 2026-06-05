import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, AlertCircle, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { sendChatMessage } from "@/lib/api";
import { motion, AnimatePresence } from "motion/react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What projects have you built?",
  "What are your strongest technical skills?",
  "Tell me about your AI/ML experience",
  "What's your educational background?",
  "Are you open to new opportunities?",
  "How can I contact you?",
];

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isPending) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setError(null);
    setIsPending(true);
    try {
      const data = await sendChatMessage(newMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleSuggestion = (q: string) => {
    setInput(q);
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div style={{ backgroundColor: "var(--color-base)" }}>
      <div className="container py-20 md:py-28">
        {/* Header */}
        <Reveal className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow block mb-3">AI Playground</span>
              <h1 className="section-heading mb-3">Ask My Portfolio</h1>
              <p className="text-base max-w-lg" style={{ color: "var(--color-muted)" }}>
                Chat with an AI assistant that knows everything about Roorq — projects, skills, background, and more.
              </p>
            </div>
            {messages.length > 0 && !isPending && (
              <button
                onClick={handleReset}
                className="btn-ghost text-sm shrink-0"
                aria-label="Reset conversation"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            )}
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto">
          {/* Chat container */}
          <div
            className="card-surface flex flex-col"
            style={{ minHeight: "500px", maxHeight: "600px" }}
          >
            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto p-5 space-y-4"
              style={{ minHeight: 0 }}
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
            >
              {/* Welcome message */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgb(110 139 255 / 0.15)" }}
                  >
                    <Bot size={14} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <div className="chat-bubble-assistant">
                    <p>
                      Hi! I'm the AI assistant for Roorq's portfolio. I can answer questions about
                      his projects, skills, background, and experience.
                    </p>
                    <p className="mt-2 text-xs opacity-70">
                      Try one of the suggested questions below, or ask me anything.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Conversation */}
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor:
                          msg.role === "user"
                            ? "rgb(110 139 255 / 0.2)"
                            : "rgb(110 139 255 / 0.1)",
                      }}
                    >
                      {msg.role === "user" ? (
                        <User size={13} style={{ color: "var(--color-accent)" }} />
                      ) : (
                        <Bot size={13} style={{ color: "var(--color-accent)" }} />
                      )}
                    </div>
                    <div
                      className={
                        msg.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"
                      }
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading indicator */}
              {isPending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgb(110 139 255 / 0.1)" }}
                  >
                    <Bot size={13} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <div className="chat-bubble-assistant flex items-center gap-2">
                    <Loader2 size={13} className="animate-spin" />
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                      Thinking…
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 p-3 rounded-md text-sm"
                  style={{
                    backgroundColor: "rgb(248 113 113 / 0.08)",
                    color: "var(--color-error)",
                    border: "1px solid rgb(248 113 113 / 0.2)",
                  }}
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{ backgroundColor: "var(--color-line)" }}
            />

            {/* Input area */}
            <div className="p-4 flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about Roorq…"
                rows={1}
                className="flex-1 px-3 py-2.5 text-sm rounded-md border outline-none resize-none transition-colors"
                style={{
                  backgroundColor: "var(--color-surface-raised)",
                  borderColor: "var(--color-line)",
                  color: "var(--color-ink)",
                  maxHeight: "120px",
                  overflowY: "auto",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)";
                }}
                disabled={isPending}
                aria-label="Chat input"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isPending}
                className="btn-accent shrink-0 px-3 py-2.5"
                aria-label="Send message"
                style={{
                  opacity: !input.trim() || isPending ? 0.5 : 1,
                  cursor: !input.trim() || isPending ? "not-allowed" : "pointer",
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>

          {/* Suggested questions */}
          {messages.length === 0 && (
            <Reveal className="mt-6" delay={0.1}>
              <p
                className="text-xs font-mono uppercase tracking-wider mb-3"
                style={{ color: "var(--color-muted)" }}
              >
                Suggested Questions
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    className="text-xs px-3 py-1.5 rounded-md border transition-colors"
                    style={{
                      borderColor: "var(--color-line)",
                      color: "var(--color-muted)",
                      backgroundColor: "var(--color-surface)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgb(110 139 255 / 0.4)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {/* Disclaimer */}
          <p
            className="text-xs text-center mt-6"
            style={{ color: "var(--color-muted)" }}
          >
            Powered by AI · Answers are based on Roorq's portfolio data · Rate limited for fair use
          </p>
        </div>
      </div>
    </div>
  );
}
