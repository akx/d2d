import { Transformer } from "../types";

export const xsltTransform: Transformer = {
  transform(inputs, transform) {
    const data = inputs[0];
    if (!(data instanceof XMLDocument)) {
      throw new Error(
        `The XSLT transformer only works with XML documents (got ${typeof data}).\nUse the XML (DOM Document) source format to parse XML.`,
      );
    }
    if (transform) {
      const xsltDoc = new DOMParser().parseFromString(transform, "application/xml");
      const xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsltDoc);
      return xsltProcessor.transformToDocument(data);
    }
    return data;
  },
};
