"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportExporter = void 0;
const pdfmake_1 = __importDefault(require("pdfmake"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ReportExporter {
    constructor() {
        this.content = [];
        this.defaultStyle = {
            font: "TimeNewRoman",
            fontSize: 10,
        };
        const fonts = {
            TimeNewRoman: {
                normal: path_1.default.resolve(__dirname, "../fonts/TIMES.TTF"),
                bold: path_1.default.resolve(__dirname, "../fonts/TIMESBD.TTF"),
                italics: path_1.default.resolve(__dirname, "../fonts/TIMESI.TTF"),
                bolditalics: path_1.default.resolve(__dirname, "../fonts/TIMESBI.TTF"),
            },
        };
        this.printer = new pdfmake_1.default(fonts);
        this.docDefinition = {
            content: this.content,
            defaultStyle: this.defaultStyle,
            styles: {
                header: { fontSize: 10, bold: true, color: "#1f497d" },
                footerNote: { fontSize: 8, italics: true },
                tableHeader: { bold: true, fontSize: 8 },
            },
            footer: (currentPage, pageCount) => {
                return {
                    margin: [15, 10],
                    columns: [
                        {
                            text: this.footerText || "",
                            alignment: "left",
                            style: "footerNote",
                        },
                        { text: `Trang | ${currentPage}`, alignment: "right", fontSize: 8 },
                    ],
                };
            },
        };
    }
    setHeader(header) {
        const logoBuffer = fs_1.default.readFileSync(header.logo);
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
    drawTable(dataTable, footer) {
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
                widths: [],
                body: [dataTable.head, ...dataTable.body],
            },
            layout: "lightHorizontalLines",
            style: dataTable.styles || {},
        });
        if (footer) {
            this.content.push({
                text: footer.text,
                alignment: footer.styles.align,
                color: footer.styles.textColor,
                fontSize: footer.styles.fontSize,
                margin: [0, 5, 0, 0],
            });
        }
    }
    setFooter(text) {
        this.footerText = text;
    }
    export(filePath) {
        const pdfDoc = this.printer.createPdfKitDocument(this.docDefinition);
        pdfDoc.pipe(fs_1.default.createWriteStream(filePath));
        pdfDoc.end();
    }
    exportBuffer() {
        return new Promise((resolve) => {
            const chunks = [];
            const pdfDoc = this.printer.createPdfKitDocument(this.docDefinition);
            pdfDoc.on("data", (chunk) => chunks.push(chunk));
            pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
            pdfDoc.end();
        });
    }
}
exports.ReportExporter = ReportExporter;
