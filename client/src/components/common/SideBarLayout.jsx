import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const SideBarLayout = () => {
    return (
        <div className="flex max-h-screen">
            <SideBar />
            {/* Outlet renders nested route components */}
            <Outlet />
        </div>
    );
};

export default SideBarLayout;
