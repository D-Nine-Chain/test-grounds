
import { TronWeb } from "tronweb";
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
});
const account = tronWeb.utils.accounts.generateAccount();
console.log(account);