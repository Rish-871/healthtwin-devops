import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";

interface PredictionResultProps {
  hba1c: number;
}

export const PredictionResult = ({ hba1c }: PredictionResultProps) => {
  let category = "Normal";
  let categoryColor = "text-success";
  let bgGradient = "bg-gradient-success";
  let Icon = CheckCircle2;
  let message = "Your HbA1c level is within the normal range. Keep up the good work with your healthy lifestyle!";
  let emoji = "🟢";

  if (hba1c >= 6.5) {
    category = "Diabetes Range";
    categoryColor = "text-destructive";
    bgGradient = "bg-gradient-danger";
    Icon = AlertCircle;
    message = "Your HbA1c level indicates diabetes. Please consult with a healthcare professional for proper management.";
    emoji = "🔴";
  } else if (hba1c >= 5.7) {
    category = "Prediabetes Range";
    categoryColor = "text-warning";
    bgGradient = "bg-gradient-warning";
    Icon = AlertTriangle;
    message = "Your HbA1c level indicates prediabetes. Consider lifestyle changes and consult with a healthcare professional.";
    emoji = "🟠";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-primary/20 shadow-large overflow-hidden">
        <div className={`h-2 ${bgGradient}`} />
        
        <CardHeader>
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className={`w-16 h-16 rounded-2xl ${bgGradient} flex items-center justify-center shadow-medium`}
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl">HbA1c Prediction Results</CardTitle>
              <CardDescription>Estimated Current HbA1c from Glucose Level</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* HbA1c Value Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-card to-muted text-center overflow-hidden shadow-soft"
          >
            <div className="absolute inset-0 opacity-10">
              <div className={`w-full h-full ${bgGradient}`} />
            </div>
            <div className="relative z-10">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Estimated HbA1c</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
                className={`text-6xl md:text-7xl font-bold ${categoryColor} mb-4`}
              >
                {hba1c.toFixed(2)}%
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl ${bgGradient} shadow-medium`}
              >
                <span className="text-2xl">{emoji}</span>
                <Icon className="w-6 h-6 text-white" />
                <span className="font-bold text-white text-lg">{category}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Information Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Alert className={`border-l-4 ${categoryColor} bg-card/50 backdrop-blur`}>
              <Icon className={`w-5 h-5 ${categoryColor}`} />
              <AlertDescription className="ml-2 text-base">
                {message}
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Reference Ranges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <p className="text-sm font-semibold text-foreground">Reference Ranges:</p>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-success/10 border border-success/20">
                <div className="w-8 h-8 rounded-lg bg-gradient-success flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Normal: <span className="font-semibold text-success">&lt; 5.7%</span>
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-warning/10 border border-warning/20">
                <div className="w-8 h-8 rounded-lg bg-gradient-warning flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Prediabetes: <span className="font-semibold text-warning">5.7% - 6.4%</span>
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <div className="w-8 h-8 rounded-lg bg-gradient-danger flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Diabetes: <span className="font-semibold text-destructive">≥ 6.5%</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Alert className="bg-muted/50">
              <AlertDescription className="text-xs leading-relaxed">
                <strong>Disclaimer:</strong> This prediction is for educational and informational purposes only. 
                It should not be used as a substitute for professional medical advice, diagnosis, or treatment. 
                Always seek the advice of your physician or other qualified health provider.
              </AlertDescription>
            </Alert>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
