import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Dashboard from "./pages/users/Dashboard";
import Home from "./pages/posts/Home";
import CreatePost from "./pages/posts/CreatePots";
import UpdatePost from "./pages/posts/UpdatePost";

import AuthRoute from "./Routes/AuthRoute";
import GuestRoute from "./Routes/GuestRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<AuthRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="update" element={<UpdatePost />} />
          </Route>
          <Route element={<GuestRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
