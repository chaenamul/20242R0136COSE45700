import React, { Suspense, lazy, cloneElement } from "react";
// import { Spinner } from "react-bootstrap";
import { useRoutes, Navigate } from "react-router-dom";

// const LoginPage = lazy(() => import("pages/LoginPage"));
const MainPage = lazy(() => import("pages/MainPage"));
const Playground = lazy(() => import("pages/Playground"));
const Page404 = lazy(() => import("pages/Page404"));

function Router() {
  const routes = useRoutes([
    {
      path: "/",
      children: [
        { element: <Navigate to="/main" replace />, index: true },
        // { path: "login", element: <LoginPage /> },
        { path: "main", element: <MainPage /> },
        { path: "playground", element: <Playground />},
        // {
        //   path: "project",
        //   children: [
        //     { path: "add", element: <ProjectAddPage /> },
        //     { path: "list", element: <ProjectListPage /> },
        //     { path: "detail/:id", element: <ProjectDetailPage /> },
        //     { path: "edit/:id", element: <ProjectEditPage /> },
        //   ],
        // },
      ],
    },
    { path: "*", element: <Page404 /> },
  ]);
  if (!routes) return null;

  const clone = cloneElement(routes, { key: routes.props.children.key });

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <br />
          Loading...
        </div>
      }
    >
      {clone}
    </Suspense>
  );
}

export default Router;
