// POC Earned
var pocBalance = document.querySelector('.pocEarnedBalance');
var settleBtn = document.querySelector('.settleBtn');


//USDC Staked
var stakeBalance = document.querySelector('.stakeBalance');
var minusStakeBtn = document.querySelector('.minusStakeBtn');
var addStakeBtn = document.querySelector('.addStakeBtn');



const sendToHTML = (className, value) =>  document.querySelector(className).innerHTML = value; 

// Check if Metamask is installed
if (typeof window.ethereum !== 'undefined') {   
    initialize();
} else {
    alert("Please install MetaMask!");
}

// Initialize
async function initialize() {
    try {
        const selectedAddress = await ethereum.request({ method: 'eth_requestAccounts' }); 

        const provider = new ethers.providers.Web3Provider(window.ethereum); //Provider 
        const signer = provider.getSigner();
    }
    catch (e) {
        console.log(e);
    }
}
