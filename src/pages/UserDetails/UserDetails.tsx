import { FaCamera } from "react-icons/fa";
import { useGetUserByIdQuery } from "../../features/user/manageUserSlice";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserResponse } from "../../types/UserTypes";
import { ActiveStatus } from "../../types/enum/ActiveStatus";
import clsx from "clsx";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserResponse>();

  const {
    data: userDetails,
    isLoading: userDetailsIsLoading,
    isFetching: userDetailsIsFetching,
    isError: userDetailsIsError,
    error: userDetailsError,
  } = useGetUserByIdQuery(userId?.toString() || "", {
    skip: !userId,
  });

  useEffect(() => {
    if (userDetails) {
      setUser(userDetails);
    }
    if (userDetailsIsError) {
      toast.error("Failed to fetch user details", { autoClose: 2300 });
    }
  }, [userDetails, userDetailsError]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-8">
      {userDetailsIsFetching || userDetailsIsLoading ? <LoadingSpinner /> : ""}
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col items-center">
        <div className="relative group w-32 h-32">
          <img
            src={
              user?.profilePictureUrl ||
              "https://via.placeholder.com/150?text=No+Image"
            }
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-gray-300"
          />
          <div className="absolute inset-0 bg-gray-300 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <FaCamera className="text-white text-xl" />
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-sm text-gray-500 mt-1 capitalize">{user?.role}</p>
        <span
          className={clsx("mt-2 px-3 py-1 rounded-full text-xs font-semibold text-center", {
            "bg-green-100 text-green-700":
              user?.activeStatus === ActiveStatus.Active,
            "bg-yellow-100 text-yellow-700":
              user?.activeStatus === ActiveStatus.Inactive,
            "bg-red-100 text-red-700":
              user?.activeStatus === ActiveStatus.Deleted,
          })}
        >
          {ActiveStatus[user?.activeStatus || 1]}
        </span>
      </div>
      <div className="mt-6 space-y-4">
        <UserInfo label="Email" value={user?.email || "-"} />
        <UserInfo label="Phone" value={user?.phone || "-"} />
        <UserInfo label="Address" value={user?.address || "-"} />
        <UserInfo
          label="Registerd On"
          value={new Date(user?.createdOn || "-").toLocaleDateString()}
        />
        {user?.updatedOn && (
          <UserInfo
            label="Profile Update On"
            value={new Date(user.updatedOn).toLocaleDateString()}
          />
        )}
      </div>
    </div>
  );
};

function UserInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2 text-gray-700">
      <span className="font-medium">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default UserDetails;
