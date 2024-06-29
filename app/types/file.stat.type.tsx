export default interface FileStat {
  rowCount: number;
  columnCount: number;
  columns: string[];
  uniqueValues: { [key: string]: number };
  fileSize: string;
}
