const captalizer = (value: string): string | null => {
  if (!value) return null;
  if (typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  return null;
};

export default captalizer;
