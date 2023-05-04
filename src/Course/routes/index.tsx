import ListPage from "../page/ListPage";
import StorePage from "../page/StorePage";
import ViewPage from "../page/ViewPage";

const Routes = {
  path: "course",
  children: [
    {
      index: true,
      element: <ListPage />,
    },
    {
      path: "/course/store",
      element: <StorePage />,
    },
    {
      path: "/course/:slug",
      element: <ViewPage />,
    },
  ],
};
export default Routes;
