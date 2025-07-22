import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ManageBooks from "./pages/ManageBooks/ManageBooks";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ProtectedRoute from "./components/Route/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/manage-books" element={<ManageBooks />} />
        <Route
          path="/manage-users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
