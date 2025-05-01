import React from "react";
import CustomQLogo from "../UI/Qlogo";

const QSLogo = ({ color, height, width }) => {
    return (
        // creating custom log and text
        <div className="flex gap-[5px] items-center">
            <CustomQLogo stroke={color} width={width} height={height} />
            <h2 className="text-center text-3xl font-bold" style={{ color }}>
                Ques.<span className="font-thin">AI</span>
            </h2>
        </div>
    );
};

export default QSLogo;
