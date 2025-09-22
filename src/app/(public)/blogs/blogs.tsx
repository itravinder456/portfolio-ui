"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { BlogItem, useBlogs } from "@/services/blogs";
import "./blogs.scss";
import { formatDate } from "@/lib/helper";
import Loader from "@/components/Loader";

export default function Blogs() {
  const [filter, setFilter] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  // Fetch blogs from API
  const { data: blogs, isLoading, isError } = useBlogs();

  // Ensure blogs is always an array to avoid undefined errors
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  // Get unique categories from blogs
  const categories = [
    "All",
    ...Array.from(new Set(safeBlogs.map((b: BlogItem) => b.category))),
  ];

  const filteredBlogs =
    filter === "All"
      ? safeBlogs
      : safeBlogs.filter((b: BlogItem) => b.category === filter);

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

        {/* Loading/Error */}
        {isLoading && <Loader text="Fetching blogs..." />}
        {isError && (
          <div className="text-center text-red-400 py-12">
            Failed to load blogs.
          </div>
        )}

        {/* Filters */}
        {!isLoading && !isError && (
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((cat) => (
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
        )}

        {/* Blogs Grid */}
        {!isLoading && !isError && (
          <div className="grid md:grid-cols-2 gap-10">
            {filteredBlogs.map((blog: BlogItem, idx: number) => (
              <motion.div
                key={blog.id || idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedBlog(blog)}
                className="relative group backdrop-blur-lg bg-white/10 rounded-2xl shadow-lg p-6 border border-white/10 hover:border-cyan-400/40 hover:shadow-cyan-400/30  cursor-pointer"
              >
                <h4 className="text-xl font-semibold text-white mb-2">
                  {blog.title}
                </h4>

                <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                  <Calendar size={16} /> {formatDate(blog.publishedDate)}
                </div>

                <p className="text-gray-200 leading-relaxed mb-4 text-sm line-clamp-3">
                  {blog.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {blog.tags?.map((tag: string, i: number) => (
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
        )}
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
                <Calendar size={16} /> {formatDate(selectedBlog.publishedDate)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedBlog.tags?.map((tag: string, i: number) => (
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
                {selectedBlog.summary}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
