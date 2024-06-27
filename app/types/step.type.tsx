export interface Step {
  name: string;
  isCompleted: boolean;
  order: number;
  id: string;
}

export enum StepName {
  Upload = "Upload",
  Build = "Build",
  Normalize = "Normalize",
}
