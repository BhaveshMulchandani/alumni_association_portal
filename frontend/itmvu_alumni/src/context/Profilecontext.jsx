import { useState, createContext, useEffect } from "react";
import axios from "axios";

const Profilecontext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/profile/me`,
        { withCredentials: true }
      );

      setProfile(res.data.profile);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(); //  always from backend
  }, []);

  return (
    <Profilecontext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </Profilecontext.Provider>
  );
};

export default Profilecontext;