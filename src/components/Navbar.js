import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          RecipeShare
        </Link>

        <div className="flex gap-4 items-center">
          {user && (
            <>
              <Link to="/recipe-list" className="hover:text-indigo-600">
                Home
              </Link>


              <Link to="/my-recipes" className="hover:text-indigo-600">
                My Recipes
              </Link>

              <Link
                to="/create"
                className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                + New
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-gray-500 hover:text-red-600"
              >
                <ArrowRightOnRectangleIcon className="h-5" />
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
