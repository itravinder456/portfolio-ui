"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import "./header.scss";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-white- shadow-md- header">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="https://lh3.googleusercontent.com/a/ACg8ocJ7UGm1xYOvKkXooYVyY03w2K1cBTka1Du4DkiGKMVdpEzJngGr_A=s360-c-no"
            alt="Profile Photo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
            priority
          />
        </Link>
        {/* <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Do you want me to generate a resume for you?"
            className="bg-transparent text-white rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500 header-search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div> */}
        <nav>
          <ul className="flex space-x-6">
            <li
              className={
                pathname === "/" || pathname === "/home" ? "active" : ""
              }
            >
              <Link href="/" className={`text-gray-600 hover:text-blue-500`}>
                Home
              </Link>
            </li>
            <li className={pathname === "/about" ? "active" : ""}>
              <Link
                href="/about"
                className={`text-gray-600 hover:text-blue-500`}
              >
                About
              </Link>
            </li>
            <li className={pathname === "/experience" ? "active" : ""}>
              <Link
                href="/experience"
                className={`text-gray-600 hover:text-blue-500`}
              >
                Experience
              </Link>
            </li>
            <li className={pathname === "/skills" ? "active" : ""}>
              <Link
                href="/skills"
                className={`text-gray-600 hover:text-blue-500`}
              >
                Skills
              </Link>
            </li>
            <li className={pathname === "/projects" ? "active" : ""}>
              <Link
                href="/projects"
                className={`text-gray-600 hover:text-blue-500`}
              >
                Projects
              </Link>
            </li>
            <li className={pathname === "/blogs" ? "active" : ""}>
              <Link
                href="/blogs"
                className={`text-gray-600 hover:text-blue-500`}
              >
                Blogs
              </Link>
            </li>
            <li className={pathname === "/contact" ? "active" : ""}>
              <Link
                href="/contact"
                className={`text-gray-600 hover:text-blue-500`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
