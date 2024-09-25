import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useDisclaimer } from "@/hooks/disclaimer";
import { useEffect } from "react";

interface DisclaimerDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

const DisclaimerDialog: React.FC<DisclaimerDialogProps> = ({
	isOpen,
	onClose,
}) => {
  const { agreed } = useDisclaimer();
  
  useEffect(() => {
    if (agreed) {
      // unmount this component
      onClose();
    }
  }, [agreed]);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]  w-[85vw] rounded-lg'>
				<DialogHeader>
					<DialogTitle>Disclaimer</DialogTitle>
					<DialogDescription>
						Please read our rules carefully.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className='mt-2 h-[60vh] pr-4'>
					<div className='space-y-4 text-sm'>
						<p className='font-semibold'>
							Important information! Violation of any of these rules will result
							in a lifetime block on your account, with no right to recover it.
							If you try to create new accounts, these will also be blocked.
						</p>
						<p className='font-semibold'>
							Important! Only sign in if you're over 18 years old and agree to
							our Privacy Policy and Cookies Policy. By using this site, you
							confirm you agree to our Terms and Conditions and Privacy Policy.
						</p>
						<h3 className='font-semibold'>Personalised content</h3>
						<p>
							We use cookies to personalise website content and deliver you the
							best possible experience. Find more details about Cookies Policy.
						</p>
						<h3 className='font-semibold'>Strictly prohibited:</h3>
						<ol className='list-decimal pl-5 space-y-2'>
							<li>Indicating you are underage.</li>
							<li>
								Sharing confidential information, including:
								<ul className='list-disc pl-5'>
									<li>Names and nicknames of users</li>
									<li>Any personal information</li>
									<li>Topics of conversation</li>
								</ul>
							</li>
							<li>Recording sound, photo or video communications.</li>
							<li>Begging for gifts by deception.</li>
							<li>Chatting with users who are underage.</li>
							<li>
								Using photos of people who are underage as profile pictures.
							</li>
							<li>
								Broadcasting video of minors, or sexual deviations banned by law
								(pedophilia, necrophilia, bestiality and so on). If you see
								material like this being broadcast, you must report it
								immediately. Failure to do so may result in your account being
								blocked.
							</li>
							<li>Using profanity in conversations.</li>
							<li>
								Posting or allowing to be posted statements of a discriminatory
								nature, calls for terrorist acts, the propagation of fascism or
								violence, and similar topics.
							</li>
						</ol>
					</div>
				</ScrollArea>
				<DialogFooter className='mt-4'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							I Understand and Agree
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DisclaimerDialog;
