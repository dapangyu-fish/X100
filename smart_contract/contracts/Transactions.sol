// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;


contract Transactions {
    uint256 transactionCount;

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

}