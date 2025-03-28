import { Outlet } from "react-router";
import Header from "../Header";

function AuthLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
