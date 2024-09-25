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
import { useLogin } from "@/hooks/login";

const loginSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
	const { login, status: loginStatus, error: loginError } = useLogin();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		await login(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
					isLoading={loginStatus === "loading"}
					loadingText='Logging in...'
					defaultText='Login'
				/>
			</form>
		</Form>
	);
}
