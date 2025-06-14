import HomePage from "../pages/home/home-page";
import PencarianPage from "../pages/pencarian/pencarian-page";
import LoginPage from "../pages/login/login-page";
import RegisterPage from "../pages/register/register-page";
import OtpPage from "../pages/otp/otp-page";
import DetailPage from "./../pages/detail/detail-page";
import myProfilePage from "../pages/my_profile/my-profile-page";

const routes = {
  "/": new HomePage(),
  "/pencarian": new PencarianPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/profile": new myProfilePage(),
  "/verify-otp/:id": new OtpPage(),
  "/detail/:id": new DetailPage(),
};

export default routes;
