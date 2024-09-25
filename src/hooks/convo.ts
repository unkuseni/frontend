import { useAppDispatch, useAppSelector } from ".";
import type { RootState } from "@/store";
import {
  initiateOrRetrieveConversation,
  resetConversationState,
} from "@/store/slices/conversationSlice";

interface UseConversation {
  initiateOrRetrieveConversation: (participantId: string) => Promise<void>;
  resetConversation: () => void;
  conversationId: string | null;
  participants: string[] | null;
  isNewConversation: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  nextSteps: string[] | null;
}

export const useConversation = (): UseConversation => {
  const dispatch = useAppDispatch();
  const {
    conversationId,
    participants,
    isNewConversation,
    status,
    error,
    nextSteps,
  } = useAppSelector((state: RootState) => state.conversation);

  const handleInitiateOrRetrieveConversation = async (
    participantId: string,
  ) => {
    try {
      await dispatch(
        initiateOrRetrieveConversation({ participantId }),
      ).unwrap();
    } catch (error) {
      console.error("Failed to initiate or retrieve conversation:", error);
    }
  };

  const handleResetConversation = () => {
    dispatch(resetConversationState());
  };

  return {
    initiateOrRetrieveConversation: handleInitiateOrRetrieveConversation,
    resetConversation: handleResetConversation,
    conversationId,
    participants,
    isNewConversation,
    status,
    error,
    nextSteps,
  };
};
