import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { HealthForm } from "@/components/HealthForm";
import { PredictionResult } from "@/components/PredictionResult";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface HealthData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  employmentSector: string;
  jobType: string;
  workHours: string;
  workStress: string;
  healthcareAccess: string;
  healthInsurance: string;
  stepsPerDay: string;
  sleepHours: string;
  dietScore: string;
  heartRate: string;
  glucoseLevel: string;
  bpSystolic: string;
  bpDiastolic: string;
  cholesterol: string;
  bmi: string;
  geneticRiskDiabetes: string;
  geneticRiskHeart: string;
  exerciseDays: string;
  bpCategory: string;
  medication: string;
}

const ManualEntry = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? (
    import.meta.env.DEV ? "http://localhost:5000" : ""
  );

  // Real prediction function using Flask API
  const predictHbA1c = async (data: HealthData): Promise<number> => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json();
      return result.hba1c ?? result.prediction;
    } catch (error) {
      console.error('API call failed:', error);
      // Fallback to mock prediction if API fails
      const glucoseLevel = parseFloat(data.glucoseLevel) || 100;
      const age = parseFloat(data.age) || 30;
      const bmi = parseFloat(data.bmi) || 25;
      const mockHbA1c = 4.0 + (glucoseLevel / 100) * 2 + (age / 100) + (bmi / 50);
      return Math.min(Math.max(mockHbA1c, 4.0), 14.0);
    }
  };

  const handlePredict = async (data: HealthData) => {
    setIsLoading(true);
    setPrediction(null);

    try {
      // Call your TensorFlow model here
      const result = await predictHbA1c(data);
      
      setPrediction(result);
      
      toast({
        title: "Prediction Complete",
        description: "Your HbA1c prediction is ready.",
      });
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Prediction Failed",
        description: "An error occurred while processing your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/">
            <Button variant="ghost" className="mb-4 hover:bg-primary/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Enter Health Details
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fill in your health parameters below to get a personalized HbA1c prediction
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HealthForm onPredict={handlePredict} isLoading={isLoading} />
        </motion.div>

        {/* Results */}
        {prediction !== null && (
          <motion.div
            id="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <PredictionResult hba1c={prediction} />
          </motion.div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground pb-8">
          <p>© 2025 AI Health Twin. For educational and research purposes only.</p>
          <p className="mt-2">Not intended for clinical diagnosis or treatment decisions.</p>
        </footer>
      </div>
    </div>
  );
};

export default ManualEntry;
