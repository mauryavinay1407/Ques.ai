import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
    useGetProjectByIdQuery,
    useGetTranscriptByIdQuery,
    useEditTranscriptMutation,
} from "../../redux/service";
import UploadNavBar from "../../components/common/UploadNavBar";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "../../components/common/Spinner";

const TranscriptEdit = () => {
    const navigate = useNavigate();
    const { projectId, transcriptId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");
    const contentEditableRef = useRef(null);

    // RTK Query hooks
    const { data: projectData } = useGetProjectByIdQuery(projectId);
    const { data: transcriptData, isLoading } = useGetTranscriptByIdQuery({
        projectId,
        transcriptId,
    });
    const [editTranscript] = useEditTranscriptMutation();

    // Set initial data
    useEffect(() => {
        if (transcriptData?.data) {
            setContent(transcriptData.data.fileDescription || "");
        }
    }, [transcriptData]);

    const handleUpdate = async () => {
        try {
            await editTranscript({
                projectId,
                transcriptId,
                data: {
                    fileDescription: content,
                },
            }).unwrap();

            toast.success("Transcript updated successfully");
            setIsEditing(false);
            navigate(`/project/upload/${projectId}`);
        } catch (error) {
            toast.error(error.data?.message || "Failed to update transcript");
        }
    };

    if (isLoading) {
        return <div className="w-full h-full flex justify-center items-center">
            <Spinner />;
             </div> 
    }

    return (
        <div className="w-full justify-center items-center">
            {/* navigation section */}
            <UploadNavBar
                projectName={projectData?.data?.name}
                pageName="Edit Transcript"
            />
            <div className="my-8 w-11/12 flex justify-between items-center">
                <h1 className="text-black text-3xl font-roboto font-bold flex items-center">
                    <span
                        className="font-bold cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={28} strokeWidth="3px" />
                    </span>
                    <span className="ml-2 font-semibold">Edit Transcript</span>
                </h1>
                {isEditing ? (
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setContent(
                                    transcriptData?.data?.fileDescription || ""
                                );
                                setFileName(
                                    transcriptData?.data?.fileName || ""
                                );
                            }}
                            className="border border-red-700 rounded-md py-1 px-4 text-red-700 font-roboto font-semibold"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="bg-gray-900 text-white py-1 px-4 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="w-2/12">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-black text-white py-1 px-4 w-4/6 float-right rounded-md"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* editing section */}
            <div className="w-11/12">
                <div className="border shadow-lg border-primary rounded-md mt-5 h-96 font-roboto text-sm">
                    <h3 className="text-primary text-lg font-semibold ml-8 my-2">
                        Speaker
                    </h3>
                    {isEditing ? (
                        <div className="p-4">
                            <textarea
                                ref={contentEditableRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full min-h-[20rem] p-4 rounded resize-none outline-none border"
                                placeholder="Content"
                            />
                        </div>
                    ) : (
                        <div className="overflow-y-auto w-full h-full p-4">
                            <p className="w-full h-[calc(100%-4rem)] p-4">
                                {content}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TranscriptEdit;
