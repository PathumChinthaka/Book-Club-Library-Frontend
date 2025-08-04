import { NavLink } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaPlus,
  FaExchangeAlt,
  FaCog,
  FaSignOutAlt,
  FaRegUser,
} from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";

const Sidebar: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logOut();
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-lg flex flex-col justify-between px-5 py-5">
      <div>
        <h1 className="text-3xl font-bold text-blue-700 mb-10 flex items-center gap-3">
          <FaBook className="text-blue-700 w-7 h-7" />
          Book Club
        </h1>

        <nav className="flex flex-col gap-3">
          {[
            { to: "/", label: "Manage Lendings", icon: <IoLibrarySharp /> },
            {
              to: "/manage-readers",
              label: "Manage Readers",
              icon: <FaUsers />,
            },
            { to: "/manage-books", label: "Manage Books", icon: <FaBook /> },
            ...(user?.role === "admin"
              ? [
                  {
                    to: "/manage-users",
                    label: "Manage Users",
                    icon: <FaRegUser />,
                  },
                ]
              : []),
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="pt-3 border-t border-gray-400 mt-10">
        <NavLink
          onClick={handleLogout}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-red-100 text-red-600 font-semibold"
                : "text-gray-700 hover:bg-red-100 hover:text-red-600"
            }`
          }
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
