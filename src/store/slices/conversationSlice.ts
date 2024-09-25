import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

interface ConversationState {
  conversationId: string | null;
  participants: string[] | null;
  isNewConversation: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  nextSteps: string[] | null;
}

const initialState: ConversationState = {
  conversationId: null,
  participants: null,
  isNewConversation: false,
  status: "idle",
  error: null,
  nextSteps: null,
};

interface ConversationResponse {
  success: boolean;
  message: string;
  data: {
    conversationId: string;
    participants: string[];
    isNewConversation: boolean;
  };
  info: {
    nextSteps: string[];
  };
}

export const initiateOrRetrieveConversation = createAsyncThunk<
  ConversationResponse,
  { participantId: string },
  { rejectValue: { message: string } }
>(
  "conversation/initiateOrRetrieve",
  async ({ participantId }, { rejectWithValue }) => {
    try {
      const response = await api.post<ConversationResponse>(
        "/connect/conversation",
        {
          participantId,
        },
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  },
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    resetConversationState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateOrRetrieveConversation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(initiateOrRetrieveConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversationId = action.payload.data.conversationId;
        state.participants = action.payload.data.participants;
        state.isNewConversation = action.payload.data.isNewConversation;
        state.nextSteps = action.payload.info.nextSteps;
        state.error = null;
      })
      .addCase(initiateOrRetrieveConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Failed to initiate or retrieve conversation";
      });
  },
});

export const { resetConversationState } = conversationSlice.actions;

export default conversationSlice.reducer;
