import { ModeToggle } from "@/components/mode-toggler";
import { HomeHeader } from "@/components/header/header";
import { Navbar } from "@/components/Navbar/menu";


const Home = () => {
	return (
    <>
      <HomeHeader/>
      <div>Welcome to talkjoor</div>
      <ModeToggle />
		</>
	);
};

export default Home;
