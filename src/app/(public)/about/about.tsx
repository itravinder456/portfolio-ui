"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Award,
  User,
  Globe,
  Briefcase,
  MapPin,
  Languages,
} from "lucide-react";
import "./about.scss";

export default function About() {
  const personalInfo = [
    {
      icon: <User className="w-5 h-5 text-blue-500" />,
      label: "First Name",
      value: "Ravinder",
    },
    {
      icon: <User className="w-5 h-5 text-blue-500" />,
      label: "Last Name",
      value: "Varikuppala",
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      label: "Nationality",
      value: "Indian",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-blue-500" />,
      label: "Freelance",
      value: "Available",
      highlight: true,
    },
    {
      icon: <Phone className="w-5 h-5 text-blue-500" />,
      label: "Phone",
      value: "+91 9515295330",
    },
    {
      icon: <Mail className="w-5 h-5 text-blue-500" />,
      label: "Email",
      value: "it.ravinder.456@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5 text-blue-500" />,
      label: "Address",
      value: "Hyderabad, India",
    },
    {
      icon: <Languages className="w-5 h-5 text-blue-500" />,
      label: "Languages",
      value: "English, Hindi, Telugu",
    },
  ];

  // Achievements data
  const achievements = [
    {
      title: "A-TEAM SPOT ON",
      description:
        "Awarded for delivering the product to the client ahead of schedule.",
    },
    {
      title: "2× Problem Solver Gracias",
      description:
        "Recognized for solving critical hotfixes swiftly at LTIMindtree.",
    },
    {
      title: "Super Crew",
      description: "Honored for outstanding teamwork and delivery excellence.",
    },
  ];

  return (
    <section id="about" className="h-max w-[95%] relative py-8 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900 mb-16"
        >
          <span className="text-blue-800">About </span>
          <span>Me</span>
        </motion.h1>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Personal Info */}
          <div className="space-y-6">
            {/* <h2 className="text-2xl font-semibold text-gray-700">
              Personal Infos
            </h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border- hover:shadow-md transition"
                >
                  {info.icon}
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p
                      className={`font-semibold ${
                        info.highlight ? "text-green-600" : "text-gray-800"
                      }`}
                    >
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-6">
            <StatCard value="6+" label="Years of Experience" />
            <StatCard value="11+" label="Completed Projects" />
            <StatCard value="4+" label="Happy Clients" />
            <StatCard value="4+" label="Awards Won" />
          </div>
        </div>

        {/* Achievements & Awards */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-700 mb-8 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-500" /> Achievements & Awards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((ach, idx) => (
              <AchievementCard
                key={idx}
                title={ach.title}
                description={ach.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white border- rounded-xl shadow-md p-6 text-center"
    >
      <h3 className="text-3xl font-bold text-blue-500">{value}</h3>
      <p className="text-gray-600 mt-2 text-sm uppercase">{label}</p>
    </motion.div>
  );
}

function AchievementCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white border- rounded-xl shadow-md p-6 flex flex-col items-start gap-3 hover:shadow-lg transition"
    >
      <Award className="w-8 h-8 text-blue-500" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}
