export const load = async () => {
  const tasks = [
    { done: true },
    { done: false },
    { done: true }
  ];

  const total = tasks.length;
  const doneCount = tasks.filter(t => t.done).length;

 const open = total - doneCount;

return {
  total,
  done: doneCount,
  doneCount,
  open
};
};