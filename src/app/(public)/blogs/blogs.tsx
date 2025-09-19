"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import "./blogs.scss";

const blogs = [
  {
    title: "Mastering React Performance",
    date: "Aug 2024",
    category: "Tech",
    tags: ["React", "Optimization", "Frontend"],
    description:
      "Performance optimization in React apps is critical for creating smooth user experiences. In this article, I explore techniques such as memoization, code-splitting, lazy loading, and fine-tuning renders.",
    content:
      "React is powerful but can suffer performance issues if not optimized properly. In this blog, I deep dive into React.memo, useMemo, dynamic imports, React.lazy, and how to minimize re-renders with proper key management. I also share real-world lessons from large-scale apps where optimization boosted performance by 40%.",
  },
  {
    title: "Building Scalable APIs with Node.js",
    date: "Jul 2024",
    category: "Tech",
    tags: ["Node.js", "Backend", "API"],
    description:
      "Discover best practices for building robust, scalable APIs with Node.js and Express. Includes patterns for rate limiting, request validation, and modular architecture.",
    content:
      "Scaling APIs is a core backend skill. This post covers middleware design, request validation with Joi, authentication strategies, rate-limiting with Redis, and horizontal scaling with PM2 and Docker. I also explain how to secure APIs with JWT and deploy them efficiently to AWS.",
  },
  {
    title: "Journey into Freelancing",
    date: "Jun 2024",
    category: "Personal",
    tags: ["Career", "Freelance"],
    description:
      "Freelancing changed my perspective on work-life balance and client communication. Here's what I learned in my first year as a freelancer.",
    content:
      "Freelancing isn’t just coding—it’s also about managing clients, deadlines, and self-motivation. In this blog, I share the highs and lows of freelancing, how I landed my first clients, mistakes I made, and how I balance multiple projects while maintaining quality.",
  },
];

export default function Blogs() {
  const [filter, setFilter] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const filteredBlogs =
    filter === "All" ? blogs : blogs.filter((b) => b.category === filter);

  return (
    <section id="blogs" className="h-max w-[95%] relative py-8 rounded-2xl">
      <div className="max-w-6xl mx-auto px-6">
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
            Blogs
          </span>
        </motion.h2>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {["All", "Tech", "Personal"].map((cat) => (
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

        {/* Blogs Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {filteredBlogs.map((blog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedBlog(blog)}
              className="relative group backdrop-blur-lg bg-white/10 rounded-2xl shadow-lg p-6 border border-white/10 hover:border-cyan-400/40 hover:shadow-cyan-400/30 transition cursor-pointer"
            >
              <h4 className="text-xl font-semibold text-white mb-2">
                {blog.title}
              </h4>

              <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                <Calendar size={16} /> {blog.date}
              </div>

              <p className="text-gray-200 leading-relaxed mb-4 text-sm line-clamp-3">
                {blog.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-cyan-400/20 text-cyan-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl max-w-3xl w-full p-8 relative text-gray-100 overflow-y-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
              >
                <X size={24} />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedBlog.title}
              </h2>

              <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                <Calendar size={16} /> {selectedBlog.date}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedBlog.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-cyan-400/20 text-cyan-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Full Content */}
              <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                {selectedBlog.content}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
