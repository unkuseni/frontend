import { useAppDispatch, useAppSelector } from ".";
import { RootState } from "../store";
import { useState } from "react";
import { updatePassword, forgotPassword } from "../store/slices/authSlice";

interface PasswordUpdateState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

interface UseForgotPassword {
  forgotPassword: (email: string) => Promise<void>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const usePasswordUpdate = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  const authError = useAppSelector((state: RootState) => state.auth.error);

  const [state, setState] = useState<PasswordUpdateState>({
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const updateUserPassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    setState({ isLoading: true, error: null, isSuccess: false });
    try {
      const result = await dispatch(
        updatePassword({ currentPassword, newPassword }),
      ).unwrap();
      setState({ isLoading: false, error: null, isSuccess: true });
      // Optionally, you can do something with the result.info or result.data
      console.log(result.info.nextSteps);
      return true;
    } catch (error) {
      setState({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        isSuccess: false,
      });
      return false;
    }
  };

  const resetState = () => {
    setState({ isLoading: false, error: null, isSuccess: false });
  };

  return {
    updateUserPassword,
    resetState,
    isLoading: state.isLoading,
    error: state.error,
    isSuccess: state.isSuccess,
    authStatus,
    authError,
  };
};

export const useForgotPassword = (): UseForgotPassword => {
  const dispatch = useAppDispatch();
  const forgotPasswordStatus = useAppSelector(
    (state: RootState) => state.auth.forgotPasswordStatus,
  );
  const forgotPasswordError = useAppSelector(
    (state: RootState) => state.auth.forgotPasswordError,
  );

  const handleForgotPassword = async (email: string) => {
    try {
      await dispatch(forgotPassword({ email })).unwrap();
    } catch (error) {
      console.error("Forgot password process failed:", error);
    }
  };

  return {
    forgotPassword: handleForgotPassword,
    status: forgotPasswordStatus,
    error: forgotPasswordError,
  };
};
