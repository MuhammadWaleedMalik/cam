import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase"; // Ensure Firebase is set up
import useGoogle from "../hooks/useGoogle"; // Assuming this hook exists
import useLogin from "../hooks/useLogin"; // Assuming this hook exists

const colors = {
  primary: "#F96167",  // Red
  secondary: "#F9E795", // Light Yellow
  textDark: "#000000", // Black
  background: "#F9E795", // Light Yellow
};

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { authenticateWithGoogle } = useGoogle();
  const { login } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check for token on mount to redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to home if authenticated
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const response = await authenticateWithGoogle(displayName, email);
      localStorage.setItem("credits", response.user.credits);
      localStorage.setItem("token", response.token);
      alert("Signed in with Google successfully!");
      navigate("/");
    } catch (error) {
      setError(error.message || "Google login failed");
      console.error("Google login failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      if (email === "admin@newtonai.net" && password === "@Abc123456") {
        localStorage.setItem("Admin", "Done");
        navigate("/admin");
      } else {
        const response = await login(email, password);
        if (response !== undefined) {
          localStorage.removeItem("credits");
          localStorage.removeItem("token");
          localStorage.setItem("credits", response.user.credits);
          localStorage.setItem("token", response.token);
          alert("Logged in successfully!");
          navigate("/");
        } else {
          setError("Internal Error Occurred. Try Again Later");
        }
      }
    } catch (error) {
      setError(error.message || "Login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full flex flex-col justify-center items-center bg-[#F9E795] px-8 sm:px-20"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-5xl font-bold font-inkfree mb-10 uppercase"
        style={{ color: colors.textDark }}
      >
        {t("login")}
      </motion.h1>

      {/* Google Login Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex justify-center w-full"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={handleGoogleLogin}
          className="p-5 flex items-center justify-center font-bold text-xl rounded-lg transition-all duration-300 uppercase w-full max-w-lg shadow-md"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: colors.textDark,
          }}
        >
          <FcGoogle className="h-7 w-7 mr-3" />
          {t("continueWithGoogle")}
        </motion.button>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="my-4 text-center text-black"
      >
        OR
      </motion.div>

      {/* Email Login Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex flex-col items-center w-full max-w-lg space-y-4"
      >
        <input
          type="email"
          className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F96167]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ backgroundColor: "#ffffff", color: colors.textDark }}
        />
        <input
          type="password"
          className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F96167]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ backgroundColor: "#ffffff", color: colors.textDark }}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="p-4 font-bold text-xl rounded-lg transition-all duration-300 uppercase w-full shadow-md"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: colors.textDark,
          }}
        >
          {t("login")}
        </motion.button>
      </motion.form>

      {/* "Don't have an account?" */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-lg mt-10 text-center"
        style={{ color: colors.textDark }}
      >
        {t("dontHaveAccount")}{" "}
        <Link
          to="/signup"
          className="font-bold text-2xl hover:underline"
          style={{ color: colors.primary }}
        >
          {t("signup")}
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default Login;