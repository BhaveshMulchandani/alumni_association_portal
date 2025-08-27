import { useState, createContext, useEffect } from "react";

const Profilecontext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null); // signup/login ke baad save karenge

useEffect(() => {
    // reload pe bhi profile mil jaye
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);
  

  return (
    <Profilecontext.Provider value={{ profile, setProfile }}>
      {children}
    </Profilecontext.Provider>
  );
};

export default Profilecontext;