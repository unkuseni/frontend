import api from "@/api";
import { isAxiosError } from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CallState {
  roomId: string | null;
  senderId: string | null;
  receiverId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  nextSteps: string[] | null;
}

const initialState: CallState = {
  roomId: null,
  senderId: null,
  receiverId: null,
  status: "idle",
  error: null,
  nextSteps: null,
};

interface InitiateCallResponse {
  success: boolean;
  message: string;
  data: {
    roomId: string;
    senderId: string;
    receiverId: string;
  };
  info: {
    nextSteps: string[];
  };
}

export const initiateCall = createAsyncThunk<
  InitiateCallResponse,
  { senderId: string; receiverId: string },
  { rejectValue: { message: string } }
>(
  "call/initiateCall",
  async ({ senderId, receiverId }, { rejectWithValue }) => {
    try {
      const response = await api.post<InitiateCallResponse>("/connect/call", {
        senderId,
        receiverId,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue({
          message: error.response.data.message || "Failed to initiate call",
        });
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  },
);

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    resetCallState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateCall.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(initiateCall.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roomId = action.payload.data.roomId;
        state.senderId = action.payload.data.senderId;
        state.receiverId = action.payload.data.receiverId;
        state.nextSteps = action.payload.info.nextSteps;
        state.error = null;
      })
      .addCase(initiateCall.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to initiate call";
      });
  },
});

export const { resetCallState } = callSlice.actions;

export default callSlice.reducer;
