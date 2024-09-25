import { useAppDispatch, useAppSelector } from ".";
import type { RootState } from "../store";
import { setGender, setPreference } from "../store/slices/genderSlice";
import { updatePreferences } from "../store/slices/authSlice";

export const useGender = () => {
  const dispatch = useAppDispatch();
  const gender = useAppSelector((state: RootState) => state.gender.gender);
  const preference = useAppSelector(
    (state: RootState) => state.gender.preference,
  );

  const updateGender = (newGender: "male" | "female" | null) => {
    dispatch(setGender(newGender));
  };

  const updatePreference = (
    newPreference: "male" | "female" | "both" | null,
  ) => {
    dispatch(setPreference(newPreference));
  };

  return {
    gender,
    preference,
    setGender: updateGender,
    setPreference: updatePreference,
  };
};

interface UseUpdatePreferences {
  updateUserPreferences: () => Promise<boolean>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const useUpdatePreferences = (): UseUpdatePreferences => {
  const dispatch = useAppDispatch();
  const { updatePreferencesStatus, updatePreferencesError } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const preference = useAppSelector(
    (state: RootState) => state.gender.preference,
  );

  const updateUserPreferences = async (): Promise<boolean> => {
    if (!preference) {
      console.error("No gender preference set");
      return false;
    }

    try {
      await dispatch(
        updatePreferences({ genderPreference: preference }),
      ).unwrap();
      return true;
    } catch (error) {
      console.error("Failed to update preferences:", error);
      return false;
    }
  };

  return {
    updateUserPreferences,
    status: updatePreferencesStatus,
    error: updatePreferencesError,
  };
};
