import { motion } from "framer-motion";

export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mb-4"
        aria-label="Loading spinner"
      />
      <span className="text-cyan-300 text-lg font-medium">{text}</span>
    </div>
  );
}
