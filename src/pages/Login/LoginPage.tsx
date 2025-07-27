import { useState } from "react";
import bookImage from "../../assets/images/login-image.webp";
import { RadioGroup } from "@headlessui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { encryptData } from "../../utils/utilMethods";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface LoginForm {
  email: string;
  password: string;
}

type UserRole = "member" | "librarian";

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>("member");
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [userLogin] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userDetails = await userLogin({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (userDetails) {
        setCredentials(userDetails);
        localStorage.setItem(
          "accessToken",
          encryptData(userDetails?.accessToken)
        );
        localStorage.setItem("user", encryptData(userDetails?.user));
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { autoClose: 2300 });
    }
  };

  return (
    <div className="min-h-screen flex">
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
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bookImage})` }}
      ></div>
      <div className="w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 py-10 bg-white">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          Welcome to Book Club
        </h1>
        <form className="space-y-5 w-full max-w-md" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          <RadioGroup value={role} onChange={setRole} className="flex gap-4">
            {["member", "librarian"].map((option) => (
              <RadioGroup.Option key={option} value={option as UserRole}>
                {({ checked }) => (
                  <span
                    className={`px-5 py-2 rounded-xl cursor-pointer border text-sm font-medium transition-colors duration-150 ${
                      checked
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
