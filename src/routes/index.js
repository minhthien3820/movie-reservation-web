import DashboardPage from "../containers/AdminTemplate/DashboardPage";
import FilmPage from "../containers/AdminTemplate/FilmPage";
import UserPage from "../containers/AdminTemplate/UserPage";
import DetailFilmPage from "../containers/HomeTemplate/DetailFilmPage";
import HomePage from "../containers/HomeTemplate/HomePage";
import UserGuestPage from "../containers/HomeTemplate/UserGuestPage";

const routesHome = [
  {
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    exact: false,
    path: "/phim/:id",
    component: DetailFilmPage,
  },
  {
    exact: false,
    path: "/thong-tin-nguoi-dung",
    component: UserGuestPage,
  },
];

const routesAdmin = [
  {
    exact: false,
    path: "/dashboard",
    component: DashboardPage,
  },
  {
    exact: false,
    path: "/user-admin",
    component: UserPage,
  },
  {
    exact: false,
    path: "/film-admin",
    component: FilmPage,
  },
];

export { routesAdmin, routesHome };
