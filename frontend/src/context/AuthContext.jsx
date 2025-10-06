import { createContext, useState, useEffect } from "react";
import API from "../../src/api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Send token in Authorization header
        const res = await API.get("/check", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted && res.data?.user) {
          setUser(res.data.user); // set actual user object
        }
      } catch (err) {
        console.error("Session expired or invalid token", err?.response || err);
        localStorage.removeItem("token");
        if (isMounted) setUser(null);
      }
    };

    checkUser();

    return () => {
      isMounted = false; // cleanup to prevent state update on unmounted component
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
