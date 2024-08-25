import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: string;
  changeUser: (user: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState("John");

  const changeUser = (user: string) => setUser(user);

  const value = { user, changeUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const Component3 = () => {
  const { user, changeUser } = useAuth();
  const [newUser, setNewUser] = useState("");

  return (
    <div>
      Component 3 <p>{user}</p>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button onClick={() => changeUser(newUser)}>Change</button>
    </div>
  );
};

const Component2 = () => {
  const { user } = useAuth();

  return (
    <div>
      Component 2 <p>{user}</p>
      <Component3 />
    </div>
  );
};

const Component1 = () => {
  const { user } = useAuth();

  return (
    <div>
      Component 1 <p>{user}</p>
      <Component2 />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Component1 />
    </AuthProvider>
  );
};

export default App;
