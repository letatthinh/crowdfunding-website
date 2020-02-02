const numberOfCcampaignsPerPage = 9
const numberPagesInPagination = 5

// parameters
var campaignIDParameter = 'campaignID'
var editIDParameter = 'edit'
var searchKeywordsParameter = 'search'

const campaignSearchTitle = 'Tìm kiếm chiến dịch'
const campaignSearchInputPlaceHolder = 'Tìm kiếm theo tên chiến dịch hoặc từ khóa'

const noCampaignFoundText = '<strong>Oops</strong>! Chưa có một chiến dịch nào được tạo ra. Hãy là người đầu tiên tạo ra chiến dịch gây quỹ trên trang web của chúng tôi.'
const noCampaignFoundImageLink = 'https://media2.giphy.com/media/pbNiovq3iFnlm/giphy.gif?cid=790b7611375195b8865cd8683e65149a60a3e06bb7c20069&rid=giphy.gif'

const wrongPageIDImageLink = 'https://media0.giphy.com/media/xZx7ht7MH8Wqs/giphy.gif?cid=790b76113ab3fe92be58b3bdf7e0ac6f1606589b0d407cc9&rid=giphy.gif'

var CampaignPage = {

    initialization: async function() {
        await Ethereum.initialization()
		CampaignPage.loadCampaignPage()
    },

    loadCampaignPage: async function() {
        Page.loadNavigationBar(campaignsPage)
        CampaignPage.loadPageBody()
        Page.loadPageFooter()
    },

    loadPageBody: function() {
        ethereum.on('accountsChanged', function (accounts) {
            window.location.reload()
        })
        console.log('\t[INFO] Set the function for reloading the page when the account changed.')
        CampaignPage.loadCampaigns()
    },

    loadCampaigns: function() {
        
		console.log('\t[TASK] Checking the query string...')
        var queryData = new URLSearchParams(window.location.search); 

		if (queryData.toString() == '') {
            console.log('\n[INFO] The query string contains no parameter. So by default, the current page is page 1')
            Page.loadJumbotronText(Enums.htmlTag.header)
			CampaignPage.loadCampaignsByCampaignIDDescending(1)
        } else if (queryData.has(Enums.campaignPageParameter.page) == true) {
            var pageID = queryData.get(Enums.campaignPageParameter.page)
            console.log('\t\t[INFO] The query string contains page number information. The current page number is page ' + pageID)
			CampaignPage.loadCampaignsByCampaignIDDescending(pageID)
        } else if (queryData.has(campaignIDParameter) == true) {            
            var campaignID = queryData.get(campaignIDParameter)
            console.log('\t\t[INFO] The query string contains campaign ID information. The current campaign ID is page ' + campaignID)
            CampaignPage.loadCampaign(campaignID)
        } else if (queryData.has(searchKeywordsParameter) == true) {            
            var keywords = queryData.get(searchKeywordsParameter)
            CampaignPage.searchCampaigns(keywords)
        }
    },

    searchCampaigns: async function (_keywords) {
        console.log('\n[TASK] Loading for campaigns with name or tags containing keyword: ' + _keywords)
		$('main').append(
			'<div id="list-of-campaigns" class="container mb-3">' +
				'<hr>' +
				'<h1 id="campaign-search-title" class="display-45 font-weight-light my-4">Những chiến dịch có chứa từ "' + _keywords + '"</h1>' +
				'<form id="campaign-search-form" class="form-inline mb-3">' +
                    '<input id="campaign-search-textbox" class="form-control mr-sm-2 w-50" minlength ="3" type="search" placeholder="' + campaignSearchInputPlaceHolder + '" aria-label="Search">' +
					'<button id="search-campaign-button" class="btn btn-nc-red my-2 my-sm-0" type="button"><i class="fas fa-search mr-2"></i>Tìm chiến dịch</button>' +
                    '<div id="not-allow-empty-search-text" class="invalid-feedback">Lỗi! Ô tìm kiếm không được để trống hoặc từ khóa phải nhiều hơn 2 kí tự.</div>' +
				'</form>' +
				'<div id="campaign-search-result" class="row mt-5">' +
				'</div>' +
			'</div>'
        )

		var contract = await Ethereum.smartContract.deployed()
        var numberOfCampaigns = await contract.GetNumberOfCampaigns()

        $('#search-campaign-button').on('click', async function () {
            if ($('#campaign-search-textbox').val() == '' || $('#campaign-search-textbox').val().length < 3) {
                $('#not-allow-empty-search-text').show()
            } else {
                window.location.href = campaignsPagePath + '?' + searchKeywordsParameter + '=' + $('#campaign-search-textbox').val().trim()
            }
        })

        var count = 0
        for (var campaignID = (numberOfCampaigns - 1); campaignID >= 0; campaignID--) {
            var campaignName = await contract.GetCampaignName(campaignID)
            var campaignTags = await contract.GetCampaignTags(campaignID)
            if (campaignName.toLowerCase().includes(_keywords.toLowerCase()) ||campaignTags.toLowerCase().includes(_keywords.toLowerCase())) {                    
                var campaignImageLink = await contract.GetCampaignImageLink(campaignID)
                var campaignDescription = await contract.GetCampaignDescription(campaignID)
                var campaignGoal = await contract.GetCampaignGoal(campaignID)
                var campaignMoneyCollected = await contract.GetCampaignMoneyCollected(campaignID)
                var campaignEndDate = await contract.GetCampaignEndDate(campaignID)

                var openCampaignQuery = '?' + campaignIDParameter + '=' + campaignID
                $('#campaign-search-result').append(
                    '<div class="col-md-4 card-group">' +
                        '<div class="card mb-4 box-shadow">' +
                            '<a href="' + campaignsPagePath + openCampaignQuery + '">' +
                            '<img id="campaign-' + campaignID + '-image" class="card-img-top" style="height: 225px; width: 100%; display: block;" src="' + campaignImageLink + '" data-holder-rendered="true">' +
                            '</a>' +
                            '<div class="card-body h-100 pb-0">' +
                                '<h5 id="campaign-' + campaignID + '-name" class="card-title">' + campaignName +'</h5>' +
                                '<p id="campaign-' + campaignID + '-description" class="card-text text-justify">' + Utilities.reduceString(campaignDescription, 150) + '</p>' +
                            '</div>' +
                            '<div class="card-footer bg-white">' +
                                '<p class="text-muted text-right"><small><i>Ngày hết hạn: ' + campaignEndDate + '</i></small></p>' +
                                '<div class="d-flex justify-content-between align-items-center">' +
                                '<div class="btn-group">' +                                
                                    '<a id="campaign-' + campaignID + '-view-button" class="btn btn-sm btn-nc-red py-1 mr-1 rounded-pill" href="' + campaignsPagePath + openCampaignQuery + '" role="button"><i class="fas fa-glasses mr-2"></i>Xem thêm</a>' +
                                '</div>' +
                                '<small id="campaign-' + campaignID + '-funding-status" class="text-muted w-60">' +
                                    'Tổng tích lũy: ' + ((campaignMoneyCollected / campaignGoal) * 100).toFixed(2) + '%' +
                                    '<div id="campaign-' + campaignID + '-progress" class="progress mt-1" style="height: 8px;">' +
                                    '</div>' +
                                '</small>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                )
                CampaignPage.loadProgressBar(campaignMoneyCollected, campaignGoal, '#campaign-' + campaignID + '-progress', false)
                count++
            }
        }
        if (count == 0) {
            $('#campaign-search-result').after('<p id="no-search-result-found">Không tìm thấy kết quả phù hợp nào!</p>')
        }
    },

    loadCampaignsByCampaignIDDescending: async function (_pageIndex) {
        console.log('\n[TASK] Loading campaigns...')
		$('main').append(
			'<div id="list-of-campaigns" class="container mb-3">' +
				'<hr>' +
				'<h1 id="campaign-search-title" class="display-45 font-weight-light my-4">' + campaignSearchTitle + '</h1>' +
				'<form id="campaign-search-form" class="form-inline mb-3">' +
                    '<input id="campaign-search-textbox" class="form-control mr-sm-2 w-50" minlength ="3" type="search" placeholder="' + campaignSearchInputPlaceHolder + '" aria-label="Search" disabled>' +
					'<button id="search-campaign-button" class="btn btn-nc-red my-2 my-sm-0" type="button"><i class="fas fa-search mr-2"></i>Tìm chiến dịch</button>' +
                    '<div id="not-allow-empty-search-text" class="invalid-feedback">Lỗi! Ô tìm kiếm không được để trống hoặc từ khóa phải nhiều hơn 2 kí tự.</div>' +
				'</form>' +
				'<div id="campaign-search-result" class="row mt-5">' +
				'</div>' +
                '<nav id="pagination-area">' +
                    '<ul id="campaigns-pagination" class="pagination justify-content-center mt-3">' +
                    '</ul>' +
                '</nav>' +
			'</div>'
        )

        console.log('\t[INFO] Loaded the page structure')

		var contract = await Ethereum.smartContract.deployed()
        var numberOfCampaigns = await contract.GetNumberOfCampaigns()

        $('#search-campaign-button').on('click', async function () {
            if ($('#campaign-search-textbox').val() == '' || $('#campaign-search-textbox').val().length < 3) {
                $('#not-allow-empty-search-text').show()
            } else {
                window.location.href = campaignsPagePath + '?' + searchKeywordsParameter + '=' + $('#campaign-search-textbox').val().trim()
            }
        })

		if (numberOfCampaigns == 0)
		{
			$('#campaign-search-form').after(
				'<div class="alert alert-danger" role="alert">' + noCampaignFoundText + '</div>' +
				'<div class="text-center">' +
					'<img class="mt-5" src="' + noCampaignFoundImageLink + '">' +
				'</div>'
			)
			console.log('\t[INFO] The total number of campaigns is ' + numberOfCampaigns + '. No campaign found!')
		}
        else {
            console.log('\t[INFO] The total number of campaigns in each page is set to ' + numberOfCcampaignsPerPage)
            console.log('\t[INFO] The total number of campaigns is ' + numberOfCampaigns)
            // 0 1 2 3 4 5
			var firstCampaignID
			var lastCampaignID
			var numberOfPages
			if (numberOfCampaigns <= numberOfCcampaignsPerPage) {
                numberOfPages = 1
                console.log('\t[INFO] The total number of pages is 1')
                firstCampaignID = numberOfCampaigns - 1
                lastCampaignID = 0
            }
            else {
                // Calculate the total number of pages
                numberOfPages = Math.ceil(numberOfCampaigns / numberOfCcampaignsPerPage)
                console.log('\t[INFO] The total number of pages is ' + numberOfPages)

                // Default value for case: _pageIndex = 1
                firstCampaignID = numberOfCampaigns - 1 // print desc
                lastCampaignID = firstCampaignID - numberOfCcampaignsPerPage + 1 // +1 because numberOfCcampaignsPerPage is already contain firstCampaignID position

                if (_pageIndex > 1) {
                    // case: current page is page 2 or above
                    // Calculating the first campaign ID and last campaign ID on that page
                    for (var page = 1; page < _pageIndex; page++) {
                        firstCampaignID = firstCampaignID - numberOfCcampaignsPerPage
                        if (firstCampaignID < numberOfCcampaignsPerPage) {
                            lastCampaignID = 0
                        }
                        else {
                            lastCampaignID = firstCampaignID - numberOfCcampaignsPerPage + 1
                        }
                    }
                }
            }
            if (_pageIndex > numberOfPages) {
                $('#campaign-search-form').after(
                    '<div class="alert alert-danger" role="alert">' +
                        '<strong>Lỗi</strong>! Trang bạn truy cập không khả dụng' +
                    '</div>' +
                    '<div class="text-center">' +
                        '<img class="mt-5" src="' + wrongPageIDImageLink + '">' +
                    '</div>'
                )
            } else {
                console.log('\t[INFO] The current page is page ' + _pageIndex)
                console.log('\t[INFO] The first campaign ID in page ' + _pageIndex + ' is ' + firstCampaignID)
                console.log('\t[INFO] The last campaign ID in page ' + _pageIndex + ' is ' + lastCampaignID)
                console.log('\t[TASK] Loading campaigns with provided information...')
                for (var campaignID = firstCampaignID; campaignID >= lastCampaignID; campaignID--) {
                    //var campaignOwner = await contract.GetCampaignOwner(campaignID)
                    var campaignImageLink = await contract.GetCampaignImageLink(campaignID)
                    var campaignName = await contract.GetCampaignName(campaignID)
                    var campaignDescription = await contract.GetCampaignDescription(campaignID)
                    var campaignGoal = await contract.GetCampaignGoal(campaignID)
                    var campaignMoneyCollected = await contract.GetCampaignMoneyCollected(campaignID)
                    var campaignEndDate = await contract.GetCampaignEndDate(campaignID)
                    /*
                    var editMode = ''
                    if (campaignOwner.toLowerCase() == window.web3.eth.defaultAccount) {
                        var editCampaignQuery = '?' + campaignIDParameter + '=' + campaignID + '&' + editIDParameter+ '=true'
                        editMode = '<a id="campaign-'
                            + campaignID
                            + '-view-button" class="btn btn-sm btn-nc-red px-2 py-1 rounded-pill" href="../page/' + Enums.page.campaigns + editCampaignQuery + '" role="button">Chỉnh sửa</a>'
                    }
                    */
                    var openCampaignQuery = '?' + campaignIDParameter + '=' + campaignID
                    $('#campaign-search-result').append(
                        '<div class="col-md-4 card-group">' +
                            '<div class="card mb-4 box-shadow">' +
                                '<a href="' + campaignsPagePath + openCampaignQuery + '">' +
                                '<img id="campaign-' + campaignID + '-image" class="card-img-top" style="height: 225px; width: 100%; display: block;" src="' + campaignImageLink + '" data-holder-rendered="true">' +
                                '</a>' +
                                '<div class="card-body h-100 pb-0">' +
                                    '<h5 id="campaign-' + campaignID + '-name" class="card-title">' + campaignName +'</h5>' +
                                    '<p id="campaign-' + campaignID + '-description" class="card-text text-justify">' + Utilities.reduceString(campaignDescription, 150) + '</p>' +
                                '</div>' +
                                '<div class="card-footer bg-white">' +
                                    '<p class="text-muted text-right"><small><i>Ngày hết hạn: ' + campaignEndDate + '</i></small></p>' +
                                    '<div class="d-flex justify-content-between align-items-center">' +
                                    '<div class="btn-group">' +                                
                                        '<a id="campaign-' + campaignID + '-view-button" class="btn btn-sm btn-nc-red py-1 mr-1 rounded-pill" href="' + campaignsPagePath + openCampaignQuery + '" role="button"><i class="fas fa-glasses mr-2"></i>Xem thêm</a>' +
                                        //editMode +
                                    '</div>' +
                                    '<small id="campaign-' + campaignID + '-funding-status" class="text-muted w-60">' +
                                        'Tổng tích lũy: ' + ((campaignMoneyCollected / campaignGoal) * 100).toFixed(2) + '%' +
                                        '<div id="campaign-' + campaignID + '-progress" class="progress mt-1" style="height: 8px;">' +
                                        '</div>' +
                                    '</small>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
                    )
                    CampaignPage.loadProgressBar(campaignMoneyCollected, campaignGoal, '#campaign-' + campaignID + '-progress', false)
                    console.log('\t[INFO] Loaded campaign ' + campaignID)
                }
                console.log('\t[INFO] All campaigns have been loaded')
                $('#campaign-search-textbox').removeAttr("disabled")
                Page.loadPagination('#campaigns-pagination', numberOfPages, _pageIndex, numberPagesInPagination)
            }
		}
    },

    loadCampaign: async function (_campaignID) {
        var contract = await Ethereum.smartContract.deployed()  
        var numberOfCampaigns = await contract.GetNumberOfCampaigns()
        if (_campaignID > (numberOfCampaigns - 1)) {
            $('main').append(
                '<div class="container">' +
                    '<hr>' +
                    '<h1 class="display-45 font-weight-light my-4">Lỗi!</h1>' +
                    '<p>Không tìm thấy chiến dịch nào tương ứng với mã số ' + _campaignID + '.</p>' +
                '</div>'
            )
        } else {
            var campaignOwner = await contract.GetCampaignOwner(_campaignID)
            var campaignName = await contract.GetCampaignName(_campaignID)
            var campaignDescription = await contract.GetCampaignDescription(_campaignID)
            var campaignlink = await contract.GetCampaignLink(_campaignID)
            var campaignImageLink = await contract.GetCampaignImageLink(_campaignID)
            var campaignTags = await contract.GetCampaignTags(_campaignID)
            var campaignStatus = await contract.GetCampaignStatus(_campaignID)
            var campaignStartDate = await contract.GetCampaignStartDate(_campaignID)
            var campaignEndDate = await contract.GetCampaignEndDate(_campaignID)
            var campaignGoal = await contract.GetCampaignGoal(_campaignID)
            var campaignMoneyCollected = await contract.GetCampaignMoneyCollected(_campaignID)
            var campaignTotalContributors = await contract.GetCampaignTotalContributors(_campaignID)
            
            
            var moneyCollectedColor = 'text-danger'
            if (campaignMoneyCollected > 0) {
                moneyCollectedColor = 'text-success'
            }
            var campaignStatusText
            var campaignStatusTextColor
            switch (Number(campaignStatus)) {
                case 0:
                    if (Utilities.isValidDateRange(Utilities.getcurrentDate(), campaignEndDate) == false) {
                        if (campaignOwner.toLowerCase() == window.web3.eth.defaultAccount) {
                            campaignStatusText = 'Chiến dịch đã hết hạn gây quỹ. Hãy đóng chiến dịch!'
                        } else {
                            campaignStatusText = 'Chiến dịch đã hết hạn gây quỹ.'
                        }
                        campaignStatusTextColor = 'text-danger'
                    } else {
                        campaignStatusText = 'Đang trong tiến trình nhận quỹ'
                        campaignStatusTextColor = 'text-info'
                    }
                    break
                case 1:
                    campaignStatusText = 'Đã đạt được mục tiêu'
                    campaignStatusTextColor = 'text-success'
                    break
                case 2:
                    campaignStatusText = 'Chiến dịch này đã đóng'
                    campaignStatusTextColor = 'text-danger'
                    break
                default:
                    console.log('Không đọc được thông tin về tình trạng của chiến dịch')
            }
            $('main').append(
                '<div id="campaign-' + _campaignID + '-information" class="container">' +
                    '<hr>' +
                    '<h1 id="campaign-' + _campaignID + '-name" class="display-45 font-weight-light my-4">' + campaignName + '</h1>' +
                    '<div id="campaign-information" class="row">' +
                        '<div class="col-md-4 order-md-2 mb-4">' +
                            '<label>Thông tin bổ sung</label>' +
                            '<ul class="list-group mb-3">' +
                                '<li class="list-group-item">' +
                                    '<h6 class="my-0">Mã số chiến dịch</h6>' +
                                    '<small id="campaign-' + _campaignID + '-id">' + _campaignID + '</small>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                    '<h6 class="my-0">Tài khoản chủ sở hữu chiến dịch</h6>' +
                                    '<small id="campaign-' + _campaignID + '-owner-account">' + campaignOwner + '</small>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                    '<h6 class="my-0">Ngày tạo chiến dịch</h6>' +
                                    '<small id="campaign-' + _campaignID + '-start-date">' + campaignStartDate + '</small>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                    '<h6 class="my-0">Ngày kết thúc chiến dịch</h6>' +
                                    '<small id="campaign-' + _campaignID + '-end-date">' + campaignEndDate + '</small>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                    '<h6 class="my-0">Tình trạng của chiến dịch</h6>' +
                                    '<small id="campaign-' + _campaignID + '-status" class="' + campaignStatusTextColor + '">' + campaignStatusText + '</small>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                    '<h6 class="my-0">Mục tiêu gây quỹ của chiến dịch</h6>' +
                                    '<small id="campaign-' + _campaignID + '-goal">' + Utilities.addCommasToNumber(campaignGoal) + ' VNĐ</small>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                    '<h6 class="my-0">Tổng số tiền nhận được từ quyên góp</h6>' +
                                    '<small id="campaign-' + _campaignID + '-money-collected" class="' + moneyCollectedColor + '">' + Utilities.addCommasToNumber(campaignMoneyCollected) + ' VNĐ</small>' +
                                '</li>' +
                            '</ul>' +
                            /*
                            '<div class="text-right mb-2">' +
                                '<small><i>Có ' + Utilities.addCommasToNumber(campaignTotalVoters) + ' người thích chiến dịch này.</i></small>' +
                            '</div>' +
                            */
                        '</div>' +    
                        '<div class="col-md-8 order-md-1">' +
                            '<label>Hình ảnh chiến dịch</label>' +
                            '<img id="campaign-' + _campaignID + '-image" class="rounded-lg mb-3" width="100%" height="477px" src="' + campaignImageLink + '"></img>' +
                            '<label for="campaign-' + _campaignID + '-description">Mô tả</label>' +
                            '<p id="campaign-' + _campaignID + '-description" class="text-justify">' + campaignDescription + '</p>' +
                            '<label for="campaign-' + _campaignID + '-tags">Từ khóa</label>' +
                            '<p id="campaign-' + _campaignID + '-tags"></p>' +
                            '<label for="campaign-' + _campaignID + '-progress">Tiến trình gây quỹ</label>' +
                            '<div id="campaign-' + _campaignID + '-progress" class="progress mt-1" style="height: 24px;">' +
                            '</div>' +
                            '<label for="campaign-' + _campaignID + '-contributors-list" class="mt-3 mb-2">Thống kê lượt quyên góp</label>' +
                        '</div>' +
                    '</div>' +                    
                '</div>'
            )

            // Setting for the left panel ---------------------------------------------------------------------------------

            // load the tags with link
            
            //'<p id="campaign-' + _campaignID + '-tags"><i>' + campaignTags + '</i></p>' +
            const tagWords = campaignTags.split(',');
            for (var tagWordIndex = 0; tagWordIndex < tagWords.length; tagWordIndex++) {
                var comma = ''              
                if (tagWordIndex != (tagWords.length - 1)) {
                    comma = ','
                }
                $('#campaign-' + _campaignID + '-tags').append(
                    '<a id="tag-keyword-' + (tagWordIndex + 1 ) + '" href="' + campaignsPagePath + '?' + searchKeywordsParameter + '=' + tagWords[tagWordIndex] + '">' + tagWords[tagWordIndex] + '</a>' + comma
                )
            }
        console.log(words.length)

            // Check if the campaign contains the original link from another website so that display it in description section
            if (campaignlink != '') {
                $('#campaign-' + _campaignID + '-description').after(
                    '<p class="text-justify">Xem thêm thông tin về chiến dịch tại: <a id="campaign-' + _campaignID + '-link" href="' + campaignlink + '">' + campaignlink + '</a></p>')
            }

            // Display the list of contributors (if any)
            CampaignPage.loadProgressBar(campaignMoneyCollected, campaignGoal, '#campaign-' + _campaignID + '-progress', true)
            if (campaignTotalContributors != 0) {
                $('label[for="campaign-' + _campaignID + '-contributors-list"]').after(          
                    '<p>Chiến dịch này đã nhận được ' + campaignTotalContributors + ' lần quyên góp:</p>' +
                    '<table id="campaign-' + _campaignID + '-contributors-list" class="table table-striped table-sm mt-1">' +
                        '<thead class="thead-dark">' +
                            '<tr>' +
                            '<th scope="col">#</th>' +
                            '<th scope="col" class="font-weight-500">Số tài khoản</th>' +
                            '<th scope="col" class="text-center font-weight-500">Ngày quyên góp</th>' +
                            '<th scope="col" class="text-right font-weight-500">Số tiền quyên góp</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '</tbody>' +
                    '</table>'
                )
                for (contributorIndex = 1; contributorIndex <= campaignTotalContributors; contributorIndex++) {
                    var contributorAccount = await contract.GetCampaignContributor(_campaignID, contributorIndex - 1)
                    var contributionDateOfTheContributor = await contract.GetCampaignContributionDate(_campaignID, contributorIndex - 1)
                    var contributionAmoutOfTheContributor = await contract.GetCampaignContributionAmount(_campaignID, contributorIndex - 1)
                    $('#campaign-' + _campaignID + '-contributors-list tbody').append(
                        '<tr>' +
                            '<th scope="row" class="font-weight-light">' + contributorIndex + '</th>' +
                            '<td class="font-weight-light">' + contributorAccount + '</td>' +
                            '<td class="text-center font-weight-light">' + contributionDateOfTheContributor + '</td>' +
                            '<td class="text-right font-weight-light">' + contributionAmoutOfTheContributor + ' VNĐ</td>' +
                        '</tr>'
                    )
                }
            }
            else {
                $('label[for="campaign-' + _campaignID + '-contributors-list"]').after(                
                    '<p>Chiến dịch này chưa được quyên góp từ bất kì tài khoản nào!</p>'
                )
            }

            // setting for the right panel --------------------------------------------------------------------------------


            // If the current date is after or equal the project end date
            if (Utilities.isValidDateRange(Utilities.getcurrentDate(), campaignEndDate) == false) {
                // Check if the current account is the owner and if the project is not closed by the project owner
                if (Number(campaignStatus) != 2 && campaignOwner.toLowerCase() == window.web3.eth.defaultAccount) {
                    CampaignPage.closeCampaignByOwner(contract, _campaignID)
                }
            }
            else {
                if (campaignOwner.toLowerCase() != window.web3.eth.defaultAccount) {
                    CampaignPage.contributeToCampaignOwnerFromCampaigner(contract, _campaignID, campaignOwner)                    
                } else {
                    if (Number(campaignStatus) != 2) {
                        $('#campaign-information div.order-md-2').append(
                            CampaignPage.closeCampaignByOwner(contract, _campaignID)
                        )
                    }
                }
            }
            
        }
    },

    closeCampaignByOwner: function (_contract, _campaignID) {
        $('main').append(
            // Modal form for close the campaign
            '<div id="close-campaign-modal" class="modal fade" role="dialog" aria-hidden="true">' +
                '<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<h6 class="modal-title">Xác nhận đóng chiến dịch</h6>' +
                            '<button id="modal-close-button" class="close" type="button" data-dismiss="modal">' +
                                '<span aria-hidden="true">x</span>' +
                            '</button>' +
                        '</div>' +
                        '<div class="modal-body pb-0 text-justify">' +
                            '<p>Xin vui lòng xác nhận rằng bạn muốn đóng chiến dịch!</p>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button id="confirm-close-campaign-button" type="button" class="btn btn-primary" data-dismiss="modal">Xác nhận</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        )

        var closeCampaignButton =   '<div id="close-campaign" class="text-center mt-4">' +
                                        '<button id="close-campaign-button" class="btn btn-custom-dark rounded-pill px-3 py-2 font-weight-600 w-75" type="button" data-toggle="modal" data-target="#close-campaign-modal"><i class="fas fa-lock mr-2"></i>Đóng chiến dịch</button>' +
                                    '</div>'

        $('#campaign-information div.order-md-2').append(
            closeCampaignButton
        )

        $('#confirm-close-campaign-button').on('click', async function () {
            await _contract.CloseCampaign(_campaignID)
            window.location.reload()
        })
    },

    contributeToCampaignOwnerFromCampaigner: function (_contract, _campaignID, _campaignOwner) {
        $('main').append(
            '<div id="contribute-to-campaign-modal" class="modal fade" role="dialog" aria-hidden="true">' +
                '<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<h6 class="modal-title">Quyên góp cho chiến dịch</h6>' +
                            '<button id="new-project-modal-close-button" class="close" type="button" data-dismiss="modal">' +
                                '<span aria-hidden="true">x</span>' +
                            '</button>' +
                        '</div>' +
                        '<div class="modal-body pb-0">' +
                            '<form class="needs-validation" novalidate>' +
                                '<div class="col-md mb-3">' +
                                    '<label for="contributor-account" class="font-weight-600">Tài khoản của bạn:</label>' +
                                    '<p id="contributor-account">' + window.web3.eth.defaultAccount + '</p>' +
                                    '<label for="money-contribute-input" class="font-weight-600">Số tiền bạn muốn quyên góp cho chiến dịch:</label>' +                                        
                                    '<div class="form-row">' +
                                        '<div class="form-group col-md-8">' +
                                            '<div class="input-group">' +
                                                '<input id="money-contribute-input" class="form-control text-right" type="text" placeholder="1,000,000" maxlength="11" onkeypress="return Utilities.onlyAllowNumber(event)"/>' +
                                                '<div class="input-group-append">' +
                                                    '<span class="input-group-text">VND</span>' +
                                                '</div>' +                                    
                                            '</div>' +
                                        '</div>' +
                                        '<div class="form-group col-md-4">' +
                                            '<button id="send-money-to-campaign-owner-button" class="btn btn-success w-100" type="button" data-dismiss="modal">Chuyển tiền</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</form>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        )

        var contributeToCampaignButton =    '<div id="contribute-to-campaign" class="text-center">' +
                                                '<button id="contribute-to-campaign-button" class="btn btn-nc-red py-2 mt-2 font-weight-600 rounded-pill w-75" type="button" data-toggle="modal" data-target="#contribute-to-campaign-modal"><i class="fas fa-coins mr-2"></i>Quyên góp cho chiến dịch</button>' + 
                                            '</div>'

        $('#campaign-information div.order-md-2').append(
            contributeToCampaignButton
        )

        $('#money-contribute-input').on('paste', function (e) {
            e.preventDefault()
        })

        $('#send-money-to-campaign-owner-button').on('click', async function () {
            if ($('#money-contribute-input').val() == '') {
                $('#money-contribute-input').addClass('is-invalid')
            } else {
                $('#money-contribute-input').removeClass('is-invalid')
                $('#money-contribute-input').addClass('is-valid')
            }
            var moneyCollectedAsWei = await Utilities.convertMoneytoWei($('#money-contribute-input').val(), Enums.MoneyUnit.VND)
            var convertMoneyFromWeiToHex = Number(moneyCollectedAsWei).toString(16)
            await _contract.ContributeToCampaign(_campaignID, window.web3.eth.defaultAccount, Utilities.getcurrentDate(), $('#money-contribute-input').val())
            await Utilities.sendEtherToOwner(window.web3.eth.defaultAccount, _campaignOwner, convertMoneyFromWeiToHex)
        })
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
    CampaignPage.initialization()
})