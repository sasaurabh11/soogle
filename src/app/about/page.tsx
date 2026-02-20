import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Socials from "@/components/Socials";

export default function About() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Profile Photo */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div 
              className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-accent shadow-xl overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url("bg-photo.jpg")` }}
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="space-y-2">
              <span className="text-accent font-mono text-lg">Software Engineer</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Hi, I'm <span className="text-accent">Saurabh Jaiswar</span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                BTech in Computer Science from IIIT Vadodara with expertise in full-stack development and AI solutions. 
                Passionate about building intelligent systems and scalable applications that solve real-world problems.
              </p>
            </div>

            {/* Experience Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-accent font-semibold mb-2">Software Developer Intern @ Zuvees</h3>
                <p className="text-gray-300 text-sm">
                  Worked on Optimizing E-Commerce Plateform
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-accent font-semibold mb-2">Software Developer Intern @ Nervesparks</h3>
                <p className="text-gray-300 text-sm">
                  Engineered AI-powered Teaching Agent.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-accent font-semibold mb-2">Software Engineer Intern @ Connexa</h3>
                <p className="text-gray-300 text-sm">
                  Built global professional search tool.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Technical Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript", "TypeScript", "React.js", "Next.js", 
                  "Node.js", "Python", "Flask", "FastAPI", "MongoDB", "Docker", "AI/ML",
                  "RAG Architecture", "WebSockets", "CI/CD"
                ].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/search?q=Saurabh-projects"
                className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Explore My Projects
              </Link>
              
              <a href="/Saurabh_Resume.pdf" download className="flex items-center justify-center gap-2 border border-accent text-accent hover:bg-accent/10 px-6 py-3 rounded-lg font-medium transition-colors">
                <span>Download CV</span>
                <FiDownload className="text-lg" />
              </a>
              
              <div className="flex items-center justify-center">
                <Socials 
                  containerStyles="flex gap-4"
                  iconStyles="w-10 h-10 border border-accent rounded-full flex justify-center items-center text-accent hover:bg-accent hover:text-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-16 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Notable Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "ICPC Regionalist", value: "2025", desc: "Qualified among top teams in India" },
              { title: "LeetCode Knight", value: "Top 1.6%", desc: "Max Rating: 2070" },
              { title: "CodeChef 4★", value: "Global Rank 5446", desc: "Out of 233,000" },
              { title: "Problems Solved", value: "2100+", desc: "Across all platforms" },
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-accent/20 to-accent/5 p-5 rounded-xl text-center">
                <p className="text-accent text-sm font-medium">{item.title}</p>
                <p className="text-white text-2xl font-bold my-2">{item.value}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}