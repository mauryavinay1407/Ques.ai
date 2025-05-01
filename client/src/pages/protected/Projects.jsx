import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOpenModal } from "../../redux/slice";
import { useGetProjectsQuery } from "../../redux/service";
import ModalBox from "../../components/common/ModalBox";
import ModalContent from "../../components/Home/ModalContent";
import CreateButton from "../../components/Home/CreateButton";
import { Spinner } from "../../components/common/Spinner";

const Projects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.service.openModal);

    const { data: projectsData, isLoading } = useGetProjectsQuery();

    const handleCreateModal = () => {
        dispatch(addOpenModal(true));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex justify-center">
            <div className="w-10/12">
                <div className="flex justify-center w-full">
                    <div className="pl-2 my-3 md:my-6 w-full flex justify-between">
                        <h1 className="text-primary text-lg md:text-3xl font-roboto font-bold">
                            Projects
                        </h1>
                        <CreateButton handleClick={handleCreateModal} />
                        {isOpen && (
                            <ModalBox isOpen={isOpen}>
                                <ModalContent
                                    onClose={() =>
                                        dispatch(addOpenModal(false))
                                    }
                                />
                            </ModalBox>
                        )}
                    </div>
                </div>

                {/* project section */}
                <div className="w-full md:h-96 flex-wrap flex justify-between gap-3 items-center">
                    {projectsData?.data && projectsData.data.length > 0 ? (
                        projectsData.data.map((item, index) => (
                            <div
                                key={item?._id}
                                onClick={() =>
                                    navigate(`/project/upload/${item?._id}`)
                                }
                                className="w-5/12 md:w-3/12  flex items-center border shadow-lg border-black rounded-md min-h-24 hover:scale-110 duration-300 cursor-pointer hover:shadow-xl"
                            >
                                <div
                                    className={`m-2 rounded-md w-1/4 h-16 ${
                                        index % 2 === 1
                                            ? "bg-primary"
                                            : "bg-orange-500"
                                    }`}
                                >
                                    <h2 className="font-bold font-roboto text-lg md:text-3xl pt-4 text-white flex justify-center items-center">
                                        {item?.name
                                            ? item.name
                                                  .split(" ")
                                                  .map((word) => word[0])
                                                  .join("")
                                                  .toUpperCase()
                                            : ""}
                                    </h2>
                                </div>
                                {/* project title */}
                                <div className="font-roboto ml-2">
                                    <h1 className="text-md font-semibold text-primary">
                                        {item?.name}
                                    </h1>
                                    {/* project last update */}
                                    <p className="text-[10px] text-gray-500 mt-3">
                                        {item?.updatedAt &&
                                            new Date(
                                                item.updatedAt
                                            ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="text-center">
                                <p className="text-xl font-roboto text-gray-500">
                                    No projects available
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;
