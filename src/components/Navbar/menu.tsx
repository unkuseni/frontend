import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { useAppSelector, useToggle } from "@/hooks";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface NavbarProps {
	list: { name: string; path: string }[];
}

export const Navbar: React.FC<NavbarProps> = ({
	list = [
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
		{ name: "Contact", path: "/contact" },
	],
}) => {
	const isMenuOpen = useAppSelector((state) => state.menuToggle.isOpen);
	const { toggleMenu } = useToggle();

	const [isMobile, setIsMobile] = useState(false);

	const checkMobile = useCallback(() => {
		const newIsMobile = window.innerWidth < 768;
		if (newIsMobile !== isMobile) {
			setIsMobile(newIsMobile);
			if (isMenuOpen) {
				toggleMenu();
			}
		}
	}, [isMobile, isMenuOpen, toggleMenu]);

	useEffect(() => {
		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, [checkMobile]);

	const menuVariants = {
		closed: { opacity: 0, x: "-100%" },
		open: { opacity: 1, x: 0 },
	};

	return (
		<nav className='relative z-10'>
			<div className='flex items-center justify-between p-4'>
				{isMobile ? (
					<Button onClick={toggleMenu} variant='ghost' size='icon' className="hover:bg-transparent hover:border-none  dark:hover:bg-transparent dark:hover:border-none" >
						<Menu className='h-6 w-6' />
					</Button>
				) : (
					<ul className='flex space-x-4'>
						{list.map((item, index) => (
							<li key={index}>
								<Link
									to={item.path}
									className='hover:text-primary transition-colors'
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
			<AnimatePresence>
				{isMenuOpen && isMobile && (
					<motion.div
						initial='closed'
						animate='open'
						exit='closed'
						variants={menuVariants}
						transition={{ duration: 0.3 }}
						className='fixed inset-0 bg-background/95 backdrop-blur-sm'
					>
						<div className='flex flex-col h-full p-4'>
							<div className='flex justify-end'>
								<Button onClick={toggleMenu} variant='ghost' size='icon'>
									<X className='h-6 w-6' />
								</Button>
							</div>
							<div className='flex flex-col items-center justify-center flex-grow'>
								{list.map((item, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
									>
										<Link
											to={item.path}
											className='text-2xl py-2 hover:text-primary transition-colors'
											onClick={toggleMenu}
										>
											{item.name}
										</Link>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};
