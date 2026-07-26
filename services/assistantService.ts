import { api } from "@/lib/api";

export interface AssistantChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface AssistantResponse {
  answer?: string;
  citations?: { source_type: string; content_snippet: string }[];
}

export const assistantService = {
  async queryAssistant(
    encounterId: string,
    query: string,
    chatHistory: AssistantChatTurn[] = []
  ): Promise<AssistantResponse> {
    const { data } = await api.post<{ success: boolean; data: AssistantResponse }>(
      `/encounters/${encounterId}/assistant`,
      { query, chat_history: chatHistory }
    );
    return data.data ?? {};
  },
};
