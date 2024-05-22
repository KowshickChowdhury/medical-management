import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApis from "../apis/AuthApis";

function Signup() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        account_type: "Individual",
    });
    const [validation, setValidation] = useState({
        name: false,
        email: false,
        password: false,
    });

    const handleInput = (e) => {
        setInput((prevState) => {
            const updatedInput = {
                ...prevState,
                [e.target.name]: e.target.value,
            };
            return updatedInput;
        });

        setValidation((prevState) => ({
            ...prevState,
            [e.target.name]: false,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        const updatedValidation = {};
        Object.keys(input).forEach((key) => {
            if (!input[key]) {
                updatedValidation[key] = true;
                isValid = false;
            } else {
                updatedValidation[key] = false;
            }
        });
        setValidation(updatedValidation);

        if (isValid) {
            setLoading(true);
            const res = await AuthApis.save(input);
            setLoading(false);
            if (res.success) {
                setMessage(res.data.message);
                setTimeout(() => {
                    setMessage("");
                    navigate("/login");
                }, 1000);
            } else if (res.errors) {
                setError(res);
                const errorMessages = Object.values(res.errors).join(". ");
                setMessage(errorMessages);
                setTimeout(() => {
                    setMessage("");
                }, 5000);
            }
        }
    };

    return (
        <div>
            <div className="font-[sans-serif] text-[#333] mt-4 p-4 relative">
                <div className="max-w-md w-full mx-auto relative z-50">
                    <div className="border border-gray-300 bg-white rounded-md p-8">
                        <form className="w-full">
                            <div className="mb-6">
                                <h3 className="text-2xl font-extrabold">
                                    Create an account
                                </h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm mb-2 block">
                                        Name
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="name"
                                            type="text"
                                            onChange={handleInput}
                                            required
                                            className={`bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500 ${
                                                validation.name &&
                                                "border-red-500"
                                            }`}
                                            placeholder="Enter name"
                                        />
                                    </div>
                                    {validation.name && (
                                        <p className="text-red-500 text-sm">
                                            Name is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm mb-2 block">
                                        Email
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="email"
                                            type="email"
                                            onChange={handleInput}
                                            required
                                            className={`bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500 ${
                                                validation.email &&
                                                "border-red-500"
                                            }`}
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    {validation.email && (
                                        <p className="text-red-500 text-sm">
                                            Email is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm mb-2 block">
                                        Account Type
                                    </label>
                                    <select
                                        className="border p-2 w-96 rounded"
                                        name="account_type"
                                        value={input.account_type}
                                        onChange={handleInput}
                                    >
                                        <option value="Individual">
                                            Individual
                                        </option>
                                        <option value="Business">
                                            Business
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm mb-2 block">
                                        Password
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="password"
                                            type="password"
                                            onChange={handleInput}
                                            required
                                            className={`bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500 ${
                                                validation.password &&
                                                "border-red-500"
                                            }`}
                                            placeholder="Enter password"
                                        />
                                    </div>
                                    {validation.password && (
                                        <p className="text-red-500 text-sm">
                                            Password is required
                                        </p>
                                    )}
                                </div>
                                {/* Other form fields */}
                            </div>
                            {error && message && (
                                <p className="text-red-500 text-base font-bold mt-2">
                                    {message}
                                </p>
                            )}
                            {!error && message && (
                                <p className="text-green-500 text-base font-bold mt-2">
                                    {message}
                                </p>
                            )}
                            <div className="!mt-10">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                >
                                    {loading
                                        ? "Loading..."
                                        : "Create an account"}
                                </button>
                            </div>
                            <p className="text-sm mt-6 text-center">
                                Already have an account?{" "}
                                <a
                                    href="/"
                                    className="text-blue-600 font-semibold hover:underline ml-1"
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
                <img
                    src="https://readymadeui.com/bg-effect.svg"
                    className="absolute inset-0 w-full h-full z-0 opacity-40"
                />
            </div>
        </div>
    );
}

export default Signup;
