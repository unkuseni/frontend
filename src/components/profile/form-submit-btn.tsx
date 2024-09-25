import React from "react";
import { Button } from "@/components/ui/button";

interface FormSubmitButtonProps {
	isLoading: boolean;
	loadingText: string;
	defaultText: string;
}

export const FormSubmitButton = React.forwardRef<
	HTMLButtonElement,
	FormSubmitButtonProps
>(({ isLoading, loadingText, defaultText }, ref) => {
	return (
		<Button type='submit' className='w-full' disabled={isLoading} ref={ref}>
			{isLoading ? loadingText : defaultText}
		</Button>
	);
});

FormSubmitButton.displayName = "FormSubmitButton";
