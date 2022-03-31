import { Navigate } from "react-router-dom";

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