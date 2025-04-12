import { UserCredential } from 'firebase/auth';
import { createContext, useContext } from 'react';

interface CustomUser {
  uid?: string;
  name?: string;
  email: string;
  role?: string;
}

// Updated AuthInfo interface with isCustomer
interface AuthInfo {
  user: CustomUser | null;
  loading: boolean;
  isAdmin: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext<AuthInfo | null>(null);

export const useAuth = (): AuthInfo => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
