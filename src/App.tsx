import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import UserProfiles from "./pages/UserProfiles";
import BasicTables from "./pages/Tables/BasicTables";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Dashboard/Home";
import SubTables from "./pages/Tables/SubTables";

export default function App() {
  return (
    <>
     <ToastContainer 
          autoClose={3000}
          position="bottom-left"
        />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<BasicTables />} />
          <Route path="/roles" element={<SubTables/>} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
        
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          
        </Routes>
      </Router>
    </>
  );
}
