/* eslint-disable react/prop-types */
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import "./index.css";

const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const columns = [
  {
    field: "rank",
    headerName: "rank",
    width: 130,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "super-app-theme--cell",
  },
  {
    field: "name",
    headername: "Name",
    width: 300,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "super-app-theme--name",
  },
  {
    field: "roll_no",
    headerName: "Roll Number",
    width: 200,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "super-app-theme--cell",
  },
  {
    field: "leetcode",
    headerName: "LeetCode",
    type: "number",
    width: 130,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "super-app-theme--cell",
  },
  {
    field: "codeforces",
    headerName: "Codeforces",
    type: "number",
    width: 130,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "super-app-theme--cell",
  },
  {
    field: "codechef",
    headerName: "Codechef",
    type: "number",
    width: 130,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "super-app-theme--cell",
  },
  {
    field: "hackerrank",
    headerName: "Hackerrank",
    type: "number",
    width: 130,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "super-app-theme--cell",
  },
  {
    field: "spoj",
    headerName: "SPOJ",
    type: "number",
    width: 130,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "super-app-theme--cell",
  },

  {
    field: "totalScore",
    headerName: "Total Score",
    type: "number",
    width: 220,
    // Enable sorting by total score in descending order (highest to lowest)
    sortModel: [{ field: "total", sort: "desc" }], // Initial sort configuration
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "super-app-theme--cell",
  },
  // { field: "rank", headerName: "Rank", width: 100 }, // Optional
];

function convertToCSV(data) {
  if (!data || data.length === 0) {
    return ""; // Return an empty string if data is undefined, null, or empty
  }
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(","));
  return header + "\n" + rows.join("\n");
}

export default function DataTable({ data }) {
  const [csvData, setCsvData] = useState("");

  // Update CSV data when component receives new data
  useEffect(() => {
    setCsvData(convertToCSV(data));
  }, [data]);
  data = data.map((row, index) => ({ ...row, Rank: index + 1 }));

  function handleDownload() {
    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div>
      <div className="leaderboard-header">
        <h1 className="ms-auto" >Batch 2026 - Leaderboard</h1>
        <button className="btn btn-dark ms-auto mb-2" onClick={handleDownload}>
          Download CSV
        </button>
      </div>

      <StripedDataGrid
        rows={data}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        sx={{
          m: 2,
          "& .super-app-theme--header": {
            fontWeight: "bold",
            fontSize: "20px",
            borderRight: "1px solid rgba(224, 224, 224, 1)",
          },
          "& .super-app-theme--cell": {
            display: "flex",
            fontWeight: "bold",
            fontSize: "18px",
            justifyContent: "center",
            borderRight: "1px solid rgba(224, 224, 224, 1)",
          },
          "& .super-app-theme--name": {
            fontSize: "18px",
            fontWeight: "bold",
            borderRight: "1px solid rgba(224, 224, 224, 1)",
          },
          "& .super-app-theme--even": {
            backgroundColor: "rgba(0, 0, 0, 0.05)", // Grey background for even rows
          },
        }}
      />
    </div>
  );
}