import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Gender = "male" | "female" | null;
type Preference = "male" | "female" | "both" | null;

interface GenderState {
  gender: Gender;
  preference: Preference;
}

const getInitialState = (): GenderState => {
  const savedGender = localStorage.getItem("gender");
  const savedPreference = localStorage.getItem("genderPreference");
  return {
    gender: (savedGender as Gender) || null,
    preference: (savedPreference as Preference) || null,
  };
};

const genderSlice = createSlice({
  name: "gender",
  initialState: getInitialState(),
  reducers: {
    setGender: (state, action: PayloadAction<Gender>) => {
      state.gender = action.payload;
      if (action.payload) {
        sessionStorage.setItem("gender", action.payload);
      } else {
        sessionStorage.removeItem("gender");
      }
    },
    setPreference: (state, action: PayloadAction<Preference>) => {
      state.preference = action.payload;
      if (action.payload) {
        sessionStorage.setItem("genderPreference", action.payload);
      } else {
        sessionStorage.removeItem("genderPreference");
      }
    },
    updateFromUser: (
      state,
      action: PayloadAction<{ gender?: Gender; preference?: Preference }>,
    ) => {
      if (action.payload.gender) {
        state.gender = action.payload.gender;
        sessionStorage.setItem("gender", action.payload.gender);
      }
      if (action.payload.preference) {
        state.preference = action.payload.preference;
        sessionStorage.setItem("genderPreference", action.payload.preference);
      }
    },
  },
});

export const { setGender, setPreference, updateFromUser } = genderSlice.actions;
export default genderSlice.reducer;
