import { EventEmitter } from "events";

declare module "pdf2json" {
  export default class PDFParser extends EventEmitter {
    constructor(context?: any, needRawText?: number, password?: string);
    parseBuffer(buffer: Buffer, verbosity?: number): void;
    loadPDF(pdfFilePath: string, verbosity?: number): Promise<void>;
    createParserStream(): ParserStream;
    getRawTextContent(): string;
    on<K extends keyof PdfEventMap>(eventName: K, listener: PdfEventMap[K]): this;
  }

  export type PdfEventMap = {
    pdfParser_dataError: (errMsg: Record<"parserError", Error>) => void;
    pdfParser_dataReady: (pdfData: Output) => void;
    readable: (meta: Output["Meta"]) => void;
    data: (data: Output["Pages"][number] | null) => void;
  };

  class ParserStream {
    //TODO
  }

  export interface Output {
    Transcoder: string;
    Meta: Record<string, any>;
    Pages: Page[];
  }

  export interface Page {
    Width: number;
    Height: number;
    HLines: Line[];
    VLines: Line[];
    Fills: Fill[];
    Texts: Text[];
    Fields: Field[];
    Boxsets: Boxset[];
  }

  export interface Fill {
    x: number;
    y: number;
    w: number;
    h: number;
    oc?: string;
    clr?: number;
  }

  export interface Line {
    x: number;
    y: number;
    w: number;
    l: number;
    oc?: string;
    clr?: number;
  }

  export interface Text {
    x: number;
    y: number;
    w: number;
    sw: number;
    A: "left" | "center" | "right";
    R: TextRun[];
    oc?: string;
    clr?: number;
  }

  export interface TextRun {
    T: string;
    S: number;
    TS: [number, number, 0 | 1, 0 | 1];
    RA?: number;
  }

  export interface Boxset {
    boxes: Box[];
    id: {
      Id: string;
      EN?: number;
    };
  }

  export interface Field {
    id: {
      Id: string;
      EN?: number;
    };
    style: number;
    TI: number;
    AM: number;
    TU: string;
    x: number;
    y: number;
    w: number;
    h: number;
    T: {
      Name: "alpha" | "link";
      TypeInfo: {};
    };
  }

  export interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
    oc?: string;
    clr?: number;
  }

  export interface Box {
    id: {
      Id: string;
      EN?: number;
    };
    T: {
      Name: string;
      TypeInfo?: {};
    };
    x: number;
    y: number;
    w: number;
    h: number;
    TI: number;
    AM: number;
    checked?: boolean;
    style: number;
  }
}
