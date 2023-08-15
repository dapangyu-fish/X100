# X100
# krypt project
# deploy private ethereum
- geth --datadir nodedata --networkid 376231 init ./geth.json
- geth --datadir nodedata account new
- geth  --ethash.cachedir /root/Ethash --ethash.dagdir /root/Ethash --allow-insecure-unlock  --unlock=0  --password  ./passwd  --networkid  376231  --datadir  "nodedata"  --http --http.api "admin,debug,web3,eth,txpool,personal,ethash,miner,net" --http.corsdomain="*" --http.port=8545 --http.addr="0.0.0.0"  --ws --ws.addr "0.0.0.0" --ws.port=8546 --ws.origins "*" --ws.api "admin,debug,web3,eth,txpool,personal,ethash,miner,net" --syncmode full console