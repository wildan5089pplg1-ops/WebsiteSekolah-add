"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

interface QuickAction {
  label: string;
  prompt: string;
}

interface PresmaChatbotProps {
  proxyUrl?: string;
  schoolName?: string;
  accentColor?: string;
  greeting?: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "🎓 Jurusan",
    prompt:
      "Apa saja jurusan yang tersedia di SMK Prestasi Prima?",
  },
  {
    label: "📝 PPDB",
    prompt:
      "Bagaimana cara pendaftaran PPDB SMK Prestasi Prima?",
  },
  {
    label: "🏫 Fasilitas",
    prompt:
      "Apa saja fasilitas yang tersedia di sekolah?",
  },
  {
    label: "📞 Kontak",
    prompt:
      "Bagaimana cara menghubungi SMK Prestasi Prima?",
  },
];

export default function PresmaChatbot({
  proxyUrl =
    process.env.NEXT_PUBLIC_PRESMA_PROXY_URL ||
    "",
  schoolName = "SMK PRESTASI PRIMA",
  accentColor = "#F97316",
  greeting =
    "Halo! 👋 Saya PRESMA, asisten informasi SMK Prestasi Prima.",
}: PresmaChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  /*
   * =========================================================
   * SCROLL
   * =========================================================
   */

  useEffect(() => {
    if (!messagesRef.current) return;

    messagesRef.current.scrollTop =
      messagesRef.current.scrollHeight;
  }, [messages, isSending]);

  /*
   * =========================================================
   * OPEN CHAT
   * =========================================================
   */

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  /*
   * =========================================================
   * SUGGESTED QUESTIONS
   * =========================================================
   */

  function getSuggestedQuestions(
    userQuestion: string,
    assistantReply: string
  ): string[] {
    const text =
      `${userQuestion} ${assistantReply}`.toLowerCase();

    if (
      text.includes("pplg") ||
      text.includes("tjkt") ||
      text.includes("bcf") ||
      text.includes("dkv") ||
      text.includes("jurusan") ||
      text.includes("program keahlian")
    ) {
      return [
        "Apa yang dipelajari di PPLG?",
        "Apa yang dipelajari di TJKT?",
        "Apa saja fasilitas sekolah?",
      ];
    }

    if (
      text.includes("ppdb") ||
      text.includes("pendaftaran") ||
      text.includes("mendaftar") ||
      text.includes("seleksi")
    ) {
      return [
        "Kapan pendaftaran PPDB dibuka?",
        "Bagaimana tahapan PPDB?",
        "Bagaimana cara menghubungi sekolah?",
      ];
    }

    if (
      text.includes("fasilitas") ||
      text.includes("laboratorium") ||
      text.includes("perpustakaan") ||
      text.includes("auditorium")
    ) {
      return [
        "Apa saja fasilitas laboratorium?",
        "Apakah sekolah memiliki perpustakaan?",
        "Apakah ada virtual tour sekolah?",
      ];
    }

    if (
      text.includes("ekstrakurikuler") ||
      text.includes("ekskul") ||
      text.includes("osis") ||
      text.includes("mpk")
    ) {
      return [
        "Apa saja ekstrakurikuler yang tersedia?",
        "Apakah ada OSIS dan MPK?",
        "Bagaimana kegiatan siswa di sekolah?",
      ];
    }

    if (
      text.includes("alamat") ||
      text.includes("whatsapp") ||
      text.includes("kontak") ||
      text.includes("telepon") ||
      text.includes("email")
    ) {
      return [
        "Di mana alamat sekolah?",
        "Berapa nomor WhatsApp sekolah?",
        "Berapa jam operasional sekolah?",
      ];
    }

    return [
      "Apa saja jurusan yang tersedia?",
      "Bagaimana cara daftar PPDB?",
      "Apa saja fasilitas sekolah?",
    ];
  }

  /*
   * =========================================================
   * MESSAGE RENDERER
   * =========================================================
   */

  function renderMessageContent(content: string) {
    const parts: React.ReactNode[] = [];

    /*
     * Split newline terlebih dahulu.
     */
    const lines = content.split("\n");

    lines.forEach((line, lineIndex) => {
      /*
       * Bold + markdown links.
       */
      const regex =
        /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\+62\s?851[-\s]?\d{3,4}[-\s]?\d{3,4})/g;

      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(
            <span key={`${lineIndex}-text-${lastIndex}`}>
              {line.slice(lastIndex, match.index)}
            </span>
          );
        }

        const token = match[0];

        /*
         * **bold**
         */
        if (
          token.startsWith("**") &&
          token.endsWith("**")
        ) {
          parts.push(
            <strong
              key={`${lineIndex}-bold-${match.index}`}
            >
              {token.slice(2, -2)}
            </strong>
          );
        }

        /*
         * [label](https://...)
         */
        else if (token.startsWith("[")) {
          const linkMatch =
            token.match(
              /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/
            );

          if (linkMatch) {
            parts.push(
              <a
                key={`${lineIndex}-link-${match.index}`}
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkMatch[1]}
              </a>
            );
          } else {
            parts.push(token);
          }
        }

        /*
         * WhatsApp number.
         */
        else {
          const digits =
            token.replace(/\D/g, "");

          parts.push(
            <a
              key={`${lineIndex}-wa-${match.index}`}
              href={`https://wa.me/${digits}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {token}
            </a>
          );
        }

        lastIndex =
          match.index + token.length;
      }

      /*
       * Remaining text.
       */
      if (lastIndex < line.length) {
        parts.push(
          <span key={`${lineIndex}-remaining`}>
            {line.slice(lastIndex)}
          </span>
        );
      }

      /*
       * New line.
       */
      if (lineIndex < lines.length - 1) {
        parts.push(
          <br key={`${lineIndex}-br`} />
        );
      }
    });

    return parts;
  }

  /*
   * =========================================================
   * SEND MESSAGE
   * =========================================================
   */

  async function sendMessage(
    customPrompt?: string
  ) {
    if (isSending) return;

    const prompt =
      typeof customPrompt === "string"
        ? customPrompt.trim()
        : input.trim();

    if (!prompt) return;

    if (!proxyUrl) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Maaf, koneksi chatbot belum dikonfigurasi.",
        },
      ]);

      return;
    }

    /*
     * Add user message.
     */
    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    const newHistory = [
      ...history,
      userMessage,
    ].slice(-6);

    setHistory(newHistory);

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setIsSending(true);

    try {
      const response = await fetch(proxyUrl, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: newHistory,
        }),
      });

      let data: {
        reply?: string;
        error?: string;
      } | null = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            `HTTP ${response.status}`
        );
      }

      const reply =
        typeof data?.reply === "string"
          ? data.reply.trim()
          : "";

      if (!reply) {
        throw new Error(
          "Empty assistant response"
        );
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: reply,
      };

      const finalHistory = [
        ...newHistory,
        assistantMessage,
      ].slice(-6);

      setHistory(finalHistory);

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(
        "PRESMA chatbot error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Maaf, terjadi kendala saat menghubungkan ke PRESMA AI. " +
            "Silakan coba lagi sebentar lagi. 🙏",
        },
      ]);
    } finally {
      setIsSending(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }

  /*
   * =========================================================
   * RESET CHAT
   * =========================================================
   */

  function resetChat() {
    setHistory([]);
    setMessages([]);
    setInput("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }

  /*
   * =========================================================
   * INPUT
   * =========================================================
   */

  function handleInputChange(
    value: string
  ) {
    setInput(value);

    const textarea = inputRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const height = Math.min(
      textarea.scrollHeight,
      90
    );

    textarea.style.height =
      `${height}px`;
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    /*
     * Enter = send
     * Shift + Enter = newline
     */
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();
    }
  }

  /*
   * =========================================================
   * SUGGESTIONS
   * =========================================================
   */

  const lastAssistantMessage =
    [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === "assistant"
      );

  const lastUserMessage =
    [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === "user"
      );

  const suggestions =
    lastAssistantMessage &&
    lastUserMessage &&
    !isSending
      ? getSuggestedQuestions(
          lastUserMessage.content,
          lastAssistantMessage.content
        )
      : [];

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <>
      <style jsx>{`
        .presma-launcher {
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 58px;
          height: 58px;
          border: 0;
          border-radius: 50%;
          background: ${accentColor};
          color: white;
          cursor: pointer;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.18),
            0 3px 8px rgba(0, 0, 0, 0.12);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .presma-launcher:hover {
          transform:
            translateY(-2px)
            scale(1.03);
          box-shadow:
            0 14px 35px rgba(0, 0, 0, 0.22),
            0 4px 10px rgba(0, 0, 0, 0.14);
        }

        .presma-launcher:active {
          transform: scale(0.96);
        }

        .presma-panel {
          position: fixed;
          right: 20px;
          bottom: 90px;
          width: 380px;
          max-width: calc(100vw - 30px);
          height: 570px;
          max-height: calc(100vh - 110px);
          background: white;
          border-radius: 18px;
          overflow: hidden;
          z-index: 999998;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.22),
            0 5px 18px rgba(0, 0, 0, 0.08);
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform:
            translateY(10px)
            scale(0.98);

          transition:
            opacity 0.2s ease,
            transform 0.2s ease,
            visibility 0.2s ease;
        }

        .presma-panel.presma-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform:
            translateY(0)
            scale(1);
        }

        /* HEADER */

        .presma-header {
          flex-shrink: 0;
          min-height: 68px;
          padding: 13px 15px 12px 18px;
          background: ${accentColor};
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .presma-header-info {
          min-width: 0;
        }

        .presma-header-title {
          font-size: 16px;
          font-weight: 750;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .presma-header-subtitle {
          margin-top: 4px;
          font-size: 11px;
          opacity: 0.78;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .presma-header-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .presma-header-button {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: white;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            background 0.15s ease;
        }

        .presma-header-button:hover {
          background:
            rgba(255, 255, 255, 0.15);
        }

        /* BODY */

        .presma-messages {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 18px 16px 12px;
          background: #f5f7fa;
          scroll-behavior: smooth;
        }

        .presma-messages::-webkit-scrollbar {
          width: 7px;
        }

        .presma-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .presma-messages::-webkit-scrollbar-thumb {
          background: #c5c8cd;
          border-radius: 99px;
        }

        .presma-message-row {
          display: flex;
          margin-bottom: 10px;
        }

        .presma-message-row.user {
          justify-content: flex-end;
        }

        .presma-message-row.assistant {
          justify-content: flex-start;
        }

        .presma-bubble {
          max-width: 86%;
          padding: 11px 14px;
          border-radius: 15px;
          font-size: 14px;
          line-height: 1.55;
          word-break: break-word;
        }

        .presma-bubble strong {
          font-weight: 750;
        }

        .presma-bubble a {
          color: inherit;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .presma-message-row.assistant
          .presma-bubble {
          background: white;
          color: #172033;
          border: 1px solid #e5e7eb;
          border-top-left-radius: 5px;
          box-shadow:
            0 2px 6px
            rgba(0, 0, 0, 0.025);
        }

        .presma-message-row.user
          .presma-bubble {
          background: ${accentColor};
          color: white;
          border-top-right-radius: 5px;
        }

        /* WELCOME */

        .presma-welcome {
          margin-bottom: 14px;
        }

        .presma-welcome-title {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111827;
          margin-bottom: 5px;
        }

        .presma-welcome-text {
          font-size: 13px;
          line-height: 1.5;
          color: #6b7280;
          margin-bottom: 14px;
        }

        /* QUICK ACTIONS */

        .presma-quick-actions {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 16px;
        }

        .presma-quick-button {
          min-height: 42px;
          padding: 9px 10px;
          border:
            1px solid #e5e7eb;
          border-radius: 11px;
          background: white;
          color: #172033;
          cursor: pointer;
          font-size: 12px;
          font-weight: 650;
          text-align: left;
          transition:
            border-color 0.15s ease,
            background 0.15s ease,
            transform 0.15s ease;
        }

        .presma-quick-button:hover {
          border-color: ${accentColor};
          background: #fff7f0;
          transform:
            translateY(-1px);
        }

        .presma-quick-button:active {
          transform: translateY(0);
        }

        /* SUGGESTIONS */

        .presma-suggestions {
          margin:
            -2px 0 14px 0;
          padding-left: 2px;
        }

        .presma-suggestions-label {
          margin-bottom: 7px;
          font-size: 10px;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .presma-suggestions-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .presma-suggestion-button {
          border:
            1px solid #e5e7eb;
          border-radius: 999px;
          background: white;
          color: #172033;
          padding: 7px 10px;
          font-family: inherit;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition:
            border-color 0.15s ease,
            color 0.15s ease,
            background 0.15s ease;
        }

        .presma-suggestion-button:hover {
          border-color: ${accentColor};
          color: ${accentColor};
          background: #fff7f0;
        }

        .presma-suggestion-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        /* TYPING */

        .presma-typing-row {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 10px;
        }

        .presma-typing {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 11px 14px;
          background: white;
          border:
            1px solid #e5e7eb;
          border-radius: 15px;
          border-top-left-radius: 5px;
        }

        .presma-typing span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #9ca3af;
          animation:
            presmaTyping
            1.2s
            infinite
            ease-in-out;
        }

        .presma-typing span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .presma-typing span:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes presmaTyping {
          0%,
          60%,
          100% {
            transform:
              translateY(0);
            opacity: 0.45;
          }

          30% {
            transform:
              translateY(-3px);
            opacity: 1;
          }
        }

        /* INPUT */

        .presma-input-area {
          flex-shrink: 0;
          padding: 10px;
          background: white;
          border-top:
            1px solid #e5e7eb;
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }

        .presma-input {
          flex: 1;
          min-width: 0;
          max-height: 90px;
          min-height: 44px;
          resize: none;
          border:
            1px solid ${accentColor};
          border-radius: 14px;
          padding: 11px 13px;
          outline: none;
          background: white;
          color: #172033;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.4;
          overflow-y: auto;
        }

        .presma-input::placeholder {
          color: #9ca3af;
        }

        .presma-input:focus {
          box-shadow:
            0 0 0 3px
            rgba(249, 115, 22, 0.1);
        }

        .presma-send {
          flex:
            0 0 44px;
          width: 44px;
          height: 44px;
          border: 0;
          border-radius: 50%;
          background: ${accentColor};
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition:
            transform 0.15s ease,
            opacity 0.15s ease;
        }

        .presma-send:hover {
          transform: scale(1.04);
        }

        .presma-send:active {
          transform: scale(0.95);
        }

        .presma-send:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        /* MOBILE */

        @media (max-width: 520px) {
          .presma-launcher {
            right: 14px;
            bottom: 14px;
          }

          .presma-panel {
            right: 10px;
            bottom: 82px;
            width:
              calc(100vw - 20px);
            height:
              min(
                650px,
                calc(100vh - 95px)
              );
            max-height:
              calc(100vh - 95px);
            border-radius: 16px;
          }
        }

        @media (max-width: 380px) {
          .presma-panel {
            right: 0;
            bottom: 0;
            width: 100vw;
            max-width: 100vw;
            height: 100dvh;
            max-height: 100dvh;
            border-radius: 0;
          }

          .presma-launcher {
            right: 12px;
            bottom: 12px;
          }
        }
      `}</style>

      {/* =====================================================
          LAUNCHER
      ===================================================== */}

      <button
        type="button"
        className="presma-launcher"
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
        aria-label={
          isOpen
            ? "Tutup PRESMA AI"
            : "Buka PRESMA AI"
        }
      >
        {isOpen ? "×" : "✦"}
      </button>

      {/* =====================================================
          PANEL
      ===================================================== */}

      <section
        className={`presma-panel ${
          isOpen ? "presma-open" : ""
        }`}
        aria-label="PRESMA AI"
      >
        {/* HEADER */}

        <header className="presma-header">
          <div className="presma-header-info">
            <div className="presma-header-title">
              PRESMA AI
            </div>

            <div className="presma-header-subtitle">
              {schoolName}
            </div>
          </div>

          <div className="presma-header-actions">
            <button
              type="button"
              className="presma-header-button"
              onClick={resetChat}
              title="Mulai percakapan baru"
              aria-label="Mulai percakapan baru"
            >
              ↻
            </button>

            <button
              type="button"
              className="presma-header-button"
              onClick={() =>
                setIsOpen(false)
              }
              title="Tutup chatbot"
              aria-label="Tutup chatbot"
            >
              ×
            </button>
          </div>
        </header>

        {/* MESSAGES */}

        <div
          ref={messagesRef}
          className="presma-messages"
        >
          {/* WELCOME */}

          {messages.length === 0 && (
            <div className="presma-welcome">
              <div className="presma-welcome-title">
                Halo! 👋
              </div>

              <div className="presma-welcome-text">
                {greeting}
              </div>

              <div className="presma-quick-actions">
                {QUICK_ACTIONS.map(
                  (action) => (
                    <button
                      key={action.label}
                      type="button"
                      className="presma-quick-button"
                      disabled={isSending}
                      onClick={() =>
                        sendMessage(
                          action.prompt
                        )
                      }
                    >
                      {action.label}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* CHAT MESSAGES */}

          {messages.map(
            (message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`presma-message-row ${message.role}`}
              >
                <div className="presma-bubble">
                  {renderMessageContent(
                    message.content
                  )}
                </div>
              </div>
            )
          )}

          {/* SUGGESTED QUESTIONS */}

          {suggestions.length > 0 && (
            <div className="presma-suggestions">
              <div className="presma-suggestions-label">
                Mungkin kamu juga ingin tahu
              </div>

              <div className="presma-suggestions-buttons">
                {suggestions.map(
                  (question) => (
                    <button
                      key={question}
                      type="button"
                      className="presma-suggestion-button"
                      disabled={isSending}
                      onClick={() =>
                        sendMessage(
                          question
                        )
                      }
                    >
                      {question}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* TYPING */}

          {isSending && (
            <div className="presma-typing-row">
              <div className="presma-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}

        <div className="presma-input-area">
          <textarea
            ref={inputRef}
            className="presma-input"
            placeholder="Ketik pertanyaan..."
            rows={1}
            value={input}
            disabled={isSending}
            aria-label="Pertanyaan untuk PRESMA AI"
            onChange={(event) =>
              handleInputChange(
                event.target.value
              )
            }
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            className="presma-send"
            disabled={
              isSending ||
              !input.trim()
            }
            aria-label="Kirim pertanyaan"
            onClick={() =>
              sendMessage()
            }
          >
            ➤
          </button>
        </div>
      </section>
    </>
  );
}