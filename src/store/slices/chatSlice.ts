import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "@/api";

interface ChatState {
  senderId: string | null;
  receiverId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  nextSteps: string[] | null;
}

const initialState: ChatState = {
  senderId: null,
  receiverId: null,
  status: "idle",
  error: null,
  nextSteps: null,
};

interface ChatResponse {
  success: boolean;
  message: string;
  data: {
    senderId: string;
    receiverId: string;
  };
  info: {
    nextSteps: string[];
  };
}

export const initiateChat = createAsyncThunk<
  ChatResponse,
  { receiverId: string },
  { rejectValue: { message: string } }
>("chat/initiate", async ({ receiverId }, { rejectWithValue }) => {
  try {
    const response = await api.post<ChatResponse>("/connect/chat", {
      receiverId,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "An unexpected error occurred" });
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChatState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateChat.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(initiateChat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.senderId = action.payload.data.senderId;
        state.receiverId = action.payload.data.receiverId;
        state.nextSteps = action.payload.info.nextSteps;
        state.error = null;
      })
      .addCase(initiateChat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to initiate chat";
      });
  },
});

export const { resetChatState } = chatSlice.actions;

export default chatSlice.reducer;
