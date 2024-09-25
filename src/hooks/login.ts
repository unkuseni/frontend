import { User, loginUser, getGuestAccess } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from ".";
import { RootState } from "@/store";

interface UseLogin {
  login: (userData: { email: string; password: string }) => Promise<void>;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface UseGuestAccess {
  getAccess: () => Promise<void>;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  guestInfo: {
    message: string;
    capabilities: string[];
  } | null;
}

export const useLogin = (): UseLogin => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const login = async (userData: { email: string; password: string }) => {
    try {
      await dispatch(loginUser(userData)).unwrap();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return {
    login,
    user,
    status,
    error,
  };
};
export const useGuestAccess = (): UseGuestAccess => {
  const dispatch = useAppDispatch();
  const { user, status, error, guestInfo } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const getAccess = async () => {
    try {
      await dispatch(getGuestAccess()).unwrap();
    } catch (error) {
      console.error("Failed to get guest access:", error);
    }
  };

  return {
    getAccess,
    user,
    status,
    error,
    guestInfo,
  };
};
