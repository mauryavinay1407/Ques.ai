import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Copy, Gem, Pen, Plus, Settings } from "lucide-react";
import QSLogo from "./QSLogo";
import { useMyInfoQuery } from "../../redux/service";

// Sidebar component for main navigation
const SideBar = () => {
    const location = useLocation();
    const activePath = location.pathname;
    const { projectId } = useParams();
    const { data } = useMyInfoQuery();

    return (
        <>
            <div className="flex w-1/3 max-h-screen bg-white font-roboto flex-col justify-between">
                {/* Top Section */}
                <div>
                    <NavLink to="/">
                        <div className="w-full flex justify-center p-6">
                            <QSLogo color={"#7E22CE"} width={30} height={30} />
                        </div>
                    </NavLink>

                    {/* NavLinks */}
                    <div className="w-full flex-col items-start my-1 pl-3">
                        {/* Common NavLinks  */}
                        {[
                            {
                                to: `/project/upload/${projectId}`,
                                icon: <Plus size={20} />,
                                text: "Add your Podcast(s)",
                            },
                            {
                                to: `/project/create-and-response/${projectId}`,
                                icon: <Pen size={16} />,
                                text: "Create & Repurpose",
                            },
                            {
                                to: `/project/podcast-widget`,
                                icon: <Copy size={18} />,
                                text: "Podcast Widget",
                            },
                            {
                                to: `/project/upgrade`,
                                icon: <Gem size={18} />,
                                text: "Upgrade",
                            },
                        ].map(({ to, icon, text }) => (
                            <div key={text} className="w-11/12 rounded-lg mb-2">
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `block rounded-lg hover:bg-primary group ${
                                            isActive ? "bg-[#f9f3ff]" : ""
                                        }`
                                    }
                                >
                                    <div className="flex gap-3 items-center justify-start h-10 pl-4">
                                        <span
                                            className={`group-hover:text-white text-[#646464]`}
                                        >
                                            {icon}
                                        </span>
                                        <p
                                            className={`text-sm lg:text-[0.97rem] font-semibold group-hover:text-white ${
                                                activePath === to
                                                    ? "text-primary"
                                                    : "text-[#646464]"
                                            }`}
                                        >
                                            {text}
                                        </p>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                        <div className="border-t-2 mt-10 w-[85%] mx-auto" />
                    </div>
                </div>

                {/* Bottom Section */}
                {/* help section */}
                <div className="mt-28">
                    <div className="w-full pl-3 mt-20">
                        <NavLink to="/view/settings">
                            <div className="flex gap-3 items-center h-10 pl-4">
                                <span className="text-black">
                                    <Settings size={20} />
                                </span>
                                <p className="text-sm font-roboto text-[0.97rem] font-semibold">
                                    Help
                                </p>
                            </div>
                        </NavLink>
                    </div>

                    <div className="border-t-2 w-[85%] mx-auto my-4 mb-6" />
                </div>

                {/* profile section */}
                <div className="w-full pl-3 mb-2">
                    <NavLink to="/account/settings">
                        <div className="flex gap-3 items-center h-10 pl-4">
                            {data.me.profilePic ? (
                                <img
                                    src={data.me.profilePic}
                                    alt="Profile"
                                    className="rounded-md w-12 h-12 object-cover"
                                />
                            ) : (
                                <div
                                    className={`rounded-md w-12 h-12 flex justify-center items-center ${
                                        Math.floor(Math.random() * 10) % 2 === 1
                                            ? "bg-primary"
                                            : "bg-orange-500"
                                    }`}
                                >
                                    <h2 className="font-bold font-roboto text-4xl text-white flex justify-center items-center">
                                        {data.me?.userName
                                            ? data.me.userName
                                                  .split(" ")
                                                  .map((word) => word[0])
                                                  .join("")
                                                  .toUpperCase()
                                            : ""}
                                    </h2>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <p className="text-md font-roboto font-bold">
                                    {data.me.userName}
                                </p>
                                <p className="text-[12px] font-roboto">
                                    {data.me.email}
                                </p>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default SideBar;
