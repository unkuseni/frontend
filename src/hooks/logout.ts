import { logoutUser, clearAuth, clearToken } from "../store/slices/authSlice";
import { useAppDispatch } from ".";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      clearToken();
      // Clear any other user-related data
      localStorage.removeItem("userData");

      dispatch(clearAuth());

      console.log("Logout next steps:", result.info.nextSteps);
    } catch (error) {
      console.error("Logout failed", error);
      // Even if the server request fails, we still want to clear the local state
      dispatch(clearAuth());
      clearToken();
      localStorage.removeItem("userData");
    }
  };

  return { logout };
};
