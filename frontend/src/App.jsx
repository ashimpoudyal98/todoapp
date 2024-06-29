import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Home from "./components/Home/Home";
import Signup from "./components/Register/Signup";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {},
});

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
