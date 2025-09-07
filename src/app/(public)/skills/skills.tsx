"use client";

import { motion } from "framer-motion";
import "./skills.scss";

const skills = {
  Frontend: [
    { name: "React.js", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 80 },
    { name: "JavaScript (ES6+)", level: 95 },
  ],
  Backend: [
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 85 },
    { name: "REST APIs", level: 90 },
    { name: "GraphQL", level: 70 },
  ],
  Database: [
    { name: "MongoDB", level: 90 },
    { name: "MySQL", level: 85 },
    { name: "PostgreSQL", level: 75 },
  ],
  "Tools & Others": [
    { name: "Git & GitHub", level: 95 },
    { name: "Docker", level: 70 },
    { name: "AWS (S3, EC2)", level: 75 },
    { name: "Firebase", level: 80 },
  ],
};

export default function Skills() {
  return (
    <section id="skills" className="h-max w-[95%] relative py-8 rounded-2xl">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900 mb-16"
        >
          My <span className="text-blue-600">Skills</span>
        </motion.h2>

        {/* Grid of categories */}
        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(skills).map(([category, skillset], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {category}
              </h3>
              <div className="space-y-5">
                {skillset.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="h-3 rounded-full bg-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
