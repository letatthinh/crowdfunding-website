var Utilities = { 
  
    reduceString: function (string, maxLength) {
        var newString = ''
        if (string.length > maxLength) {
          newString = string.substring(0, maxLength) + '...'
        } else {
          newString = string
        }
        return newString
    },
    
    getSubString: function (string, startPosition, length) {
        return string.substring(startPosition, length)
    },

    onlyAllowNumber: function(event) {
        var keyCode = event.keyCode
        if (keyCode >= 48 && keyCode <= 57) {
          return true
        } else {
          return false
        }
    },

	getcurrentDate: function () {
		var date = new Date()
		var currentDay = ('0' + date.getDate()).slice(-2)
		var currentMonth = ('0' + (date.getMonth() + 1)).slice(-2)
		var today = date.getFullYear() + '-' +  currentMonth + '-' + currentDay
		return today
	},

	isValidDateRange: function (_startDate, _endDate) {
		var startDate = new Date(_startDate)
		var endDate = new Date(_endDate)
		if (endDate <= startDate) {
			return false
		}
		return true
    },

	isAnUrl: function (address) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(address);
    },

	convertMoneytoEther: async function (moneyValue, moneyUnit) {
        var moneyInput = Number(moneyValue)
        var ether = 0
        if (moneyUnit == Enums.MoneyUnit.VND) {
            var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=vnd&ids=ethereum'
            var ETHtoVNDData = await $.get(url)
            ether = moneyInput / ETHtoVNDData[0].current_price
        }
        return ether
    },

	convertMoneytoWei: async function (_moneyValue, _moneyUnit) {
        var moneyInput = Number(_moneyValue)
        var ether = 0
        if (_moneyUnit == Enums.MoneyUnit.VND) {
            var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=vnd&ids=ethereum'
            var ETHtoVNDData = await $.get(url)
            ether = moneyInput / ETHtoVNDData[0].current_price
        }
        return web3.toWei(ether, "ether")
    },
    
    addCommasToNumber: function (number) {
        var str = number.toString().split('.');
        if (str[0].length >= 4) {
            //add comma every 3 digits befor decimal
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        return str.join('.');
    },

	sendEtherToOwner: async function (_accountFrom, _accountTo, _weiValue) {
        console.log('_weiValue: ' + _weiValue)
        const transactionParameters = {
            gas: '21000',  // customizable by user during MetaMask confirmation.
            from: _accountFrom, // must match user's active address.
            to: _accountTo, // Required except during contract publications.
            value: _weiValue.toString(16), // Only required to send ether to the recipient from the initiating external account.
        }
        await ethereum.sendAsync({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
            from: _accountFrom,
        }, function () {})
    }
}

/*

                console.log(contract.contract.address)
                console.log(web3.toWei(3.5,"ether"))
                const transactionParameters = {
                    gas: '21000',  // customizable by user during MetaMask confirmation.
                    from: web3.eth.accounts[0], // must match user's active address.
                    to: contract.contract.address, // Required except during contract publications.
                    value: '3500000000000000000', // Only required to send ether to the recipient from the initiating external account.
                  }
                  
                  ethereum.sendAsync({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                    from: ethereum.selectedAddress,
                  }, function () {})
                */