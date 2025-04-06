import path from "path";
import { ReportExporter } from "./utils/pdfExporter";
import {
  IReportHeader,
  IReportFooter,
  IReportTable,
} from "./interface/IReport";

const createTestPdf = () => {
  const footer: IReportFooter = {
    text: "Thông tin báo cáo được bảo mật",
    styles: {
      fontSize: 8,
      textColor: "gray",
      align: "center",
    },
  };

  const reportExporter = new ReportExporter(footer.text);

  const header: IReportHeader = {
    company: "Công ty ABC",
    title: "Báo cáo doanh thu Quý I",
    logo: path.resolve(__dirname, "./assets/logo.png"),
    time: "Thời gian: Tháng 1 - Tháng 3, 2025",
  };

  const tableData: IReportTable = {
    title: "Doanh thu theo tháng",
    head: ["Tháng", "Doanh thu", "Mục tiêu", "Chênh lệch"],
    body: [
      [{ rowSpan: 50, text: "Tháng 1" }, "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["", "Mẫu 1", "120.000", "-20.000"],
      ["Tháng 2", "110.000", "120.000", "-10.000"],
      ["Tháng 3", "120.000", "120.000", "0"],
      [{ text: "Tổng cộng", colSpan: 3 }, "", "", "-30.000"],
    ],
  };

  reportExporter.setHeader(header);

  reportExporter.drawTable(tableData);

  const outputPath = path.resolve(__dirname, "./output/output_report.pdf");
  reportExporter.export(outputPath);
  console.log(`PDF đã được tạo tại ${outputPath}`);
};

createTestPdf();
