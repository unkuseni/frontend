import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

export interface Message {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  recipient: string;
  content: string;
  timestamp: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalMessages: number;
  messagesPerPage: number;
}

interface ChatHistoryState {
  messages: Message[];
  pagination: Pagination | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  nextSteps: string[] | null;
}

interface DeleteChatHistoryResponse {
  success: boolean;
  message: string;
  data: {
    deletedCount: number;
  };
  info: {
    nextSteps: string[];
  };
}

const initialState: ChatHistoryState = {
  messages: [],
  pagination: null,
  status: "idle",
  error: null,
  nextSteps: null,
};

interface ChatHistoryResponse {
  success: boolean;
  message: string;
  data: {
    messages: Message[];
    pagination: Pagination;
  };
  info: {
    nextSteps: string[];
  };
}

export const fetchChatHistory = createAsyncThunk<
  ChatHistoryResponse,
  { userId: string; page?: number; limit?: number },
  { rejectValue: { message: string } }
>(
  "chatHistory/fetch",
  async ({ userId, page = 1, limit = 50 }, { rejectWithValue }) => {
    try {
      const response = await api.get<ChatHistoryResponse>(
        `/connect/chat-history/${userId}`,
        {
          params: { page, limit },
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

export const deleteChatHistory = createAsyncThunk<
  DeleteChatHistoryResponse,
  { userId: string },
  { rejectValue: { message: string } }
>("chatHistory/delete", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await api.delete<DeleteChatHistoryResponse>(
      `/connect/chat-history/${userId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "An unexpected error occurred" });
  }
});

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    resetChatHistory: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload.data.messages;
        state.pagination = action.payload.data.pagination;
        state.nextSteps = action.payload.info.nextSteps;
        state.error = null;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch chat history";
      })
      .addCase(deleteChatHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteChatHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [];
        state.pagination = null;
        state.nextSteps = action.payload.info.nextSteps;
        state.error = null;
      })
      .addCase(deleteChatHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message || "Failed to delete chat history";
      });
  },
});

export const { resetChatHistory } = chatHistorySlice.actions;

export default chatHistorySlice.reducer;
