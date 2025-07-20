import { useState } from "react";
import bookImage from "../../assets/images/login-image.webp";
import { RadioGroup } from "@headlessui/react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ...formData, role };
    console.log("Registering...", payload);
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bookImage})` }}
      ></div>
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-6">Book Club</h1>
        <form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />

          <RadioGroup value={role} onChange={setRole} className="flex gap-4">
            <RadioGroup.Option value="member">
              {({ checked }) => (
                <span
                  className={`px-4 py-2 border rounded cursor-pointer ${
                    checked ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  Member
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="librarian">
              {({ checked }) => (
                <span
                  className={`px-4 py-2 border rounded cursor-pointer ${
                    checked ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  Librarian
                </span>
              )}
            </RadioGroup.Option>
          </RadioGroup>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
