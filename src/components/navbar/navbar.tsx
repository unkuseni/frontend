import { UserCircle } from "lucide-react";
import { ModeToggle } from "../mode-toggler";
import { Link } from "react-router-dom";

const Navbar: React.FC = ({ className = "" }: { className?: string }) => {
	return (
		<nav
			className={`${className} container rounded-xl mx-auto my-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 shadow-lg dark:from-slate-700 dark:to-slate-500 dark:text-slate-500`}
		>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-inter font-extrabold'>talkjoor</h1>
				</div>
				<div className='flex items-center gap-3 justify-center'>
					<Link
						to={"/profile"}
						className='w-9 h-9 flex items-center justify-center'
					>
						<UserCircle className='mx-auto h-[1.2rem] w-[1.2rem]' />
					</Link>
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
