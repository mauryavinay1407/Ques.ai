import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addOpenModal } from "../../redux/slice";
import MainBanner from "../../components/Home/MainBanner";
import TextArea from "../../components/Home/TextArea";
import CreateButton from "../../components/Home/CreateButton";
import ModalBox from "../../components/common/ModalBox";
import ModalContent from "../../components/Home/ModalContent";
import { Spinner } from "../../components/common/Spinner";
import { useGetProjectsQuery } from "../../redux/service";
import { toast } from "sonner";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get states from Redux
    const myInfo = useSelector((state) => state.service.myInfo);
    const isOpen = useSelector((state) => state.service.openModal);

    // RTK Query hook
    const { data: projectsData, isLoading, error } = useGetProjectsQuery();

    useEffect(() => {
        if (!myInfo) {
            navigate("/");
        }
    }, [myInfo, navigate]);

    useEffect(() => {
        if (error) {
            toast.error("Failed to fetch projects");
        }
    }, [error]);

    const handleCreateModal = () => {
        dispatch(addOpenModal(true));
    };

    const handleModalClose = () => {
        dispatch(addOpenModal(false));
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                <Spinner size="lg" color={"#7E22CE"} />
            </div>
        );
    }
    let textContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in";

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-9/12 min-h-[80vh] mb-28">
                <div className="w-full h-auto">
                    <h1 className="font-bold text-center m-8 font-roboto text-4xl text-primary">
                        Create a New Project
                    </h1>
                    {/* banner section */}
                    <div className="flex justify-center">
                        <MainBanner />
                    </div>

                    {/* textarea-section */}
                    <div className="flex justify-center items-center md:pt-9 pb-6 md:px-24">
                        <TextArea content={textContent} />
                    </div>

                    {/* create section */}
                    <div className="flex justify-center items-start font-roboto">
                        <CreateButton handleClick={handleCreateModal} />

                        {projectsData?.data?.length > 0 && (
                            <button
                                className="bg-primary text-white px-5 py-2 rounded-md mx-3 hover:scale-105 duration-500 font-roboto"
                                onClick={() => navigate("/projects")}
                            >
                                Go to Projects
                            </button>
                        )}

                        {isOpen && (
                            <ModalBox isOpen={isOpen}>
                                <ModalContent onClose={handleModalClose} />
                            </ModalBox>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
