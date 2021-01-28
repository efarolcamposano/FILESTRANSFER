const sendToHTML = (className, value) =>  document.querySelector(className).innerHTML = value; 

// Check if Metamask is installed
if (typeof window.ethereum !== 'undefined') {   
    initialize();
} else {
    alert("Please install MetaMask!");
}

// Get Network
function getNetworkService(hex) {
    switch (hex) {
        case '0x1': 
            return "Ethereum Mainnet"
        case '0x3': 
            return "Ropsten Test Network"
        case '0x4': 
            return "Kovan Test Network"
        case '0x4': 
            return "Rinkeby Test Network"
        case '0x5': 
            return "Goerli Test Network"
    }
}

var sendTokenBtn = document.querySelector('.sendToken');
var etherAmount = document.querySelector(".etherAmount"); 
var receiverAdr = document.querySelector(".receiverAdr"); 

// Initialize
async function initialize() {
    try {
        const selectedAddress = await ethereum.request({ method: 'eth_requestAccounts' }); 
        let network = getNetworkService(window.ethereum.chainId);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        provider.getBlockNumber();
        let balance = await provider.getBalance(selectedAddress[0]);
        let acctBalance = ethers.utils.formatEther(balance);
        let transactionCount = await provider.getTransactionCount(selectedAddress[0]);
        // let blockNumber = await provider.getBlockNumber(selectedAddress[0]);
        // let addressName = await provider.lookupAddress(selectedAddress[0]);
        let gasPrice = await provider.getGasPrice(selectedAddress[0]);

        console.log("transaction =", transactionCount);

        sendToHTML('.connection', "connected");
            document.querySelector('.connection').style.color = "green";
        sendToHTML('.accounttBalance', acctBalance);
        sendToHTML('.account', selectedAddress);
        sendToHTML('.currNetwork', network);

        sendTokenBtn.addEventListener('click', () => {
            sendWithMetamask(selectedAddress[0], receiverAdr.value, etherAmount.value, provider);
        });


        let transaction = provider.call('0x4bf02fbf4de28b840784338aaaa4dafca333554aaf0000ac2879aca19e6bb6d4');
        console.log(1);
    }
    catch (e) {
        console.log(e);
    }
}


// Send using MetaMask
async function sendWithMetamask(sender, receiver, strEther, provider) {
    console.log(`payWithMetamask(receiver=${receiver}, sender=${sender}, strEther=${strEther})`)

    const params = [{
        from: sender,
        to: receiver,
        value: ethers.utils.parseUnits(strEther, 'ether').toHexString()
    }];

    const transactionHash = await provider.send('eth_sendTransaction', params);
    console.log('TransactionHash is ' + transactionHash);
    receiverAdr.value = '';
    etherAmount.value = '';
}



sendTokenBtn.addEventListener('click', () => {

});


