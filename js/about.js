var About = {

    initialization: async function() {
        await Ethereum.initialization()
		About.loadAboutPage()
    },	

    loadAboutPage: function() {
        Page.loadNavigationBar(aboutPage)
        Page.loadPageFooter()
    },
}

$(window).on('load', function() {
    About.initialization()
})