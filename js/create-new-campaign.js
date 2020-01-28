const createNewCampaignTitle = 'Tạo một chiến dịch gây quỹ mới'

const campaignIDLabel = 'Mã số chiến dịch'
const campaignOwnerAccountLabel = 'Tài khoản người tạo chiến dịch'
const campaignCategoryLabel = 'Loại chiến dịch (*)'
const campaignDonationBasedCategory = 'Chiến dịch từ thiện hoặc phi lợi nhuận'
const campaignNameLabel = 'Tên chiến dịch (*)'
const campaignNameInputPlaceHolder = 'Tên chiến dịch gây quỹ của bạn'
const campaignNameInputLength = 75
const campaignDescriptionLabel = 'Nội dung chiến dịch (*)'
const campaignDescriptionInputPlaceHolder = 'Mô tả ngắn gọn chiến dịch của bạn (2500 kí tự)'
const campaignDescriptionInputLength = 2500
const campaignLinkLabel = 'Trang web giới thiệu chiến dịch'
const linkInputPlaceHolder = 'https://...'
const campaignGoalLabel = 'Số tiền cần cho chiến dịch (*)'
const campaignGoalInputPlaceHolder = '1,000,000'
const campaignGoalInputMaxLength = 11
const campaignImageLabel = 'Hình ảnh minh họa cho chiến dịch (ưu tiên kích thước ngang)'
const campaignImageHeight = 392 + 'px'
const campaignImageLinkLabel = 'Đường dẫn của hình ảnh'
const campaignImageLinkDefault = 'https://images.pexels.com/photos/290617/pexels-photo-290617.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
const campaignStartDateLabel = 'Ngày bắt đầu chiến dịch (*)'
const campaignEndDateLabel = 'Ngày kết thúc chiến dịch (*)'
const campaignTagsLabel = 'Từ khóa cho chiến dịch này (*)'
const campaignTagsInputPlaceHolder = 'từ thiện, giáo dục, trẻ em...'
const campaignTagsInputMaxLength = 100

