export default function timer() {
  let startTime = 0;

  function start() {
    startTime = Date.now();
  }

  function finish() {
    const endTime = Date.now();

    return (endTime - startTime) / 1000;
  }

  return { start, finish } as const;
}
