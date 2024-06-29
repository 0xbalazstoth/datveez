import {
  DocumentTextIcon,
  FolderOpenIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";
import FileStat from "../types/file.stat.type";

interface FileStatsProps {
  fileStats: FileStat;
}

export default function FileStats(props: FileStatsProps) {
  const { fileStats } = props;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-black">Dataset Statistics</h1>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-accent">
            <DocumentTextIcon className="h-8 w-8" />
          </div>
          <div className="stat-title">Total Rows</div>
          <div className="stat-value">{fileStats.rowCount}</div>
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
          <div className="stat-title">Columns ({fileStats?.columnCount})</div>
          <div className="stat-value text-sm">
            {fileStats.columns.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
}
