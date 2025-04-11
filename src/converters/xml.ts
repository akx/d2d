const prettifyXSLT = `
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:strip-space elements="*"/>
  <xsl:template match="para[content-style][not(text())]">
    <xsl:value-of select="normalize-space(.)"/>
  </xsl:template>
  <xsl:template match="node()|@*">
    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>
  </xsl:template>
  <xsl:output indent="yes"/>
</xsl:stylesheet>
`.trim();

// Via https://stackoverflow.com/a/47317538/51685
function prettifyXml(xmlDoc: XMLDocument) {
  const xsltDoc = new DOMParser().parseFromString(prettifyXSLT, "application/xml");
  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);
  const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  return new XMLSerializer().serializeToString(resultDoc);
}

export function toPrettyXML(obj: any) {
  if (obj instanceof XMLDocument) {
    return prettifyXml(obj);
  }
  throw new Error(`Unable to prettify XML from the object: ${obj}`);
}

export function toDefaultXML(obj: any) {
  if (obj instanceof XMLDocument) {
    return new XMLSerializer().serializeToString(obj);
  }
  throw new Error(`Unable to prettify XML from the object: ${obj}`);
}

export function parseXML(data: string) {
  const parser = new DOMParser();
  return parser.parseFromString(data.trim(), "application/xml");
}

// Low-effort XML to JS object converter
export function xmlToJsObject(obj: Element) {
  const children = [...obj.children];
  const result: Record<string, any> = {};
  if (obj.hasAttributes()) {
    for (const attr of obj.attributes) {
      result[`@${attr.name}`] = attr.value;
    }
  }
  if (!children.length) {
    if (!obj.hasAttributes()) {
      return obj.textContent;
    }
    result["#text"] = obj.textContent;
  }

  for (const child of children) {
    if (children.filter((c) => c.nodeName === child.nodeName).length > 1) {
      if (result[child.nodeName] === undefined) {
        result[child.nodeName] = [xmlToJsObject(child)];
      } else {
        result[child.nodeName].push(xmlToJsObject(child));
      }
    } else {
      result[child.nodeName] = xmlToJsObject(child);
    }
  }

  return result;
}
