import React from "react";

async function generateAndDownloadXlsx(data: any, extension: string) {
  const pXLSX = import("xlsx");
  const dataArray = Array.from(data);
  const XLSX = await pXLSX;
  const ws = XLSX.utils.json_to_sheet(dataArray);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "d2d");
  XLSX.writeFile(wb, `d2d-${new Date().toISOString()}.${extension}`);
}

const ExportButton = ({ label, format, data }: { label: string; format: string; data: any }) => (
  <button
    type="button"
    className="btn"
    onClick={async () => {
      try {
        await generateAndDownloadXlsx(data, format);
      } catch (error) {
        alert(error);
      }
    }}
  >
    {label}
  </button>
);

export const XlsxView = ({ data }: { data: any }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <ExportButton label="Download XLSX" format="xlsx" data={data} />
      <ExportButton label="Download XLS" format="xls" data={data} />
      <ExportButton label="Download ODS" format="ods" data={data} />
    </div>
  );
};
