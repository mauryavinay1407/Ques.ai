import React from "react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "../common/Spinner";
import {
    useDeleteTranscriptMutation,
    useGetTranscriptsQuery,
} from "../../redux/service";

// transcript table to show all the transcripts for project
const TsTable = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const { data: transcripts, isLoading } = useGetTranscriptsQuery(projectId);
    const [deleteTranscript] = useDeleteTranscriptMutation();

    const handleView = (transcriptId) => {
        navigate(`/project/${projectId}/transcript/edit/${transcriptId}`);
    };

    const handleDelete = async (transcriptId) => {
        try {
            await deleteTranscript({ projectId, transcriptId }).unwrap();
            toast.success("Transcript deleted successfully");
        } catch (error) {
            toast.error("Failed to delete transcript");
        }
    };

    if (isLoading) {
        return <div className="w-full h-full flex justify-center items-center">
            <Spinner />;
        </div> 
    }

    return (
        <div className="bg-white border-1-black border-2 font-roboto rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Your Files</h2>
            <div className="max-h-[400px] overflow-y-auto">
                {/* table headings */}
                <table className="w-full">
                    <thead className="bg-gray-200 text-[#7e7e7e]">
                        <tr className="rounded-md">
                            <th className="py-2 px-4 text-left">No.</th>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">
                                Upload Date & Time
                            </th>
                            <th className="py-2 px-4 pl-32 text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* table data */}
                        {transcripts?.data?.map((transcript, index) => (
                            <tr
                                key={transcript._id}
                                className="border-b text-gray-800"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">
                                    {transcript.fileName}
                                </td>
                                <td className="py-3 px-4">
                                    {format(
                                        new Date(transcript.createdAt),
                                        "dd MMM yy | HH:mm"
                                    )}
                                </td>
                                <td className="py-1 px-4 pl-20">
                                    <div className="flex">
                                        <button
                                            onClick={() =>
                                                handleView(transcript._id)
                                            }
                                            className="px-4 py-1 font-semibold text-[#646464] border-2 border-[#c7c7c7] border-r-0 rounded-l-lg hover:bg-primary hover:text-white transition-colors"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(transcript._id)
                                            }
                                            className="px-4 py-1 font-semibold text-[#ff274c] border-2 border-[#c7c7c7] border-l-1 rounded-r-lg hover:bg-red-500 hover:text-white transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {(!transcripts?.data || transcripts.data.length === 0) && (
                <div className="text-center py-4 text-gray-500">
                    No files available
                </div>
            )}
        </div>
    );
};

export default TsTable;
