FROM ubuntu:22.04
USER root
WORKDIR /root
ENV DEBIAN_FRONTEND=noninteractive

#=======================
# install apt
#=======================
RUN apt update && apt upgrade -y \
               && apt install -y install wget vim screen \
               && apt autoclean -y \
               && apt autoremove -y \
               && rm -rf /var/lib/apt/lists/*
RUN wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.11.6-ea9e62ca.tar.gz && \
    tar -zxvf geth-linux-amd64-1.11.6-ea9e62ca.tar.gz && \
    mv geth-linux-amd64-1.11.6-ea9e62ca/geth /bin/geth && \
    rm -rf geth-linux-amd64-1.11.6-ea9e62ca && \
    rm -rf geth-linux-amd64-1.11.6-ea9e62ca.tar.gz 


RUN cat <<EOF >> ~/geth.json
{
    "config": {
            "chainId": 43285,
            "homesteadBlock": 0,
            "byzantiumBlock": 0,
            "constantinopleBlock": 0
            "eip150Block": 0,
            "eip155Block": 0,
            "eip158Block": 0
    },
    "alloc": {
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
EOF

