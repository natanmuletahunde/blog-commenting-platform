'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CallToAction from '@/components/CallToAction';
import Link from 'next/link';
import { Lock, Rocket, Code, Star } from 'lucide-react';

export default function Projects() {
  const [isPremium, setIsPremium] = useState(false); // later use your auth logic

  // 💼 Extended Project List
  const projects = [
    {
      id: 1,
      title: 'Personal Portfolio Website',
      description: 'Showcase your skills using HTML, CSS, and JavaScript.',
      link: 'https://github.com/topics/portfolio-website',
      premium: true,
    },
    {
      id: 2,
      title: 'Weather App',
      description: 'Display real-time weather data using OpenWeather API.',
      link: 'https://github.com/topics/weather-app',
      premium: true,
    },
    {
      id: 3,
      title: 'Chat Application',
      description: 'Real-time chat using Node.js, Express, and Socket.io.',
      link: 'https://github.com/topics/chat-app',
      premium: true,
    },
    {
      id: 4,
      title: 'E-commerce Dashboard',
      description: 'Full admin dashboard with product CRUD and analytics.',
      link: 'https://github.com/topics /ecommerce-dashboard',
      premium: true,
    },
    {
      id: 5,
      title: 'Blog Platform',
      description: 'Create a full-stack blog with authentication and comments.',
      link: 'https://github.com/topics/blog-platform',
      premium: true,
    },
    {
      id: 6,
      title: 'To-Do App',
      description: 'Simple and clean task manager using React and localStorage.',
      link: 'https://github.com/topics/todo-app',
      premium: true,
    },
    {
      id: 7,
      title: 'Finance Tracker',
      description: 'Track your expenses and income with Chart.js visualizations.',
      link: 'https://github.com/topics/expense-tracker',
      premium: true,
    },
    {
      id: 8,
      title: 'Recipe Finder',
      description: 'Search for recipes using an external API.',
      link: 'https://github.com/topics/recipe-app',
      premium: true,
    },
    {
      id: 9,
      title: 'AI Image Generator',
      description: 'Generate images using OpenAI API and display in gallery.',
      link: 'https://github.com/topics/ai-image-generator',
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
      {/* Header Section */}
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <Rocket className="w-8 h-8 text-green-500" /> Premium Projects
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl">
          Learn and build powerful apps — from portfolio websites to AI tools.
          All projects are premium. Upgrade with Chapa to unlock full access.
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-md hover:shadow-green-500/20 transition-all relative"
          >
            <div className="absolute top-3 right-3">
              <Lock
                className={`w-5 h-5 ${
                  isPremium ? 'text-green-500' : 'text-yellow-400'
                }`}
              />
            </div>

            <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>

            {!isPremium ? (
              <Button
                onClick={handleUpgrade}
                className="w-full bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all"
              >
                <Lock className="w-4 h-4 mr-2" /> Unlock with Chapa
              </Button>
            ) : (
              <Link href={project.link} target="_blank">
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
