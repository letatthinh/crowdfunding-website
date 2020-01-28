// Header constants
const websiteHeaderTitle = 'VN Funding'

const websiteHeaderLogoPath = '../favicon.ico'
const websiteHeaderLogoWidth = 30
const websiteHeaderLogoHeight = 30

const homePage = 'index.html'
const campaignsPage = 'campaigns.html'
const createCampaignsPage = 'create-new-campaign.html'
const aboutPage = 'about.html'
const profilePage = 'profile.html'

const homePageTitle = 'Trang chủ'
const campaignsPageTitle = 'Chiến dịch'
const aboutPageTitle = 'Về chúng tôi'
const separateSymbol = '|'

const homePagePath = '../' + homePage
const campaignsPagePath = '../page/' + campaignsPage
const createCampaignsPagePath = '../page/' + createCampaignsPage
const aboutPagePath = '../page/' + aboutPage
const profilePagePath = '../page/' + profilePage

// Footer constants
const websiteFooterTitle = 'VIETNAM FUNDING COMMUNITY'
const websiteFooterCity = 'Thành phố Hồ Chí Minh, Việt Nam'
const websiteFooterAboutUsTitle = 'VỀ CHÚNG TÔI'
const websiteFooterAboutUs = 'Giới thiệu'
const websiteFooterSupportTitle = 'HỖ TRỢ'
const websiteFooterSupport = 'FAQs'
const personThinhDetails = 'Lê Tất Thịnh - 15520838@gm.uit.edu.vn'
const personBaoDetails = 'Trương Hoàng Bảo - 15520046@gm.uit.edu.vn'

