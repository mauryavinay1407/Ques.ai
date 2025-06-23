import React, { useEffect, useState } from "react";
import CustomQLogo from "../components/UI/Qlogo";
import {
    useLoginMutation,
    useMyInfoQuery,
    useSignupMutation,
} from "../redux/service";
import { toast } from "sonner";

const Register = () => {
    const [toggle, setToggle] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signupUser, signupUserData] = useSignupMutation();
    const [loginUser, loginUserData] = useLoginMutation();
    const { refetch } = useMyInfoQuery();

    const handleToggle = () => {
        setToggle((prev) => !prev);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email, password };
        await loginUser(data);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = { email, userName, password };
        await signupUser(data);
    };

    useEffect(() => {
        if (signupUserData.isSuccess) {
            toast.success(signupUserData.data?.msg);
            refetch();
        }
        if (signupUserData.isError) {
            toast.error(signupUserData.error?.data?.msg);
        }
    }, [signupUserData.isSuccess, signupUserData.isError]);

    useEffect(() => {
        if (loginUserData.isSuccess) {
            toast.success(loginUserData.data?.msg);
            refetch();
        }
        if (loginUserData.isError) {
            toast.error(loginUserData.error?.data?.msg);
        }
    }, [loginUserData.isSuccess, loginUserData.isError]);

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row font-roboto">
            {/* landing page section */}
            <div className="landing-section w-full md:w-[68%] h-[320px] md:h-auto flex items-center bg-[#7e22ce] md:bg-transparent">
                <div className="w-full h-full flex flex-col gap-8 md:gap-12 p-6 md:p-12 justify-center">
                    <div className="flex gap-[5px] items-center">
                        <CustomQLogo stroke="#ffffff" width={32} height={32} />
                        <h2 className="text-2xl md:text-3xl font-bold text-[#ffffff]">
                            Ques.<span className="font-thin">AI</span>
                        </h2>
                    </div>
                    <p className="mt-2 text-3xl md:text-5xl text-[#ffffff] leading-tight">
                        Your podcast <br className="hidden md:block" /> will no
                        longer <br className="hidden md:block" /> be just a hobby.
                    </p>
                    <p className="text-base md:text-[1.35rem] text-[#ffffff]">
                        Supercharge Your Distribution <br className="hidden md:block" /> using our AI
                        assistant!
                    </p>
                </div>
            </div>

            {/* Signup / login section */}
            <div className="w-full md:w-[32%] bg-[#f5f6fa] flex flex-col justify-center min-h-[400px] md:min-h-screen">
                <div className="flex justify-center pt-8 md:pt-0">
                    <CustomQLogo stroke="#7e22ce" width={64} height={64} />
                </div>

                <div className="py-4 px-4 sm:rounded-lg sm:px-10">
                    <div className="mb-6 flex flex-col items-center justify-center">
                        <h2 className="text-center text-2xl md:text-3xl font-normal text-[#7e22ce]">
                            Welcome to
                        </h2>
                        <div className="flex">
                            <h2 className="text-center text-xl md:text-[1.68rem] font-bold text-[#7e22ce]">
                                Ques.AI
                            </h2>
                        </div>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <form
                            className="space-y-6"
                            onSubmit={toggle ? handleRegister : handleLogin}
                        >
                            <div>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {toggle && (
                                <div>
                                    <div className="mt-1">
                                        <input
                                            id="username"
                                            name="userName"
                                            type="text"
                                            placeholder="Username"
                                            required
                                            className="appearance-none block w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={userName}
                                            onChange={(e) =>
                                                setUserName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7e22ce] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {toggle ? "Sign up" : "Login"}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                {toggle
                                    ? "Already have an account?"
                                    : "Don't have an account?"}{" "}
                                <button
                                    className="font-medium text-[#005ad5] hover:text-indigo-500"
                                    onClick={handleToggle}
                                >
                                    {toggle ? "Login" : "Create Account"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
