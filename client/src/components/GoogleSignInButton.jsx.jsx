import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import BlogContext from "../context/data/myContext";

export default function GoogleSignInButton() {
  const API = import.meta.env.VITE_API_BASE;
  const { setUser, setToken } = useContext(BlogContext);

  return (
    <GoogleLogin
      onSuccess={async (response) => {
        const res = await fetch(`${API}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        const data = await res.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUser(data.user);
          window.location.href = "/dashboard";
        }
      }}
      onError={() => alert("Google login failed")}
    />
  );
}