var CreateNewCampaignPage = {

    initialization: async function() {
		await Ethereum.initialization()
		CreateNewCampaignPage.loadCreateNewCampaignPage()
    },	

    loadCreateNewCampaignPage: function() {
        Page.loadNavigationBar(createCampaignsPage)
        CreateNewCampaignPage.loadPageBody()
        Page.loadPageFooter()
    },

    loadPageBody: async function () {
        console.log('\n[TASK] Loading the page content...')
        $('main').append(
            '<div class="container">' +
                '<div class="text-center">' +	
                    '<h1 id="create-a-new-campaign-title" class="display-5 font-weight-light my-5">' + createNewCampaignTitle + '</h1>' +
                '</div>' +
                '<form id="create-new-campaign-form" class="needs-validation" novalidate>' +
                    '<div class="row">' +
                        '<div class="col-md-5">' +
                            '<div class="form-group">' +
                                '<label id="campaign-id-label" for="campaign-id">' + campaignIDLabel + '</label>' +
                                '<div class="input-group">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text"><i class="fas fa-lock"></i></span>' +
                                    '</div>' +
                                    '<input id="campaign-id-input" class="form-control" type="text" readonly>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label id="campaign-owner-account-label" for="campaign-owner-account">' + campaignOwnerAccountLabel + '</label>' +
                                '<div class="input-group">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text"><i class="fas fa-user"></i></span>' +
                                    '</div>' +
                                    '<input id="campaign-owner-account-input" class="form-control" type="text" readonly>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label id="campaign-category-label" for="campaign-category-select">' + campaignCategoryLabel + '</label>' +
                                '<select id="campaign-category-select" class="custom-select">' +
                                    '<option selected>' + campaignDonationBasedCategory + '</option>' +
                                '</select>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label id="campaign-name-label" for="campaign-name-input">' + campaignNameLabel + '</label>' +
                                '<div class="input-group">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text"><i class="fas fa-pen"></i></span>' +
                                    '</div>' +
                                    '<input id="campaign-name-input" class="form-control" placeholder="' + campaignNameInputPlaceHolder + '" maxlength="' + campaignNameInputLength + '" type="text" required>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label id="campaign-description-label" for="campaign-description-textarea">' + campaignDescriptionLabel + '</label>' +
                                '<textarea id="campaign-description-textarea" class="form-control" placeholder="' + campaignDescriptionInputPlaceHolder + '" rows="5" maxlength="' + campaignDescriptionInputLength + '" name="description" cols="50" required></textarea>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label id="campaign-link-label" for="campaign-link-input">' + campaignLinkLabel + '</label>' +
                                '<div class="input-group">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text"><i class="fas fa-link"></i></span>' +
                                    '</div>' +
                                    '<input id="campaign-link-input" class="form-control" placeholder="' + linkInputPlaceHolder + '" type="text" onchange="CreateNewCampaignPage.verifyCampaignLink(this.value)">' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label id="campaign-goal-label" for="campaign-goal-input">' + campaignGoalLabel + '</label>' +
                                '<div class="input-group">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text"><i class="far fa-money-bill-alt"></i></span>' +
                                    '</div>' +
                                    '<input id="campaign-goal-input" class="form-control text-right" placeholder="' + campaignGoalInputPlaceHolder + '" maxlength="' + campaignGoalInputMaxLength + '" type="text" onkeypress="return Utilities.onlyAllowNumber(event)">' +
                                    '<div class="input-group-append">' +
                                        '<span class="input-group-text">VND</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-7">' +
                            '<div class="form-group">' +
                                '<label id="campaign-image-label" for="campaign-image">' + campaignImageLabel + '</label>' +
                                '<img id="campaign-image" class="rounded-lg" width="100%" height="' + campaignImageHeight + '"></img>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label id="campaign-image-link-label" for="campaign-image-link-input">' + campaignImageLinkLabel + '</label>' +
                                '<div class="input-group">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text"><i class="fas fa-link"></i></span>' +
                                    '</div>' +
                                    '<input id="campaign-image-link-input" class="form-control" placeholder="' + linkInputPlaceHolder + '" type="text" onchange="CreateNewCampaignPage.generateCampaignImage(this.value)">' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-row">' +
                                '<div class="form-group col-md-6">' +
                                    '<label id="campaign-start-date-label" for="campaign-start-date">' + campaignStartDateLabel + '</label>' +
                                    '<div class="input-group">' +
                                        '<div class="input-group-prepend">' +
                                            '<span class="input-group-text"><i class="far fa-calendar-alt"></i></span>' +
                                        '</div>' +
                                        '<input id="campaign-start-date" class="form-control" type="date" readonly />' +
                                    '</div>' +
                                '</div>' +
                                '<div class="form-group col-md-6">' +
                                    '<label id="campaign-end-date-label" for="campaign-end-date-input">' + campaignEndDateLabel + '</label>' +
                                    '<div class="input-group">' +
                                        '<div class="input-group-prepend">' +
                                            '<span class="input-group-text"><i class="far fa-calendar-alt"></i></span>' +
                                        '</div>' +
                                        '<input id="campaign-end-date-input" class="form-control" type="date" required />' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label id="campaign-tags-label" for="campaign-tags-input">' + campaignTagsLabel + '</label>' +
                                '<div class="input-group">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text"><i class="fas fa-tag"></i></span>' +
                                    '</div>' +
                                    '<input id="campaign-tags-input" class="form-control" placeholder="' + campaignTagsInputPlaceHolder + '" maxlength="' + campaignTagsInputMaxLength + '" type="text">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<button id="create-a-new-campaign-button" class="btn btn-nc-red my-3" type="button">Tạo chiến dịch</button>' +
                '</form>' +
            '</div>'
        )
        console.log('\t[INFO] Loaded the page structure.')

        ethereum.on('accountsChanged', function (accounts) {
            window.location.reload()      
        })
        console.log('\t[INFO] Set the function for reloading the page when the account changed.')

		var contract = await Ethereum.smartContract.deployed()
        var newCampaignID = await contract.GetNumberOfCampaigns()

        $("#campaign-image").attr("src", campaignImageLinkDefault)
        console.log('\t[INFO] Set the default image for the campaign.')

        $('#campaign-id-input').val(newCampaignID)
        console.log('\t[INFO] Set the new campaign ID.')

        $('#campaign-owner-account-input').val(web3.eth.defaultAccount)
        console.log('\t[INFO] Loaded the current account.')

		$('#campaign-goal-input').on('paste', function (e) {
			e.preventDefault()
		})
        console.log('\t[INFO] Set the function for preventing paste value on campaign goal textbox.')

        // Get the current date as start date
        $('#campaign-start-date').val(Utilities.getcurrentDate())
        console.log('\t[INFO] Set the campaign start date equal current date.')

        $('#create-a-new-campaign-button').on('click', async function () {
            console.log('\n[TASK] Creating new campaign...')
            var flag = true
            if ($('#campaign-id-input').val() == '') {
                console.log('\t[ERROR] The campaign ID is not set.')
                $('#campaign-id-input').addClass('is-invalid')
                flag = false
            } else {  
                $('#campaign-id-input').removeClass('is-invalid')
                $('#campaign-id-input').addClass('is-valid')
            }
            if ($('#campaign-owner-account-input').val() == '') {
                console.log('\t[ERROR] The campaign owner is not set.')
                $('#campaign-owner-account-input').addClass('is-invalid')
                flag = false
            } else {  
                $('#campaign-owner-account-input').removeClass('is-invalid')
                $('#campaign-owner-account-input').addClass('is-valid')
            }
            if ($('#campaign-name-input').val() == '') {
                console.log('\t[ERROR] The campaign name is not inputted.')
                $('#campaign-name-input').addClass('is-invalid')
                flag = false
            } else {  
                $('#campaign-name-input').removeClass('is-invalid')
                $('#campaign-name-input').addClass('is-valid')
            }
            if ($('#campaign-description-textarea').val() == '') {
                console.log('\t[ERROR] The campaign description is not inputted.')
                $('#campaign-description-textarea').addClass('is-invalid')
                flag = false
            } else {  
                $('#campaign-description-textarea').removeClass('is-invalid')
                $('#campaign-description-textarea').addClass('is-valid')
            }
            if ($('#campaign-goal-input').val() == '') {
                console.log('\t[ERROR] The campaign goal is not inputted.')
                $('#campaign-goal-input').addClass('is-invalid')
                flag = false
            } else {  
                $('#campaign-goal-input').removeClass('is-invalid')
                $('#campaign-goal-input').addClass('is-valid')
            }
            if ($('#campaign-end-date-input').val() == '' ||
                Utilities.isValidDateRange($('#campaign-start-date').val(), $('#campaign-end-date-input').val()) == false) {
                console.log('\t[ERROR] The campaign end date is not inputted.')
                $('#campaign-end-date-input').addClass('is-invalid')
                flag = false
            } else {  
                $('#campaign-end-date-input').removeClass('is-invalid')
                $('#campaign-end-date-input').addClass('is-valid')
            }
            if ($('#campaign-tags-input').val() == '') {
                console.log('\t[ERROR] The campaign tags is not inputted.')
                $('#campaign-tags-input').addClass('is-invalid')
                flag = false
            } else {
                $('#campaign-tags-input').removeClass('is-invalid')
                $('#campaign-tags-input').addClass('is-valid')
            }
            if (flag == true) {
                await contract.CreateNewCampaign(
                    web3.eth.defaultAccount,
                    $('#campaign-name-input').val(),
                    $('#campaign-description-textarea').val(),
                    $('#campaign-link-input').val(),
                    $('#campaign-goal-input').val(),
                    $('#campaign-image-link-input').val(),
                    $('#campaign-start-date').val(),
                    $('#campaign-end-date-input').val(),
                    $('#campaign-tags-input').val()
                )
                window.location.href = campaignsPagePath
            }
        })
    },

    verifyCampaignLink: function(link) {
        var isURL = Utilities.isAnUrl(link)
        if (isURL == true) {
            $('#campaign-link-input').removeClass('is-invalid')
            $('#campaign-link-input').addClass('is-valid')
        } else {
            $('#campaign-link-input').addClass('is-invalid')
            console.log('\t[ERROR] Please check the campaign link again.')
        }
    },

    generateCampaignImage: function(imageSource) {
        var isURL = Utilities.isAnUrl(imageSource)
        if (imageSource != '' && isURL == true) {
            $('#campaign-image-link-input').removeClass('is-invalid')
            $('#campaign-image-link-input').addClass('is-valid')
            $("#campaign-image").attr("src", imageSource)
        } else {
            $('#campaign-image-link-input').addClass('is-invalid')
            $("#campaign-image").attr("src", campaignImageLinkDefault)
        }
    }
}

$(window).on('load', function() {
    CreateNewCampaignPage.initialization()
})