import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ManageBooks from "./pages/ManageBooks/ManageBooks";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ManageReaders from "./pages/ManageReaders/ManageReaders";
import ManageLending from "./pages/ManageLendings/ManageLending";
import UserDetails from "./pages/UserDetails/UserDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/manage-lendings" />} />
        <Route path="/manage-lendings" element={<ManageLending />} />
        <Route path="/manage-books" element={<ManageBooks />} />
        <Route path="/user-profile/:userId" element={<UserDetails />} />
        <Route
          path="/manage-users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-readers"
          element={
            <ProtectedRoute allowedRoles={["admin", "librarian"]}>
              <ManageReaders />
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
