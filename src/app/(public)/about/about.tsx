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
  Trophy,
  Star,
} from "lucide-react";
import "./about.scss";
import { useProfile } from "@/services/profile";
import Loader from "@/components/Loader";

// Helper to format date as "MMM YYYY"
function formatDate(date?: string | Date) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
}

type AchievementAwardItem = {
  title: string;
  description: string;
  date?: string | Date;
  company?: string;
  type: "Achievement" | "Award";
};

export default function About() {
  const { data: profile, isLoading } = useProfile();

  const personalInfo = [
    {
      icon: <User className="w-5 h-5 text-cyan-400" />,
      label: "First Name",
      value: profile?.firstName || "",
    },
    {
      icon: <User className="w-5 h-5 text-cyan-400" />,
      label: "Last Name",
      value: profile?.lastName || "",
    },
    {
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      label: "Nationality",
      value: "Indian",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-cyan-400" />,
      label: "Freelance",
      value: "Available",
      highlight: true,
    },
    {
      icon: <Phone className="w-5 h-5 text-cyan-400" />,
      label: "Phone",
      value: profile?.phone || "+91 9515295330",
    },
    {
      icon: <Mail className="w-5 h-5 text-cyan-400" />,
      label: "Email",
      value: profile?.email || "it.ravinder.456@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5 text-cyan-400" />,
      label: "Address",
      value: profile?.address || "Hyderabad, India",
    },
    {
      icon: <Languages className="w-5 h-5 text-cyan-400" />,
      label: "Languages",
      value: profile?.languages?.join(", ") || "English, Hindi, Telugu",
    },
  ];

  // Combine and split achievements and awards based on type
  const items: AchievementAwardItem[] = Array.isArray(profile?.achievements)
    ? (profile.achievements as AchievementAwardItem[]).map((item) => ({
        ...item,
        type: item.type ?? "Achievement", // Default to "Achievement" if type is missing
      }))
    : [];

  const achievements = items.filter((item) => item.type === "Achievement");
  const awards = items.filter((item) => item.type === "Award");

  return (
    <section id="about" className="h-max w-[95%] relative py-8 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </span>
        </motion.h1>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-6">
              Personal Info
            </h2>
            {isLoading ? (
              <Loader text="Fetching profile..." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition"
                  >
                    {info.icon}
                    <div>
                      <p className="text-sm text-gray-300">{info.label}</p>
                      <p
                        className={`font-semibold ${
                          info.highlight ? "text-green-400" : "text-white"
                        }`}
                      >
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <StatCard
              value={profile?.experience || "6+"}
              label="Years of Experience"
            />
            <StatCard
              value={profile?.projects || "11+"}
              label="Completed Projects"
            />
            <StatCard value={profile?.clients || "4+"} label="Happy Clients" />
            <StatCard
              value={awards.length !== undefined ? String(awards.length) : "4+"}
              label="Awards Won"
            />
          </motion.div>
        </div>

        {/* Achievements & Awards Split */}
        <div className="mt-20 grid md:grid-cols-2 gap-16">
          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-cyan-400" /> Achievements
            </h2>
            <div className="relative border-l border-cyan-500/50 pl-6 space-y-10">
              {achievements.length === 0 ? (
                <div className="text-gray-400">No achievements found.</div>
              ) : (
                achievements.map((ach, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className="relative pl-4"
                  >
                    <span className="absolute -left-[10px] top-2 w-4 h-4 bg-cyan-400 rounded-full shadow-md" />
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-white">
                        {ach.title}
                      </h3>
                      {ach.company && (
                        <span className="inline-block bg-cyan-500/20 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                          {ach.company}
                        </span>
                      )}
                      {ach.date && (
                        <span className="inline-block bg-white/10 text-cyan-200 text-xs font-medium px-2 py-0.5 rounded ml-2">
                          {formatDate(ach.date)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{ach.description}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
          {/* Awards */}
          <div>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-8 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-cyan-400" /> Awards
            </h2>
            <div className="relative border-l border-cyan-500/50 pl-6 space-y-10">
              {awards.length === 0 ? (
                <div className="text-gray-400">No awards found.</div>
              ) : (
                awards.map((award, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className="relative pl-4"
                  >
                    <span className="absolute -left-[10px] top-2 w-4 h-4 bg-cyan-400 rounded-full shadow-md" />
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-white">
                        {award.title}
                      </h3>
                      {award.company && (
                        <span className="inline-block bg-cyan-500/20 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                          {award.company}
                        </span>
                      )}
                      {award.date && (
                        <span className="inline-block bg-white/10 text-cyan-200 text-xs font-medium px-2 py-0.5 rounded ml-2">
                          {formatDate(award.date)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{award.description}</p>
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

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="backdrop-blur-lg bg-white/10 rounded-xl shadow-md p-6 text-center hover:bg-white/20 transition flex flex-col items-center justify-center"
    >
      <h3 className="text-3xl font-bold text-cyan-400">{value}</h3>
      <p className="text-gray-300 mt-2 text-sm uppercase">{label}</p>
    </motion.div>
  );
}
