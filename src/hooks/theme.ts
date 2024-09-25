import { useAppSelector, useAppDispatch } from ".";
import type { RootState } from "../store";
import { setTheme, Theme } from "../store/slices/themeSlice";

export const useTheme = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const dispatch = useAppDispatch();

  const updateTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  };

  return { theme, setTheme: updateTheme };
};
