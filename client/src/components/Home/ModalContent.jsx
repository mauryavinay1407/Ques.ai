import React, { useState } from "react";
import { Spinner } from "../common/Spinner";
import { toast } from "sonner";
import {
    useCreateProjectMutation,
    useGetProjectsQuery,
} from "../../redux/service";

// Modal component for creating new projects
const ModalContent = ({ onClose }) => {
    const [projectName, setProjectName] = useState("");
    const [error, setError] = useState("");

    const [createProject, { isLoading }] = useCreateProjectMutation();

    const { refetch } = useGetProjectsQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (projectName.trim().length < 3) {
            setError("Project name must be at least 3 characters long");
            return;
        }

        try {
            const result = await createProject({ projectName }).unwrap();
            if (result.success) {
                toast.success("Project created successfully");
                setProjectName("");
                await refetch();
                onClose();
            }
        } catch (err) {
            toast.error(err.data?.message || "Failed to create project");
            setError(err.data?.message || "Failed to create project");
        }
    };

    // Validate project name as user types
    const handleProjectNameChange = (e) => {
        const value = e.target.value;
        setProjectName(value);

        if (value.trim().length < 3) {
            setError("Project name must be at least 3 characters long");
        } else {
            setError("");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="w-full px-5">
            <div className="w-full mb-5">
                <h1 className="font-roboto font-bold text-lg md:text-xl">
                    Create Project
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex-col gap-4 mb-2">
                    <label
                        className="py-2 text-gray-700 text-md"
                        htmlFor="projectName"
                    >
                        Enter Project Name:
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        placeholder="Type here"
                        required
                        onChange={handleProjectNameChange}
                        className={`w-full p-2 mt-2 border rounded-lg ${
                            error ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                </div>
                <p className="text-red-500 text-sm">
                    Project Name Can't be empty
                </p>
                {/* Form actions */}
                <div className="flex justify-end gap-3 font-semibold my-5">
                    <button
                        type="button"
                        className="text-red-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-primary rounded-md px-2 text-white py-2 hover:bg-purple-800"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalContent;
