"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import "./project.scss";

const projects = [
  {
    title: "Fleet Manager – GE HealthCare (PCS)",
    role: "Full-Stack Developer",
    duration: "2 Years (2022-24)",
    environment: "React.js, Node.js, Redux.js, Jest, MUI",
    description:
      "Fleet Manager helps healthcare facilities overcome operational challenges. It supports patient monitoring across devices, consolidates service strategies, and improves uptime, processes, and patient care.",
    category: "Professional",
    links: { github: "https://github.com/", live: "https://example.com" },
  },
  {
    title: "iDestination – An Area Information Tool",
    role: "Full-Stack Developer",
    duration: "1 Year (2021-22)",
    environment: "React.js, Node.js, Webpack, ElasticCache, MySQL, AntD",
    description:
      "A complete guide providing information on community, education, housing, and activities for cities worldwide. Designed to support employees and students relocating to new areas.",
    category: "Professional",
    links: { github: "https://github.com/", live: "https://example.com" },
  },
  {
    title: "Notifii – Community App",
    role: "Full-Stack Developer",
    duration: "1 Year (2021)",
    environment: "React.js, Node.js, MongoDB, MySQL",
    description:
      "Notifii is a package tracking software designed for residential communities, universities, and corporate campuses, streamlining delivery notifications and community interactions.",
    category: "Professional",
    links: { github: "https://github.com/", live: "https://example.com" },
  },
  {
    title: "Portfolio Website",
    role: "Full-Stack Developer",
    duration: "2023",
    environment: "Next.js, Tailwind, Node.js",
    description:
      "Designed and developed my personal portfolio website to showcase projects, experience, and skills with an elegant modern UI.",
    category: "Personal",
    links: { github: "https://github.com/", live: "https://example.com" },
  },
  {
    title: "AI-Powered Report Manager",
    role: "MERN Developer",
    duration: "2024",
    environment: "React, Node.js, MongoDB, DynamoDB, Firebase, SendGrid",
    description:
      "A report management web app with role-based access, notifications, file uploads to AWS S3, and AI-driven analytics for enterprise usage.",
    category: "Personal",
    links: { github: "https://github.com/", live: "https://example.com" },
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((proj) => proj.category === filter);

  return (
    <section id="projects" className="h-max w-[95%] relative py-8 rounded-2xl">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900 mb-12"
        >
          My <span className="text-blue-600">Projects</span>
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          {["All", "Professional", "Personal"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {filteredProjects.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold text-gray-900">
                {proj.title}
              </h4>
              <p className="text-sm text-gray-500 mb-2">
                {proj.role} • {proj.duration}
              </p>
              <p className="text-sm text-gray-600 italic mb-3">
                {proj.environment}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {proj.description}
              </p>

              {/* Links */}
              <div className="flex space-x-4">
                {proj.links.github && (
                  <a
                    href={proj.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    <Github size={20} />
                  </a>
                )}
                {proj.links.live && (
                  <a
                    href={proj.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
