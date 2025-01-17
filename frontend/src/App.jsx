import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Home from "./components/Home/Home";
import Signup from "./components/Register/Signup";
import Login from "./components/Login/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import ProfilePage from "./components/ProfilePage/ProfilePage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && location.pathname != "/signup") {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
