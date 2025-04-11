import { createContext, useContext } from "react";

interface AuthInfo {
    user: any;
    loading: boolean;
    isAdmin: boolean;
    createUser: (email: string, password: string) => Promise<any>;
    loginUser: (email: string, password: string) => Promise<any>;
}

// Create the context with a default value of null
const AuthContext = createContext<AuthInfo | null>(null);

// Custom hook to access the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;

