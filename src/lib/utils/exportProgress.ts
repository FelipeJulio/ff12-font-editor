export async function exportProgress(
  setProgress: (value: number) => void,
  setOpenDialog: (open: boolean) => void,
  action: () => Promise<void> | void
) {
  setProgress(0);
  setOpenDialog(true);

  const totalDuration = 3000;
  const totalTicks = Math.floor(Math.random() * 3) + 3;
  const stepValue = Math.floor(100 / totalTicks);

  let currentStep = 0;
  const tickInterval = Math.floor(totalDuration / totalTicks);

  const tick = () => {
    currentStep++;
    const progress = currentStep * stepValue;
    setProgress(Math.min(progress, 100));

    if (currentStep >= totalTicks) {
      Promise.resolve(action()).finally(() => {
        setTimeout(() => setOpenDialog(false), 300);
      });
      return;
    }

    setTimeout(tick, tickInterval);
  };

  setTimeout(tick, tickInterval);
}
