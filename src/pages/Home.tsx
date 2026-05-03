import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, FileText, Edit3, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary mb-6 shadow-large"
            >
              <Activity className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              AI Health Twin
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              HbA1c Predictor
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your personal AI assistant to predict and monitor your HbA1c levels based on your health parameters.
              <br />
              <span className="font-semibold text-foreground mt-2 block">
                It helps you understand your health risks and take early preventive actions.
              </span>
            </p>
          </motion.div>

          {/* Options Cards */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto"
          >
            {/* Manual Entry Card */}
            <Link to="/manual-entry" className="group block">
              <Card className="p-8 hover:shadow-large transition-all duration-300 hover:-translate-y-2 bg-card border-2 border-transparent hover:border-primary cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-medium mx-auto">
                    <Edit3 className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors text-center">
                    Enter Details Manually
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed text-center">
                    Fill in your health parameters step-by-step with our comprehensive form to get an accurate HbA1c prediction.
                  </p>

                  <div className="flex items-center justify-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Info Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <Card className="p-8 bg-gradient-to-br from-card to-muted border-none shadow-soft max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 text-left">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    What is HbA1c?
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    HbA1c (Hemoglobin A1c) measures your average blood sugar levels over the past 2-3 months. 
                    It's a key indicator for diabetes risk and management. Our AI model analyzes your health data to predict your HbA1c levels.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-20 text-center text-sm text-muted-foreground"
        >
          <p>© 2025 AI Health Twin. For educational and research purposes only.</p>
          <p className="mt-2">Not intended for clinical diagnosis or treatment decisions.</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Home;
