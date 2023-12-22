import React from "react";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear()
  return (
    <footer className="bg-gray-900 text-white px-2 lg:px-8 footer-wrapper mt-3 bottom-0 w-full flex flex-wrap py-3 border-t items-center justify-between">
      <div className="flex items-center gap-2 lg:gap-4 grid-cols-4">
        <span className="lg:mb-3 mb-1">
          <img className="lg:h-8 h-6 w-auto" src="/odf.svg" alt="Your Company" />
        </span>
        <span className="mb-1 lg:mb-3 text-xs lg:text-base">© {year} Daisy Dawn Cooperations</span>
      </div>
      <div></div>
      <ul className=" grid-cols-4 text-base lg:text-xl justify-end flex list-none items-center">
      <a href="https://github.com/Daisy-Dawn"><li className="ms-5 bg-blue"><FaGithub /></li> </a>
      <a href="https://twitter.com/AgboEmmanuella7"><li className="ms-5"><FaTwitter /></li></a>  
        <a href="https://www.linkedin.com/in/agbo-emmanuella7/"><li className="ms-5"><BsLinkedin /></li></a>
      </ul>
    </footer>
  );
};
