import { makeHelpers } from '@agoric/deploy-script-support';
import { getManifestForOfferUp } from '../src/offer-up-proposal.js';
import { getManifestForIncrementor } from '../src/incrementor-proposal.js';

export const offerUpProposalBuilder = async ({ publishRef, install }) => {
  return harden({
    sourceSpec: '../src/offer-up-proposal.js',
    getManifestCall: [
      getManifestForOfferUp.name,
      {
        offerUpRef: publishRef(
          install(
            '../src/offer-up.contract.js',
            '../bundles/bundle-offer-up.js',
            { persist: true },
          ),
        ),
      },
    ],
  });
};

export const incrementorProposalBuilder = async ({ publishRef, install }) => {
  return harden({
    sourceSpec: '../src/incrementor-proposal.js',
    getManifestCall: [
      getManifestForIncrementor.name,
      {
        incrementorRef: publishRef(
          install(
            '../src/incrementor.js',
            '../bundles/bundle-incrementor.js',
            { persist: true },
          ),
        ),
      },
    ],
  });
};

export default async (homeP, endowments) => {
  const { writeCoreProposal } = await makeHelpers(homeP, endowments);
  await writeCoreProposal('start-offer-up', offerUpProposalBuilder);
  await writeCoreProposal('start-incrementor', incrementorProposalBuilder);
};