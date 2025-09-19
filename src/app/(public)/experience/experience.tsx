"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import "./experience.scss";
import { useExperiences } from "@/services/experiences";

function getCompanyPeriod(roles: { period: string }[]) {
  try {
    const newest = roles[0].period.split(" - ").slice(-1)[0] || roles[0].period;
    const oldest =
      roles[roles.length - 1].period.split(" - ")[0] ||
      roles[roles.length - 1].period;
    return `${oldest} — ${newest}`;
  } catch {
    return roles.map((r) => r.period).join(", ");
  }
}

export default function ExperienceEducation() {
  const { data, isLoading } = useExperiences();
  const experiences = data?.experiences || [];
  const education = data?.education || [];

  return (
    <section
      id="experience-education"
      className="h-max w-[95%] relative py-8 rounded-2xl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          My{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Journey
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <div>
            <h3 className="text-2xl font-semibold text-cyan-300 mb-8 flex items-center gap-2">
              <BriefcaseBusiness className="w-6 h-6" /> Experience
            </h3>

            <div className="relative border-l border-cyan-500/40 pl-6 space-y-10">
              {isLoading ? (
                <div className="text-white">Loading...</div>
              ) : experiences.length === 0 ? (
                <div className="text-gray-400">No experiences found.</div>
              ) : (
                experiences.map((company: any, index: number) => {
                  const companyPeriod =
                    company.roles && company.roles.length > 0
                      ? getCompanyPeriod(company.roles)
                      : "";
                  return (
                    <motion.div
                      key={company._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      {/* Timeline marker */}
                      <span className="absolute -left-[36px] top-1 w-6 h-6 rounded-full bg-cyan-400 shadow-md flex items-center justify-center text-white text-xs">
                        <BriefcaseBusiness size={14} />
                      </span>

                      {/* Company Card */}
                      <div className="backdrop-blur-lg bg-white/10 rounded-xl p-5 shadow-md hover:bg-white/20 transition">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-white">
                            {company.company}
                          </h4>
                          <p className="text-sm text-gray-300">
                            {companyPeriod}
                          </p>
                        </div>
                        {company.location && (
                          <p className="text-xs text-gray-400 mb-2">
                            {company.location}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {company.technologies?.map(
                            (tech: string, tIdx: number) => (
                              <span
                                key={tIdx}
                                className="bg-cyan-600/30 text-cyan-200 px-2 py-1 rounded text-xs"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                        {/* Roles inside company */}
                        <div className="space-y-5">
                          {company.roles?.map((role: any, rIndex: number) => (
                            <div
                              key={rIndex}
                              className="border-l border-gray-600 pl-4"
                            >
                              <div className="flex items-center justify-between">
                                <h5 className="text-md font-semibold text-cyan-300">
                                  {role.role}
                                </h5>
                                <p className="text-xs text-gray-400">
                                  {role.period}
                                </p>
                              </div>
                              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                                {role.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <h3 className="text-2xl font-semibold text-cyan-300 mb-8 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" /> Education
            </h3>

            <div className="relative border-l border-green-500/40 pl-6 space-y-10">
              {isLoading ? (
                <div className="text-white">Loading...</div>
              ) : education.length === 0 ? (
                <div className="text-gray-400">No education found.</div>
              ) : (
                education.map((edu: any, idx: number) => (
                  <motion.div
                    key={edu._id || idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Timeline marker */}
                    <span className="absolute -left-[36.75px] top-1 w-6 h-6 rounded-full bg-green-500 shadow-md flex items-center justify-center text-white text-xs">
                      <GraduationCap size={14} />
                    </span>

                    {/* Education Card */}
                    <div className="backdrop-blur-lg bg-white/10 rounded-xl p-5 shadow-md hover:bg-white/20 transition">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-md font-bold text-white">
                          {edu.degree}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {edu.startYear && edu.endYear
                            ? `${edu.startYear} - ${edu.endYear}`
                            : edu.period || ""}
                        </p>
                      </div>
                      <p className="text-sm text-cyan-200">{edu.field}</p>
                      <p className="text-sm text-gray-300">
                        {edu.institution || edu.school}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {edu.description}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
