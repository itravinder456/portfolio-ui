"use client";

import { motion } from "framer-motion";
import "./experience.scss";
import { Briefcase, BriefcaseBusiness, GraduationCap } from "lucide-react";

const experiences = [
  {
    company: "EPAM",
    roles: [
      {
        role: "Senior Software Engineer",
        period: "Nov 2024 - Present",
        description:
          "Working on full‑stack web applications, collaborating with cross‑functional teams to deliver client solutions and improvements.",
      },
    ],
  },
  {
    company: "LTIMindtree",
    roles: [
      {
        role: "Specialist - Software Engineering",
        period: "Nov 2022 - Oct 2024",
        description:
          "Leading daily client communications, managing sprint planning, and internal grooming of web applications. Responsible for systems design, development, testing, implementation, documentation and support.",
      },
      {
        role: "Module Lead",
        period: "Sep 2022 - Nov 2022",
        description:
          "Handled client communications and project status updates. Managed sprint planning and technical implementations for web applications based on client requirements.",
      },
    ],
  },
  {
    company: "DevRabbit IT Solutions Pvt Ltd",
    roles: [
      {
        role: "Senior Developer",
        period: "Jan 2021 - Sep 2022",
        description:
          "Responsible for end-to-end product delivery from requirement analysis to release. Worked as an Application Developer on large scale projects.",
      },
      {
        role: "Junior Developer",
        period: "Sep 2019 - Dec 2020",
        description:
          "Developed features for large-scale applications, focusing on front-end functionality and state management. Collaborated in an agile team to deliver product increments.",
      },
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Technology: Computer Science & Engineering",
    school: "Guru Nanak Institution's Technical Campus, Hyderabad",
    period: "2016 - 2019",
    description:
      "Completed B.Tech in Computer Science with focus on software development and engineering principles.",
  },
  {
    degree: "Diploma: Computer Science & Engineering",
    school: "Govt Polytechnic Masab tank, Hyderabad",
    period: "2013 - 2016",
    description:
      "Foundation in computer science fundamentals and practical programming skills.",
  },
  {
    degree: "Schooling: ZPHS Pochampally",
    school: "ZPHS Pochampally, Nalgonda",
    period: "2013",
    description: "Completed high school education with a focus on science.",
  },
];

function getCompanyPeriod(roles: { period: string }[]) {
  try {
    // assume roles are sorted newest -> oldest; compute overall range from oldest start to newest end
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
  return (
    <section
      id="experience-education"
      className="h-max w-[95%] relative py-8 rounded-2xl"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900 mb-16"
        >
          My <span className="text-blue-600">Journey</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center md:text-left">
              Experience
            </h3>

            <div className="space-y-8">
              {experiences.map((company, index) => {
                const companyPeriod = getCompanyPeriod(company.roles);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    viewport={{ once: true }}
                    className="relative bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-md hover:shadow-lg transition"
                  >
                    {/* Company header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">
                          {company.company}
                        </h4>
                        <p className="text-sm text-gray-500">{companyPeriod}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                          {company.roles.length} role
                          {company.roles.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Roles timeline */}
                    <div className="relative pl-6">
                      <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-gray-200" />
                      <div className="space-y-6">
                        {company.roles.map((role, rIndex) => {
                          const isCurrent = rIndex === 0;
                          return (
                            <div key={rIndex} className="relative flex gap-4">
                              {/* marker */}
                              <div className="relative z-10">
                                {/* <span
                                  className={`block w-4 h-4 rounded-full border-2 border-white shadow-md left-[-22px] absolute ${
                                    isCurrent ? "bg-blue-500" : "bg-white"
                                  }`}
                                /> */}

                                <span
                                  className={`work-bubble absolute left-[-30px]   w-8 h-8 rounded-full border- border-white shadow-sm flex items-center justify-center text-white ${
                                    isCurrent ? "bg-blue-500" : "bg-white"
                                  }`}
                                >
                                  <BriefcaseBusiness
                                    className={`${
                                      isCurrent ? "" : "text-gray-500"
                                    }`}
                                    size={"1rem"}
                                  />
                                </span>
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h5
                                    className={`text-lg font-semibold ${
                                      isCurrent
                                        ? "text-blue-600"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {role.role}
                                  </h5>
                                  <p className="text-sm text-gray-500">
                                    {role.period}
                                  </p>
                                </div>

                                <p className="mt-2 text-gray-700 leading-relaxed">
                                  {role.description}
                                </p>

                                {/* promotion hint */}
                                {rIndex < company.roles.length - 1 && (
                                  <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                                    <svg
                                      className="w-3 h-3 text-gray-400"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 12h14M12 5l7 7-7 7"
                                      />
                                    </svg>
                                    <span>
                                      Promoted from{" "}
                                      {company.roles[rIndex + 1].role
                                        .split("(")[0]
                                        .trim()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center md:text-left">
              Education
            </h3>
            <div className="relative border-l-4 border-green-500 pl-6 space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="relative">
                  <span className="education-bubble absolute -left-[42.75px] top-1 w-8 h-8 rounded-full bg-green-500 border-2 border-white shadow-sm flex items-center justify-center text-white">
                    <GraduationCap fontSize={"1.5rem"} />
                  </span>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {edu.degree}
                        </h4>
                        <p className="text-sm text-gray-600">{edu.school}</p>
                      </div>
                      <p className="text-sm text-gray-500">{edu.period}</p>
                    </div>
                    <p className="mt-2 text-gray-700 text-sm">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
