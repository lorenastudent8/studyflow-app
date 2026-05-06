export const load = async () => {
  // Dummy Daten (funktioniert sofort!)
  const tasks = [
    { done: true },
    { done: false },
    { done: true }
  ];

  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;

  return {
    total,
    done
  };
};