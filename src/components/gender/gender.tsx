import { useState } from "react";
import { useGender } from "@/hooks/gender";
import LoadingScreen from "@/components/anims/loading-screen";
import { Button } from "../ui/button";
import {
	HandCoins as Male,
	HandHeart as Female,
	Users as Both,
} from "lucide-react";

interface GenderSetupProps {
	onComplete: () => void;
}

const GenderSetup: React.FC<GenderSetupProps> = ({ onComplete }) => {
	const [showGenderSelector, setShowGenderSelector] = useState(true);
	const [showLoading, setShowLoading] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const { gender, preference, setGender, setPreference } = useGender();
	const [step, setStep] = useState<"gender" | "preference">("gender");

	const handleGenderSelection = () => {
		if (step === "gender") {
			setStep("preference");
		} else {
			handleGuestAccess();
		}
	};

	const handleGuestAccess = () => {
		if (!gender || !preference) {
			alert("Please select both gender and preference before continuing.");
			return;
		}

		setIsProcessing(true);
		setShowGenderSelector(false);
		setShowLoading(true);

		setTimeout(() => {
			setShowLoading(false);
			setIsProcessing(false);
			onComplete();
		}, 3000);
	};

	if (showLoading) {
		return <LoadingScreen message='Setting up your profile...' />;
	}

	return (
		<div>
			{showGenderSelector && (
				<div className='fixed inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900'>
					<div className='flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg'>
						<h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center'>
							{step === "gender"
								? "Select Your Gender"
								: "Select Your Preference"}
						</h2>
						{step === "gender" ? (
							<div className='flex space-x-4 sm:space-x-6 md:space-x-8'>
								<GenderButton
									onClick={() => setGender("male")}
									isSelected={gender === "male"}
									icon={Male}
									label='Male'
									color='blue'
								/>
								<GenderButton
									onClick={() => setGender("female")}
									isSelected={gender === "female"}
									icon={Female}
									label='Female'
									color='pink'
								/>
							</div>
						) : (
							<div className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8'>
								<GenderButton
									onClick={() => setPreference("male")}
									isSelected={preference === "male"}
									icon={Male}
									label='Male'
									color='blue'
								/>
								<GenderButton
									onClick={() => setPreference("female")}
									isSelected={preference === "female"}
									icon={Female}
									label='Female'
									color='pink'
								/>
								<GenderButton
									onClick={() => setPreference("both")}
									isSelected={preference === "both"}
									icon={Both}
									label='Both'
									color='purple'
								/>
							</div>
						)}
						{((step === "gender" && gender) ||
							(step === "preference" && preference)) && (
							<Button
								onClick={handleGenderSelection}
								className='mt-4 bg-green-500 hover:bg-green-600 text-white px-6 sm:px-7 md:px-8 py-2 rounded-full text-base sm:text-lg'
								disabled={isProcessing}
							>
								{isProcessing ? "Processing..." : "Continue"}
							</Button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

interface GenderButtonProps {
	onClick: () => void;
	isSelected: boolean;
	icon: React.ElementType;
	label: string;
	color: string;
}

const GenderButton: React.FC<GenderButtonProps> = ({
	onClick,
	isSelected,
	icon: Icon,
	label,
	color,
}) => (
	<Button
		onClick={onClick}
		variant={isSelected ? "default" : "outline"}
		className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex flex-col items-center justify-center space-y-2 ${
			isSelected
				? `bg-${color}-500 hover:bg-${color}-600`
				: `hover:bg-${color}-100 dark:hover:bg-${color}-900`
		}`}
	>
		<Icon className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12' />
		<span className='text-sm sm:text-base md:text-lg'>{label}</span>
	</Button>
);

export default GenderSetup;
