var Profile = {

	smartContract: null,

    initialization: async function() {
		Ethereum.initialization()
		Profile.loadSmartContract()
    },

    loadSmartContract: async function () {
        console.log('\n[TASK] Loading the smart contract...')
        var smartContractJSON = await $.getJSON('../build/contracts/Crowdfunding.json')
        Profile.smartContract = TruffleContract(smartContractJSON)
        console.log('[TASK] Processed data from the smart contract JSON file...')
        Profile.smartContract.setProvider(Ethereum.ethereumProvider)
        console.log('[TASK] Connected the Ethereum provider API to the smart contract...')
		console.log('[INFO] The smart contract has been loaded.')
		Profile.loadAboutPage()
    },	

    loadAboutPage: function() {
        Profile.loadPageHeader()
        //Homepage.loadPageBody()
    },

    loadPageHeader: function() {
        Page.loadNavigationBar(Enums.page.profile)
    },

    loadPageBody: async function(contract) {
		var contract = await Homepage.smartContract.deployed()
		var numberOfProjects = await contract.GetNumberOfProjects()
        if (numberOfProjects == 0) {
			Homepage.loadJumbotronText()
            console.log('[INFO] No project found!')
        } else {
			Homepage.loadCarousel()
        }
    },

    loadJumbotronText: function(img) {
        $('body').append(
			'<br>' +	
			'<div class="jumbotron pt-5 mb-1">' +
				'<div class="container text-center">' +
					'<h1 class="display-4 text-black">Vietnam charity community</h1>' +
					'<br>' +
					'<p class="lead">Cộng đồng gây quỹ mới tại Việt Nam lần đầu tiên áp dụng công nghệ blockchain trong thanh toán.</p>' +
					'<p class="lead">An toàn, tiện lợi và nhanh chóng</p>' +
					'<br>' +
					'<p>' +
			  			'<a class="btn btn-nc-red btn-lg" href="#" role="button">Tạo một hoạt động gây quỹ mới ngay</a>' +
					'</p>' +	
					'<img class="text-center mt-5" src="https://media1.giphy.com/media/oHvgfgJOunESA/giphy.gif?cid=790b7611c1035426dcee3144e7fbf48db46780a90d215884&rid=giphy.gif">' +	
		  	'</div>'
        )
    },

    loadCarousel: async function() {
		// struture
		$('body').append(
			'<main role="main">' +
				'<div id="#homepage-carousel" class="carousel slide" data-ride="carousel">' +
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
			'</main>'
		)
		
		var contract = await Homepage.smartContract.deployed()
		var numberOfProjects = await contract.GetNumberOfProjects()

		var maxDisplayProjects = 3
		var currentprojects = 0
		var CarouselIndicators = ''
		var CarouselItemActiveStatus = ''

		for (var index = numberOfProjects - 1; index >= 0; index--) {
			if (currentprojects == 0) {
				CarouselIndicators = '<li data-target="#homepage-carousel" data-slide-to="0" class="active"></li>'
				CarouselItemActiveStatus = '<div class="carousel-item active">'
			}
			else {
				CarouselIndicators = '<li data-target="#homepage-carousel" data-slide-to="' + currentprojects + '"></li>'
				CarouselItemActiveStatus = '<div class="carousel-item">'
			}
			$('.carousel-indicators').append(CarouselIndicators)
			
			var projectImageLink = await contract.GetProjectImageLink(index)
			var projectName = await contract.GetProjectName(index)
			var projectDescription = await contract.GetProjectDescription(index)
			projectDescription = Utilities.reduceString(projectDescription, 250)
			
			$('.carousel-inner').append(
				CarouselItemActiveStatus +
					'<img src="' + projectImageLink + '">' +
					'<div class="container">' +
						'<div class="carousel-caption text-left carousel-text-background px-5">' +
							'<h1>' + projectName +'</h1>' +
							'<br>' +
							'<p>' + projectDescription + '</p>' +
							'<br>' +
							'<p><a class="btn btn-lg bg-nc-red" href="#" role="button">Xem ngay →</a></p>' +
						'</div>' +
					'</div>' +
				'</div>'
			)
			currentprojects++
			if (currentprojects == maxDisplayProjects || currentprojects == numberOfProjects)
			{
				console
				break;
			}
		}
		Homepage.loadJumbotronText()
		Homepage.loadCategories()
	},

    loadCategories: function() {
		$('body').append(
			'<div class="album py-5 bg-light">' +
				'<h1 class="display-4 text-center mb-4">Phân loại chiến dịch gây quỹ</h1>' +
				'<br>' +
				'<div class="w-75 mx-auto">' +
					'<ul class="list-unstyled d-flex justify-content-between list-categories">' +
						'<li>' +
							'<a href="#" class="btn btn-lg">' +
								'<img src="https://image.flaticon.com/icons/svg/328/328032.svg" alt="kindmate-icon" class="mr-2" width="28">' +
								'Gây quỹ từ thiện' +
							'</a>' +
						'</li>' +
						'<li>' +
							'<a class="btn btn-lg">' +
								'<img src="https://image.flaticon.com/icons/svg/744/744922.svg" alt="kindmate-icon" class="mr-2" width="28">' +
								'Gây quỹ nhận phần thưởng' +
							'</a>' +
						'</li>' +
						'<li>' +
							'<a class="btn btn-lg">' +
								'<img src="https://image.flaticon.com/icons/svg/1500/1500911.svg" alt="kindmate-icon" class="mr-2" width="28">' +
								'Gây quỹ đầu tư nhận lãi suất' +
							'</a>' +
						'</li>' +
						'<li>' +
							'<a class="btn btn-lg">' +
								'<img src="https://image.flaticon.com/icons/svg/2304/2304582.svg" alt="kindmate-icon" class="mr-2" width="28">' +
								'Gây quỹ đầu tư vay mượn' +
							'</a>' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>'
		)
	},

    loadSampleProjects: function() {
		$('body').append(
			'<div class="album py-5 bg-light">' +
			'<div class="container">' +
			'' +
			'<div class="row">' +
			'<div class="col-md-4">' +
			'<div class="card mb-4 shadow-sm">' +
			'<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>' +
			'<div class="card-body">' +
			'<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
			'<div class="d-flex justify-content-between align-items-center">' +
			'<div class="btn-group">' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +
			'</div>' +
			'<small class="text-muted">9 mins</small>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-4">' +
			'<div class="card mb-4 shadow-sm">' +
			'<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>' +
			'<div class="card-body">' +
			'<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
			'<div class="d-flex justify-content-between align-items-center">' +
			'<div class="btn-group">' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +
			'</div>' +
			'<small class="text-muted">9 mins</small>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-4">' +
			'<div class="card mb-4 shadow-sm">' +
			'<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>' +
			'<div class="card-body">' +
			'<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
			'<div class="d-flex justify-content-between align-items-center">' +
			'<div class="btn-group">' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +
			'</div>' +
			'<small class="text-muted">9 mins</small>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'' +
			'<div class="col-md-4">' +
			'<div class="card mb-4 shadow-sm">' +
			'<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>' +
			'<div class="card-body">' +
			'<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
			'<div class="d-flex justify-content-between align-items-center">' +
			'<div class="btn-group">' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +
			'</div>' +
			'<small class="text-muted">9 mins</small>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-4">' +
			'<div class="card mb-4 shadow-sm">' +
			'<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>' +
			'<div class="card-body">' +
			'<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
			'<div class="d-flex justify-content-between align-items-center">' +
			'<div class="btn-group">' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +
			'</div>' +
			'<small class="text-muted">9 mins</small>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-4">' +
			'<div class="card mb-4 shadow-sm">' +
			'<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>' +
			'<div class="card-body">' +
			'<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
			'<div class="d-flex justify-content-between align-items-center">' +
			'<div class="btn-group">' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +
			'</div>' +
			'<small class="text-muted">9 mins</small>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'' +
			'<div class="col-md-4">' +
			'<div class="card mb-4 shadow-sm">' +
			'<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>' +
			'<div class="card-body">' +
			'<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
			'<div class="d-flex justify-content-between align-items-center">' +
			'<div class="btn-group">' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +
			'</div>' +
			'<small class="text-muted">9 mins</small>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-4">' +
			'<div class="card mb-4 shadow-sm">' +
			'<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>' +
			'<div class="card-body">' +
			'<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
			'<div class="d-flex justify-content-between align-items-center">' +
			'<div class="btn-group">' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +
			'</div>' +
			'<small class="text-muted">9 mins</small>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-4">' +
			'<div class="card mb-4 shadow-sm">' +
			'<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>' +
			'<div class="card-body">' +
			'<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
			'<div class="d-flex justify-content-between align-items-center">' +
			'<div class="btn-group">' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
			'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +
			'</div>' +
			'<small class="text-muted">9 mins</small>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'
		)
		Homepage.loadPageFooter()
	},

    loadPageFooter: function() {
        //Page.loadPageFooter()
    },
}

$(window).on('load', function() {
    Profile.initialization()
})