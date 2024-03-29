import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from  "react-router-dom";
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import AccountSetup from './pages/AccountSetup';
import UserPage from './pages/UserPage';
import DeleteAccount from './pages/DeleteAccount';
import Calculate from './pages/Calculate';
import GoalProgress from './pages/GoalProgress';
import News from './pages/News';
import ProductRecommendations from "./pages/ProductRecommendations";
import NotFound from './pages/NotFound';
import ReactSelect from "react-select";

function App() {

  const title = 'Sunscreen Calculator';
  //https://stackoverflow.com/questions/71444637/react-router-hide-nav-footer-on-certain-pages-with-router-v6

  return (
    <Router>
      <div className="App">
        { <div><Navigation /></div> }
        <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/accountsetup/:id" element={<AccountSetup />} />
            <Route path="/userpage/:id/deleteaccount" element={<DeleteAccount />} />
            <Route path="/userpage/:id" element={<UserPage />} />
            <Route path="/userpage/:id/goals" element={<GoalProgress />} />
            <Route path="/userpage/:id/news" element={<News />} />
            <Route path="/userpage/:id/products" element={<ProductRecommendations />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/calculate" element={<Calculate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
