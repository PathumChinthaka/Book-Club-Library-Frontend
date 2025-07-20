import { useState } from "react";
import bookImage from "../../assets/images/login-image.webp";
import { RadioGroup } from "@headlessui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

type UserRole = "member" | "librarian";

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole>("member");
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ...formData, role };
    console.log("Registering...", payload);
    // send registration data to server
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bookImage})` }}
      ></div>
      <div className="w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 py-10 bg-white">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          Join Book Club
        </h1>
        <form className="space-y-5 w-full max-w-md" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
