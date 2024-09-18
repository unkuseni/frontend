import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { setTheme } from "@/store/slices/themeSlice";
import { RootState } from "@/store";

export function ModeToggle() {
	const dispatch = useDispatch();
	const theme = useSelector((state: RootState) => state.theme.theme);

	const handleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		dispatch(setTheme(newTheme));
	};

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={handleTheme}
			className='hover:bg-transparent hover:border-none dark:hover:bg-transparent dark:hover:border-none'
		>
			{theme === "dark" ? (
				<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
			) : (
				<Moon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
			)}

			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
