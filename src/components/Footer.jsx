import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();

  const website = {
    name: "CemedBidAi",
    slogan: "Gen AI Tender& Proposal writing & bid management",
  };

  const colors = {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000",
    paragraph: "#A1A1AA",
    background: "#000000", // Added for consistency
    border: "#A1A1AA"
  };

  return (
    <footer style={{ backgroundColor: colors.background, color: colors.text }} className="pt-16 pb-10 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-start">
        {/* Left Side - Website Name & Slogan */}
        <div className="w-full md:w-1/3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
              <img src={"/images/logo.jpg"} alt="Logo Image" className="w-12 h-12 object-contain" />
              <Link
              to="/"
              className="text-5xl italic font-extrabold tracking-wide"
              style={{ color: colors.secondary }}
            >
              {t(website.name)}
            </Link>
          </motion.div>
          <motion.p
            whileHover={{ x: 5, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ color: colors.paragraph }}
            className="mt-2 text-lg italic"
          >
            {t(website.slogan)}
          </motion.p>
        </div>

        {/* Right Side - Links */}
        <div className="w-full md:w-2/3 flex justify-between gap-12 mt-10 md:mt-0">
          {/* Company Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-left"
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold mb-3" style={{ color: colors.secondary }}>
              {t("Company")}
            </h3>
            <ul className="space-y-2 text-lg">
              <li>
                <Link 
                  to="/aboutus" 
                  className="transition-all duration-300"
                  style={{ color: colors.paragraph }}
                  onMouseEnter={(e) => e.target.style.color = colors.secondary}
                  onMouseLeave={(e) => e.target.style.color = colors.paragraph}
                >
                  {t("About Us")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="transition-all duration-300"
                  style={{ color: colors.paragraph }}
                  onMouseEnter={(e) => e.target.style.color = colors.secondary}
                  onMouseLeave={(e) => e.target.style.color = colors.paragraph}
                >
                  {t("Blogs")}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-left"
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold mb-3" style={{ color: colors.secondary }}>
              {t("Legal")}
            </h3>
            <ul className="space-y-2 text-lg">
              <li>
                <Link 
                  to="/terms" 
                  className="transition-all duration-300"
                  style={{ color: colors.paragraph }}
                  onMouseEnter={(e) => e.target.style.color = colors.secondary}
                  onMouseLeave={(e) => e.target.style.color = colors.paragraph}
                >
                  {t("Terms")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="transition-all duration-300"
                  style={{ color: colors.paragraph }}
                  onMouseEnter={(e) => e.target.style.color = colors.secondary}
                  onMouseLeave={(e) => e.target.style.color = colors.paragraph}
                >
                  {t("Privacy")}
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="mt-12 pt-6 text-center"
        style={{ borderTop: `1px solid ${colors.border}` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-lg italic" style={{ color: colors.paragraph }}>
          &copy; {new Date().getFullYear()} {t(website.name)}. {t("All rights reserved.")}
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
