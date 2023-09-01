import React, {useEffect , useState } from 'react';

import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const singer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,singer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormDate] = useState({addressTo: '',amount: '' ,keyword: '',message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionsCount, setTransactionsCount] = useState(localStorage.getItem("transactionsCount"));


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

    const sendTransaction = async () => {
        try{
            if(!ethereum) return alert("Please insall metamask");
            const { addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI 0.0000021eth
                    value: parsedAmount._hex, //0.000001
                }],
            });
            

            console.log('===========');
            console.log(addressTo);
            console.log(parsedAmount);
            console.log(parsedAmount._hex);
            console.log('###########');

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            const currentTransactionCount = await transactionContract.getTransactionsCount();
            console.log(`currentTransactionCount - ${currentTransactionCount}`);

            const testNumber = await transactionContract.getTestNumber();
            console.log(`currentgetTestNumber - ${testNumber}`);
            console.log(`hello ---`);

            // const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

            // const result = await contractInstance.methods.getTestNumber().call();
            // console.log(result);
            
            console.log(`hello @@@`);


            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));
            
            console.log(structuredTransactions);

            // const transactionsCount = await transactionContract.getTransactionsCount();

            // setTransactionsCount(transactionsCount.toNumber());

        }catch(error){
            console.log(error);

            // throw new Error("No ethereum object!") 
            throw error 
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

