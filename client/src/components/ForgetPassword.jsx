import { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send the email for password reset
        try {
            // Make an API call to your backend to initiate the password reset process
            // Example: send a reset link to the provided email
            // Implement your logic to handle the password reset request here

            // For example, once the request is successful:
            setSubmitted(true);
        } catch (error) {
            console.error('Error initiating password reset:', error);
            // Handle error scenarios (display error message, etc.)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                {submitted ? (
                    <p className="text-green-600">Password reset instructions sent to your email.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
