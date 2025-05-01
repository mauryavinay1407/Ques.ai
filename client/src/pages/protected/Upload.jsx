import React, { useState } from "react";
import UploadBox from "../../components/Upload/UploadBox";
// import DataTable from "../components/UploadPage/DataTable";
import ModalBox from "../../components/common/ModalBox";
import UploadContent from "../../components/Upload/UploadContent";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import UploadNavBar from "../../components/common/UploadNavBar";
import { useDispatch, useSelector } from "react-redux";
import { addOpenModal } from "../../redux/slice";
import {
    useCreateTranscriptMutation,
    useGetProjectByIdQuery,
    useGetTranscriptsQuery,
} from "../../redux/service";
import { Spinner } from "../../components/common/Spinner";
import TsTable from "../../components/Upload/TsTable";

const Upload = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const { openModal } = useSelector((state) => state.service);

    const { data: projectData } = useGetProjectByIdQuery(projectId);
    const [createTranscript] = useCreateTranscriptMutation();
    const { data: transcriptsData, isLoading } =
        useGetTranscriptsQuery(projectId);

    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedText, setSelectedText] = useState(null);

    // all the uploading options
    const uploadMethods = [
        {
            platform: "Rss Feed",
            icon: "https://cdn.iconfinder.com/stored_data/2233396/128/png?token=1746086611-amwhaVv9z4s43Y0%2BgZ%2FpJMO9NNWcG8KQ6Iz8BelwBh0%3D",
            text: "RSS Feed",
            description: "dolor sit amet consectetur adipisicing elit ftre.",
        },
        {
            platform: "youtube",
            icon: "https://cdn.iconfinder.com/stored_data/2233393/128/png?token=1746086503-Ae6fheXN%2B8fdNrylj9sDkxZu1mKEmf96LwBpV4S%2Fds0%3D",
            text: "YouTube Video",
            description: "dolor sit amet consectetur adipisicing elit ftre.",
        },
        {
            platform: "Upload Files",
            icon: "https://cdn.iconfinder.com/stored_data/2233392/128/png?token=1746086413-Xvj2Dd8AFKGdNiVs8Pdv%2BG84wvSnZrWuXGTIiKBJcGw%3D",
            text: "Upload Files",
            description: "dolor sit amet consectetur adipisicing elit ftre.",
        },
    ];

    const displayMethods =
        transcriptsData?.data?.length > 0
            ? uploadMethods.slice(0, 3)
            : uploadMethods;

    const handleMethodClick = (icon, text) => {
        setSelectedIcon(icon);
        setSelectedText(text);
        dispatch(addOpenModal(true));
    };

    const handleUpdate = async (data) => {
        try {
            const { name, link } = data;
            await createTranscript({
                projectId,
                data: { fileName: name, fileDescription: link },
            }).unwrap();
            toast.success("Upload success");
            dispatch(addOpenModal(false));
        } catch (error) {
            toast.error("Upload Failed! Try again later");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="w-full max-h-screen bg-[#f9f9f9]">
            {/* Navigation section */}
            <UploadNavBar
                projectName={projectData?.data?.name}
                pageName="Add your podcast"
            />

            {/* Modal */}
            <ModalBox isOpen={openModal}>
                <UploadContent
                    icon={selectedIcon}
                    text={selectedText}
                    onClose={() => dispatch(addOpenModal(false))}
                    onUpdate={handleUpdate}
                />
            </ModalBox>

            {/* Main Content */}
            <div className="w-full flex justify-start items-center">
                <div className="w-11/12 my-4 ml-1">
                    <h1 className="font-bold text-3xl font-roboto text-black">
                        Add Podcast
                    </h1>

                    <div className="py-5 mt-4 flex flex-wrap justify-between gap-1">
                        {displayMethods && displayMethods.length > 0 ? (
                            displayMethods.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        handleMethodClick(item.icon, item.text)
                                    }
                                    className="border-1-black w-5/12 shadow-lg lg:w-[30%] h-24 lg:h-32 flex items-center rounded-md border-2 mb-3 cursor-pointer"
                                >
                                    <div className="flex w-full p-1 lg:p-2 justify-center items-center rounded-md">
                                        <div className="flex w-3/4 flex-col justify-start">
                                            <h1 className="font-roboto font-semibold text-md lg:text-xl">
                                                {item.text}
                                            </h1>
                                            <p className="text-[12px] lg:text-sm font-roboto text-[#6e6e6e]">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div
                                            className={`w-[37px] lg:w-14 ${
                                                item.text === "Upload Files"
                                                    ? "bg-[#f3e8ff]"
                                                    : ""
                                            } rounded-md lg:rounded-2xl min-h-[37px] lg:min-h-14 flex justify-center items-center`}
                                        >
                                            <img
                                                src={item.icon}
                                                alt="Logo"
                                                className={
                                                    item.text === "Upload Files"
                                                        ? "w-6 lg:w-8"
                                                        : "w-8 lg:w-14"
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No Upload Methods Available</div>
                        )}
                    </div>

                    {transcriptsData?.data.length > 0 ? (
                        <div className="mt-2">
                            <TsTable />
                        </div>
                    ) : (
                        <div
                            onClick={() =>
                                handleMethodClick(
                                    uploadMethods[2].icon,
                                    uploadMethods[2].text
                                )
                            }
                            className="cursor-pointer"
                        >
                            <UploadBox />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upload;
