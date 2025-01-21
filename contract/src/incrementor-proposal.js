import { E } from '@endo/far';

export const startIncrementorContract = async (permittedPowers) => {
  const {
    consume: { board, chainStorage, startUpgradable },
    installation: {
      consume: { incrementor: incrementorInstallationP },
    },
    instance: {
      produce: { incrementor: produceInstance },
    },
  } = permittedPowers;

  const installation = await incrementorInstallationP;
  const { instance } = await E(startUpgradable)({
    installation,
    issuerKeywordRecord: {},
    label: 'incrementor',
    terms: {},
  });

  console.log('Incrementor contract instance started', instance);
  produceInstance.reset();
  produceInstance.resolve(instance);
};

export const getManifestForIncrementor = ({ restoreRef }, { incrementorRef }) => {
  return harden({
    manifest: {
      [startIncrementorContract.name]: {
        consume: {
          board: true,
          chainStorage: true,
          startUpgradable: true,
        },
        installation: { consume: { incrementor: true } },
        instance: { produce: { incrementor: true } },
      },
    },
    installations: {
      incrementor: restoreRef(incrementorRef),
    },
  });
};