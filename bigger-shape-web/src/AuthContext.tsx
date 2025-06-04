import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { createClient, type Session } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
}

// Create a context object which can be used from different pages to check the
// user's authentication status
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthContext will wrap other components (children) that will give them access to AuthContext
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt to get the current user session from Supabase
    supabase.auth
      .getSession()
      .then(({ data: { session: currentSession } }) => {
        setSession(currentSession);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    // Listens to changes in authentication (login, logout, token refresh, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    // A cleanup function. Prevents memory leak from onAuthStateChange
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  // Searches for the nearest <AuthContext.Provider> in the DOM
  const context = useContext(AuthContext);
  // Returns context, which contains session info (e.g. id, aud, etc.) and isLoading.
  return context;
};
