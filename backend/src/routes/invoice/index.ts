import { FastifyPluginAsync } from "fastify";
import PDFParser from "pdf2json";
import { checkUsefulLocation } from "./checkUsefulLocation";
import { getFormattedData } from "./getFormattedData";
import fs from "node:fs";
import util from "node:util";
import { pipeline } from "node:stream";

const pump = util.promisify(pipeline);

export type GenericObject<K extends string, V> = {
  [key in K]: V;
};

const invoiceRoutes: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.get("/", async function(request, reply) {
    const invoices = await this.prisma.invoice.findMany({
      orderBy: {
        month: "desc",
      },
    });

    return reply.send({ invoices });
  });

  fastify.post("/", async function(request, reply) {
    const data = await request.file({
      isPartAFile: (fieldName, contentType, fileName) =>
        contentType === "application/pdf" && fileName !== "undefined",
    });

    if (!data) {
      reply.code(500).send({ error: "Invalid file!" });
    }

    const filepath = `./tmp/${data?.filename!}`;

    await pump(data?.file!, fs.createWriteStream(filepath));

    let invoiceData: GenericObject<string, string> = {};
    const pdfParser = new PDFParser();

    let invoice;

    pdfParser.on("pdfParser_dataError", (errData) =>
      console.error({ err: errData.parserError }),
    );

    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      const texts = pdfData.Pages[0].Texts;
      let formattedText = "";

      for (let i = 0; i < texts.length; i++) {
        let isUsefulLocation = checkUsefulLocation(texts[i].x, texts[i].y);

        if (typeof isUsefulLocation === "string") {
          formattedText = decodeURIComponent(texts[i].R[0].T).trim();

          invoiceData[isUsefulLocation] = formattedText;
        }
      }

      invoiceData.file_name = data?.filename!;

      const formattedData = getFormattedData(invoiceData);

      invoice = await this.prisma.invoice.create({
        data: formattedData,
      });

      fs.unlinkSync(filepath);
    });

    await pdfParser.loadPDF(filepath);

    return reply.send({ invoice });
  });
};

export default invoiceRoutes;
