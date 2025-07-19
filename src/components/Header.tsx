import React from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-white border-b flex items-center justify-between">
      <div className="flex items-center gap-2 invisible">
        <FaSearch className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Ex. ISBN, Title, Author, Member, etc"
          className="border-none outline-none w-96 bg-transparent"
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaCalendarAlt className="h-5 w-5" />
          <span>Last 6 months</span>
        </div>
        <div className="rounded-full w-8 h-8 overflow-hidden">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;