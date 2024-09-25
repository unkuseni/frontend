import { createSlice } from "@reduxjs/toolkit";

interface DisclaimerState {
  agreed: boolean;
}

const initialState: DisclaimerState = {
  agreed: false,
};

const disclaimerSlice = createSlice({
  name: "disclaimer",
  initialState,
  reducers: {
    setDisclaimerAgreed: (state) => {
      state.agreed = true;
      localStorage.setItem("disclaimerAgreed", "true");
    },
    resetDisclaimerAgreement: (state) => {
      state.agreed = false;
      localStorage.setItem("disclaimerAgreed", "false");
    },
  },
});

export const { setDisclaimerAgreed, resetDisclaimerAgreement } =
  disclaimerSlice.actions;
export default disclaimerSlice.reducer;
