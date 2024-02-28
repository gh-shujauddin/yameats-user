import { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { DataStore } from "aws-amplify/datastore";
import { User } from "../models";
import { Auth } from "aws-amplify";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const sub = authUser?.userId;
  // const sub = "51bb6570-6041-70cb-92b0-9bddc89f8b60";

  useEffect(() => {
    getCurrentUser().then(setAuthUser);
  }, []);

  useEffect(() => {
    try {
      DataStore.query(User, (user) => user.sub.eq(sub)).then((users) =>
        setDbUser(users[0])
      );
    } catch (e) {
      console.log("Error fetching user: ", e);
    }
  }, [sub, authUser]);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
