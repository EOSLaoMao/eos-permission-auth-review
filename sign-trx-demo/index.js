const { Api, JsonRpc } = require('./eosjs');
const { JsSignatureProvider } = require('./eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const { TextDecoder, TextEncoder } = require('util');

const privateKeys = ["5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"];

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

const action = {
  account: 'eosio',
  name: 'newaccount',
  authorization: [{
    actor: 'eosio',
    permission: 'newacc',
  }],
  data: {
    creator: 'eosio',
    name: 'alice',
    owner: {
      threshold: 1,
      keys: [{
        key: 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV',
        weight: 1
      }],
      accounts: [],
      waits: []
    },
    active: {
      threshold: 1,
      keys: [{
        key: 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV',
        weight: 1
      }],
      accounts: [],
      waits: []
    },
  },
};

async function run() {
  try {
    const result = await api.transact({
      actions: [action],
    }, {
        blocksBehind: 3,
        expireSeconds: 360,
      });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

run();