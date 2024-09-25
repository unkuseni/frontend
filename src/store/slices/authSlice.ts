import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api";
import { isAxiosError, AxiosError } from "axios";

export interface User {
  userId: string;
  username: string;
  email: string;
  isGuest?: boolean;
  canCall?: boolean;
  genderPreference?: string;
}

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  verificationInfo: {
    message: string;
    expiresIn: string;
  } | null;
  forgotPasswordStatus: "idle" | "loading" | "succeeded" | "failed";
  forgotPasswordError: string | null;
  guestInfo: {
    message: string;
    capabilities: string[];
  } | null;
  deleteUserStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteUserError: string | null;
  deleteUserInfo: {
    message: string;
    nextSteps: string[];
  } | null;
  tokenExpiresAt: number | null;
  updatePreferencesStatus: "idle" | "loading" | "succeeded" | "failed";
  updatePreferencesError: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  wasLoggedIn: boolean;

}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  verificationInfo: null,
  forgotPasswordStatus: "idle",
  forgotPasswordError: null,
  guestInfo: null,
  deleteUserStatus: "idle",
  deleteUserError: null,
  deleteUserInfo: null,
  tokenExpiresAt: null,
  updatePreferencesStatus: "idle",
  updatePreferencesError: null,
  isAuthenticated: false,
  loading: false,
  wasLoggedIn: false,
};
interface GuestAccessResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      isGuest: boolean;
      canCall: boolean;
      gender: string;
      genderPreference: string;
    };
  };
  tokenInfo: {
    expiresIn: string;
  };
  info: {
    message: string;
    capabilities: string[];
  };
}
interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    username: string;
    email: string;
  };
  verificationInfo?: {
    message: string;
    expiresIn: string;
  };
  errors?: {
    username?: string | null;
    email?: string | null;
    password?: string | null;
  };
}

interface LoginUserData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
  tokenInfo: {
    expiresIn: string;
  };
}

interface LogoutResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    logoutTime: string;
  };
  info: {
    message: string;
    nextSteps: string[];
  };
}

interface DeleteUserResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    username: string;
    email: string;
    deletedAt: string;
  };
  info: {
    message: string;
    nextSteps: string[];
  };
}

interface UpdatePreferencesResponse {
  message: string;
  genderPreference: string;
}

interface RejectValue {
  success: false;
  message: string;
  errors?: {
    username?: string | null;
    email?: string | null;
    password?: string | null;
  };
}

interface TokenValidityResponse {
  success: boolean;
  message: string;
  valid: boolean;
  data?: {
    userId: string;
    username: string;
    isGuest: boolean;
    canCall: boolean;
    expiresAt: string;
  };
}
interface TokenValidityError {
  success: false;
  message: string;
  valid: false;
}



interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface UpdatePasswordResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    username: string;
    updatedAt: string;
  };
  info: {
    message: string;
    nextSteps: string[];
  };
}

function storeToken(token: string) {
  sessionStorage.setItem("authToken", token);
}

export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserData,
  { rejectValue: RegisterUserResponse }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post<RegisterUserResponse>(
      "auth/register",
      userData,
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as RejectValue);
    }
    return rejectWithValue({
      success: false,
      message: "An unexpected error occurred",
    });
  }
});


export const checkTokenValidity = createAsyncThunk<
  TokenValidityResponse,
  void,
  { rejectValue: TokenValidityError }
>("auth/checkTokenValidity", async (_, { rejectWithValue }) => {
  try {
    const response = await api.post<TokenValidityResponse>('/api/auth/check-token');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<TokenValidityError>;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data);
      }
    }
    return rejectWithValue({
      success: false,
      message: "An unexpected error occurred",
      valid: false
    });
  }
});




export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginUserData,
  { rejectValue: RejectValue }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post<LoginResponse>("auth/login", userData);
    storeToken(response.data.data.token);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as RejectValue);
    }
    return rejectWithValue({
      success: false,
      message: "An unexpected error occurred during login",
    });
  }
});

export function clearToken() {
  return sessionStorage.removeItem("authToken");
}

export const getGuestAccess = createAsyncThunk<
  GuestAccessResponse,
  void,
  { rejectValue: RejectValue }
>("auth/getGuestAccess", async (_, { rejectWithValue }) => {
  try {
    const response = await api.post<GuestAccessResponse>("auth/guest-access", {
      gender: sessionStorage.getItem("gender"),
      genderPreference: sessionStorage.getItem("genderPreference"),
    });
    // Store the token in localStorage
    storeToken(response.data.data.token);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as RejectValue);
    }
    return rejectWithValue({
      success: false,
      message: "An unexpected error occurred while getting guest access",
    });
  }
});

