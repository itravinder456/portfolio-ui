"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Briefcase, User, X, Layers } from "lucide-react";
import "./project.scss";
import { useProjects } from "@/services/projects";

function ProjectCard({
  proj,
  index,
  onClick,
}: {
  proj: any;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="relative group backdrop-blur-lg bg-white/10 rounded-2xl shadow-lg p-6 border border-white/10 hover:border-cyan-400/40 hover:shadow-cyan-400/30 transition cursor-pointer"
    >
      <h4 className="text-xl font-semibold text-white mb-1">{proj.title}</h4>
      <p className="text-sm text-gray-400 mb-2">
        {proj.role} • {proj.duration}
      </p>
      <p className="text-sm text-cyan-300 italic mb-3">
        {proj.environment || proj.techStack?.join(", ")}
      </p>
      <p className="text-gray-200 leading-relaxed mb-4 text-sm line-clamp-3">
        {proj.description}
      </p>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition pointer-events-none"></div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: any;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl max-w-2xl w-full p-8 relative text-gray-100"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
          >
            <X size={24} />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            {project.title}
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {project.role} • {project.duration}
          </p>

          {/* Environment */}
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-cyan-400" />
            <p className="text-sm text-cyan-300 italic">
              {project.environment || project.techStack?.join(", ")}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-200 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-6">
            {(project.repoLink || project.links?.github) && (
              <a
                href={project.repoLink || project.links?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition text-sm"
              >
                <Github size={18} /> GitHub
              </a>
            )}
            {(project.liveLink || project.links?.live) && (
              <a
                href={project.liveLink || project.links?.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:opacity-90 transition text-sm text-white"
              >
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const { data: projectsData, isLoading } = useProjects();

  const categories = ["Professional", "Personal"];

  const projects = projectsData || [];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter(
          (proj) => proj.type === filter || proj.category === filter
        );

  return (
    <section id="projects" className="h-max w-[95%] relative py-8 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          My{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {["All", ...categories].map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileTap={{ scale: 0.9 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md"
                  : "bg-white/10 text-gray-200 hover:bg-white/20"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Sections */}
        {categories.map((cat) => {
          const sectionProjects =
            filter === "All"
              ? projects.filter((p) => p.type === cat || p.category === cat)
              : filteredProjects.filter(
                  (p) => p.type === cat || p.category === cat
                );

          if (isLoading) {
            return (
              <div key={cat} className="text-white mb-16">
                Loading...
              </div>
            );
          }

          if (!sectionProjects.length) return null;

          return (
            <div key={cat} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                {cat === "Professional" ? (
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                ) : (
                  <User className="w-6 h-6 text-cyan-400" />
                )}
                <h3 className="text-2xl font-semibold text-white">
                  {cat} Projects
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {sectionProjects.map((proj, idx) => (
                  <ProjectCard
                    proj={proj}
                    index={idx}
                    key={proj.id || proj._id || idx}
                    onClick={() => setSelectedProject(proj)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
