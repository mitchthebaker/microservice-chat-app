import { ComponentType, FC, ReactElement } from "react";
import { Navigate, Routes, Route, RouteProps } from "react-router-dom";
import { RouteComponentProps, useLocation } from "@reach/router";

interface Props {
  children: JSX.Element;
  allowVisit: object | boolean | null;
  redirectTo: string;
}

const PrivateRoute = ({ 
  allowVisit,  
  redirectTo, 
  children
}: Props) => {
  
  return allowVisit ? (
    children
  ) : (
    <Navigate 
      to={{ pathname: redirectTo }}
    />
  );
};

export default PrivateRoute;