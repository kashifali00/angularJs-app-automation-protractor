// That test case verify logged in Maestrano production and UAT environment

describe('Maestrano Production:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 90000);
    }, 900000);

    afterAll(function () {
    });

    it('Verify that user is able to login Maestrano Production environment', function () {

        element(by.id('user_email')).sendKeys('automation@mailinator.com');
        element(by.id('user_password')).sendKeys('Admin123@');
        element(by.buttonText('Sign in')).click();

        var dashboard = protractor.ExpectedConditions;
        var dashboardLinkText = element(by.css('.wrapper'));
        browser.wait(dashboard.presenceOf(dashboardLinkText), 180000);
        expect(dashboardLinkText.isPresent()).toBeTruthy();

        var getcurrentUrl = browser.getCurrentUrl();
        getcurrentUrl.then(function (currentPageUrl) {
            var dashTitle = browser.getTitle();
            dashTitle.then(function (dashtitle) {
                expect(dashtitle).toContain('Maestrano - Dashboard - Impac');
            });
        });

        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf($('.wrapper')), 5000);
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 90000);

        var string_in_url = protractor.ExpectedConditions;
        //wait for url to contain sign in
        browser.wait(string_in_url.titleContains('Maestrano - Dashboard - Impac'), 90000);

    }, 900000) // it block end here

}); //describe block end here
