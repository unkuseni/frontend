import { FeatureTab } from "@/components/featuretab/feature-tab";
import Navbar from "@/components/navbar/navbar";

const Main = () => {
	return (
		<>
			<div className='flex flex-col h-screen justify-between p-5'>
				<div className="sticky top-0">

        <Navbar />
				</div>
        <FeatureTab />
			</div>
		</>
	);
};

export default Main;
