import { Far } from '@endo/far';

export const start = async (zcf) => {
  let count = 0n;

  const publicFacet = Far('Incrementor Public Facet', {
    increment: () => {
      count += 1n;
      return count;
    },
    getCount: () => count,
  });

  return harden({ publicFacet });
};