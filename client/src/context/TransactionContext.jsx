import React, {useEffect , useState } from 'react';

import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContrach = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const singer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,singer);

    console.log({
        provider,
        singer,
        transactionContract
    })
}

export const TransactionProvier = ({ children }) =>{
    return (
        <TransactionProvier.Prvoder value={{value:'test'}}>
            {children}
        </TransactionProvier.Prvoder>
    );
}