import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignUpForm } from "./signup-form";
import { LoginForm } from "./login-form";

export function AuthForm() {
	const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");

	return (
		<Tabs
			value={activeTab}
			onValueChange={(value) => setActiveTab(value as "signup" | "login")}
		>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='signup'>Sign Up</TabsTrigger>
				<TabsTrigger value='login'>Login</TabsTrigger>
			</TabsList>
			<TabsContent value='signup'>
				<SignUpForm />
			</TabsContent>
			<TabsContent value='login'>
				<LoginForm />
			</TabsContent>
		</Tabs>
	);
}
