import { Link } from "react-router"
import logo from "../assets/logo.png"


function Navbar() {
    return (
        <>
    <aside className="w-56 bg-[#111111] border-r border-neutral-800 p-5 flex flex-col min-h-screen">

      <div className="flex items-center gap-2 mb-8">
        <img
          src={logo}
          className="h-8"
          alt="Issac Movie"
        />
      </div>

      <nav className="flex flex-col gap-1 text-sm">

        <Link
          to="/"
          className="px-3 py-2 rounded bg-yellow-500 text-black font-semibold"
        >
          Movie
        </Link>

        <Link
          to="/genres"
          className="px-3 py-2 rounded text-neutral-300 hover:bg-neutral-800"
        >
          Genre
        </Link>

        <Link
          to="/users/add"
          className="px-3 py-2 rounded text-neutral-300 hover:bg-neutral-800"
        >
          Add Staff
        </Link>

      </nav>

      <Link
        to="/login"
        onClick={() => localStorage.removeItem("token")}
        className="mt-auto px-3 py-2 rounded text-sm text-neutral-300 border border-neutral-700 text-center"
      >
        Logout
      </Link>

    </aside>
        </>
    )
}

export default Navbar
