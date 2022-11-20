import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import { UserSession } from "../redux/reducers/user";

export const UnauthenticatedRoute: FC<{
  redirectPath: string;
  user: UserSession | null;
}> = ({ redirectPath, user }) => {
  if (user?.sl_token) {
    console.log("logged in");
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
