import { Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";

import userSessionAtom from "#root/recoil/atoms/userSession";
import PrivateRoute from "#root/utils/components/routing/PrivateRoute";

import Home from "./Home"
import Login from "./Login";
import Main from "./Main";

const authorized = (session: object | null) => {
  return session ? true : false;
};

const Initialized = () => {
  const [userSession] = useRecoilState(userSessionAtom);

  return (
    <Routes>
      <Route 
        element={
          <PrivateRoute
            allowVisit={authorized(userSession)} 
            redirectTo="/home"
          >
            <Login />
          </PrivateRoute> 
        }  
        path="/login"  
      />
      <Route 
        element={
          <PrivateRoute
            allowVisit={authorized(userSession)} 
            redirectTo="/home"
          >
            <Main />
          </PrivateRoute> 
        }  
        path="/" 
      />
      <Route 
        element={<Home />}
        path="/home"
      />
    </Routes>
  );
};

export default Initialized;