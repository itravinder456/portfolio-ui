"use client";

import { motion } from "framer-motion";
import { Code, Server, Database, Wrench } from "lucide-react";
import { JSX, useState } from "react";
import Image from "next/image";
import "./skills.scss";
import { Skill, useSkills } from "@/services/skills";

const categoryIcons: Record<string, JSX.Element> = {
  Frontend: <Code className="w-6 h-6 text-cyan-400" />,
  Backend: <Server className="w-6 h-6 text-cyan-400" />,
  Database: <Database className="w-6 h-6 text-cyan-400" />,
  "Tools & Others": <Wrench className="w-6 h-6 text-cyan-400" />,
};

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { data: skillsData, isLoading } = useSkills();

  // Categorize skills from API
  const categories: Record<string, Skill[]> = {};
  const topSkills: Skill[] = [];

  if (skillsData && Array.isArray(skillsData)) {
    skillsData.forEach((skill) => {
      // Top skills
      if (skill.isTopSkill) {
        topSkills.push(skill);
      }
      // Categorize
      const cat = skill.category || "Others";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(skill);
    });
  }

  return (
    <section id="skills" className="h-max w-[95%] relative py-8 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          My{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Skills
          </span>
        </motion.h2>

        {/* Top Skills Highlight */}
        <div className="flex flex-wrap justify-center gap-10 mb-20 relative">
          {isLoading ? (
            <div className="text-white">Loading...</div>
          ) : topSkills.length === 0 ? (
            <div className="text-gray-400">No top skills found.</div>
          ) : (
            topSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center group"
                onMouseEnter={() => setHovered(skill.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative w-28 h-28">
                  {/* Circle Background */}
                  <svg className="w-28 h-28 -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 50}
                      strokeDashoffset={2 * Math.PI * 50}
                      animate={{
                        strokeDashoffset:
                          2 *
                          Math.PI *
                          50 *
                          (1 - (Number(skill.level) || 0) / 100),
                      }}
                      transition={{ duration: 1.2, delay: idx * 0.2 }}
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#06b6d4" /> {/* cyan */}
                        <stop offset="100%" stopColor="#3b82f6" /> {/* blue */}
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Icon in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {skill.iconUrl ? (
                      <Image
                        src={skill.iconUrl}
                        alt={skill.name}
                        width={40}
                        height={40}
                        className="w-10 h-10"
                        unoptimized
                      />
                    ) : (
                      <Code className="w-6 h-6 text-cyan-400" />
                    )}
                  </div>
                </div>
                <p className="mt-3 text-white font-semibold">{skill.name}</p>
                <p className="text-gray-400 text-sm">
                  {/* {skill.level || skill.proficiency || 0} */}
                </p>

                {/* Tooltip */}
                {hovered === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-24 w-60 bg-white/10 backdrop-blur-lg text-gray-200 text-sm p-4 rounded-xl shadow-lg"
                  >
                    {skill.description || "No description available."}
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Grid of categories */}
        <div className="grid md:grid-cols-2 gap-12">
          {isLoading ? (
            <div className="text-white">Loading...</div>
          ) : Object.keys(categories).length === 0 ? (
            <div className="text-gray-400">No skills found.</div>
          ) : (
            Object.entries(categories).map(([category, skillset], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-lg p-6 hover:bg-white/20 transition"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  {categoryIcons[category] || (
                    <Wrench className="w-6 h-6 text-cyan-400" />
                  )}
                  <h3 className="text-2xl font-semibold text-cyan-300">
                    {category}
                  </h3>
                </div>

                {/* Skill List */}
                <div className="space-y-5">
                  {skillset.map((skill: Skill, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-200 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {/* {skill.level || skill.proficiency || 0} */}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/40 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${skill.level || skill.proficiency || 0}%`,
                          }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
