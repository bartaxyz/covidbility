export const getCombinedChance = (peopleChances: number[]) => {
  return (
    (1 -
      peopleChances.reduce((previous, current) => {
        return previous * (1 - current / 100);
      }, 1)) *
    100
  );
};
