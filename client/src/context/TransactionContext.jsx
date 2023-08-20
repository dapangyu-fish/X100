import React, {useEffect , useState } from 'react';

import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const singer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,singer);

    console.log({
        provider,
        singer,
        transactionContract
    }) 
}

export const TransactionProvider = ({ children }) => {

    const checkIfWalletIsConnected = async () =>{
        if(!ethereum) return alert("Please insall metamask");
        const accounts = await ethereum.request({method:'eth_accounts'});
        console.log(accounts);
    }

    useEffect(() =>{
        checkIfWalletIsConnected();
    },[]);

    return (
        <TransactionContext.Provider value={{value:'test',}}>
            {children}
        </TransactionContext.Provider>
    );
}

