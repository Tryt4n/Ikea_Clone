import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="page-container">
      <div className="main-layout">
        <Outlet />
      </div>
    </main>
  );
}
