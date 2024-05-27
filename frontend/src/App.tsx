import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Layout from "./components/Layout";
import AddInvoice from "./pages/AddInvoice";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          index: true,
          Component: Dashboard,
        },
        {
          path: "/invoices",
          Component: Invoices,
        },
        {
          path: "/add-invoices",
          Component: AddInvoice,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
