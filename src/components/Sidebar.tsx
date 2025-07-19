import { NavLink } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaPlus,
  FaExchangeAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between h-full">
      <div>
        <h1 className="text-2xl font-semibold mb-8 flex items-center gap-2">
          <FaBook className="h-6 w-6" /> Book Club
        </h1>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium flex items-center gap-2"
                : "text-gray-700 flex items-center gap-2"
            }
          >
            <FaBook /> Dashboard
          </NavLink>
          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium flex items-center gap-2"
                : "text-gray-700 flex items-center gap-2"
            }
          >
            <FaUsers /> Members
          </NavLink>
          <NavLink
            to="/add-books"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium flex items-center gap-2"
                : "text-gray-700 flex items-center gap-2"
            }
          >
            <FaPlus /> Add Books
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium flex items-center gap-2"
                : "text-gray-700 flex items-center gap-2"
            }
          >
            <FaExchangeAlt /> Check-out Books
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium flex items-center gap-2"
                : "text-gray-700 flex items-center gap-2"
            }
          >
            <FaCog /> Settings
          </NavLink>
        </nav>
      </div>
      <div>
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-medium flex items-center gap-2"
              : "text-gray-700 flex items-center gap-2"
          }
        >
          <FaSignOutAlt /> Logout
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
