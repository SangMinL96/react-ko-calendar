export const classes = (...args: (string | undefined)[]) =>
  args.filter(Boolean).join(" ");


export const newDateKo = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);
  return korNow;
};
