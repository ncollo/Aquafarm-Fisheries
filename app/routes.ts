import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { OurFarm } from "./pages/OurFarm";
import { Store } from "./pages/Store";
import { SportFishing } from "./pages/SportFishing";
import { ScheduleVisit } from "./pages/ScheduleVisit";
import { Training } from "./pages/Training";
import { Community } from "./pages/Community";
import { Blog } from "./pages/Blog";
import { Gallery } from "./pages/Gallery";
import { Careers } from "./pages/Careers";
import { Contact } from "./pages/Contact";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  // Standalone login page (no navbar / footer)
  {
    path: "/login",
    Component: Login,
  },
  // Main site layout
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "our-farm", Component: OurFarm },
      { path: "store", Component: Store },
      { path: "sport-fishing", Component: SportFishing },
      { path: "schedule-visit", Component: ScheduleVisit },
      { path: "training", Component: Training },
      { path: "community", Component: Community },
      { path: "blog", Component: Blog },
      { path: "gallery", Component: Gallery },
      { path: "careers", Component: Careers },
      { path: "contact", Component: Contact },
      // Dashboard is auth-gated internally
      { path: "dashboard", Component: Dashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
