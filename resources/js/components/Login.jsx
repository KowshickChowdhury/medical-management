import React, { useState } from 'react'
import AuthApis from '../apis/AuthApis';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const[input, setInput] = useState({
        email: '',
        password: '',
    });
    const [validation, setValidation] = useState({
        name: false,
        email: false,
        password: false,
    });
    const handleInput = (e) => {
        setInput(prevState => {
            const updatedInput = { ...prevState, [e.target.name]: e.target.value };
            console.log('input', updatedInput);
            setValidation(prevState => ({
                ...prevState,
                [e.target.name]: false,
            }));
            return updatedInput;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        const updatedValidation = {};
        Object.keys(input).forEach(key => {
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
            const res = await AuthApis.login(input);
            setLoading(false);
            if (res.success) {
                localStorage.email = res.data.data.email;
                localStorage.name = res.data.data.name;
                localStorage.token = res.data.data.token;
                // window.location.reload();
                navigate('/')
            } else if (res.errors) {
                const errorMessages = Object.values(res.errors).join('. ');
                setMessage(errorMessages);
                setTimeout(() => {
                  setMessage('');
                }, 5000);
            }
            console.log('first', res)
        }
    }
    

  return (
    <div>
        <div className="bg-gray-50 font-[sans-serif] text-[#333]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
                    <h2 className="text-center text-3xl font-extrabold">
                        Log in to your account
                    </h2>
                    <form className="mt-10 space-y-4">
                        <div>
                        <input name="email" type="email" autoComplete="email" value={input.email} onChange={handleInput} required className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500" placeholder="Email address" />
                        </div>
                        {validation.email && <p className="text-red-500 text-sm">Email is required</p>}
                        <div>
                        <input name="password" type="password" autoComplete="current-password" value={input.password} onChange={handleInput} required className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500" placeholder="Password" />
                        </div>
                        {validation.password && <p className="text-red-500 text-sm">Password is required</p>}
                        <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-3 block text-sm">
                            Remember me
                            </label>
                        </div>
                        <div>
                            <a href="jajvascript:void(0);" className="text-sm text-blue-600 hover:text-blue-500">
                            Forgot Password?
                            </a>
                        </div>
                        </div>
                        {message && <p className="text-red-500 text-base font-bold mt-2">{message}</p>}
                        <div className="!mt-10">
                        <button type="button" onClick={handleSubmit} className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                        <p className="text-sm mt-6 text-center">Don't have an account? <a href="/signup" className="text-blue-600 font-semibold hover:underline ml-1">Signup here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login