export const classes = (...args: (string | undefined)[]) =>
  args.filter(Boolean).join(" ");
