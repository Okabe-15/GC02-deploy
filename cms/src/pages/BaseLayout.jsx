
import { Navigate, Outlet } from "react-router";
import Navbar from "../components/navbar";

function BaseLayout() {

    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }

    return (
        <>
      <div className="flex min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
        </>
    )
}

export default BaseLayout
