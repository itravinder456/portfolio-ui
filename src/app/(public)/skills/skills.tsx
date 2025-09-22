"use client";

import { motion } from "framer-motion";
import {
  Code,
  Server,
  Database,
  Wrench,
  Cloud,
  Network,
  TicketCheck,
  Star,
} from "lucide-react";
import { JSX, useState } from "react";
import Image from "next/image";
import "./skills.scss";
import { Skill, useSkills } from "@/services/skills";
import Loader from "@/components/Loader";

const categoryIcons: Record<string, JSX.Element> = {
  Frontend: <Code className="w-6 h-6 text-cyan-400" />,
  "State Management": <Network className="w-6 h-6 text-cyan-400" />,
  Cloud: <Cloud className="w-6 h-6 text-cyan-400" />,
  Backend: <Server className="w-6 h-6 text-cyan-400" />,
  Database: <Database className="w-6 h-6 text-cyan-400" />,
  Tools: <Wrench className="w-6 h-6 text-cyan-400" />,
  Testing: <TicketCheck className="w-6 h-6 text-cyan-400" />,
  Others: <Wrench className="w-6 h-6 text-cyan-400" />,
};

function SkillCircle({
  skill,
  isTop,
  hovered,
  setHovered,
}: {
  skill: Skill;
  isTop?: boolean;
  hovered: string | null;
  setHovered: (name: string | null) => void;
}) {
  const percent = Number(skill.level) || Number(skill.proficiency) || 0;
  const radius = 48;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex flex-col items-center group mx-2 my-4`}
      // onMouseEnter={() => setHovered(skill.name)}
      // onMouseLeave={() => setHovered(null)}
      style={{ minWidth: 120, minHeight: 120 }}
    >
      <div
        className={`relative w-28 h-28 rounded-full ${
          isTop ? "ring-4 ring-yellow-400/70 animate-pulse" : ""
        }`}
      >
        <svg className="w-28 h-28 -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
            fill="transparent"
          />
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
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
        {isTop && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
            <Star className="w-3 h-3 text-yellow-600" /> Top
          </span>
        )}
      </div>
      <p className="mt-3 text-white font-semibold">{skill.name}</p>
      {/* <p className="text-cyan-300 text-xs font-medium">{percent}%</p> */}
      {/* Tooltip */}
      {hovered === skill.name && skill.description && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute left-1/2 -translate-x-1/2 top-[110%] w-60 bg-white/10 backdrop-blur-lg text-gray-200 text-sm p-4 rounded-xl shadow-lg z-9999"
        >
          {skill.description || "No description available."}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: skillsData, isLoading } = useSkills();

  // Categorize skills from API
  const categories: Record<string, Skill[]> = {};
  const topSkills: Skill[] = [];

  if (skillsData && Array.isArray(skillsData)) {
    skillsData.forEach((skill) => {
      if (skill.isTopSkill) topSkills.push(skill);
      const cat = skill.category || "Others";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(skill);
    });
  }

  // Sort categories for consistent order
  const sortedCategoryKeys = Object.keys(categories);

  return (
    <section id="skills" className="h-max w-[95%] relative py-8 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          My{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Skills
          </span>
        </motion.h2>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", ...sortedCategoryKeys].map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Top Skills Row */}
        {isLoading ? (
          <Loader text="Fetching skills..." />
        ) : topSkills.length > 0 ? (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-yellow-300">
                Top Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-8 justify-center">
              {topSkills.map((skill) => (
                <SkillCircle
                  key={skill.name}
                  skill={skill}
                  isTop
                  hovered={hovered}
                  setHovered={setHovered}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* Category Cards */}
        <div className="grid gap-10 md:grid-cols-2">
          {isLoading ? (
            <></>
          ) : sortedCategoryKeys.length === 0 ? (
            <div className="text-gray-400">No skills found.</div>
          ) : (
            sortedCategoryKeys
              .filter(
                (category) =>
                  activeCategory === "All" || activeCategory === category
              )
              .map((category) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/5 backdrop-blur-lg shadow-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    {categoryIcons[category] || (
                      <Wrench className="w-6 h-6 text-cyan-400" />
                    )}
                    <h3 className="text-2xl font-semibold text-cyan-300">
                      {category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-8 justify-center">
                    {categories[category].map((skill) => (
                      <SkillCircle
                        key={skill.name}
                        skill={skill}
                        hovered={hovered}
                        setHovered={setHovered}
                      />
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
