
var campaignIDParameter = 'campaignID'

var Profile = {

    initialization: async function() {
        await Ethereum.initialization()
		Profile.loadProfilePage()
    },	

    loadProfilePage: function() {
        Page.loadNavigationBar(aboutPage)
        Profile.LoadMyCampaigns()
        Page.loadPageFooter()
    },

    LoadMyCampaigns: async function () {
        ethereum.on('accountsChanged', function (accounts) {
            window.location.reload()
        })
		var myProfileTitle = 'Chiến dịch của tôi!'
		var myProfileDescription = 'Xin chào, <strong>' + window.web3.eth.defaultAccount + '</strong>! Đây là danh sách những chiến dịch bạn đã tạo:'
		$('main').append(
			'<div id="campaigns-of-mine" class="container mb-4">' +
				'<hr>' +
				'<h1 id="my-profile-title" class="display-45 font-weight-light my-4">' + myProfileTitle + '</h1>' +
				'<p id="my-profile-description">' + myProfileDescription + '</p>' +
			'</div>'
		)

		var contract = await Ethereum.smartContract.deployed()
		var numberOfCampaigns = await contract.GetNumberOfCampaigns()

		var count = 0		
		for (var campaignID = (numberOfCampaigns - 1); campaignID >= 0; campaignID--) {
			var campaignOwner = await contract.GetCampaignOwner(campaignID)
			if (campaignOwner.toLowerCase() == window.web3.eth.defaultAccount) {   
				var campaignName = await contract.GetCampaignName(campaignID)                 
				var campaignImageLink = await contract.GetCampaignImageLink(campaignID)
				var campaignDescription = await contract.GetCampaignDescription(campaignID)
				var campaignGoal = await contract.GetCampaignGoal(campaignID)
				var campaignMoneyCollected = await contract.GetCampaignMoneyCollected(campaignID)
				var campaignStartDate = await contract.GetCampaignStartDate(campaignID)
				var campaignEndDate = await contract.GetCampaignEndDate(campaignID)
				var campaignStatus = await contract.GetCampaignStatus(campaignID)
				var percentage = ((campaignMoneyCollected / campaignGoal) * 100).toFixed(2)

				var campaignStatusText
				switch (Number(campaignStatus)) {
					case 0:
						if (Utilities.isValidDateRange(Utilities.getcurrentDate(), campaignEndDate) == false) {
							campaignStatusText = 'Chiến dịch đã hết hạn gây quỹ.'
						} else {
							campaignStatusText = 'Đang trong tiến trình nhận quỹ'
						}
						break
					case 1:
						campaignStatusText = 'Đã đạt được mục tiêu'
						break
					case 2:
						campaignStatusText = 'Chiến dịch này đã đóng'
						break
					default:
						console.log('Không đọc được thông tin về tình trạng của chiến dịch')
				}
				var openCampaignQuery = '?' + campaignIDParameter + '=' + campaignID
				
				$('main').append(
					'<div class="container">' +
						'<div class="row border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative w-90 mx-auto">' +
							'<div class="col-auto p-4">' +
								'<img class="bd-placeholder-img" width="425" height="300" src="' + campaignImageLink + '"></img>' +
							'</div>' +
							'<div class="col p-4 d-flex flex-column">' +
								'<h4 id="campaign-' + campaignID + '-name" class="text-nc-red text-justify">' + campaignName + '</h4>' +
								'<div class="mb-2 text-muted small font">Ngày bắt đầu: <span id="campaign-' + campaignID + '-start-date">' + campaignStartDate + '</span> - Ngày kết thúc: <span id="campaign-' + campaignID + '-end-date">' + campaignEndDate + '</span></div>' +
								'<p id="campaign-' + campaignID + '-description" class="card-text text-justify mb-2">' + Utilities.reduceString(campaignDescription, 150) + '</p>' +
								'<p id="campaign-' + campaignID + '-status" class="mb-2">Tình trạng của chiến dịch: <span class="font-weight-bold">' + campaignStatusText + '</span></p>' +
								'<p class="mb-3">Số tiền nhận được: <span id="campaign-' + campaignID + '-money-collected">' + Utilities.addCommasToNumber(campaignMoneyCollected) + '</span> VNĐ / <span id="campaign-' + campaignID + '-goal">' + Utilities.addCommasToNumber(campaignGoal) + '</span> VNĐ (' + percentage + '%)</p>' +
								'<div id="campaign-' + campaignID + '-progress" class="progress" style="height: 4px;">' +
								'</div>' +
								'<div class="text-right mt-auto">' +
									'<a class="btn btn-sm btn-nc-red py-2 px-3 mr-1 rounded-pill" href="' + campaignsPagePath + openCampaignQuery + '" role="button">Xem chiến dịch này</a>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>'
				)
				Profile.loadProgressBar(campaignMoneyCollected, campaignGoal, '#campaign-' + campaignID + '-progress', false)
				count++ 
			}
		}
        if (count == 0) {
            $('#campaigns-of-mine').append(
				'<p id="no-search-result-found">Không tìm thấy bất kì chiến dịch nào mà bạn đã tạo!</p>' +
				'<div class="text-center">' +
					'<a id="create-a-new-campaign-button" class="btn btn-nc-red btn-lg my-3" href="' + createCampaignsPagePath + '" role="button"><i class="fab fa-font-awesome-flag mr-2"></i>Tạo một chiến dịch gây quỹ mới</a>' +
				'</div>'
			)
        }
	},

    loadProgressBar: function (_campaignMoneyCollected, _campaignGoal, _selector, _IsShowPercentage) {
        var backgroundColor
        var textColor
        var percentage = ((_campaignMoneyCollected / _campaignGoal) * 100).toFixed(2)
        var progressBarLoadingNumber = percentage
        var progressBarTheme = ' progress-bar-striped progress-bar-animated'
        if (percentage == 0) {
            backgroundColor = 'bg-light'
            textColor = 'text-dark'
        } else if (percentage > 0 && percentage <= 20) {
            backgroundColor = 'bg-danger'
            textColor = 'text-light'
        } else if (percentage > 20 && percentage <= 50) {
            backgroundColor = 'bg-warning'
            textColor = 'text-dark'
        } else if (percentage > 50 && percentage <= 70) {
            backgroundColor = 'bg-info'
            textColor = 'text-white'
        } else if (percentage > 70 && percentage < 100) {
            backgroundColor = 'bg-primary'
            textColor = 'text-white'
        } else if (percentage >= 100) {
            backgroundColor = 'bg-success'
            textColor = 'text-white'
            progressBarLoadingNumber = 100
            progressBarTheme = ''
        }
        var percentageText = ''
        if (_IsShowPercentage == true) {
            percentageText = percentage + '%'
        }
        $(_selector).append(
            '<div class="progress-bar ' + 
                        backgroundColor + ' ' + 
                        textColor + ' ' + 
                        progressBarTheme + 
                        '" role="progressbar" style="width: ' + progressBarLoadingNumber + '%;"' +
                        'aria-valuenow="' + progressBarLoadingNumber + '"' +
                        'aria-valuemin="0" aria-valuemax="100"><strong>' + percentageText + '</strong></div>' +
            '</div>'
        )
    }
}

$(window).on('load', function() {
    Profile.initialization()
})