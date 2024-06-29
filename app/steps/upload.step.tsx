import {
  TrashIcon,
  ChartBarSquareIcon,
  DocumentTextIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { useSteps } from "../contexts/steps.context";
import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";

interface UploadStepProps {}

type FileStats = {
  rowCount: number;
  columnCount: number;
  columns: string[];
  uniqueValues: { [key: string]: number };
  fileSize: string;
};

export default function UploadStep(props: UploadStepProps) {
  const {} = props;
  const {
    uploadedFile,
    setUploadedFile,
    fileStats,
    setFileStats,
    fileData,
    setFileData,
  } = useSteps();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (uploadedFile && !fileStats && !fileData) {
      parseFile(uploadedFile);
    }
  }, [uploadedFile]);

  const parseFile = (file: File) => {
    const uniqueValues: { [key: string]: Set<string> } = {};
    let rowCount = 0;
    let columnCount = 0;
    let columns: string[] = [];
    const aggregatedData: any[] = [];

    Papa.parse(file, {
      header: true,
      worker: true,
      chunkSize: 1024 * 1024, // 1 MB chunks
      chunk: (results, parser) => {
        if (results.meta.fields) {
          if (rowCount === 0) {
            columns = results.meta.fields;
            columnCount = columns.length;
            columns.forEach((field) => {
              uniqueValues[field] = new Set<string>();
            });
          }
          results.data.forEach((row: any) => {
            aggregatedData.push(row);
            columns.forEach((field: string) => {
              uniqueValues[field].add(row[field]);
            });
          });
          rowCount += results.data.length;
        }
      },
      complete: () => {
        const stats = {
          rowCount,
          columnCount,
          columns,
          uniqueValues: Object.fromEntries(
            Object.entries(uniqueValues).map(([key, value]) => [
              key,
              value.size,
            ])
          ),
          fileSize: (file.size / 1024).toFixed(2) + " KB",
        };

        setFileStats(stats);
        setFileData(aggregatedData); // Store all data if needed
      },
      error: (error) => {
        setError(`Error parsing file: ${error.message}`);
      },
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv") {
        setError("Only CSV files are allowed.");
        return;
      }
      setUploadedFile(file);
      setError(null);
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
              <div className="stat-figure text-accent">
                <DocumentTextIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">Total Rows</div>
              <div className="stat-value">{fileStats?.rowCount}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent">
                <FolderOpenIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">File Size</div>
              <div className="stat-value">{fileStats?.fileSize}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent">
                <ChartBarSquareIcon className="h-8 w-8" />
              </div>
              <div className="stat-title">
                Columns ({fileStats?.columnCount})
              </div>
              <div className="stat-value text-sm">
                {fileStats.columns.join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {fileData && fileData.length > 0 && (
        <div className="flex flex-col gap-2 mb-[75px]">
          <h1 className="text-2xl font-bold text-black">Dataset Preview</h1>
          <span className="text-black">
            Showing the first 10 rows of the dataset.
          </span>
          <div className="overflow-x-auto overflow-y-auto bg-neutral p-4 rounded-lg h-[400px]">
            <table className="table table-xs table-zebra table-pin-rows">
              <thead>
                <tr>
                  {fileStats!.columns.map((col: string, index: number) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fileData.slice(0, 10).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {fileStats!.columns.map((col: string, colIndex: number) => (
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
