import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ErrorPage from "./ErrorPage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import AuthRoot from "./pages/AuthRoot";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        element: <AuthRoot/>,
        children: [
          { index: true, element: <SignInPage /> },
          {
            path: "sign-up",
            element: <SignUpPage />,
          },
        ],
      },
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "profile/:id",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
