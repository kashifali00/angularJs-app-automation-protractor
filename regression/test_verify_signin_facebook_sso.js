// That test case verify login to Maestrano using facebook credential single-sign on

describe('facebook SSO:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 900000);
    }, 90000);


    it('verify login to Maestrano using facebook SSO', function () {
        browser.wait(function () {
            return element.all(by.css('.oauth-sso a')).get(3).isDisplayed();
        });

        element.all(by.css('.oauth-sso a')).get(3).click();

        titleGoogle = protractor.ExpectedConditions;
        browser.wait(titleGoogle.titleContains('Log in to Facebook | Facebook'), 900000);

        var getTitle = browser.getTitle();
        getTitle.then(function (title) {
            expect(title).toBe('Log in to Facebook | Facebook');
        });

        element(by.id('email')).sendKeys('anas.ali@maestrano.com');
        element(by.id('pass')).sendKeys('k@^123()^');
        element(by.id('loginbutton')).click();

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

        element.all(by.css('[ui-sref="logout"]')).click();
        var getTitle = browser.getTitle();
        getTitle.then(function (title) {
            expect(title).toContain('Maestrano');
        });

        var getcurrentUrl = browser.getCurrentUrl();
        getcurrentUrl.then(function (currentPageUrl) {
            var dashTitle = browser.getTitle();
            dashTitle.then(function (dashtitle) {
                expect(dashtitle).toContain('Maestrano - Dashboard - Impac');
            });
        });

    }, 90000); // it block end here

}); //describe block end here
