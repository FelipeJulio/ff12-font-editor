import html2canvas from "html2canvas-pro";

export function exportCanvasAsPng(
  ref: HTMLDivElement | null,
  filename = "glyphs.png"
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!ref) return reject();

    const clone = ref.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);

    html2canvas(clone, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = filename;
        link.href = canvas.toDataURL("image/png");
        link.click();
        resolve();
      })
      .catch((err) => {
        console.error("Export failed:", err);
        reject(err);
      })
      .finally(() => {
        document.body.removeChild(clone);
        ref.classList.remove("clean-glyphys");
      });
  });
}
