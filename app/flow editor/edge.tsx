import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  Position,
} from "reactflow";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  ...props
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position | undefined;
  targetPosition: Position | undefined;
  data: any;
  markerEnd: string;
  [key: string]: any;
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const labelTitle = data?.labelTitle || "";
  const label = data?.label || "";

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} {...props} />
      <EdgeLabelRenderer>
        <div
          title={labelTitle}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px) rotate(90deg)`,
            background: "#fff",
            fontSize: 10,
            fontWeight: 600,
          }}
          className="nodrag nopan"
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
