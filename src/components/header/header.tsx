import { Navbar } from "../Navbar/menu";
import { ModeToggle } from "../mode-toggler";

export const HomeHeader = () => {
	return (
		<div className=' p-4 text-white flex bg-blue-400 dark:bg-green-500 justify-between items-center'>
			<h1 className='font-allura font-extrabold text-3xl'>talkjoor</h1>

			<div className='flex items-center'>
				<Navbar />
				<ModeToggle />
			</div>
		</div>
	);
};
