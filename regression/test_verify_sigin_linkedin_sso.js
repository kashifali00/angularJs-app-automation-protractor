// That test case verify login to Maestrano using LinkedIn credential single-sign on

describe('LinkedIn SSO:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 60000);
    }, 90000);

    it('verify login to Maestrano using Linkedin SSO', function () {
        browser.wait(function () {
            return element.all(by.css('.oauth-sso a')).get(1).isDisplayed();
        });

        element.all(by.css('.oauth-sso a')).get(1).click();

        titleLinkedIn = protractor.ExpectedConditions;
        browser.wait(titleLinkedIn.titleContains('Authorize | LinkedIn'), 6000);

        var getTitle = browser.getTitle();
        getTitle.then(function (title) {
            expect(title).toBe('Authorize | LinkedIn');
        });

        $('#session_key-oauth2SAuthorizeForm').sendKeys('anas.ali@maestrano.com');
        $('#session_password-oauth2SAuthorizeForm').sendKeys('Admin123@');

        element.all(by.css('.actions li')).get(0).click();

        titleDash = protractor.ExpectedConditions;
        browser.wait(titleDash.titleContains('Maestrano - Dashboard - Impac'), 6000);

        var dashTitle = browser.getTitle();
        dashTitle.then(function (title) {
            expect(title).toBe('Maestrano - Dashboard - Impac');
        });

        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf($('.wrapper')), 5000);
        element(by.css('.wrapper')).click();

        // logout from the maestrano
        browser.wait(function () {
            return element.all(by.css('[ui-sref="logout"]')).isDisplayed();
        });

        element.all(by.css('[ui-sref="logout"]')).first().click();
        var getcurrentUrl = browser.getCurrentUrl();
        getcurrentUrl.then(function (currentPageUrl) {
            var dashTitle = browser.getTitle();
            dashTitle.then(function (dashtitle) {
                expect(dashtitle).toContain('Maestrano');
            });
        });

    }, 90000); // it block end here

}); //describe block end here
