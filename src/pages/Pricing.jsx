import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const colors = {
  primary: "#F96167",
  secondary: "#F9E795",
  textDark: "#000000",
  background: "#F9E795",
};

const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Pricing plans from Pricing Two
  const plans = [
    { id: "basic", name: t("Basic Plan"), price: 25, credits: 50, route: "/pricing/basic" },
    { id: "enterprise", name: t("Enterprise Plan"), price: 50, credits: 100, route: "/pricing/enterprise", isPopular: true },
    { id: "pro", name: t("Pro Plan"), price: 100, credits: 200, route: "/pricing/pro" },
  ];

  // Features from Pricing Two
  const features = [
    t("AI BID Generation"),
    t("AI Proposal Creation"),
    t("AI-Generated Tender TEMPLATE"),
    t("AI Enhancer"),
  ];

  return (
    <div className="w-full bg-[#F9E795] mt-24 mb-24 px-6 sm:px-10 lg:px-12 py-24 flex flex-col items-center">
      {/* Header with Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-[62px] font-extrabold mb-4 font-inkfree" style={{ color: colors.primary }}>
        CemedBidAi
        </h1>
        <h2 className="text-3xl font-semibold" style={{ color: colors.secondary }}>
          {t("AI-Powered BID and Tender Customization")}
        </h2>
      </motion.div>

      {/* Pricing Plans with Motion Animation */}
      <div className="w-full flex flex-col md:flex-row justify-center gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`w-full md:w-1/3 rounded-xl p-8 shadow-md hover:shadow-2xl transition-all relative ${
              plan.isPopular ? "border-4 border-yellow-400" : "border border-gray-300"
            }`}
            style={{ backgroundColor: colors.background }}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 text-white text-xs font-bold px-3 py-1 rounded-bl-lg" style={{ backgroundColor: colors.secondary }}>
                {t("Most Popular")}
              </div>
            )}
            <h3 className="text-2xl font-semibold mb-3" style={{ color: colors.primary }}>
              {plan.name}
            </h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold" style={{ color: colors.primary }}>${plan.price}</span>
              <span className="text-gray-600 ml-2">/ {plan.credits} credits</span>
            </div>
            <ul className="space-y-3 mb-8 text-gray-700">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <FiCheck className="mt-1 mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                  {feature}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-full text-lg px-6 py-3 rounded-lg font-bold transition-all"
              style={{ backgroundColor: colors.primary, color: "white" }}
              onClick={() => navigate(plan.route)} // Redirect to the corresponding route
            >
              {t("Choose Plan")}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;