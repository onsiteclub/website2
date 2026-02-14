'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import {
  SHOP_URL,
  DASHBOARD_URL,
  CALCULATOR_URL,
  TIMEKEEPER_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from '@/lib/constants';

/* ── Types ── */
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatWidgetProps {
  locale: string;
}

interface ChatAction {
  id: string;
  name: string;
  args: Record<string, string | boolean>;
}

/* ── External URL map ── */
const EXTERNAL_URLS: Record<string, string> = {
  shop: SHOP_URL,
  dashboard: DASHBOARD_URL,
  calculator_android: 'https://play.google.com/store/apps/details?id=com.onsiteclub.calculator',
  calculator_ios: CALCULATOR_URL,
  timekeeper_android: 'https://play.google.com/store/apps/details?id=com.onsiteclub.timekeeper',
  timekeeper_ios: TIMEKEEPER_URL,
  facebook: FACEBOOK_URL,
  instagram: INSTAGRAM_URL,
};

/* ── Session storage helpers ── */
const STORAGE_KEY = 'onsite-chat-history';
const MAX_MESSAGES = 50;

function loadHistory(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_MESSAGES)));
  } catch {
    // Storage full — ignore
  }
}

/* ── SVG Icons ── */
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  );
}

/* ── Typing indicator ── */
function TypingDots() {
  return (
    <div className="chat-typing">
      <span className="chat-dot" />
      <span className="chat-dot" />
      <span className="chat-dot" />
    </div>
  );
}

/* ── Main Component ── */
export default function ChatWidget({ locale }: ChatWidgetProps) {
  const t = useTranslations('chat');

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [hasVoice, setHasVoice] = useState(false);
  const [pulsed, setPulsed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const lastSendRef = useRef(0);

  /* ── Action executor (structured tool calls) ── */
  const executeActions = useCallback((actions: ChatAction[]) => {
    for (const action of actions) {
      switch (action.name) {
        case 'scroll_to_section': {
          const el = document.getElementById(action.args.section_id as string);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth < 768) setOpen(false);
          }
          break;
        }
        case 'set_trade': {
          document.dispatchEvent(new CustomEvent('set-trade', {
            detail: { trade: action.args.trade },
          }));
          break;
        }
        case 'set_accessibility': {
          window.dispatchEvent(new CustomEvent('set-accessibility', {
            detail: { feature: action.args.feature, enabled: action.args.enabled },
          }));
          break;
        }
        case 'open_external_link': {
          const url = EXTERNAL_URLS[action.args.destination as string];
          if (url) window.open(url, '_blank', 'noopener,noreferrer');
          break;
        }
        case 'open_popup': {
          if (action.args.popup_id === 'blades') {
            window.dispatchEvent(new CustomEvent('open-blades'));
          }
          break;
        }
        case 'cannot_do':
          // The AI includes the reason in its text response — no UI action needed
          break;
        default:
          console.warn(`Unknown action: ${action.name}`);
      }
    }
  }, []);

  // Load history from sessionStorage
  useEffect(() => {
    setMessages(loadHistory());
    setHasVoice(typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia);
  }, []);

  // Save history on change
  useEffect(() => {
    if (messages.length > 0) saveHistory(messages);
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Pulse animation on first load
  useEffect(() => {
    if (!pulsed) {
      const timer = setTimeout(() => setPulsed(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [pulsed]);

  // Focus input when opening
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Listen for open-chat event from Navbar search bar
  useEffect(() => {
    const handler = () => setOpen(true);
    document.addEventListener('open-chat', handler);
    return () => document.removeEventListener('open-chat', handler);
  }, []);

  // ESC to close + focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const focusable = panel!.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  // Send message
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      // Rate limit: 1 msg/sec
      const now = Date.now();
      if (now - lastSendRef.current < 1000) return;
      lastSendRef.current = now;

      // Session limit
      if (messages.length >= MAX_MESSAGES) return;

      const userMsg: Message = { role: 'user', content: trimmed, timestamp: now };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setInput('');
      setLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updated.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!res.ok) throw new Error('API error');

        const data = await res.json();

        // Execute structured actions before showing response
        if (data.actions?.length > 0) {
          executeActions(data.actions);
        }

        // Show text response in chat
        const responseText: string = data.response || '';
        if (responseText) {
          const assistantMsg: Message = {
            role: 'assistant',
            content: responseText,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMsg]);
        } else if (data.actions?.length > 0) {
          // Tool call with no text — OpenAI sometimes returns only tool_calls
          const assistantMsg: Message = {
            role: 'assistant',
            content: '\u2713',
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMsg]);
        }
      } catch {
        const errorMsg: Message = {
          role: 'assistant',
          content: t('error'),
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, t, executeActions]
  );

  // Handle enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecording(false);
        setTranscribing(true);

        try {
          const formData = new FormData();
          formData.append('audio', blob, 'audio.webm');

          const res = await fetch('/api/whisper', {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) throw new Error('Whisper error');

          const data = await res.json();
          if (data.text) {
            setInput(data.text);
            inputRef.current?.focus();
          }
        } catch {
          // Silently fail — user can type instead
        } finally {
          setTranscribing(false);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      // Microphone permission denied or unavailable
      setHasVoice(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Quick action chips
  const chips = [
    { key: 'chip_about', text: t('chip_about') },
    { key: 'chip_apps', text: t('chip_apps') },
    { key: 'chip_shop', text: t('chip_shop') },
    { key: 'chip_certification', text: t('chip_certification') },
    { key: 'chip_accessibility', text: t('chip_accessibility') },
    { key: 'chip_contact', text: t('chip_contact') },
  ];

  const sessionLimitReached = messages.length >= MAX_MESSAGES;

  return (
    <>
      {/* ── Chat Panel ── */}
      <div
        ref={panelRef}
        className={`chat-panel${open ? ' chat-panel-open' : ''}`}
        role="dialog"
        aria-label={t('title')}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="chat-header">
          <span className="chat-header-title">{t('title')} &#9889;</span>
          <button
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label={t('close')}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" role="log" aria-live="polite" aria-atomic="false">
          {messages.length === 0 && (
            <div className="chat-chips">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  className="chat-chip"
                  onClick={() => sendMessage(chip.text)}
                >
                  {chip.text}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-msg ${msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-assistant'}`}
            >
              <div className="chat-msg-content">{msg.content}</div>
              <span className="chat-msg-time">
                {new Date(msg.timestamp).toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))}

          {loading && (
            <div className="chat-msg chat-msg-assistant">
              <TypingDots />
            </div>
          )}

          {transcribing && (
            <div className="chat-status" role="status" aria-live="polite">{t('transcribing')}</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-bar">
          {sessionLimitReached ? (
            <div className="chat-status" role="status" aria-live="polite">{t('session_limit')}</div>
          ) : (
            <>
              {hasVoice && (
                <button
                  className={`chat-voice-btn${recording ? ' chat-voice-recording' : ''}`}
                  onClick={toggleRecording}
                  aria-label={recording ? 'Stop recording' : 'Start voice input'}
                  title={recording ? t('listening') : 'Voice'}
                >
                  {recording ? <StopIcon /> : <MicIcon />}
                </button>
              )}
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('placeholder')}
                aria-label={t('placeholder')}
                disabled={loading}
              />
              <button
                className="chat-send-btn"
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                aria-label="Send"
              >
                <SendIcon />
              </button>
            </>
          )}
        </div>
      </div>

    </>
  );
}
