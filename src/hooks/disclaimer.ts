import {
  setDisclaimerAgreed,
  resetDisclaimerAgreement,
} from "../store/slices/disclaimerSlice";
import { useAppDispatch, useAppSelector } from ".";
import type { RootState } from "../store";
export const useDisclaimer = () => {
  const dispatch = useAppDispatch();
  const agreed = useAppSelector((state: RootState) => state.disclaimer.agreed);

  const agreeToDisclaimer = () => {
    dispatch(setDisclaimerAgreed());
  };

  const resetAgreement = () => {
    dispatch(resetDisclaimerAgreement());
  };

  return {
    agreed,
    agreeToDisclaimer,
    resetAgreement,
  };
};
