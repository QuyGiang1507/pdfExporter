import PdfPrinter from "pdfmake";
import fs from "fs";
import path from "path";
import {
  IReportFooter,
  IReportHeader,
  IReportTable,
} from "../interface/IReport";

export class ReportExporter {
  private printer: PdfPrinter;
  private docDefinition: any;
  private content: any[] = [];
  private defaultStyle = {
    font: "TimeNewRoman",
    fontSize: 10,
  };

  constructor(footerText?: string) {
    const fonts = {
      TimeNewRoman: {
        normal: path.resolve(__dirname, "../fonts/TIMES.TTF"),
        bold: path.resolve(__dirname, "../fonts/TIMESBD.TTF"),
        italics: path.resolve(__dirname, "../fonts/TIMESI.TTF"),
        bolditalics: path.resolve(__dirname, "../fonts/TIMESBI.TTF"),
      },
    };

    this.printer = new PdfPrinter(fonts);
    this.docDefinition = {
      content: this.content,
      defaultStyle: this.defaultStyle,
      styles: {
        header: { fontSize: 10, bold: true, color: "#1f497d" },
        footerNote: { fontSize: 8, italics: true },
        tableHeader: { bold: true, fontSize: 8 },
      },
      footer: (currentPage: number, pageCount: number) => {
        return {
          margin: [15, 10],
          columns: [
            {
              text: footerText || "",
              alignment: "left",
              style: "footerNote",
            },
            { text: `Trang | ${currentPage}`, alignment: "right", fontSize: 8 },
          ],
        };
      },
    };
  }

  setHeader(header: IReportHeader) {
    const logoBuffer = fs.readFileSync(header.logo);
    const logoBase64 = logoBuffer.toString("base64");

    this.content.push({
      columns: [
        {
          text: header.company,
          style: "header",
        },
        {
          image: `data:image/png;base64,${logoBase64}`,
          width: 80,
          alignment: "right",
        },
      ],
    });

    this.content.push({
      text: header.title,
      alignment: "center",
      margin: [0, 10, 0, 0],
      style: "header",
    });

    this.content.push({
      text: header.time,
      alignment: "center",
      fontSize: 8,
      color: "gray",
      margin: [0, 3, 0, 10],
    });
  }

  drawTable(dataTable: IReportTable) {
    if (dataTable.title) {
      this.content.push({
        text: dataTable.title,
        margin: [0, 10, 0, 5],
        bold: true,
        fontSize: 9,
      });
    }

    this.content.push({
      table: {
        headerRows: 1,
        widths: new Array(dataTable.head.length).fill("*"),
        body: [
          dataTable.head.map((cell: string) => ({
            text: cell,
            fillColor: "#d0e5f5",
            bold: true,
            fontSize: 9,
            alignment: "center",
          })),
          ...dataTable.body,
        ],
      },
      style: dataTable.styles || {},
    });
  }

  private layout = {
    exampleLayout: {
      hLineWidth: function (i: number, node: any) {
        if (i === 0 || i === node.table.body.length) {
          return 0;
        }
        return i === node.table.headerRows ? 2 : 1;
      },
      vLineWidth: function (i: number) {
        return 0;
      },
      hLineColor: function (i: number) {
        return i === 1 ? "black" : "#aaa";
      },
      paddingLeft: function (i: number) {
        return i === 0 ? 0 : 8;
      },
      paddingRight: function (i: number, node: any) {
        return i === node.table.widths.length - 1 ? 0 : 8;
      },
    },
  };

  export(filePath: string) {
    const pdfDoc = this.printer.createPdfKitDocument(this.docDefinition, {
      tableLayouts: this.layout,
    });
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();
  }

  exportBuffer(): Promise<Buffer> {
    return new Promise((resolve) => {
      const chunks: Uint8Array[] = [];
      const pdfDoc = this.printer.createPdfKitDocument(this.docDefinition, {
        tableLayouts: this.layout,
      });

      pdfDoc.on("data", (chunk) => chunks.push(chunk));
      pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));

      pdfDoc.end();
    });
  }
}
