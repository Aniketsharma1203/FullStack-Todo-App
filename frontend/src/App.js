import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./auth-pages/LogIn";
import SignUp from "./auth-pages/SignUp";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import User from "./user/User";
import CompletedTasks from "./todo/CompletedTasks";


function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route element={<ProtectedRoutes />}>
            <Route path="/user" element={<User />} />
          </Route>

          <Route path="/" element={<SignUp />} />

          <Route path="/login" element={<LogIn />} />
          <Route path="/completedtasks" element={<CompletedTasks />} />

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
