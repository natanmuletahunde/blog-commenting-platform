export default function About() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
        <div className="max-w-3xl mx-auto p-6 text-center">
          {/* Header */}
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-teal-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-8">
            About Piv Blog
          </h1>

          {/* Description */}
          <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed flex flex-col gap-6">
            <p>
              Welcome to <span className="font-semibold text-foreground">Piv Blog</span> — a modern digital space where
              ideas, creativity, and technology come together. <span className="text-teal-500 font-medium">Piv Blog</span> is built
              for curious minds, passionate learners, and developers who want to grow, share knowledge, and stay inspired.
            </p>

            <p>
              The goal of <span className="font-semibold text-foreground">Piv Blog</span> is simple — to create a place where
              anyone interested in <span className="text-teal-500 font-semibold">web development, design, innovation, and technology</span>
              can find helpful articles, tutorials, insights, and motivation to become a better creator.
            </p>

            <p>
              You’ll discover carefully written posts about{" "}
              <span className="font-semibold text-foreground">Next.js, React.js, JavaScript, UI/UX design,</span> and
              modern tools shaping the future of the web. Whether you’re just starting your journey or already building
              amazing things, there’s always something new to learn here.
            </p>

            <p>
              <span className="font-semibold text-foreground">Piv Blog</span> is also a personal journal of growth — a space to document
              experiments, share experiences, and connect with people who share the same love for learning and building.
              It’s a reminder that technology isn’t just about code — it’s about creativity, problem-solving, and making an impact.
            </p>

            <p>
              This blog is built using{" "}
              <span className="text-purple-500 font-semibold">Next.js</span>,{" "}
              <span className="text-indigo-500 font-semibold">Tailwind CSS</span>, and{" "}
              <span className="text-pink-500 font-semibold">modern web technologies</span> — representing the heart of
              what it teaches: simplicity, performance, and beautiful design.
            </p>

            <p>
              If you want to explore the projects and code behind Piv Blog or connect with its creator,
              visit the GitHub page below to see more.
            </p>
          </div>

          {/* GitHub CTA */}
          <div className="mt-10">
            <a
              href="https://github.com/natanmuletahunde"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 via-purple-500 to-indigo-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              🚀 Explore Piv Blog on GitHub
            </a>
          </div>

          {/* Quote / Tagline */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 italic">
            <p>
              “Empowering developers, creators, and thinkers — one post at a time.”
            </p>
          </div>
        </div>
      </div>
    );
  }
