import React from "react";
import { AppBreadcrumb } from "./Breadcrumb";
import { breadcrumbs } from "../lib/breadcrumbs";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Dropdown, Avatar, DropdownItem } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  return (
    <header className="p-4 bg-white border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AppBreadcrumb items={breadcrumbs} />
      </div>

      <div className="flex items-center gap-4">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className="flex items-center gap-1 cursor-pointer">
              <Avatar
                alt="User Profile"
                img={user?.profilePictureUrl ?? "https://i.pravatar.cc"}
                rounded
                className="w-12 h-8"
              />
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {user?.role}
                </div>
              </div>
            </div>
          }
        >
          <DropdownItem onClick={() => navigate(`/user-profile/${user?.id}`)}>
            My Profile
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
