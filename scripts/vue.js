<template>
  <div class="hello">
    <h2>XRP Wallet balance for <code>{{ walletAddress }}</code></h2>

    <h3 :class="{ waiting: connection === null }"><b>{{ connection === null ? 'Connecting...' : 'Connected!' }}</b></h3>

    <div v-if="connection !== null">
      <div class="waiting" v-if="balance === null">Waiting for balance...</div>

      <h1 v-if="balance !== null">Balance: <b>{{ balance }} XRP</b></h1>

      <div v-if="accountDetails">
        <b>Account details:</b>
        <pre>{{ accountDetails }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import RippleClient from 'rippled-ws-client' // Deprecated use xrpl-client instead
export default {
  name: 'HelloWorld',
  data () {
    return {
      walletAddress: 'rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT',
      connection: null,
      balance: null,
      accountDetails: null
    }
  },
  mounted () {
    new RippleClient('wss://s1.ripple.com').then((RippleServerConnection) => {
      this.connection = RippleServerConnection
      this.getBalance()
    }).catch((error) => {
      // Oops!
      alert('Oops! ' + error.message)
    })
  },
  methods: {
    getBalance () {
      this.connection.send({
        command: 'account_info',
        account: this.walletAddress
      }).then((response) => {
        // `account_data` contains the information
        this.accountDetails = response.account_data
        // We parse the balance as an integer and devide it by 1,000,000 to convert
        // 'drops' to XRP.
        this.balance = parseInt(response.account_data.Balance) / 1000 / 1000
      }).catch((error) => {
        alert('Oops! ' + error.message)
      })
    }
  }
}
</script>

<style scoped>
  div.hello { font-family: Arial, Tahoma, Verdana; font-size: 1em; line-height: 1.5em; }
  .waiting { color: orange; }
</style>
