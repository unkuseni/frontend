import { toggleMenu } from "../store/slices/menuSlice";
import { useAppDispatch } from "./index";
export const useToggle = () => {
  const dispatch = useAppDispatch();
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };
  return { toggleMenu: handleToggleMenu };
};
