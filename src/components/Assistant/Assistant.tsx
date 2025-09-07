"use client";
import React, { useState } from "react";
import "./Assistant.scss";
import { AudioLines, Sparkles } from "lucide-react"; // Changed icon

type Props = {
  params?: { slug: string[] };
};

const Assistant = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed AI Assistant Icon */}
      <div className="assistant-icon" onClick={() => setOpen(true)}>
        <span className="assistant-animated-icon">
          <span className="assistant-sparkles-animated">
            <AudioLines />
          </span>
          {/* <span className="assistant-animated-letter">R</span> */}
        </span>
      </div>

      {/* Modal */}
      {open && (
        <div className="assistant-modal-overlay" onClick={() => setOpen(false)}>
          <div className="assistant-modal" onClick={(e) => e.stopPropagation()}>
            <button className="assistant-close" onClick={() => setOpen(false)}>
              &times;
            </button>
            <h2>AI Assistant</h2>
            <div className="assistant-content">
              {/* Add your assistant UI here */}
              <p>Hello! How can I help you today?</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Assistant;
