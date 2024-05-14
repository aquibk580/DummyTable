import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExcelJS from "exceljs";

const GenerateExcel = (props) => {
  const {DataObject} = props;
  const generateExcelFile = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
    worksheet.columns = [
      { header: "Account Name", key: "Account_Name", width: 30 },
      { header: "Email", key: "Email", width: 30 },
      { header: "Phone No", key: "Phone_No", width: 30 },
      { header: "Website", key: "Website", width: 30 },
      { header: "Industry", key: "Industry", width: 30 },
      { header: "Account Status", key: "Account_Status", width: 24 },
      { header: "Remark", key: "Remark", width: 30 },
      { header: "Action", key: "Actions", width: 30 },
    ];
    DataObject.forEach((row) => {
      worksheet.addRow(row);
      console.log(row)
    });
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a blob object
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a link element to trigger the download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.xlsx";
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button className="download" onClick={generateExcelFile}>
        <FontAwesomeIcon
          icon="fa-regular fa-file-excel"
          style={{ color: "green" }}
          size="lg"
        />{" "}
        Download
      </button>
    </div>
  );
};

export default GenerateExcel;
