"use client";

import { gql, useMutation } from "@apollo/client";

// Define the GraphQL mutation
const LOGIN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      accessToken
      user {
        phone
        email
        name
        role {
          id
        }
      }
    }
  }
`;

export default function LoginPage() {
    const [logIn, { data, loading, error }] = useMutation(LOGIN);

    const handleLogin = async () => {
        const email = "techofreact@gmail.com";
        const password = "null";

        try {
            const result = await logIn({ variables: { email, password } });
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>

                {error && <p className="text-red-500 text-center mt-2">{error.message}</p>}

                {data && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
                        <h2 className="text-lg font-semibold">Login Successful</h2>
                        <p><strong>Access Token:</strong> {data.logIn.accessToken}</p>
                        <p><strong>Email:</strong> {data.logIn.user.email}</p>
                        <p><strong>Name:</strong> {data.logIn.user.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
