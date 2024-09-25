import { useAppDispatch, useAppSelector } from ".";
import { initiateChat, resetChatState } from "../store/slices/chatSlice";
import type { RootState } from "../store";
import {
  fetchChatHistory,
  resetChatHistory,
  deleteChatHistory,
  Message,
  Pagination,
} from "../store/slices/chatHistorySlice";

interface UseChat {
  initiateChat: (receiverId: string) => Promise<void>;
  resetChat: () => void;
  senderId: string | null;
  receiverId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  nextSteps: string[] | null;
}

interface UseChatHistory {
  fetchChatHistory: (
    userId: string,
    page?: number,
    limit?: number,
  ) => Promise<{ messages: Message[] } | undefined>;
  resetChatHistory: () => void;
  deleteChatHistory: (userId: string) => Promise<void>;
  messages: Message[];
  pagination: Pagination | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  nextSteps: string[] | null;
}

export const useChatHistory = (): UseChatHistory => {
  const dispatch = useAppDispatch();
  const { messages, pagination, status, error, nextSteps } = useAppSelector(
    (state: RootState) => state.chatHistory,
  );

  const handleFetchChatHistory = async (
    userId: string,
    page = 1,
    limit = 50,
  ) => {
    try {
      const result = await dispatch(
        fetchChatHistory({ userId, page, limit }),
      ).unwrap();
      return result.data;
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  const handleResetChatHistory = () => {
    dispatch(resetChatHistory());
  };

  const handleDeleteChatHistory = async (userId: string) => {
    try {
      await dispatch(deleteChatHistory({ userId })).unwrap();
    } catch (error) {
      console.error("Failed to delete chat history:", error);
    }
  };

  return {
    fetchChatHistory: handleFetchChatHistory,
    resetChatHistory: handleResetChatHistory,
    deleteChatHistory: handleDeleteChatHistory,
    messages,
    pagination,
    status,
    error,
    nextSteps,
  };
};

export const useChat = (): UseChat => {
  const dispatch = useAppDispatch();
  const { senderId, receiverId, status, error, nextSteps } = useAppSelector(
    (state: RootState) => state.chat,
  );

  const handleInitiateChat = async (receiverId: string) => {
    try {
      await dispatch(initiateChat({ receiverId })).unwrap();
    } catch (error) {
      console.error("Failed to initiate chat:", error);
    }
  };

  const handleResetChat = () => {
    dispatch(resetChatState());
  };

  return {
    initiateChat: handleInitiateChat,
    resetChat: handleResetChat,
    senderId,
    receiverId,
    status,
    error,
    nextSteps,
  };
};
