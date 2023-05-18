import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "~/Layouts";
import { privateRoutes, publicRoutes } from "~/routes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {privateRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout == null) {
            Layout = React.Fragment;
          } else {
            Layout = DefaultLayout;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout == null) {
            Layout = React.Fragment;
          } else {
            Layout = DefaultLayout;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
