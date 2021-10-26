# EthSplorer

This project is a lightweight block explorer and gas chart interface for the Ethereum blockchain.

## Getting started

Pull this repo down locally and create a file named `.env` at the root of this repo with the following variables defined:

```
REACT_APP_ETH_NODE_HTTP_URL=<your_node_provider_url>
REACT_APP_ETH_NODE_WSS_URL=<your_node_provider_websocket_url>
```

Infura was used during development, but any Ethereum node that supports the RPC methods required by `ethers.js` should be usable.

Then run :

```
yarn
yarn start
```

## Architecture

This app uses the reducer pattern for global state management. It's a bit heavy considering the scope of the app, but I did not have a lot iof experience with `redux` and wanted to try to mimic some of those patterns without implementing the full package.
