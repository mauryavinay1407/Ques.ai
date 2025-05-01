import React from "react";
import NavBar from "./Navbar"
import { Outlet } from "react-router-dom";

const NavLayout = () => {
    return (
        <>
            <div className="flex flex-col max-h-screen">
                <NavBar />
                <div className="overflow-y-hidden">
                    {/* Outlet renders nested route components */}
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default NavLayout;
