import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface HealthFormProps {
  onPredict: (data: HealthData) => void;
  isLoading: boolean;
}

export const HealthForm = ({ onPredict, isLoading }: HealthFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<HealthData>({
    age: "",
    gender: "",
    height: "",
    weight: "",
    employmentSector: "",
    jobType: "",
    workHours: "",
    workStress: "",
    healthcareAccess: "",
    healthInsurance: "",
    stepsPerDay: "",
    sleepHours: "",
    dietScore: "",
    heartRate: "",
    glucoseLevel: "",
    bpSystolic: "",
    bpDiastolic: "",
    cholesterol: "",
    bmi: "",
    geneticRiskDiabetes: "",
    geneticRiskHeart: "",
    exerciseDays: "",
    bpCategory: "",
    medication: "",
  });



  const handleInputChange = (field: keyof HealthData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      age: "",
      gender: "",
      height: "",
      weight: "",
      employmentSector: "",
      jobType: "",
      workHours: "",
      workStress: "",
      healthcareAccess: "",
      healthInsurance: "",
      stepsPerDay: "",
      sleepHours: "",
      dietScore: "",
      heartRate: "",
      glucoseLevel: "",
      bpSystolic: "",
      bpDiastolic: "",
      cholesterol: "",
      bmi: "",
      geneticRiskDiabetes: "",
      geneticRiskHeart: "",
      exerciseDays: "",
      bpCategory: "",
      medication: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ["age", "gender", "height", "weight"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof HealthData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields (Age, Gender, Height, Weight).",
        variant: "destructive",
      });
      return;
    }
    
    onPredict(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-6 shadow-medium">
        <h2 className="text-xl font-semibold mb-6 text-primary">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              min="18"
              max="100"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              placeholder="18-100"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm) *</Label>
            <Input
              id="height"
              type="number"
              min="140"
              max="200"
              value={formData.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              placeholder="140-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg) *</Label>
            <Input
              id="weight"
              type="number"
              min="40"
              max="150"
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              placeholder="40-150"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bmi">BMI</Label>
            <Input
              id="bmi"
              type="number"
              step="0.1"
              min="10"
              max="45"
              value={formData.bmi}
              onChange={(e) => handleInputChange("bmi", e.target.value)}
              placeholder="10-45"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-medium">
        <h2 className="text-xl font-semibold mb-6 text-primary">Employment & Lifestyle</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="employmentSector">Employment Sector</Label>
            <Select value={formData.employmentSector} onValueChange={(value) => handleInputChange("employmentSector", value)}>
              <SelectTrigger id="employmentSector">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Government">Government</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                <SelectItem value="Unemployed">Unemployed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type</Label>
            <Input
              id="jobType"
              value={formData.jobType}
              onChange={(e) => handleInputChange("jobType", e.target.value)}
              placeholder="e.g., Civil Servant, Engineer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workHours">Work Hours per Week</Label>
            <Input
              id="workHours"
              type="number"
              min="20"
              max="80"
              value={formData.workHours}
              onChange={(e) => handleInputChange("workHours", e.target.value)}
              placeholder="20-80"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workStress">Work Stress Level</Label>
            <Select value={formData.workStress} onValueChange={(value) => handleInputChange("workStress", value)}>
              <SelectTrigger id="workStress">
                <SelectValue placeholder="Select stress level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stepsPerDay">Steps per Day</Label>
            <Input
              id="stepsPerDay"
              type="number"
              min="0"
              max="20000"
              value={formData.stepsPerDay}
              onChange={(e) => handleInputChange("stepsPerDay", e.target.value)}
              placeholder="0-20000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleepHours">Sleep Hours</Label>
            <Input
              id="sleepHours"
              type="number"
              step="0.5"
              min="0"
              max="12"
              value={formData.sleepHours}
              onChange={(e) => handleInputChange("sleepHours", e.target.value)}
              placeholder="0-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietScore">Diet Score (1-10)</Label>
            <Input
              id="dietScore"
              type="number"
              min="1"
              max="10"
              value={formData.dietScore}
              onChange={(e) => handleInputChange("dietScore", e.target.value)}
              placeholder="1-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exerciseDays">Exercise Days per Week</Label>
            <Input
              id="exerciseDays"
              type="number"
              min="0"
              max="7"
              value={formData.exerciseDays}
              onChange={(e) => handleInputChange("exerciseDays", e.target.value)}
              placeholder="0-7"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-medium">
        <h2 className="text-xl font-semibold mb-6 text-primary">Health Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
            <Input
              id="heartRate"
              type="number"
              min="50"
              max="120"
              value={formData.heartRate}
              onChange={(e) => handleInputChange("heartRate", e.target.value)}
              placeholder="50-120"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="glucoseLevel">Glucose Level (mg/dL)</Label>
            <Input
              id="glucoseLevel"
              type="number"
              min="60"
              max="200"
              value={formData.glucoseLevel}
              onChange={(e) => handleInputChange("glucoseLevel", e.target.value)}
              placeholder="60-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bpSystolic">Blood Pressure - Systolic</Label>
            <Input
              id="bpSystolic"
              type="number"
              min="80"
              max="180"
              value={formData.bpSystolic}
              onChange={(e) => handleInputChange("bpSystolic", e.target.value)}
              placeholder="80-180"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bpDiastolic">Blood Pressure - Diastolic</Label>
            <Input
              id="bpDiastolic"
              type="number"
              min="50"
              max="120"
              value={formData.bpDiastolic}
              onChange={(e) => handleInputChange("bpDiastolic", e.target.value)}
              placeholder="50-120"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bpCategory">BP Category</Label>
            <Select value={formData.bpCategory} onValueChange={(value) => handleInputChange("bpCategory", value)}>
              <SelectTrigger id="bpCategory">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Hypertension Stage 1">Hypertension Stage 1</SelectItem>
                <SelectItem value="Hypertension Stage 2">Hypertension Stage 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
            <Input
              id="cholesterol"
              type="number"
              min="100"
              max="300"
              value={formData.cholesterol}
              onChange={(e) => handleInputChange("cholesterol", e.target.value)}
              placeholder="100-300"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-medium">
        <h2 className="text-xl font-semibold mb-6 text-primary">Healthcare & Genetics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="healthcareAccess">Healthcare Access</Label>
            <Select value={formData.healthcareAccess} onValueChange={(value) => handleInputChange("healthcareAccess", value)}>
              <SelectTrigger id="healthcareAccess">
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Poor">Poor</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Excellent">Excellent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="healthInsurance">Health Insurance</Label>
            <Select value={formData.healthInsurance} onValueChange={(value) => handleInputChange("healthInsurance", value)}>
              <SelectTrigger id="healthInsurance">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medication">Currently on Medication</Label>
            <Select value={formData.medication} onValueChange={(value) => handleInputChange("medication", value)}>
              <SelectTrigger id="medication">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="geneticRiskDiabetes">Genetic Risk - Diabetes</Label>
            <Select value={formData.geneticRiskDiabetes} onValueChange={(value) => handleInputChange("geneticRiskDiabetes", value)}>
              <SelectTrigger id="geneticRiskDiabetes">
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="geneticRiskHeart">Genetic Risk - Heart</Label>
            <Select value={formData.geneticRiskHeart} onValueChange={(value) => handleInputChange("geneticRiskHeart", value)}>
              <SelectTrigger id="geneticRiskHeart">
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>



      <div className="flex gap-4 justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="min-w-[200px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            "Predict HbA1c"
          )}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleReset}
          disabled={isLoading}
        >
          Reset All
        </Button>
      </div>
    </form>
  );
};
