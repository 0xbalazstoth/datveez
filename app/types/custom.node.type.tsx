export default interface CustomNodeProps {
  data: any;
  isConnectable: boolean;
  xPos: number;
  yPos: number;
  id: string;
  onDelete: (id: string) => void;
}
