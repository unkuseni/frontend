import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSubmitButton } from "./form-submit-btn";
import { useRegister } from "@/hooks/register";

const signUpSchema = z.object({
	username: z
		.string()
		.min(2, { message: "Username must be at least 2 characters." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." }),
});

export function SignUpForm() {
	const {
		register,
		status: registerStatus,
		error: registerError,
	} = useRegister();
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: { username: "", email: "", password: "" },
	});

	function onSubmit(values: z.infer<typeof signUpSchema>) {
		register(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='johndoe' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' placeholder='john@example.com' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder='********' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormSubmitButton
					isLoading={registerStatus === "loading"}
					loadingText='Creating Account...'
					defaultText='Create Account'
				/>
			</form>
		</Form>
	);
}
