import { useState, createContext } from "react";

const Profilecontext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null); // signup/login ke baad save karenge

  return (
    <Profilecontext.Provider value={{ profile, setProfile }}>
      {children}
    </Profilecontext.Provider>
  );
};

export default Profilecontext;