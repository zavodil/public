import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui-js";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";

const selector = await setupWalletSelector({
  network: "mainnet",
  modules: [setupMyNearWallet(), setupHereWallet(), setupMeteorWallet()],
});

const modal = setupModal(selector, {});

window.selector = selector;
window.modal = modal;
