import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import QSLogo from "./QSLogo";
import { Bell, LogOut, Settings } from "lucide-react";
import { useLogoutMeMutation } from "../../redux/service";
import { toast } from "sonner";

const NavBar = () => {
    const [logoutMe, logoutMeData] = useLogoutMeMutation();

    const handleLogout = async () => {
        try {
            await logoutMe().unwrap();
            window.location.href = "/";
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    useEffect(() => {
        if (logoutMeData.isSuccess) {
            toast.warning(logoutMeData.data.msg);
        }
    }, [logoutMeData.isSuccess]);
    return (
        // navbar section
        <div className=" w-full bg-white min-h-8 p-4 flex justify-between items-center">
            {/* Logo Section */}
            <NavLink to="/">
                <div>
                    <QSLogo color={"#7E22CE"} width={40} height={40} />
                </div>
            </NavLink>

            {/* Icon section */}
            <div className=" flex justify-center items-center gap-4">
                <NavLink to="/view/settings">
                    <Settings size={24} color="#12100f" />
                </NavLink>
                <NavLink to="/Notifications">
                    <Bell size={24} color="#12100f" />
                </NavLink>
                <div
                    className="w-10 h-10 p-2 flex justify-center items-center rounded-full cursor-pointer"
                    onClick={handleLogout}
                >
                    <LogOut size={22} color="red" />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
