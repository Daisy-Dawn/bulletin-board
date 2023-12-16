import React from "react";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear()
  return (
    <footer className="bg-gray-900 text-white px-8 footer-wrapper w-full flex flex-wrap py-3 border-t items-center justify-between">
      <div className="flex items-center gap-4 grid-cols-4">
        <span className="mb-3">
          <img className="h-8 w-auto" src="/odf.svg" alt="Your Company" />
        </span>
        <span className="mb-3">© {year} Daisy Dawn Cooperations</span>
      </div>
      <div></div>
      <ul className="grid-cols-4  text-xl justify-end flex list-none items-center">
        <li className="ms-5 bg-blue"><FaGithub /></li>
        <li className="ms-5"><FaTwitter /></li>
        <li className="ms-5"><BsLinkedin /></li>
      </ul>
    </footer>
  );
};
