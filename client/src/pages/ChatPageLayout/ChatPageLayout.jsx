import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function ChatPageLayout() {
  return (
    <div>
      <nav>
        <Link to=".."></Link>
        <div>Profile pic</div>
        <div>Chat name</div>
      </nav>
      <Outlet />
    </div>
  );
}
