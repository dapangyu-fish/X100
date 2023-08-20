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
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormDate] = useState({addressTo: '',amount: '' ,keyword: '',message: ''});

    const handleChange = (e, name) =>{
        setFormDate((prevState) => ({ ...prevState, [name]: e.target.value}))
    }


    const checkIfWalletIsConnected = async () =>{
        try{
            if(!ethereum) return alert("Please insall metamask");

            const accounts = await ethereum.request({method:'eth_accounts'});
        
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                //getAllTransaction():
            } else {
                console.log('No accounts found');
            }
        }catch (error) {
            console.log(error);
            throw new Error("No ethereum object!") 
        }
    }

    const connectWallet = async () =>{
        try{
            if(!ethereum) return alert("Please insall metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        }catch(error){
            console.log(error);

            throw new Error("No ethereum object!") 
        }
    }

    const sendTransaction = async () =>{
        try{
            if(!ethereum) return alert("Please insall metamask");
            const { addressTo, amount, keyword, message} = formData;

            getEthereumContract();
        }catch(error){
            console.log(error);

            throw new Error("No ethereum object!") 
        }
    }

    useEffect(() =>{
        checkIfWalletIsConnected();
    },[]);

    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormDate, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
}

