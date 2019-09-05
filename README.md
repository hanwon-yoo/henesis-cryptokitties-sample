# cryptokitties tutorial for henesis

more details: [docs](https://docs.henesis.io)
### project architecture 
- frontend
```
src
├── App.css
├── App.js
├── App.test.js
├── components
│   ├── CustomChip.js decorates event parameter to chip(material design)
│   └── EventRows.js: events -> <TableRow> x N 
├── containers
│   ├── EventList.js: container for wrapping whole event informations.
│   └── MetaData.js: container for metadata like blockchain, network, contract info.
├── henesis.png
├── index.css
├── index.js
└── serviceWorker.js
```
- backend
```
src
├── api.js: REST api router
├── config.json: configuration file. YOU NEED TO modify integrationID!!
├── event.js: watcher made with henesis sdk. YOU NEET TO IMPLEMENT IT!
├── index.js: entrypoint
└── model.js: blockchain event model. 
```

### build

- frontend (at /frontend)
```
npm install
```
- backend (at /backend)
```
npm install
```

- henesis
```
henesis login
henesis integration:deploy
```
after deploy, please modify integrationId at /backend/src/config.json 


### start

- frontend
```
npm run start
```

- backend
```
npm run dev
```

### events

- token 0x06012c8cf97bead5deae237070f9587f8e7a266d
```
Pregnant (address owner, uint256 matronId, uint256 sireId, uint256 cooldownEndBlock)
Birth(address owner, uint256 kittyId, uint256 matronId, uint256 sireId, uint256 genes);
Transfer(address from, address to, uint256 tokenId)
```

- ClockAuctions(Sale 0xb1690c08e213a35ed9bab7b318de14420fb57d8c, Siring 0xc7af99fe5513eb6710e6d5f44f9989da40f27f26)
```
 AuctionCreated (uint256 tokenId, uint256 startingPrice, uint256 endingPrice, uint256 duration)
 AuctionSuccessful (uint256 tokenId, uint256 totalPrice, address winner)
 AuctionCancelled (uint256 tokenId)
```
- get from api:
```
/api/events

result: [
    {
        event: "Pragnant",
        contract: "KittyCore",
        args: {
            "address": ...,
            "matronId": ... ,
            "sireId": ... ,
            "cooldownEndBlock": ...
        }
        blockMeta: {
            "blockNumber":...,
            "transactionHash::...
        }
    },...
]
```
