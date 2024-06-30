// contexts/StepsContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Step, StepName } from "../types/step.type";
import FileStat from "../types/file.stat.type";

interface StepsContextProps {
  steps: Step[];
  currentStepIndex: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
  uploadedFile: File | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileStats: FileStat | null;
  setFileStats: React.Dispatch<React.SetStateAction<FileStat | null>>;
  fileData: any[] | null;
  setFileData: React.Dispatch<React.SetStateAction<any[] | null>>;
  isEditingMode: boolean;
  setIsEditingMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepsContext = createContext<StepsContextProps | undefined>(undefined);

const initialSteps: Step[] = [
  {
    name: StepName.Upload,
    isCompleted: true,
    order: 1,
    id: Math.random().toString(),
  },
  {
    name: StepName.Build,
    isCompleted: false,
    order: 2,
    id: Math.random().toString(),
  },
  {
    name: StepName.Normalize,
    isCompleted: false,
    order: 3,
    id: Math.random().toString(),
  },
];

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileStats, setFileStats] = useState<FileStat | null>(null);
  const [fileData, setFileData] = useState<any[] | null>(null);
  const [draftConnections, setDraftConnections] = useState<any[]>([]);
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);

  useEffect(() => {
    const savedSteps = localStorage.getItem("steps");
    if (savedSteps) {
      setSteps(JSON.parse(savedSteps));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("steps", JSON.stringify(steps));
  }, [steps]);

  const goToNextStep = () => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      if (currentStepIndex < newSteps.length - 1) {
        newSteps[currentStepIndex].isCompleted = true;
      }
      return newSteps;
    });
    setCurrentStepIndex((prevIndex) =>
      Math.min(prevIndex + 1, steps.length - 1)
    );
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        if (newIndex < newSteps.length) {
          newSteps[newIndex].isCompleted = false;
        }
        return newSteps;
      });
      return newIndex;
    });
  };

  return (
    <StepsContext.Provider
      value={{
        steps,
        currentStepIndex,
        goToNextStep,
        goToPreviousStep,
        setSteps,
        setCurrentStepIndex,
        uploadedFile,
        setUploadedFile,
        fileStats,
        setFileStats,
        fileData,
        setFileData,
        isEditingMode,
        setIsEditingMode,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

export const useSteps = () => {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error("useSteps must be used within a StepsProvider");
  }
  return context;
};
