# EthSplorer

This is a lightweight block explorer for the ethereum blockchain

## Getting started

Pull this repo down locally and create a file named `.env` at the root of this repo with the following variables defined:

```
REACT_APP_ETH_NODE_HTTP_URL=<your_>
REACT_APP_ETH_NODE_WSS_URL
```

Infura was used during development, but any Ethereum node that supports the RPC methods required by `ethers.js` should be usable.

Then run :

```
yarn
yarn start
```
