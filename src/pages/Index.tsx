import { useState } from "react";
import { HealthForm } from "@/components/HealthForm";
import { PredictionResult } from "@/components/PredictionResult";
import { useToast } from "@/hooks/use-toast";
import { Activity } from "lucide-react";

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

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  // Mock prediction function - Replace this with your actual TensorFlow model
  const predictHbA1c = async (data: HealthData, file: File | null): Promise<number> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction logic - Replace with actual model inference
    // This is a simplified mock based on some input values
    const glucoseLevel = parseFloat(data.glucoseLevel) || 100;
    const age = parseFloat(data.age) || 30;
    const bmi = parseFloat(data.bmi) || 25;
    
    // Simple mock calculation (NOT medically accurate - just for demonstration)
    const mockHbA1c = 4.0 + (glucoseLevel / 100) * 2 + (age / 100) + (bmi / 50);
    
    return Math.min(Math.max(mockHbA1c, 4.0), 14.0); // Clamp between 4-14%
  };

  const handlePredict = async (data: HealthData, file: File | null) => {
    setIsLoading(true);
    setPrediction(null);

    try {
      // Call your TensorFlow model here
      const result = await predictHbA1c(data, file);
      
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            AI Health Twin
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            HbA1c Prediction using Advanced Machine Learning
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your health parameters below to get a personalized 3-month blood sugar prediction
          </p>
        </div>

        {/* Form */}
        <HealthForm onPredict={handlePredict} isLoading={isLoading} />

        {/* Results */}
        {prediction !== null && (
          <div id="results" className="mt-12">
            <PredictionResult hba1c={prediction} />
          </div>
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

export default Index;
