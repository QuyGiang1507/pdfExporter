export interface IReportHeader {
  company: string;
  title: string;
  logo: string;
  time: string;
}

export interface IReportFooter {
  text: string;
  styles: {
    fontSize: number;
    textColor: string;
    align: "left" | "center" | "right";
  };
}

export interface IReportTable {
  title?: string;
  titleStyle?: {
    x: number;
    y: number;
    font?: string;
    fontSize?: number;
    textColor?: string;
    align?: "left" | "center" | "right";
  };
  head: string[];
  body: any[];
  styles?: any;
}