var Page = {

    loadNavigationBar: function(_pageName) {    
		console.log('\n[TASK] Loading the navigation bar...')
        var active = ' active'
        var inactive = ''
        var homepage_ActiveStatus = inactive
        var campaignspage_ActiveStatus = inactive
        var aboutpage_ActiveStatus = inactive
        var profilepage_ActiveStatus = inactive
        switch (_pageName) {
            case homePage:
                homepage_ActiveStatus = active
                console.log('\t[INFO] Active page: "Home"')
                break
            case campaignsPage:
                campaignspage_ActiveStatus = active
                console.log('\t[INFO] Active page: "Campaigns"')
                break
            case createCampaignsPage:
                console.log('\t[INFO] Active page: "Create a new campaign"')
                break
            case aboutPage:
                aboutpage_ActiveStatus = active
                console.log('\t[INFO] Active page: "About"')
                break
            case profilePage:
                profilepage_ActiveStatus = active
                console.log('\t[INFO] Active page: "My profile"')
                break
            default:
                throw new Error("\n[ERROR] Page not found!")
        }

        $('header').append(
            '<div class="container">' +
                '<nav id="navigation-bar" class="navbar navbar-expand-lg navbar-dark bg-dark">' +
                    '<a id="navigation-bar-brand-info" class="navbar-brand" href="' + homePagePath + '">' +
                        '<img id="brand-image" src="' + websiteHeaderLogoPath + '" width="' + websiteHeaderLogoWidth + '" height="' + websiteHeaderLogoHeight + '" class="d-inline-block mr-2" alt="">' +
                        '<span id="brand-name" class="navbar-brand mb-0 h1">' + websiteHeaderTitle + '</span>' +
                    '</a>' +
                    '<div id="navigation-bar-content-left" class="navbar-collapse collapse">' +
                        '<ul id="navigation-bar-content-left" class="navbar-nav mr-auto">' +
                            '<li class="nav-item' + homepage_ActiveStatus + '">' +
                                '<a id="home-page-navigation-link" class="nav-link" href="' + homePagePath + '"><i class="fas fa-home mr-2"></i>' + homePageTitle + '</a>' +
                            '</li>' +
                            '<li class="nav-item">' +
                                '<a class="nav-link text-muted"> ' + separateSymbol + ' </a>' +
                            '</li>' +
                            '<li class="nav-item' + campaignspage_ActiveStatus + '">' +
                                '<a id="campaign-page-navigation-link" class="nav-link" href="' + campaignsPagePath + '"><i class="fab fa-font-awesome-flag mr-2"></i>' + campaignsPageTitle + '</a>' +
                            '</li>' +
                            '<li class="nav-item">' +
                                '<a class="nav-link text-muted"> ' + separateSymbol + ' </a>' +
                            '</li>' +
                            '<li class="nav-item' + aboutpage_ActiveStatus + '">' +
                                '<a id="about-page-navigation-link" class="nav-link" href="' + aboutPagePath + '"><i class="fas fa-users mr-2"></i>' + aboutPageTitle + '</a>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="navbar-collapse collapse">' +
                        '<ul id="navigation-bar-content-right" class="navbar-nav ml-auto">' +
                            '<li class="nav-item' + profilepage_ActiveStatus + '">' +
                                '<a id="my-profile-page-navigation-link" class="nav-link" href="' + profilePagePath + '"><small>' + window.web3.eth.defaultAccount + '</small><i class="fas fa-user-check ml-2"></i></a>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</nav>' +
            '</div>'
        )
    },

    loadJumbotronText: function(tag) {
        $(tag).append(
			'<div class="container">' +				
				'<div id="jumbotron-website-introduction" class="mb-0 jumbotron text-center bg-light">' +
					'<h1 id="website-introduction-title" class="display-4 mb-5">Vietnam funding community</h1>' +
					'<p id="website-introduction-description" class="h5 font-weight-light">' +
						'Cộng đồng gây quỹ mới tại Việt Nam áp dụng công nghệ blockchain trong việc thanh toán và giao dịch.' +
						'<br><br>' + 
						'Đơn giản, nhanh chóng và tiện lợi' +
					'</p>' +
					'<a id="website-introduction-create-a-new-campaign-button" class="btn btn-nc-red btn-lg mt-5" href="' + createCampaignsPagePath + '" role="button"><i class="fab fa-font-awesome-flag mr-2"></i>Tạo một chiến dịch gây quỹ mới</a>' +
				'</div>' +
			'</div>'
		)
        console.log('\n[INFO] Loaded Jumbotron text.')
    },

    loadPagination: function (_selector, _numberOfPages, _pageIndex, _numberOfPagesDisplayInPagination) {
        console.log('\n[TASK] Loading pagination...')
        var previousButtonDisableStatus = ''
        var isPageBegin = false
        var iDotBegin = false
        var firstPageIndex = 1
        var lastPageIndex = _numberOfPagesDisplayInPagination
        var iDotEnd = false
        var isPageEnd = false
        var nextButtonDisableStatus = ''
        disabled = ' disabled'

        if (_numberOfPages <= _numberOfPagesDisplayInPagination) {
            console.log('_numberOfPages <= _numberOfPagesDisplayInPagination')
            firstPageIndex = 1
            lastPageIndex = _numberOfPages
            if (_pageIndex == 1) {
                previousButtonDisableStatus = disabled
                if (_pageIndex == lastPageIndex) {
                    nextButtonDisableStatus = disabled
                }
            } else if (_pageIndex == _numberOfPages) {
                nextButtonDisableStatus = disabled
            }
            Page.loadPaginationContent(_selector, previousButtonDisableStatus, isPageBegin, iDotBegin, firstPageIndex, _pageIndex, lastPageIndex, iDotEnd, isPageEnd, _numberOfPages, nextButtonDisableStatus)
        }
        else {
            console.log('\t[INFO] _numberOfPages > _numberOfPagesDisplayInPagination')
            // range is the total space from the first page index to the middle page index of the number of pages display in pagination
            // 0 1 2 3 4 => 1-[first page index] (space 1) 2 (space 2) 3-[middle page index] => range = 2
            var range = (_numberOfPagesDisplayInPagination - 1) / 2
            console.log('\t[INFO] range: ' + range)
            if (_pageIndex <= (1 + range)) {
                firstPageIndex = 1
                lastPageIndex = _numberOfPagesDisplayInPagination
                if (_pageIndex == 1) {
                    previousButtonDisableStatus = disabled
                }
                if ((_numberOfPages - _numberOfPagesDisplayInPagination) == 1) {
                    isPageEnd = true
                } else {
                    iDotEnd = true
                    isPageEnd = true
                }
                Page.loadPaginationContent(_selector, previousButtonDisableStatus, isPageBegin, iDotBegin, firstPageIndex, _pageIndex, lastPageIndex, iDotEnd, isPageEnd, _numberOfPages, nextButtonDisableStatus)
            } else if ((1 + range) < _pageIndex && _pageIndex < (_numberOfPages - range)) {
                isPageBegin = true
                iDotBegin = true
                firstPageIndex = _pageIndex - range
                lastPageIndex = _pageIndex + range
                var iDotEnd = true
                var isPageEnd = true
                Page.loadPaginationContent(_selector, previousButtonDisableStatus, isPageBegin, iDotBegin, firstPageIndex, _pageIndex, lastPageIndex, iDotEnd, isPageEnd, _numberOfPages, nextButtonDisableStatus)
            } else {
                if ((_numberOfPages - _numberOfPagesDisplayInPagination) == 1) {
                    isPageBegin = true
                } else {
                    isPageBegin = true
                    iDotBegin = true
                }
                firstPageIndex = _numberOfPages - _numberOfPagesDisplayInPagination + 1
                lastPageIndex = _numberOfPages
                if (_pageIndex == _numberOfPages) {
                    previousButtonDisableStatus = disabled
                }
                Page.loadPaginationContent(_selector, previousButtonDisableStatus, isPageBegin, iDotBegin, firstPageIndex, _pageIndex, lastPageIndex, iDotEnd, isPageEnd, _numberOfPages, nextButtonDisableStatus)
            }
        }
        console.log('\t[INFO] Loaded the pagination')
    },

    loadPaginationContent: function (_selector, _previousButtonDisableStatus, _isPageBegin, _iDotBegin, _firstPaginationIndex, _pageIndex, _lastPaginationIndex, _iDotEnd, _isPageEnd, _numberOfPages, _nextButtonDisableStatus) {
        Page.loadPaginationPreviousButton(_selector, _previousButtonDisableStatus, _pageIndex)
        Page.loadPaginationPageNumbers(_selector, _isPageBegin, _iDotBegin, _firstPaginationIndex, _pageIndex, _lastPaginationIndex, _iDotEnd, _isPageEnd, _numberOfPages)
        Page.loadPaginationNextButton(_selector, _nextButtonDisableStatus, _pageIndex)
    },

    loadPaginationPreviousButton: function (_selector, disableStatus, _pageIndex) {
        var href
        if (disableStatus == ' disabled') {
            href = ''
        } else {
            var previousPage = _pageIndex - 1
            var openPageQuery = '?' + Enums.campaignPageParameter.page + '=' + previousPage
            href = ' href="' + campaignsPagePath + openPageQuery + '"'
        }
        $(_selector).append(
            '<li class="page-item' + disableStatus + '">' +
                '<a class="page-link"' + href + '>Trang trước</a>' +
            '</li>'
        )
    },

    loadPaginationPageNumbers: function (_selector, _isPageBegin, _iDotBegin, _firstPaginationIndex, _pageIndex, _lastPaginationIndex, _iDotEnd, _isPageEnd, _numberOfPages) {                
        var openPageQuery
        if (_isPageBegin == true) {
            openPageQuery = '?' + Enums.campaignPageParameter.page + '=1'
            $(_selector).append(
                '<li class="page-item"><a class="page-link" href="' + campaignsPagePath + openPageQuery + '">1</a></li>'
            )
        }
        if (_iDotBegin == true) {
            $(_selector).append(
                '<li class="page-item"><a class="page-link"> ... </a></li>'
            )
        }
        var activeStatus
        for (var index = _firstPaginationIndex; index <= _lastPaginationIndex; index++){
            if (index == _pageIndex) {
                activeStatus = ' active'
            } else {
                activeStatus = ''
            }
            openPageQuery = '?' + Enums.campaignPageParameter.page + '=' + index
            $(_selector).append(
                '<li class="page-item' + activeStatus +'"><a class="page-link" href="' + campaignsPagePath + openPageQuery + '">' + index + '</a></li>'
            )
        }
        if (_iDotEnd == true) {
            $(_selector).append(
                '<li class="page-item"><a class="page-link">...</a></li>'
            )
        }
        if (_isPageEnd == true) {
            openPageQuery = '?' + Enums.campaignPageParameter.page + '=' + _numberOfPages
            $(_selector).append(
                '<li class="page-item"><a class="page-link" href="' + campaignsPagePath + openPageQuery + '">' + _numberOfPages + '</a></li>'
            )
        }
    },

    loadPaginationNextButton: function (_selector, disableStatus, _pageIndex) {
        var href
        if (disableStatus == ' disabled') {
            href = ''
        } else {
            var nextPage = _pageIndex + 1
            var openPageQuery = '?' + Enums.campaignPageParameter.page + '=' + nextPage
            href = ' href="' + campaignsPagePath + openPageQuery + '"'
        }
        $(_selector).append(
            '<li class="page-item' + disableStatus + '">' +
                '<a class="page-link"' + href + '>Trang sau</a>' +
            '</li>'
        )
    },

    loadPageFooter: function() {
        $('footer').append(
            '<hr>' +
            '<div class="py-4 font-weight-light bg-white px-4">' +
                '<div class="row">' +
                    '<div class="col-md-5">' +
                        '<p class="h5 text-dark">' + websiteFooterTitle + '</p>' +
                        '<ul class="list-unstyled mt-4 text-dark">' +
                            '<li class="my-2">' +
                                '<span>' + websiteFooterCity + '</span>' +
                            '</li>' +
                            '<li class="my-2">' +
                                '<span>' + personThinhDetails + '</span>' +
                            '</li>' +
                            '<li class="my-2">' +
                                '<span>' + personBaoDetails + '</span>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="col-md-7">' +
                        '<div class="row">' +
                            '<div class="col-sm-6">' +
                                '<p class="h5 text-dark">' + websiteFooterAboutUsTitle + '</p>' +
                                '<ul class="list-unstyled mt-4">' +
                                    '<li>' +
                                        '<a class=" text-dark" href="' + aboutPagePath + '">' + websiteFooterAboutUs + '</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="col-sm-6">' +
                                '<p class="h5 text-dark">' + websiteFooterSupportTitle + '</p>' +
                                '<ul class="list-unstyled mt-4">' +
                                    '</li>' +
                                        '<a class="text-dark" href="">' + websiteFooterSupport + '</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +            
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<span class="mt-2 font-italic text-dark">© Copyright 2019 VN-Funding All Rights Reserved</span>' +
            '</div>'
        )
    },
}