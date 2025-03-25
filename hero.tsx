import { Button } from "@/components/ui/button"
import { Code, Server, Trophy, Award, BarChart, Share2, Brain, Layers, LineChart } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="w-full bg-black text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Master coding challenges with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Aiodev</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              A comprehensive problem-solving platform for frontend and backend challenges with an integrated IDE,
              automated testing, and AI assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 h-auto text-lg">
                Book a Demo
              </Button>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-950/20 px-8 py-6 h-auto text-lg"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-purple-500/10">
            <Image
              src="/placeholder.svg?height=500&width=700"
              alt="Aiodev Platform Interface"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="text-purple-500">🔥</span> Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="h-6 w-6 text-purple-500" />}
              title="Problem-solving System"
              description="Structured challenges covering frontend and backend development"
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6 text-purple-500" />}
              title="Interactive IDE"
              description="Integrated Sandpack for real-time coding with syntax highlighting"
            />
            <FeatureCard
              icon={<Server className="h-6 w-6 text-purple-500" />}
              title="Automated Testing"
              description="Instant feedback on your code with comprehensive test suites"
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-purple-500" />}
              title="AI Assistant"
              description="AI-powered coding assistant for hints and guidance"
            />
            <FeatureCard
              icon={<Trophy className="h-6 w-6 text-purple-500" />}
              title="Leaderboards"
              description="Competitive rankings based on performance metrics"
            />
            <FeatureCard
              icon={<Award className="h-6 w-6 text-purple-500" />}
              title="Badges & Achievements"
              description="Gamified learning with skill-based recognition"
            />
            <FeatureCard
              icon={<LineChart className="h-6 w-6 text-purple-500" />}
              title="Personalized Learning"
              description="Adaptive challenge recommendations based on your skills"
            />
            <FeatureCard
              icon={<Share2 className="h-6 w-6 text-purple-500" />}
              title="Collaborative Features"
              description="Code sharing, peer reviews, and team challenges"
            />
            <FeatureCard
              icon={<BarChart className="h-6 w-6 text-purple-500" />}
              title="Analytics Dashboard"
              description="Detailed progress tracking and skill assessment"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

