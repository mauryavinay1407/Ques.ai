import React, { useState } from "react";
import { Spinner } from "../../components/common/Spinner";
import { X } from "lucide-react";

const UploadInput = ({ onClose, onUpdate, icon, text }) => {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    //  input validation
    const validate = () => {
        let tempErrors = {};
        if (!name.trim()) tempErrors.name = "Name is required";
        else if (name.trim().length < 4)
            tempErrors.name = "Name must be at least 4 characters";
        if (!link.trim()) tempErrors.link = "Link/Description is required";
        else if (link.trim().length < 4)
            tempErrors.link = "Link/Description must be at least 4 characters";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // handle update
    const handleUpdate = async () => {
        if (validate()) {
            try {
                await onUpdate({
                    name: name.trim(),
                    link: link.trim(),
                });
                setName("");
                setLink("");
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Spinner />;
            </div>
        );
    }

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <img src={icon} className="w-6 h-6 md:w-7 md:h-7" alt="icon" />
                    <h2 className="text-lg md:text-xl font-bold">{text}</h2>
                </div>
                <div onClick={onClose}>
                    <X
                        onClick={onClose}
                        className="text-xl hover:cursor-pointer hover:scale-110 duration-700"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-bold text-sm md:text-base">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded text-sm md:text-base"
                />
                {errors.name && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">{errors.name}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="link" className="block mb-2 font-bold text-sm md:text-base">
                    Link / Description
                </label>
                <textarea
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full p-2 border rounded text-sm md:text-base"
                    rows="3"
                ></textarea>
                {errors.link && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">{errors.link}</p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleUpdate}
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black text-sm md:text-base"
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default UploadInput;
