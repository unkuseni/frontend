import { useAppDispatch, useAppSelector } from ".";
import type { RootState } from "@/store";
import { initiateCall } from "@/store/slices/callSlice";

export const useInitiateCall = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { roomId, receiverId, status, error, nextSteps } = useAppSelector(
    (state: RootState) => state.call,
  );

  const handleInitiateCall = async (receiverId: string) => {
    if (!user?.userId) {
      console.error("User not authenticated");
      return;
    }
    try {
      await dispatch(
        initiateCall({ senderId: user.userId, receiverId }),
      ).unwrap();
    } catch (error) {
      console.error("Failed to initiate call:", error);
    }
  };

  return {
    initiateCall: handleInitiateCall,
    roomId,
    senderId: user?.userId,
    receiverId,
    status,
    error,
    nextSteps,
  };
};
