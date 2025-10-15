'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CallToAction from '@/components/CallToAction';
import Link from 'next/link';
import { Lock, Unlock, Rocket, Code, Star } from 'lucide-react';

export default function Projects() {
  const [isPremium, setIsPremium] = useState(false); // replace with your auth logic later

  // 🧱 Example project data
  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Build your personal portfolio using HTML, CSS, and JS.',
      premium: true,
    },
    {
      id: 2,
      title: 'Weather App',
      description: 'Use APIs to display real-time weather data with JavaScript.',
      premium: true,
    },
    {
      id: 3,
      title: 'Chat Application',
      description: 'Create a real-time chat app using Node.js and Socket.io.',
      premium: true,
    },
    {
      id: 4,
      title: 'E-commerce Dashboard',
      description: 'Full admin dashboard with authentication and product CRUD.',
      premium: true,
    },
  ];

  // 💰 Redirect user to Chapa checkout
  const handleUpgrade = async () => {
    try {
      const res = await fetch('/api/payment/init', { method: 'POST' });
      const data = await res.json();

      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert('Failed to start payment. Try again later.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 py-12 px-5">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <Rocket className="w-8 h-8 text-green-500" /> Projects
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl">
          Build fun and engaging projects while learning HTML, CSS, and JavaScript!
          All of these projects are premium — unlock them with Chapa to gain full access.
        </p>

        {!isPremium && (
          <Button
            onClick={handleUpgrade}
            className="mt-6 bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl shadow-lg transition-all"
          >
            <Star className="mr-2 w-4 h-4" /> Upgrade with Chapa (ETB 200)
          </Button>
        )}
      </div>

      {/* 🧩 Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-5 bg-gray-900 border border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all relative"
          >
            <div className="absolute top-3 right-3">
              <Lock
                className={`w-5 h-5 ${
                  isPremium ? 'text-green-500' : 'text-yellow-400'
                }`}
              />
            </div>

            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>

            {/* 🔒 All Premium Projects Redirect to Chapa */}
            {!isPremium ? (
              <Button
                onClick={handleUpgrade}
                className="w-full border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white transition-all"
              >
                <Lock className="w-4 h-4 mr-2" /> Unlock with Chapa
              </Button>
            ) : (
              <Link href={`/projects/${project.id}`}>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all">
                  <Code className="w-4 h-4 mr-2" /> View Project
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* 🚀 Call To Action Section */}
      <div className="max-w-4xl mx-auto w-full mt-20">
        <CallToAction />
      </div>
    </div>
  );
}
