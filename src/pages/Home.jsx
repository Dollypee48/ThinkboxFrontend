import { Link } from "react-router-dom";
import heroImg from "../assets/thinkbox-illustration.png";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-purple-700 mb-4 leading-tight">
              Welcome to ThinkBox 🧠
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-md mx-auto md:mx-0">
              Your AI-powered hub for structured problem solving. Capture ideas, break down challenges,
              and organize your thoughts with smart notes and PDF exports.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {user ? (
                <>
                  <Link
                    to="/submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-medium shadow-md"
                  >
                    Submit a Problem
                  </Link>
                  <Link
                    to="/problems"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded font-medium shadow-md"
                  >
                    My Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-medium shadow-md"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded font-medium shadow-md"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={heroImg}
              alt="ThinkBox illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Core Tools */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">✨ Core Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Feature icon="📝" title="Rich Notes" desc="Capture and refine ideas, drafts, and action plans." />
          <Feature icon="📄" title="Export to PDF" desc="Download organized reports for team reviews or documentation." />
          <Feature icon="📌" title="Problem Tracker" desc="View, edit, and manage all your submitted problems easily." />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-8 bg-purple-600 text-white">
        <h2 className="text-3xl font-bold text-center mb-10">⚙️ How It Works</h2>
        <div className="grid gap-8 max-w-5xl mx-auto md:grid-cols-3 text-center">
          <div className="p-6 bg-purple-500 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">1. Submit a Problem</h3>
            <p className="text-sm">Describe your challenge, idea, or project to start capturing insights.</p>
          </div>
          <div className="p-6 bg-purple-500 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">2. Take Notes</h3>
            <p className="text-sm">Record observations, solutions, plans, and iterations as you think through.</p>
          </div>
          <div className="p-6 bg-purple-500 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">3. Download & Share</h3>
            <p className="text-sm">Export notes to PDF, share ideas with others, or revisit anytime.</p>
          </div>
        </div>
      </section>

      {/* Why Choose ThinkBox */}
      <section className="py-16 px-8 bg-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Why Choose ThinkBox?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Whether you're solving personal challenges, planning a business idea, or managing academic work —
            ThinkBox helps you break things down and move forward clearly.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-6">
          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-md">
            <li>Organize messy thoughts with structured notes.</li>
            <li>Capture key points, plans, and next steps effectively.</li>
            <li>Download summaries or reports with a single click.</li>
            <li>Perfect for students, entrepreneurs, and professionals.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-purple-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
