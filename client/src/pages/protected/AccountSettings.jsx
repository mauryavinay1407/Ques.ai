import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Subscription from "../../components/Settings/Subscription";
import { Spinner } from "../../components/common/Spinner";
import UploadNavBar from "../../components/common/UploadNavBar";
import {
    useMyInfoQuery,
    useUpdateInfoMutation,
    useUpdateProfilePicMutation,
} from "../../redux/service";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [loadingProfilePic, setLoadingProfilePic] = useState(true);

    const { data, isLoading, refetch } = useMyInfoQuery();
    const [updateProfilePic] = useUpdateProfilePicMutation();
    const [updateInfo] = useUpdateInfoMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setProfilePic(data?.me?.profilePic || null);
            setUsername(data?.me?.userName || "");
            setEmail(data?.me?.email || "");
            setLoadingProfilePic(false);
        }
    }, [data]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);

            const data = new FormData();
            if (file) {
                data.append("media", file);
            }

            toast.promise(updateProfilePic(data), {
                loading: "Updating profile...",
                success: "Profile updated successfully!",
                error: "Failed to update profile",
            });
            await refetch();
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        if (!username) {
            toast.error("Username cannot be empty.");
            return;
        }
        const data = new FormData();
        if (username) {
            data.append("text", username);
        }
        toast.promise(updateInfo(data), {
            loading: "Updating profile...",
            success: "Profile updated successfully!",
            error: "Failed to update profile",
        });
        await refetch();
        setIsSubmitting(false);
    };

    return (
        <div className="w-full">
            {/* navigation section */}
            <UploadNavBar projectName="Settings" pageName="Account Settings" />

            <div className="my-6">
                <h1 className="text-black text-3xl font-roboto font-bold flex items-center">
                    <span
                        className="font-bold cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={28} strokeWidth="3px" />
                    </span>
                    <span className="ml-2 font-semibold">Account Settings</span>
                </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 md:w-28 md:h-28  group cursor-pointer">
                        {loadingProfilePic ? (
                            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
                                <Spinner />
                            </div>
                        ) : profilePic ? (
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                                onLoad={() => setLoadingProfilePic(false)}
                                onError={() => setLoadingProfilePic(false)}
                            />
                        ) : (
                            <div
                                className={`rounded-full w-full h-full flex justify-center items-center ${
                                    Math.floor(Math.random() * 10) % 2 === 1
                                        ? "bg-primary"
                                        : "bg-orange-500"
                                }`}
                            >
                                <h2 className="font-bold font-roboto text-4xl text-white">
                                    {data?.me?.userName
                                        ? data.me.userName
                                              .split(" ")
                                              .map((word) => word[0])
                                              .join("")
                                              .toUpperCase()
                                        : ""}
                                </h2>
                            </div>
                        )}

                        {/* Overlay for hover effect */}
                        <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Upload color="white" />
                        </div>

                        {/* Hidden input that triggers on click */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            disabled={isUploading}
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        Click on profile to {profilePic ? "change" : "set"} your
                        image
                    </p>
                </div>

                {/* User Info */}
                <div className="flex flex-col lg:flex-row gap-2 w-full md:w-2/3">
                    <div className="flex flex-col w-full">
                        <label className="text-sm font-semibold mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-sm font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="w-full lg:w-1/4 mt-7 mr-2">
                    <button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className="w-full py-2 px-4 bg-primary text-white font-semibold text-sm rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="mt-12">
                <Subscription />
            </div>
        </div>
    );
};

export default AccountSettings;
