// XRPL Accountlib & XRPL Client together
// Embed <script src="https://gist.github.com/WietseWind/557a5c11fa0d474468e8c9c54e3e5b93.js"></script>
const lib = require('xrpl-accountlib')
const { XrplClient } = require('xrpl-client')

const secret = 's...'
const account = 'r...' // Can be derived

const client = new XrplClient('wss://hooks-testnet.xrpl-labs.com')
const keypair = lib.derive.familySeed(secret)

const main = async () => {
  console.log('Getting ready...')
  const { account_data } = await client.send({ command: 'account_info', account })

  const tx = {
    TransactionType: 'Payment',
    Account: account,
    Amount: '1',
    Destination: 'rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ',
    Fee: '12',
    Sequence: account_data.Sequence
  }

  const {signedTransaction} = lib.sign(tx, keypair)
  const submit = await client.send({ command: 'submit', 'tx_blob': signedTransaction })
  console.log(submit.engine_result, submit.engine_result_message, submit.tx_json.hash)

  console.log('Shutting down...')
  client.close()
}

main()