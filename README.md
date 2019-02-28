# Blockchain Choreography Frontend

## Installation

### Ganache
 
```bash
sudo npm install ganache-cli -g
```

### Truffle

```bash
sudo npm install -g truffle
```


### Build Project


Init truffle project in new folder (`truffleproject/`):

```bash
truffle init
```
Add contract to `contracts/` folder and migration (2_deploy_contracts.js) to `migrations/` folder.

Compile contract:

```bash
sudo truffle compile
```

Start local blockchain in a new terminal:

```bash
ganache-cli
```

Adapt configuration in `truffle-config.js` according to output of ganache-cli. Set the used port as shown in ganache-clis output.

Migrate contract:

```bash
sudo truffle migrate
```

Create symlink for the smart contracts:

```bash
ln -s truffleproject/build/contracts blockchain-choreography/src/contracts
```


## Execution

Start a local blockchain with:

```bash
npm start
```
