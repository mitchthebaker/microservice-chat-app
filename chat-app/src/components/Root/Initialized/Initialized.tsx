import { Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";

import userSessionAtom from "#root/recoil/atoms/userSession";
import PrivateRoute from "#root/utils/components/routing/PrivateRoute";

import Feed from "./Feed"
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
            allowVisit={!userSession} 
            redirectTo="/feed"
          >
            <Login />
          </PrivateRoute> 
        }  
        path="/login"  
      />
      <Route 
        element={
          <PrivateRoute
            allowVisit={!userSession} 
            redirectTo="/login"
          >
            <Main />
          </PrivateRoute> 
        }  
        path="/" 
      />
      <Route 
        element={
          <PrivateRoute
            allowVisit={userSession}
            redirectTo="/"
          >
            <Feed />
          </PrivateRoute>
        }
        path="/feed"
      />
    </Routes>
  );
};

export default Initialized;