var Ethereum = {

    ethereumProvider: null,
	smartContract: null,

    initialization: async function () {
        await Ethereum.connectEthereumProvider();
        await Ethereum.initializeSmartContract();
    },

    connectEthereumProvider: async function () {
        console.log('[TASK] Looking for an Ethereum provider API...')
        if (typeof window.ethereum === 'undefined') {
            throw new Error(
                "[ERROR] Can't connect to any Ethereum provider API!\n" +
                "Please install the latest MetaMask version to your browser at: https://metamask.io/"
            )
        } else {
            await ethereum.enable();
            if (window.ethereum.isMetaMask == true) {
                console.log('\t[INFO] Connected to the MetaMask Ethereum provider API.')                
                Ethereum.ethereumProvider = web3.currentProvider                
                web3 = new Web3(Ethereum.ethereumProvider);
                console.log('\t[INFO] Injected web3 library to the MetaMask Ethereum provider API.')
            } else {
                // [Feature]: Setup the connection from other softwares that similar to Meta Mask
            }
        }
    },

    initializeSmartContract: async function () {
        console.log('\n[TASK] Loading the smart contract...')
        var smartContractJSON = await $.getJSON('../build/contracts/Crowdfunding.json')
        Ethereum.smartContract = TruffleContract(smartContractJSON)
        console.log('\t[INFO] Processed data from the smart contract JSON file...')
        Ethereum.smartContract.setProvider(Ethereum.ethereumProvider)
        console.log('\t[INFO] Connected the Ethereum provider API to the smart contract...')
        console.log('\t[INFO] The smart contract has been loaded.')
    },
}