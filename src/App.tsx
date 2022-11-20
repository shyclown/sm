import React from "react";
import "./App.css";
import { LoginView } from "./views/Login/LoginView";
import { ContentView } from "./views/Content/ContentView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UnauthenticatedRoute } from "./components/UnauthenticatedRoute";
import { useAppSelector } from "./redux/hooks";

function App() {
  const user = useAppSelector((state) => state.user.session);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <UnauthenticatedRoute redirectPath={"private/"} user={user} />
          }
        >
          <Route path="" element={<LoginView />} />
        </Route>
        <Route
          path="private/"
          element={<ProtectedRoute redirectPath={"/"} user={user} />}
        >
          <Route path="" element={<ContentView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
