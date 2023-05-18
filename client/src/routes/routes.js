import config from "~/config";

import { AuthLayout, DefaultLayout } from "~/Layouts";
import { AddProduct, Admin, EditProduct } from "~/pages/Admin";
import Cart from "~/pages/Cart";
import Home from "~/pages/Home/index.js";
import Login from "~/pages/Login";
import NotFound from "~/pages/NotFound404";
import ProductDetail from "~/pages/ProductDetail";
import Register from "~/pages/Register";
import Result from "~/pages/Result";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },

  {
    path: config.routes.detail,
    component: ProductDetail,
    layout: DefaultLayout,
  },
  { path: config.routes.register, component: Register, layout: AuthLayout },
  { path: config.routes.cart, component: Cart, layout: DefaultLayout },
  { path: config.routes.result, component: Result, layout: DefaultLayout },
  { path: config.routes.notFound, component: NotFound, layout: null },
  { path: config.routes.login, component: Login, layout: AuthLayout },
];
const privateRoutes = [
  { path: config.routes.admin, component: Admin, layout: null },
  { path: config.routes.add, component: AddProduct, layout: null },
  { path: config.routes.edit, component: EditProduct, layout: null },
];

export { privateRoutes, publicRoutes };
