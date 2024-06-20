import { createContext, useState } from "react";
import { auth } from "./fb";
import { useEffect } from "react";
const AuthContext = createContext(null);

function useAuth() {
  const [user, setuser] = useState();
  const [trigger, setTrigger] = useState(true);
  const [loading, setload] = useState(true);
  useEffect(() => {
    setload(true);
    auth.onAuthStateChanged((newUser) => {
      setuser(newUser);
      setload(false);
    });
  }, [trigger]);
  return { user, loading, setuser, setTrigger };
}

export default function AuthProvider({ children }) {
  const { user, loading, setuser, setTrigger } = useAuth();

  return (
    <AuthContext.Provider value={{ user, loading, setuser, setTrigger }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, useAuth };
