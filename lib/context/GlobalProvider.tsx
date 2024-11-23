import { createContext, useContext, useState, useEffect } from "react";
import { GetCurrentUser } from "../api/Auth/GetCurrentUser";

interface Props {
  children: React.ReactNode;
}

const GlobalContext = createContext({});

export const useGLobalContext = () => useContext(GlobalContext);

const GlobalProvider: React.FC<Props> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetCurrentUser()
      .then((res) => {
        setUser(res);

        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("hata oluştu", error);
        setUser(null);

        setIsLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
