import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";
import FileStat from "../types/file.stat.type";

interface FileDataProps {
  fileData: any[];
  fileStats: FileStat | null;
}

export default function FileData(props: FileDataProps) {
  const { fileData, fileStats } = props;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-black">Dataset Preview</h1>
      <span className="text-black">
        Showing the first 10 rows of the dataset.
      </span>
      <div className="overflow-x-auto overflow-y-auto bg-neutral p-4 rounded-lg max-h-[400px]">
        <table className="table table-zebra table-pin-rows">
          <thead>
            <tr>
              {fileStats!.columns.map((col: string, index: number) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fileData.slice(0, 10).map(
              (
                row: {
                  [x: string]:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                },
                rowIndex: Key | null | undefined
              ) => (
                <tr key={rowIndex}>
                  {fileStats!.columns.map((col: string, colIndex: number) => (
                    <td key={colIndex}>{row[col]}</td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
