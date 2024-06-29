import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSteps } from "../contexts/steps.context";
import FileStat from "../types/file.stat.type";
import FileStats from "../components/file.stat";
import FileData from "../components/file.data";

interface UploadStepProps {}

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
      skipEmptyLines: true,
      worker: true,
      fastMode: false,
      chunkSize: 3 * 1024 * 1024, // 3 MB chunks
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
            rowCount += 1;
          });
        }
      },
      complete: () => {
        const stats: FileStat = {
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
        setFileData(aggregatedData);
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
      if (file.size > 51 * 1024 * 1024) {
        // 50+1 MB size limit
        setError("File size exceeds the 50MB limit.");
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

      {fileStats && <FileStats fileStats={fileStats}></FileStats>}

      {fileData && fileData.length > 0 && (
        <FileData fileData={fileData} fileStats={fileStats}></FileData>
      )}
    </div>
  );
}
