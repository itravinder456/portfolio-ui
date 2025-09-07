"use client";
import React from "react";
import "./home.scss";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Props = {
  params?: { slug: string[] };
};

const Home = (props: Props) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-3xl home self-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Hi, I’m <span className="text-blue-400">Ravinder</span> <br />
          MERN Stack Developer
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
          Crafting scalable, modern, and user-friendly web applications with
          over{" "}
          <span className="font-semibold text-white">
            6 years of hands-on experience
          </span>
          .
          <br />
          Skilled in{" "}
          <span className="text-blue-300">
            React.js, Node.js, Express.js, MongoDB
          </span>
          , I build seamless user experiences and robust backend systems.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-medium shadow-lg hover:bg-blue-600 transition"
          >
            Explore My Work
          </Link>

          <Link
            href="/resume.pdf"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-white text-gray-900 font-medium shadow-lg border hover:bg-gray-100 transition download-resume"
          >
            Download Resume
          </Link>
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
    </>
  );
};

export default Home;
