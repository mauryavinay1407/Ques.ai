import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, House, LogOut } from "lucide-react";
import { useLogoutMeMutation } from "../../redux/service";
import { toast } from "sonner";

const UploadNavBar = ({ projectName, pageName }) => {
    const navigate = useNavigate();

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
        <div className="w-full flex justify-between p-4 mt-4">
            {/* left section */}
            <section>
                <div className="flex justify-center items-center font-roboto text-md font-semibold cursor-pointer">
                    <div
                        onClick={() => navigate("/")}
                        className=" pt-1 flex items-center gap-1  text-gray-500"
                    >
                        <House size={18} />
                        <span className="">Home Page</span>
                    </div>
                    <span
                        onClick={() => navigate(`/projects`)}
                        className="text-center px-1 pt-1 text-gray-500"
                    >
                        {" "}
                        / {projectName}{" "}
                    </span>
                    <span className="text-center px-1 pt-1 text-primary ">
                        {" "}
                        / {pageName}{" "}
                    </span>
                </div>
            </section>
            {/* right section */}
            <section>
                <div className="flex items-center font-roboto font-semibold gap-3">
                    <div className="w-10 h-10 p-2 flex justify-center items-center rounded-full border-2 border-gray-400 cursor-pointer">
                        <Bell size={22} />
                    </div>
                    <div
                        className="w-10 h-10 p-2 flex justify-center items-center rounded-full border-2 border-gray-400 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <LogOut size={22} color="red" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UploadNavBar;
