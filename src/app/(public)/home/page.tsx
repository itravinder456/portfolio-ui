"use client";
import React, { useState } from "react";
import "./home.scss";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, X, Loader2 } from "lucide-react";
import { useProfile, useGenerateResume } from "@/services/profile";

const Home = () => {
  const { data: profile } = useProfile();
  const generateResumeMutation = useGenerateResume();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Download handler
  const handleDownloadResume = async () => {
    try {
      const blob = await generateResumeMutation.mutateAsync({});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Ravinder-Varikuppala-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: unknown) {
      let message = "Failed to generate resume. Please try again.";
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message?: string }).message === "string"
      ) {
        message += `\n${(error as { message: string }).message}`;
      }
      setErrorMsg(message);
      setShowErrorModal(true);
    }
  };

  const closeErrorModal = () => setShowErrorModal(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-3xl home self-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Hi, I’m{" "}
          <span className="text-blue-400">
            {profile?.firstName || "Ravinder"}
          </span>{" "}
          <br />
          {profile?.title || "MERN Stack Developer"}
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
          {profile?.summary ? (
            profile.summary
          ) : (
            <>
              Crafting scalable, modern, and user-friendly web applications with
              over{" "}
              <span className="font-semibold text-white">
                {profile?.yearsOfExperience || 6} years of hands-on experience
              </span>
              .<br />
              Skilled in{" "}
              <span className="text-blue-300">
                {profile?.homePageSkills
                  ?.slice(0, profile.homePageSkills.length - 1)
                  .join(", ")}{" "}
                and{" "}
                {profile?.homePageSkills?.[profile.homePageSkills.length - 1]}
              </span>
              , I build seamless user experiences and robust backend systems.
            </>
          )}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-medium shadow-lg hover:bg-blue-600 transition"
          >
            Explore My Work
          </Link>

          <motion.button
            type="button"
            onClick={handleDownloadResume}
            disabled={generateResumeMutation.status === "pending"}
            whileHover={{ scale: 1.07, boxShadow: "0 0 0 4px #22d3ee44" }}
            whileTap={{ scale: 0.97 }}
            animate={
              generateResumeMutation.status === "pending"
                ? { scale: [1, 1.08, 1], boxShadow: "0 0 0 6px #38bdf8aa" }
                : { scale: 1, boxShadow: "none" }
            }
            transition={
              generateResumeMutation.status === "pending"
                ? { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            className={`px-6 py-3 rounded-2xl bg-white text-gray-900 font-medium shadow-lg border hover:bg-gray-20 transition download-resume flex items-center justify-center gap-2 relative overflow-hidden ${
              generateResumeMutation.status === "pending"
                ? "cursor-wait opacity-80"
                : ""
            }`}
          >
            {generateResumeMutation.status === "pending" ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Generating...
              </>
            ) : (
              "Download Resume"
            )}
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 flex justify-center w-full z-10"
      >
        <Link href="/experience" aria-label="Scroll Down">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-2 rounded-full border-2 border-gray-300 text-gray-300 hover:border-white hover:text-white transition"
          >
            <ChevronDown size={28} />
          </motion.div>
        </Link>
      </motion.div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center relative"
          >
            <button
              onClick={closeErrorModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-cyan-400"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <div className="mb-4">
              <X className="mx-auto text-red-400" size={40} />
            </div>
            <h4 className="text-2xl font-bold mb-2 text-gray-800">
              Failed to Generate Resume
            </h4>
            <p className="text-gray-600 mb-2 whitespace-pre-line">{errorMsg}</p>
            <button
              onClick={closeErrorModal}
              className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow hover:opacity-90 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Home;
