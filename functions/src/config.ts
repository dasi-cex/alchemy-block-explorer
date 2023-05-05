import { Network, Alchemy } from "alchemy-sdk";
import { SecretsManagerKeyNames } from "../../shared-models/environments/env-vars.model";

// Access Alchemy API
const alchemyApiKey = process.env[SecretsManagerKeyNames.ALCHEMY_API_KEY_MAINNET];

const settings = {
  apiKey: alchemyApiKey,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);