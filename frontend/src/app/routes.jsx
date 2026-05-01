import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Home from "../features/dashboard/pages/Home";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import UserLogsPage from "../features/user/pages/UserLogsPage";
import MainLayout from "../layouts/MainLayout";
import Register from "../features/auth/pages/Register";
import AllLogsOfOneUser from "../features/user/pages/AllLogsOfOneUser";
import ListItems from "../features/items/pages/ListItems";
import CreateItems from "../features/items/pages/CreateItems";
import UpdateStock from  "../features/stock/pages/UpdateStock" 
import ListStock from  "../features/stock/pages/ListStock"
import Forbidden from "../shared/components/Forbidden";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/user-logs" element={<UserLogsPage />} />
        <Route path="/my-logs" element={<AllLogsOfOneUser />} />
        <Route path="/list-items" element={<ListItems />} />
        <Route path="/create-items" element={<CreateItems />} />
        <Route path="/stock/update-stock" element={<UpdateStock />} />
        <Route path="/stock/stock-list" element={<ListStock />} />
        <Route path="/403" element={<Forbidden />} />
      </Route>
    </Routes>
  );
}