export const updatePreferences = createAsyncThunk<
  UpdatePreferencesResponse,
  { genderPreference: string },
  { rejectValue: RejectValue }
>(
  "auth/updatePreferences",
  async ({ genderPreference }, { rejectWithValue }) => {
    try {
      const response = await api.put<UpdatePreferencesResponse>(
        "/update-preferences",
        { genderPreference },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as RejectValue);
      }
      return rejectWithValue({
        success: false,
        message: "An unexpected error occurred while updating preferences",
      });
    }
  },
);

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  { email: string },
  { rejectValue: RejectValue }
>("auth/forgotPassword", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await api.post<ForgotPasswordResponse>(
      "auth/forgot-password",
      { email },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as RejectValue);
    }
    return rejectWithValue({
      success: false,
      message:
        "An unexpected error occurred during the forgot password process",
    });
  }
});

export const logoutUser = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: { message: string } }
>("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const response = await api.post<LogoutResponse>("/auth/logout");
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue({
        message: error.response.data.message || "Logout failed",
      });
    }
    return rejectWithValue({
      message: "An unexpected error occurred during logout",
    });
  }
});

export const deleteUser = createAsyncThunk<
  DeleteUserResponse,
  void,
  { rejectValue: RejectValue }
>("auth/deleteUser", async (_, { rejectWithValue }) => {
  try {
    const response = await api.delete<DeleteUserResponse>("/auth/deleteuser");
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as RejectValue);
    }
    return rejectWithValue({
      success: false,
      message: "An unexpected error occurred while deleting the user",
    });
  }
});

// export const refreshToken = createAsyncThunk(
//   "auth/refreshToken",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.post<LoginResponse>("/auth/refresh-token");
//       localStorage.setItem("token", response.data.data.token);
//       return response.data;
//     } catch (error) {
//
//     }
//   }
// );

export const updatePassword = createAsyncThunk<
  UpdatePasswordResponse,
  UpdatePasswordData,
  { rejectValue: RejectValue }
>("auth/updatePassword", async (passwordData, { rejectWithValue }) => {
  try {
    const response = await api.put<UpdatePasswordResponse>(
      "/auth/updatepassword",
      passwordData,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as RejectValue);
    }
    return rejectWithValue({
      success: false,
      message: "An unexpected error occurred while updating password",
    });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.wasLoggedIn = true;
    },

    clearAuth: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.verificationInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkTokenValidity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkTokenValidity.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.valid;
        if (action.payload.data) {
          state.user = {
            userId: action.payload.data.userId,
            username: action.payload.data.username,
            email: '', // Provide a default empty string for email
            isGuest: action.payload.data.isGuest,
            canCall: action.payload.data.canCall,
          };
        } else {
          state.user = null;
        }
      })

      .addCase(checkTokenValidity.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message || "Failed to verify token";
      })

      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.verificationInfo = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterUserResponse>) => {
          state.status = "succeeded";
          if (action.payload.data) {
            state.user = {
              userId: action.payload.data.userId,
              username: action.payload.data.username,
              email: action.payload.data.email,
            };
          } else {
            state.user = null;
          }
          state.error = null;
          state.verificationInfo = action.payload.verificationInfo || null;
        },
      )

      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = "Failed to register";
        }
        state.user = null;
        state.verificationInfo = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(getGuestAccess.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getGuestAccess.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {
          userId: action.payload.data.user.id,
          username: action.payload.data.user.username,
          email: "", // Guest users don't have an email
          isGuest: action.payload.data.user.isGuest,
          canCall: action.payload.data.user.canCall,
        };
        state.error = null;
        state.guestInfo = action.payload.info;
      })

      .addCase(getGuestAccess.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to get guest access";
      })

      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
        state.verificationInfo = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Logout failed";
      })
      .addCase(updatePreferences.pending, (state) => {
        state.updatePreferencesStatus = "loading";
        state.updatePreferencesError = null;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.updatePreferencesStatus = "succeeded";
        if (state.user) {
          state.user.genderPreference = action.payload.genderPreference;
        }
        state.updatePreferencesError = null;
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.updatePreferencesStatus = "failed";
        state.updatePreferencesError =
          action.payload?.message || "Failed to update preferences";
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to update password";
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserStatus = "loading";
        state.deleteUserError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserStatus = "succeeded";
        state.user = null;
        state.deleteUserError = null;
        state.deleteUserInfo = action.payload.info;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserStatus = "failed";
        state.deleteUserError =
          action.payload?.message || "Failed to delete user";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordStatus = "loading";
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordStatus = "succeeded";
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordStatus = "failed";
        state.forgotPasswordError =
          action.payload?.message ||
          "Failed to process forgot password request";
      });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
