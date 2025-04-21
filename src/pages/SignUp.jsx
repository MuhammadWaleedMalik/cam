import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useRegister from "../hooks/useRegister"; // Assuming this hook exists

const SignUp = () => {
  const { t } = useTranslation();
  const { register, isloading } = useRegister();
  const navigate = useNavigate();

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");

  const colors = {
    primary: "#F96167",
    secondary: "#F9E795",
    textDark: "#000000",
    background: "#F9E795",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setError("");

    if ( !email || !password ) {
      setFormError("Please fill in all fields");
      return;
    }

    

    try {
      const response = await register(email, password); // Using useRegister hook
      if (response !== undefined) {
        alert("Signed up successfully!");
        navigate("/login"); // Redirect to login as in Sign Up Page 2
      } else {
        setFormError("Email already exists or internal error occurred. Try again later.");
      }
    } catch (err) {
      setFormError(err.message || t("signupFailed"));
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full flex flex-col justify-center items-center bg-[#F9E795] mt-48 mb-48 px-8 sm:px-20"
    >
      {/* Sign Up Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-5xl font-bold font-inkfree mb-10 uppercase"
        style={{ color: colors.primary }}
      >
        {t("signup")}
      </motion.h1>

      {/* Error Message */}
      {(formError || error) && (
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 10, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
          className="bg-red-500/70 text-white px-6 py-3 rounded-lg mb-6 text-lg shadow-md"
        >
          {formError || error}
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="space-y-8 w-full max-w-lg"
      >
        {/* Input Fields */}
        {[
    
          { label: t("emailAddress"), value: email, setter: setEmail, type: "email" },
          { label: t("password"), value: password, setter: setPassword, type: "password" },
          
        ].map(({ label, value, setter, type }, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex flex-col"
          >
            <label className="text-3xl font-semibold" style={{ color: colors.primary }}>
              {label}
            </label>
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full p-4 border-b-2 border-gray-500 bg-transparent text-black text-xl focus:outline-none focus:border-yellow-400"
              required
              disabled={isloading} // From useRegister hook
            />
          </motion.div>
        ))}

        {/* Sign Up Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          type="submit"
          disabled={isloading}
          className="mt-8 p-5 text-yellow-300 font-bold text-xl rounded-lg hover:opacity-80 transition-all duration-300 uppercase w-full"
          style={{ backgroundColor: colors.primary }}
        >
          {isloading ? t("creatingAccount") : t("createAccount")}
        </motion.button>
      </motion.form>

      {/* Already have an account? */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="text-lg mt-10 text-center"
        style={{ color: colors.primary }}
      >
        {t("alreadyHaveAccount")}{" "}
        <Link
          to="/login"
          className="font-bold italic text-2xl hover:underline"
          style={{ color: "black" }}
        >
          {t("login")}
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default SignUp;