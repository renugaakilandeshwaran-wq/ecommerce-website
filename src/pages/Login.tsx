import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            const res = await api.post("/auth/login", {
                username: name,
                password: password,
            });
            localStorage.setItem("token", res.data.token);

            navigate("/");
        } catch (error) {
            console.log(error);
            // setError("Invalid username or password");
            setError("Login failed")

        } finally {
            setLoading(false);
        }
    }
    const navigate = useNavigate();
    return (
        <div className="mx-auto max-w-7xl mt-20">


            <form
                onSubmit={handleLogin}
                className=" mx-auto  mt-20 bg-white shadow-lg rounded-xl p-8 w-full max-w-md"

            >

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>


                <input
                    placeholder="Username"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-400 rounded-lg w-full px-4 py-3 mb-4"

                />


                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-400 rounded-lg w-full px-4 py-3 mb-4"

                />
                {/* error */}


                {error && <p className="text-red-500 mb-4">{error}</p>
                }
                {/* button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
                >
                    {loading ? "Loging in ..." : "Login"}
                </button>
            </form>


        </div>
    )
}

export default Login;