// npm scripts/mintToken.js
// These address and secret are valid until 22 Apr 2022.(90 days)
// You should make new account info before 22 April.
// https://xrpl.org/xrp-testnet-faucet.html
// Address: rht9PFsHK2rds9dp5Nt9op4VWAceR63vWH
//  Secret: snkPFbLVfK123mxH3SLGchmAAzd37
// Balance: 10,000 XRP
// tokenUrl: ipfs://QmXSSpHaG9DH5U7zQNkL4BZrBZioGG3xmG54mqPqTCpddQ
// You can check it https://ipfs.infura.io/ipfs/QmXSSpHaG9DH5U7zQNkL4BZrBZioGG3xmG54mqPqTCpddQ
const xrpl = require("xrpl")
async function main() {
	const secret = "snkPFbLVfK123mxH3SLGchmAAzd37"
	const tokenUrl = "ipfs://QmXSSpHaG9DH5U7zQNkL4BZrBZioGG3xmG54mqPqTCpddQ"
	const wallet = xrpl.Wallet.fromSeed(secret)
	const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
	await client.connect()
	console.log("Connected to Sandbox")

	// Note that you must convert the token URL to a hexadecimal
	// value for this transaction.
	// ----------------------------------------------------------
	const transactionBlob = {
		TransactionType: "NFTokenMint",
		Account: wallet.classicAddress,
		URI: xrpl.convertStringToHex(tokenUrl),
		Flags: parseInt(flags.value),
		TokenTaxon: 0 //Required, but if you have no use for it, set to zero.
	}
	// Submit signed blob --------------------------------------------------------
	const tx = await client.submitAndWait(transactionBlob,{wallet})

	const nfts = await client.request({
		method: "account_nfts",
		account: wallet.classicAddress
	})
	console.log(nfts)

	// Check transaction results -------------------------------------------------
	console.log("Transaction result:", tx.result.meta.TransactionResult)
	console.log("Balance changes:",
	  JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
	client.disconnect()
} //End of mintToken

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})