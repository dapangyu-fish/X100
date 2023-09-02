const main = async () => {
    const Transactions = await hre.ethers.getContractFactory("MyToken");
    const name = "JJ Coin"; // 代币的名称
    const symbol = "JJC"; // 代币的符号
    const totalSupply = 1000000000; // 代币的总供应量
    const transactions = await Transactions.deploy(name, symbol, totalSupply);

    await transactions.deployed();

    console.log("Transactions deployed to:", transactions.address);

    // 向其他账户发送代币
    const recipientAddress = "0x9feee155032dCcD5F090299416E02f986919E1ad"; // 接收者的账户地址
    const amount = 100000000; // 要发送的代币数量

    // 获取代币合约实例
    const tokenContract = await Transactions.attach(transactions.address);

    // 调用代币合约的转账函数
    await tokenContract.transfer(recipientAddress, amount);

    console.log(`Transferred ${amount} tokens to ${recipientAddress}`);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();