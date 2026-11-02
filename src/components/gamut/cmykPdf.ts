/**
 * Creates an A4 landscape PDF with an unprofiled DeviceCMYK image.
 * The simple RGB-to-CMYK conversion is not a substitute for an ICC profile.
 */
export async function canvasToCmykPdf(canvas: HTMLCanvasElement): Promise<Blob> {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to read the export canvas");

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const cmyk = new Uint8Array(canvas.width * canvas.height * 4);
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3] / 255;
    const r = data[i] * alpha + 255 * (1 - alpha);
    const g = data[i + 1] * alpha + 255 * (1 - alpha);
    const b = data[i + 2] * alpha + 255 * (1 - alpha);
    const max = Math.max(r, g, b);
    cmyk[i] = max === 0 ? 0 : Math.round(((max - r) / max) * 255);
    cmyk[i + 1] = max === 0 ? 0 : Math.round(((max - g) / max) * 255);
    cmyk[i + 2] = max === 0 ? 0 : Math.round(((max - b) / max) * 255);
    cmyk[i + 3] = Math.round(255 - max);
  }

  let image: Uint8Array = cmyk;
  let filter = "";
  if (typeof CompressionStream !== "undefined") {
    const stream = new Blob([cmyk]).stream().pipeThrough(new CompressionStream("deflate"));
    image = new Uint8Array(await new Response(stream).arrayBuffer());
    filter = " /Filter /FlateDecode";
  }

  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  const offsets = [0];
  let length = 0;
  const add = (part: string | Uint8Array) => {
    const bytes = typeof part === "string" ? encoder.encode(part) : part;
    parts.push(bytes);
    length += bytes.length;
  };
  const object = (number: number, content: string) => {
    offsets[number] = length;
    add(`${number} 0 obj\n${content}\nendobj\n`);
  };

  add("%PDF-1.4\n");
  object(1, "<< /Type /Catalog /Pages 2 0 R >>");
  object(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  object(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.89 595.28] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");
  offsets[4] = length;
  add(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceCMYK /BitsPerComponent 8${filter} /Length ${image.length} >>\nstream\n`);
  add(image);
  add("\nendstream\nendobj\n");

  const scale = Math.min((841.89 - 40) / canvas.width, (595.28 - 40) / canvas.height);
  const width = canvas.width * scale;
  const height = canvas.height * scale;
  const x = (841.89 - width) / 2;
  const y = (595.28 - height) / 2;
  const content = `q\n${width.toFixed(2)} 0 0 ${height.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/Im0 Do\nQ\n`;
  object(5, `<< /Length ${encoder.encode(content).length} >>\nstream\n${content}endstream`);

  const xref = length;
  add("xref\n0 6\n0000000000 65535 f \n");
  for (let i = 1; i <= 5; i++) {
    add(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(parts, { type: "application/pdf" });
}
