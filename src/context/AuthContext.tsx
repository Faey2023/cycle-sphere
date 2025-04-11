import { UserCredential } from 'firebase/auth';
import { createContext, useContext } from 'react';

interface CustomUser {
  name: string;
  email: string;
  password: string;
}

interface AuthInfo {
  user: CustomUser;
  loading: boolean;
  isAdmin: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
}

// Create the context with a default value of null
const AuthContext = createContext<AuthInfo | null>(null);

// Custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
