// react imports
import ReactDOM from "react-dom/client";
import React from "react";

// rrd imports
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

// styles imports
import "./assets/styles/main.scss";

// redux imports
import { Provider } from "react-redux";
import store from "./store";

// component imports
import App from "./App.jsx";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import Login from "./pages/Login.jsx";
import CreateGroupScreen from "./screens/CreateGroupScreen";
import RetirementAffairsScreen from "./screens/RetirementAffairsScreen.jsx";
import GroupsScreen from "./screens/GroupsScreen";
import UsersScreen from "./screens/UsersScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/retirement-organization/" element={<App />}>
      <Route
        index={true}
        path="/retirement-organization/"
        element={<Login />}
      />

      <Route
        path="/retirement-organization/dashboard"
        element={<DashboardScreen />}
      />

      <Route
        path="/retirement-organization/affairs"
        element={<RetirementAffairsScreen />}
      />

      <Route
        path="/retirement-organization/groups"
        element={<GroupsScreen />}
      />

      <Route path="/retirement-organization/users" element={<UsersScreen />} />

      <Route
        path="/retirement-organization/create-group"
        element={<CreateGroupScreen />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
