"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, User, Send, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import { assistantService } from "@/services/assistantService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: { source_type: string; content_snippet: string }[];
  timestamp: string;
}

const STARTER_QUESTIONS = [
  "What do my latest lab results mean?",
  "What should I know about my current medications?",
  "What were the key findings from my last visit?",
];

export function ChatClient({ id }: { id: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (query: string) => {
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const priorTurns = messages.map((m) => ({ role: m.role, content: m.content }));
      const response = await assistantService.queryAssistant(id, query, priorTurns);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.answer ?? "I couldn't generate a response. Please try again.",
          citations: response.citations,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch {
      setError("Failed to reach the AI assistant. Please try again shortly.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto gap-4 animate-fade-in">
      <Link
        href={`/encounters`}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to visits
      </Link>

      <Card className="flex-1 flex flex-col overflow-hidden glass-card">
        <CardHeader className="flex flex-row items-center justify-between border-b border-[#e2e8f0] dark:border-[#1e3a40]">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bot className="size-5" />
            Ask About My Health
          </CardTitle>
          <span className="text-xs bg-[#06635d]/10 text-[#06635d] dark:text-[#14b8a6] px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            AI Powered
          </span>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="h-16 w-16 rounded-2xl bg-[#06635d]/10 flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-[#06635d] dark:text-[#14b8a6]" />
              </div>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Ask questions about your visits, lab results, or medications. Answers are grounded
                only in your own medical records.
              </p>
              <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-sm text-left rounded-xl border border-input bg-muted/30 hover:bg-muted px-4 py-2.5 text-foreground transition-all dark:border-[#1e3a40]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex items-start gap-3", msg.role === "user" ? "flex-row-reverse" : "")}
                >
                  <div
                    className={cn(
                      "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
                      msg.role === "user" ? "bg-[#112344]/10" : "bg-[#06635d]/10"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="h-5 w-5 text-[#112344] dark:text-[#94a3b8]" />
                    ) : (
                      <Bot className="h-5 w-5 text-[#06635d] dark:text-[#14b8a6]" />
                    )}
                  </div>
                  <div className={cn("max-w-[80%]", msg.role === "user" && "items-end flex flex-col")}>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm",
                        msg.role === "user"
                          ? "bg-[#06635d] text-white rounded-tr-sm"
                          : "bg-muted/50 text-foreground rounded-tl-sm border border-input dark:border-[#1e3a40]"
                      )}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-border/50">
                          <p className="text-[10px] font-medium opacity-70 mb-1">Sources</p>
                          {msg.citations.map((c, i) => (
                            <p key={i} className="text-[11px] opacity-60 line-clamp-1">
                              {c.content_snippet}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1 px-1">{formatTime(msg.timestamp)}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#06635d]/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-[#06635d] dark:text-[#14b8a6]" />
                  </div>
                  <div className="bg-muted/50 border border-input dark:border-[#1e3a40] rounded-2xl rounded-tl-sm px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </>
          )}
        </CardContent>
      </Card>

      {error && <p className="text-xs text-destructive px-1">{error}</p>}

      <div className="glass-card rounded-2xl border border-input dark:border-[#1e3a40] p-3 flex items-end gap-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your health..."
          className="flex-1 resize-none border-0 focus-visible:ring-0"
          disabled={isLoading}
          rows={1}
        />
        <Button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          size="icon"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
