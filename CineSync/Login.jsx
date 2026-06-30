import React, { useState } from "react";
import {
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = () => {
    // Basic client-side validation
    setFormError("");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-md w-full text-white p-8 rounded-2xl shadow-2xl bg-white/5 backdrop-blur border border-white/10">

        {isSubmitted ? (
          <div className="text-center py-10">
            <p className="text-4xl mb-3">🎉</p>
            <h2 className="text-lg font-semibold text-green-400">
              {isRegistering ? "Account created!" : "Welcome back!"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">Redirecting you soon…</p>
          </div>
        ) : (
          <>
            {/* Tab switcher */}
            <div className="flex rounded-lg overflow-hidden border border-white/10 mb-6">
              <button
                onClick={() => setIsRegistering(false)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  !isRegistering
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsRegistering(true)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  isRegistering
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Register
              </button>
            </div>

            <h2 className="text-xl font-bold mb-4 text-center">
              {isRegistering ? "Create an Account" : "Welcome Back"}
            </h2>

            {isRegistering && (
              <>
                <MDBInput label="Full Name" type="text" className="mb-3 text-white" />
                <MDBInput label="Username" type="text" className="mb-3 text-white" />
              </>
            )}

            <MDBInput label="Email" type="email" className="mb-3 text-white" />
            <MDBInput label="Password" type="password" className="mb-3 text-white" />

            {isRegistering ? (
              <div className="flex justify-center my-3">
                <MDBCheckbox id="terms" label="I agree to the Terms of Service" />
              </div>
            ) : (
              <div className="flex justify-between items-center my-3">
                <MDBCheckbox id="rememberMe" label="Remember me" />
                <a href="#" className="text-blue-400 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {formError && (
              <p className="text-red-400 text-sm text-center mb-3">{formError}</p>
            )}

            <MDBBtn
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg font-semibold"
            >
              {isRegistering ? "Sign Up" : "Sign In"}
            </MDBBtn>

            <p className="text-center mt-5 text-gray-400 text-sm">
              {isRegistering ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-blue-400 cursor-pointer hover:underline"
                    onClick={() => setIsRegistering(false)}
                  >
                    Sign In
                  </span>
                </>
              ) : (
                <>
                  New to CineSync?{" "}
                  <span
                    className="text-red-400 cursor-pointer hover:underline"
                    onClick={() => setIsRegistering(true)}
                  >
                    Create an account
                  </span>
                </>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
