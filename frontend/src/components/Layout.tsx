import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-screen bg-gray-800">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="w-full block w-auto" id="navbar-default">
            <ul className="font-medium flex p-4 rounded-lg flex-row space-x-8 rtl:space-x-reverse mt-0 border-0 text-white">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/invoices">Invoices</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
