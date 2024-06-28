import {
  TrashIcon,
  ChartBarSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useSteps } from "../contexts/steps.context";
import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";

interface UploadStepProps {}

export default function UploadStep(props: UploadStepProps) {
  const {} = props;
  const { uploadedFile, setUploadedFile } = useSteps();
  const [error, setError] = useState<string | null>(null);
  const [fileStats, setFileStats] = useState<any | null>(null);
  const [fileData, setFileData] = useState<any[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv") {
        setError("Only CSV files are allowed.");
        return;
      }
      setUploadedFile(file);
      setError(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (text) {
          Papa.parse(text.toString(), {
            header: true,
            complete: (result) => {
              setFileStats({
                rowCount: result.data.length,
                columnCount: result.meta.fields ? result.meta.fields.length : 0,
                columns: result.meta.fields || [],
              });
              setFileData(result.data);
            },
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileDelete = () => {
    setUploadedFile(null);
    setFileStats(null);
    setFileData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-black">Upload your dataset</h1>
        <div className="flex flex-row gap-3">
          <input
            type="file"
            ref={fileInputRef}
            className="file-input file-input-bordered w-full max-w-md"
            onChange={handleFileUpload}
            accept=".csv"
          />
          {uploadedFile && (
            <button
              className="btn btn-square bg-red-500 border-0 hover:bg-red-400"
              onClick={handleFileDelete}
            >
              <TrashIcon className="h-5 w-5 text-white" />
            </button>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      {fileStats && (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-black">Dataset Statistics</h1>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <DocumentTextIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">Total Rows</div>
              <div className="stat-value">{fileStats.rowCount}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <ChartBarSquareIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">Total Columns</div>
              <div className="stat-value">{fileStats.columnCount}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <ChartBarSquareIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">Columns</div>
              <div className="stat-value text-sm">
                {fileStats.columns.join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {fileData && (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-black">Dataset preview</h1>
          <span className="text-black">
            Showing the first 10 rows of the dataset.
          </span>
          <div className="overflow-x-auto overflow-y-auto bg-neutral p-4 rounded-lg h-[400px]">
            <table className="table table-xs table-zebra table-pin-rows">
              <thead>
                <tr>
                  {fileStats.columns.map((col: string, index: number) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fileData.slice(0, 10).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {fileStats.columns.map((col: string, colIndex: number) => (
                      <td key={colIndex}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
