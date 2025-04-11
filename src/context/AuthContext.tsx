// AuthContext.tsx
import { createContext, useContext } from "react";

// Updated AuthInfo interface with isCustomer
interface AuthInfo {
    user: any;
    loading: boolean;
    isAdmin: boolean;
    isCustomer: boolean; // Add isCustomer here
    createUser: (email: string, password: string) => Promise<any>;
    loginUser: (email: string, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthInfo | null>(null);

export const useAuth = (): AuthInfo => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
