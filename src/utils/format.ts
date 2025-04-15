export const formatTime = (ms: number) => {
    const date = new Date(ms);
    return date.toISOString().substr(14, 9); // "mm:ss.SSS"
  };
