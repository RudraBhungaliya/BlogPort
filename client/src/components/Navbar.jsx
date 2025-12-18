import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import BlogContext from "../context/data/myContext";

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, setToken } = useContext(BlogContext);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/");
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await fetch(`${API}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Login failed: ${errorData.msg}`);
        return;
      }

      const data = await res.json();

      if (data.token && data.user) {
        // store token and user
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-5 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-gray-900">
          BlogPort
        </a>

        <ul className="flex items-center gap-8 text-gray-700">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`relative transition ${
                    isActive
                      ? "text-blue-600 font-semibold glitter"
                      : "text-gray-700 hover:text-blue-500"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}

          {user && (
            <li>
              <button
                onClick={() => navigate("/dashboard")}
                className="hover:text-blue-500 transition"
              >
                Dashboard
              </button>
            </li>
          )}
        </ul>

        {/* AUTH BUTTONS */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium hidden sm:inline">
              Hi, {user.name || user.email}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            //onError={() => alert("Google login failed")}
            text="signin_with"
          />
        )}
      </div>
    </nav>
  );
}
