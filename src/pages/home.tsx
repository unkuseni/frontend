import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Video, Users, Shield, Zap } from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: <Video className="h-12 w-12 mb-4 mx-auto" />,
      title: "Instant connection",
      description: "no sign up required.",
    },
    {
      icon: <Users className="h-12 w-12 mb-4 mx-auto" />,
      title: "Text Options",
      description: "Text or video chat options available.",
    },
    {
      icon: <Shield className="h-12 w-12 mb-4 mx-auto" />,
      title: "Completely anonymous",
      description: "End-to-end encryption for your privacy. You can always be yourself or reinvent your identity",
    },
    {
      icon: <Zap className="h-12 w-12 mb-4 mx-auto" />,
      title: "Perfect for learning, work, and fun",
      description: "Perfect for practicing languages, sharing stories, or just killing time.",
    },
  ];

  return (
		<div className='min-h-screen bg-slate-50 dark:bg-slate-900'>
			{/* Hero Section */}
			<section className='container mx-auto px-4 py-20 text-center min-h-[70vh] flex flex-col items-center justify-center'>
				<h1 className='text-4xl md:text-6xl mb-6 text-slate-900 dark:text-slate-50 font-inter font-extrabold'>
					Welcome to talkjoor
				</h1>
				<p className='text-xl mb-8 text-slate-700 dark:text-slate-300'>
					where random connections spark spontaneous conversations
				</p>
				<Link to='/app'>
					<Button size='lg' className='text-lg px-8 py-4'>
						Enter App
					</Button>
				</Link>
			</section>

			{/* Features Section */}
			<section className='bg-slate-100 dark:bg-slate-800 py-20'>
				<div className='container mx-auto px-4'>
					<h2 className='text-xl sm:text-3xl font-bold mb-12 text-center text-slate-900 dark:text-slate-50'>
						Feeling bored? Craving a chat with someone new? Omegle lets you talk
						to strangers from around the world with just one click.
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{features.map((feature, index) => (
							<div
								key={index}
								className='bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md text-center'
							>
								{feature.icon}
								<h3 className='text-xl font-semibold mb-2 text-slate-900 dark:text-slate-50'>
									{feature.title}
								</h3>
								<p className='text-slate-700 dark:text-slate-300'>
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className='py-20'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold mb-12 text-center text-slate-900 dark:text-slate-50'>
						What Our Guests Say
					</h2>
					<Carousel className='max-w-xl mx-auto w-[75vw]'>
						<CarouselContent>
							{[
								"With talkjoor, you never know who you'll meet next. Will it be your new best friend? A kindred spirit from across the ocean? Or just an entertaining conversation to brighten your day?",
								"Take a chance on serendipity. Start chatting on talkjoor now and see where the conversation takes you!",
                "talkjoor is the best place to meet new people. I'm so glad I found it.",
								"I was feeling really lonely one day and stumbled upon talkjoor. I ended up talking to someone for hours and it really lifted my spirits. It's a great way to meet new people and make friends.",

							].map((testimonial, index) => (
								<CarouselItem key={index} className="flex items-center justify-center">
									<div className='bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md text-center'>
										<p className='text-lg italic text-slate-700 dark:text-slate-300'>
											{testimonial}
										</p>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious  className="translate-x-3/4"/>
						<CarouselNext className="-translate-x-3/4"/>
					</Carousel>
				</div>
			</section>

			{/* Call to Action */}
			<section className='bg-slate-900 dark:bg-slate-800 text-white py-20'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl font-bold mb-6'>Ready to get started?</h2>
					<p className='text-xl mb-8'>
						Join millions of users already enjoying Talkjoor.
					</p>
					<Link to='/app'>
						<Button
							size='lg'
							variant='outline'
							className='text-lg px-8 py-4 border-white text-black hover:bg-white hover:text-slate-900'
						>
							Launch Talkjoor
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
