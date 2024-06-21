import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const userToken = localStorage.getItem("user");
    const isLogged = localStorage.getItem("loggedIn");
    if (userToken) {
      const username = JSON.parse(user).login;
      const token = JSON.parse(user).token;

      setUser({ username, token });
    }
  }, []);

  async function login(username, password) {
    debugger;
    const credentials = {
      login: username,
      senha: password,
    };
    console.log(credentials);
    const response = await axios
      .post(`http://localhost:4242/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.data);

    console.log(response);

    let token = response.token;

    console.log(token);

    localStorage.setItem("user", JSON.stringify({ username, token }));
    setUser({ username, token });
    return;
  }

  const signin = (username, password) => {
    const response = login(username, password);
    return response;
  };

  async function register(username, password) {
    const credentials = {
      login: username,
      senha: password,
    };
    const response = await axios
      .get(`http://localhost:4242/auth/login`, {
        credentials,
      })
      .then((res) => res.data);

    if (response.length !== 0) {
      return "Usuário já cadastrado!";
    }
    const response2 = await axios
      .post("http://localhost:4242/auth/register", {
        credentials,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  const signup = (username, password) => {
    const response = register(username, password);
    return response;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: Boolean(user), signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
