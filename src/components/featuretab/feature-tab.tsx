import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoCall from "../videocall/video-call";
import Chat from "../chat/chat";

import { useState } from "react";

export const FeatureTab = () => {
	const [activeTab, setActiveTab] = useState<"video" | "chat">("video");

	return (
		<div className="p-5 flex-grow">
			<Tabs
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as "video" | "chat")}
			>
				<TabsContent value='video' className='bg-blue-600'>
					<VideoCall />
				</TabsContent>
				<TabsContent value='chat' className='bg-red-600'>
					<Chat />
				</TabsContent>
				<TabsList className='grid max-w-[350px] grid-cols-2 mx-auto mt-5'>
					<TabsTrigger value='video'>Video</TabsTrigger>
					<TabsTrigger value='chat'>Chat</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
};
