import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import { UserSession } from "../redux/reducers/user";

export const ProtectedRoute: FC<{
  redirectPath: string;
  user: UserSession | null;
}> = ({ redirectPath, user }) => {
  if (!user?.sl_token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
