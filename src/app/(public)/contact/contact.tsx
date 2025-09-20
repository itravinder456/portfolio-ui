"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, X } from "lucide-react";
import { useState } from "react";
import { useSendContact } from "@/services/contact";
import { useProfile } from "@/services/profile";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    cc: false,
  });
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const mutation = useSendContact();

  // Fetch profile data
  const { data: profile } = useProfile();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && "checked" in target
          ? (target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      cc: formData.cc,
    };
    mutation.mutate(payload, {
      onSuccess: (data) => {
        if (data.success) {
          setStatus("✅ Message sent successfully!");
          setFormData({ name: "", email: "", message: "", cc: false });
          setShowModal(true);
          setTimeout(() => {
            setStatus("");
          }, 2000);
        } else {
          setStatus("❌ Failed to send. Try again later.");
        }
      },
      onError: (error) => {
        console.error("Error sending message:", error);
        setStatus("❌ Something went wrong.");
      },
    });
  };

  const closeModal = () => setShowModal(false);

  return (
    <section id="contact" className="h-max w-[95%] relative py-8 rounded-2xl">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Left Info */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-lg p-8 border border-white/10">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Let’s Connect
          </h3>
          <p className="text-gray-300 mb-6">{profile?.contactPageSummary}</p>
          <div className="space-y-4 text-gray-300">
            <p className="flex items-center gap-3">
              <Mail className="text-cyan-400" />
              <a
                href={profile?.email ? `mailto:${profile.email}` : undefined}
                className="hover:underline text-cyan-300"
                target="_blank"
              >
                {profile?.email}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="text-cyan-400" /> {profile?.phone}
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="text-cyan-400" />{" "}
              {profile?.location || profile?.address}
            </p>
          </div>
          <div className="flex gap-6 mt-8">
            <a
              href={profile?.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400"
            >
              <Github size={24} />
            </a>
            <a
              href={profile?.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Right Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-lg p-8 border border-white/10 space-y-6"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Send a Message
          </h3>

          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white focus:border-cyan-400 outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white focus:border-cyan-400 outline-none"
          />
          <textarea
            name="message"
            placeholder="Write your message..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white focus:border-cyan-400 outline-none resize-none"
          ></textarea>

          <label className="flex items-center gap-2 text-gray-300 text-sm select-none">
            <input
              type="checkbox"
              name="cc"
              checked={formData.cc}
              onChange={handleChange}
              className="accent-cyan-400"
            />
            Send a copy to my own email
          </label>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
            disabled={mutation.status === "pending"}
          >
            <Send size={18} /> Send Message
          </motion.button>

          {status && <p className="mt-3 text-sm text-gray-300">{status}</p>}
        </motion.form>
      </div>

      {/* Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-cyan-400"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <div className="mb-4">
              <Send className="mx-auto text-cyan-400" size={40} />
            </div>
            <h4 className="text-2xl font-bold mb-2 text-gray-800">
              Thank you for contacting!
            </h4>
            <p className="text-gray-600 mb-2">
              Your message has been received. I’ll get back to you soon.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow hover:opacity-90 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
