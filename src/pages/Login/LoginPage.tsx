import { useState } from "react";
import bookImage from "../../assets/images/login-image.webp";
import { RadioGroup } from "@headlessui/react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ...formData, role };
    console.log("Logging in...", payload);
    // send login data to server
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
