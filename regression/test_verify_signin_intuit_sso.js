// That test case verify login to Maestrano using Intuit single-sign on

describe('Intuit SSO:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 900000);
    }, 90000);


    it('verify login to Maestrano using Intuit SSO', function () {
        browser.wait(function () {
            return element.all(by.css('.oauth-sso a')).get(0).isDisplayed();
        });

        element.all(by.css('.oauth-sso a')).get(0).click();

        titleGoogle = protractor.ExpectedConditions;
        browser.wait(titleGoogle.titleContains('Welcome to Intuit App Center'), 900000);

        var getTitle = browser.getTitle();
        getTitle.then(function (title) {
            expect(title).toBe('Welcome to Intuit App Center');
        });

        element(by.name('Email')).sendKeys('automation@mailinator.com');
        element(by.name('Password')).sendKeys('Admin123@');
        element(by.id('ius-sign-in-submit-btn')).click();

        //check if alert has poped up
        var alert = protractor.ExpectedConditions;
        var alertText = element(by.css('.alert-success'));
        browser.wait(alert.presenceOf(alertText), 180000);
        expect(alertText.isPresent()).toBeTruthy();

        element(by.id('user_email')).sendKeys('automation@mailinator.com');
        element(by.id('user_password')).sendKeys('Admin123@');
        element(by.buttonText('Sign in')).click();

        var dashboard = protractor.ExpectedConditions;
        var dashboardLinkText = element(by.css('.wrapper'));
        browser.wait(dashboard.presenceOf(dashboardLinkText), 180000);
        expect(dashboardLinkText.isPresent()).toBeTruthy();
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
                expect(dashtitle).toContain('Maestrano');
            });
        });

    }, 90000); // it block end here

}); //describe block end here
