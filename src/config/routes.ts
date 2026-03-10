export const ROUTES = {
  home: "/",
  login: "/login",
  services: "/services",
  chronometers: "/chronometers",
  data: "/data",
  dashboards: "/dashboards",
  simulations: "/simulations",
  about: "/about",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
