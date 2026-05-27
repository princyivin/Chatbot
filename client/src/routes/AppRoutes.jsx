import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import Notifications from "../pages/Notifications";
import Search from "../pages/Search";
import Team from "../pages/Team";
import FileUpload from "../pages/FileUpload";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ServerError from "../pages/ServerError";

import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>

      {/* AUTH PAGES */}
      <Route path="/" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

      {/* MAIN LAYOUT */}
      <Route element={<MainLayout />}>

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/chat"
  element={<Chat />}
/>

<Route
  path="/chat/:conversationId"
  element={<Chat />}
/>

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/team"
          element={<Team />}
        />

        <Route
          path="/upload"
          element={<FileUpload />}
        />

      </Route>

      {/* ERROR PAGES */}
      <Route
        path="/server-error"
        element={<ServerError />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;