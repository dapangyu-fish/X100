// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;


contract Transactions {
    uint256 transactionCount;
    uint256 testNumber;

    event Transfer(address from, address receiver,uint amount,string message,uint256 timestamp,string keyword);

    struct TransferStruct{
        address sender;
        address reciver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable revicer,uint amount,string memory message,string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender,revicer,amount,message,block.timestamp,keyword));
        
        emit Transfer(msg.sender,revicer,amount,message,block.timestamp,keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionsCount() public view returns (uint256) {
        return transactionCount;
    }

    function addTestNumber() public {
        testNumber +=5;
    }

    function setTestNumber(uint256 amount) public {
        testNumber = amount;
    }

    function getTestNumber() public view returns (uint256){
        return testNumber;
    }

    function draw(uint32 probability) public view returns (uint8) {
        require(probability <= 100000000, "Invalid probability"); // 检查概率是否合法

        uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100000000; // 生成一个在 0 到 99999999 之间的伪随机数

        if (random < probability) {
            return 1; // 中奖
        } else {
            return 0; // 未中奖
        }
    }

}