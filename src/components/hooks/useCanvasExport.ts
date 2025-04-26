import html2canvas from "html2canvas-pro";

export function exportCanvasAsPng(
  ref: HTMLDivElement | null,
  filename = "exported_atlas.png"
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!ref) return reject(new Error("Reference to canvas is null"));

    const clone = ref.cloneNode(true) as HTMLElement;
    clone.classList.add("clean-glyphys");

    clone.style.position = "absolute";
    clone.style.top = "0";
    clone.style.left = "0";
    clone.style.zIndex = "-100";
    clone.style.pointerEvents = "none";
    clone.style.transform = "none";

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
        clone.classList.remove("clean-glyphys");
      });
  });
}
