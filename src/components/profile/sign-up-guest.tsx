import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useGuestAccess } from "@/hooks/login";
import { AuthForm } from "./auth-form";

export function SignUpOrGuest({ onAuthSuccess }: { onAuthSuccess: () => void }) {
	const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
	const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const {
		getAccess: getGuestAccess,
		status: guestStatus,
		error: guestError,
	} = useGuestAccess();

	async function continueAsGuest() {
		await getGuestAccess();
	}

	const showErrorDialog = (message: string) => {
		setErrorMessage(message);
		setIsErrorDialogOpen(true);
	};

	useEffect(() => {
		if (guestError) showErrorDialog(guestError);
	}, [guestError]);

	return (
		<div className='flex flex-col sm:flex-row justify-evenly gap-3 items-center'>
			<Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
				<DialogTrigger asChild>
					<Button variant='default'>Sign Up / Login</Button>
				</DialogTrigger>
				<DialogContent className='max-w-[90vw] sm:max-w-[425px] rounded-xl'>
					<DialogHeader>
						<DialogTitle>Account Access</DialogTitle>
					</DialogHeader>
					<AuthForm />
				</DialogContent>
			</Dialog>

			<Button
				variant='default'
				onClick={continueAsGuest}
				disabled={guestStatus === "loading"}
			>
				{guestStatus === "loading" ? "Processing..." : "Continue as Guest"}
			</Button>

			<Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
				<DialogContent className='rounded-xl sm:max-w-[425px] max-w-[90vw]'>
					<DialogHeader>
						<DialogTitle>Error</DialogTitle>
					</DialogHeader>
					<p>{errorMessage}</p>
					<DialogFooter>
						<Button onClick={() => setIsErrorDialogOpen(false)}>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
