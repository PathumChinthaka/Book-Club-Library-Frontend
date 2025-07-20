import React from "react";
import { AppBreadcrumb } from "./Breadcrumb";

const Header: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Books", href: "/dashboard/books" },
  ];
  return (
    <header className="p-4 bg-white border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AppBreadcrumb items={breadcrumbs} />
      </div>
      <div className="flex items-center gap-6">
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
