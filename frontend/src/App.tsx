import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "lucide-react";

import { Navbar } from "./components";

import { useAuthStore } from "./store/useAuth";
import { Homepage, Profile, Setting, SignUp, Login } from "./pages";

import "./App.css";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );

  return (
    <main data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/settings"
          element={authUser ? <Setting /> : <Navigate to="/login" />}
        />
      </Routes>
    </main>
  );
}

export default App;
