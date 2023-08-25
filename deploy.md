
# 部署geth
```bash
docker run -itd --restart=always --net=host --name=geth-01 ubuntu
docker exec -it geth-01 bash
#!/bin/bash
apt update && apt install wget vim -y
wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.11.6-ea9e62ca.tar.gz
tar -zxvf geth-linux-amd64-1.11.6-ea9e62ca.tar.gz
mv geth-linux-amd64-1.11.6-ea9e62ca/geth /bin/geth
rm -rf geth-linux-amd64-1.11.6-ea9e62ca
rm -rf geth-linux-amd64-1.11.6-ea9e62ca.tar.gz
```

```geth.json
{
    "config": {
          "chainId": 43282,
          "homesteadBlock": 0,
          "eip150Block": 0,
          "eip155Block": 0,
          "eip158Block": 0
      },
    "alloc"      : {
	    "0xa680FF3154354E6B0883a1C2b31Ac5b1efb0baE8":{
	    	"balance": "0x1000000000000000000"
	    }
    },
    "coinbase"   : "0x0000000000000000000000000000000000000000",
    "difficulty" : "0x20000",
    "extraData"  : "",
    "gasLimit"   : "0x2fefd8",
    "nonce"      : "0x0000000000000042",
    "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
    "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
    "timestamp"  : "0x00"
}
```

```bash
cat <<EOF >> ~/geth.json
{
    "config": {
          "chainId": 43282,
          "homesteadBlock": 0,
          "eip150Block": 0,
          "eip155Block": 0,
          "eip158Block": 0
      },
    "alloc"      : {
	    "0xa680FF3154354E6B0883a1C2b31Ac5b1efb0baE8":{
	    	"balance": "0x1000000000000000000"
	    }
    },
    "coinbase"   : "0x0000000000000000000000000000000000000000",
    "difficulty" : "0x20000",
    "extraData"  : "",
    "gasLimit"   : "0x2fefd8",
    "nonce"      : "0x0000000000000042",
    "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
    "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
    "timestamp"  : "0x00"
}
fi
EOF
geth --datadir ~/nodedata --networkid 776211 --rpc init ~/geth.json
geth --datadir ~/nodedata account new # 生成密码 passwd
cat <<EOF >> ~/passwd
passwd
fi

cat <<EOF >> ~/start.sh
geth  --ethash.cachedir ~/Ethash --ethash.dagdir ~/Ethash --allow-insecure-unlock  --unlock=0  --password  ~/passwd  --networkid  43282  --datadir  ~/nodedata  --http --http.api "admin,debug,web3,eth,txpool,personal,ethash,miner,net" --http.corsdomain="*" --http.port=8545 --http.addr="0.0.0.0"  --ws --ws.addr "0.0.0.0" --ws.port=8546 --ws.origins "*" --ws.api "admin,debug,web3,eth,txpool,personal,ethash,miner,net" --syncmode full console
fi

chmod +x start.sh

```
