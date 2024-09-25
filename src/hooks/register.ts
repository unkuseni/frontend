import { useAppDispatch, useAppSelector } from ".";
import type { RootState } from "../store";
import { registerUser, deleteUser } from "../store/slices/authSlice";

interface UseAuth {
  user: {
    username: string;
    email: string;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  register: (userData: {
    username: string;
    email: string;
    password: string;
  }) => void;
}

interface UseDeleteUser {
  deleteUser: () => Promise<void>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  info: {
    message: string;
    nextSteps: string[];
  } | null;
}

export const useDeleteUser = (): UseDeleteUser => {
  const dispatch = useAppDispatch();
  const deleteUserStatus = useAppSelector(
    (state: RootState) => state.auth.deleteUserStatus,
  );
  const deleteUserError = useAppSelector(
    (state: RootState) => state.auth.deleteUserError,
  );
  const deleteUserInfo = useAppSelector(
    (state: RootState) => state.auth.deleteUserInfo,
  );

  const handleDeleteUser = async () => {
    try {
      await dispatch(deleteUser()).unwrap();
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return {
    deleteUser: handleDeleteUser,
    status: deleteUserStatus,
    error: deleteUserError,
    info: deleteUserInfo,
  };
};

export const useRegister = (): UseAuth => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const register = (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    dispatch(registerUser(userData));
  };

  return {
    user,
    status,
    error,
    register,
  };
};
