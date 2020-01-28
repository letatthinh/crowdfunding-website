const imageLinkForNoProjectFound = 'https://media1.giphy.com/media/oHvgfgJOunESA/giphy.gif?cid=790b7611c1035426dcee3144e7fbf48db46780a90d215884&rid=giphy.gif'

const campaignCategoriesTitle = 'Những loại chiến dịch gây quỹ'
const imageLinkOfDonationBasedCategory = 'https://image.flaticon.com/icons/svg/328/328032.svg'
const donationBasedCategoryText = 'Từ thiện'
const imageLinkOfRewardBasedCategory = 'https://image.flaticon.com/icons/svg/744/744922.svg'
const rewardBasedCategoryText = 'Nhận phần thưởng/sản phẩm'
const imageLinkOfEquityBasedCategory = 'https://image.flaticon.com/icons/svg/1500/1500911.svg'
const equityBasedCategoryText = 'Đầu tư nhận lãi suất'
const imageLinkOfLendingBasedCategory = 'https://image.flaticon.com/icons/svg/2304/2304582.svg'
const lendingBasedCategoryText = 'Đầu tư từ vay mượn'
const categoryImageWidth = 28

const maxCampaignsDisplayInCarousel = 5

var HomePage = {

    initialization: async function() {
        await Ethereum.initialization()
		HomePage.loadHomePage()
    },	

    loadHomePage: function() {
        Page.loadNavigationBar(homePage)
        HomePage.loadPageBody()
		Page.loadPageFooter()
    },

    loadPageBody: async function() {
        Page.loadJumbotronText(Enums.htmlTag.header)
		var contract = await Ethereum.smartContract.deployed()
        var numberOfCampaigns = await contract.GetNumberOfCampaigns()
        if (numberOfCampaigns == 0) {
			$('main').append(	
				'<div class="container text-center">' +	
					'<img class="mt-5" src="' + imageLinkForNoProjectFound + '">' +
				'</div>'
			)
            console.log('\n[INFO] No project found!')
        } else {
			HomePage.loadCrowdfundingCategories()
			HomePage.loadCampaignsCarousel()
        }
    },

    loadCrowdfundingCategories: function() {
        console.log('\n[TASK] Loading crowdfunding categories.')
		$('main').append(
			'<div class="album container py-5 my-5 text-center bg-white">' +
				'<h1 id="campaign-category-title" class="display-5 font-weight-light mb-5">' + campaignCategoriesTitle + '</h1>' +
                '<div class="row">' +
					'<div class="col-md-2">' +
						'<a id="donation-based-type" href="#" class="btn btn-lg">' +
							'<img src="' + imageLinkOfDonationBasedCategory + '" class="mx-2" width="' + categoryImageWidth + '">' +
							donationBasedCategoryText +
						'</a>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<a id="reward-based-type" class="btn btn-lg">' +
							'<img src="' + imageLinkOfRewardBasedCategory + '" class="mx-2" width="' + categoryImageWidth + '">' +
							rewardBasedCategoryText +
						'</a>' +
					'</div>' +
					'<div class="col-md-3">' +
						'<a id="equity-based-type" class="btn btn-lg">' +
							'<img src="' + imageLinkOfEquityBasedCategory + '" class="mr-2" width="' + categoryImageWidth + '">' +
							equityBasedCategoryText +
						'</a>' +
					'</div>' +
					'<div class="col-md-3">' +
						'<a id="lending-based-type" class="btn btn-lg">' +
							'<img src="' + imageLinkOfLendingBasedCategory + '" class="mr-2" width="' + categoryImageWidth + '">' +
							lendingBasedCategoryText +
						'</a>' +
					'</div>' +
                '</div>' +
			'</div>' +
            '<hr class="container">'
		)
        console.log('\t[INFO] Done!')
	},

    loadCampaignsCarousel: async function() {
        console.log('\n[TASK] Loading the ' + maxCampaignsDisplayInCarousel + ' newest campaigns which have been recently added...')
		$('main').append(
			'<div class="container pt-5 text-center">' +
				'<h1 id="campaign-category-title" class="display-5 font-weight-light mb-5 pb-3">Những chiến dịch mới nhất</h1>' +
				'<div id="homepage-carousel" class="carousel slide " data-ride="carousel">' +
					'<ol class="carousel-indicators"></ol>' +
					'<div class="carousel-inner"></div>' +					
					'<a class="carousel-control-prev" href="#homepage-carousel" role="button" data-slide="prev">' +
						'<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
						'<span class="sr-only">Previous</span>' +
					'</a>' +
					'<a class="carousel-control-next" href="#homepage-carousel" role="button" data-slide="next">' +
						'<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
						'<span class="sr-only">Next</span>' +
					'</a>' +
				'</div>' +
			'</div>' +
			'<div class="container text-center">' +
				'<a class="btn btn-nc-red btn-lg mt-5 mb-45" href="' + campaignsPagePath + '" role="button"><i class="fas fa-search mr-2"></i>Tìm kiếm nhiều chiến dịch thú vị khác</a>' +
			'</div>'
		)
        console.log('\t[INFO] Loaded the Carousel structure.')	
		var contract = await Ethereum.smartContract.deployed()
		var numberOfCampaigns = await contract.GetNumberOfCampaigns()
		var currentCampaign = 0
		var CarouselItemActiveStatus = ''
		for (var index = numberOfCampaigns - 1; index >= 0; index--) {            
		    var CarouselIndicators = ''
			if (currentCampaign == 0) {
				CarouselIndicators = '<li data-target="#homepage-carousel" data-slide-to="0" class="active"></li>'
				CarouselItemActiveStatus = '<div class="carousel-item active">'
                console.log('\t[INFO] Set the default active campaign is the latest campaign.')	
			}
			else {
				CarouselIndicators = '<li data-target="#homepage-carousel" data-slide-to="' + currentCampaign + '"></li>'
				CarouselItemActiveStatus = '<div class="carousel-item">'
			}
			$('.carousel-indicators').append(CarouselIndicators)
			
			var campaignImageLink = await contract.GetCampaignImageLink(index)
			var campaignName = await contract.GetCampaignName(index)
            var campaignDescription = await contract.GetCampaignDescription(index)
            
            var campaignIDParameter = 'campaignID'
            var openCampaignQuery = '?' + campaignIDParameter + '=' + index
			
			$('.carousel-inner').append(
				CarouselItemActiveStatus +
					'<img src="' + campaignImageLink + '" class="d-block w-100">' +
					'<div class="container">' +
						'<div class="carousel-caption text-left carousel-text-background px-4">' +
							'<h1 class="featurette-heading">' + campaignName +'</h1>' +
							'<br>' +
							'<p>' + Utilities.reduceString(campaignDescription, 300) + '</p>' +
							'<br>' +
							'<a class="btn btn-lg btn-nc-red" href="' + campaignsPagePath + openCampaignQuery + '" role="button">Xem thêm →</a>' +
						'</div>' +
					'</div>' +
				'</div>'
			)
            console.log('\t[INFO] Loaded campaign "' + campaignName + '".')	
			currentCampaign++
			if (currentCampaign == maxCampaignsDisplayInCarousel || currentCampaign == numberOfCampaigns)
			{
				break;
			}			
        }
        console.log('\t[INFO] Done!')
	}
}

$(window).on('load', function() {
    HomePage.initialization()
})