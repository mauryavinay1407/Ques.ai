import React from "react";

const UploadBox = () => {
    return (
        <div className="w-full border-2 border-1-black shadow-lg rounded-lg h-auto">
            <div className="flex justify-center items-center md:my-5 my-2">
                {/* cloud icon */}
                <img
                    src="https://cdn.iconfinder.com/stored_data/2233450/128/png?token=1746088912-vqYomAOhoZv09MMGUI1IFaJsJVTfEcHrwWAsu2r6YjM%3D"
                    alt="Logo"
                    className="w-18 object-fill "
                />
            </div>
            {/* text section */}
            <div className="text-center">
                <p className="font-roboto text-black text-md md:text-lg ">
                    {" "}
                    Select a file or drag and drop here (Podcast Media or
                    Transcription Text){" "}
                </p>
                <p className="text-gray-500 text-xs md:text-sm">
                    MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
                </p>
                <button className="border-primary border rounded-3xl py-[7px] px-4 mb-8 font-roboto font-semibold text-md text-primary my-4">
                    {" "}
                    Select File{" "}
                </button>
            </div>
        </div>
    );
};

export default UploadBox;
