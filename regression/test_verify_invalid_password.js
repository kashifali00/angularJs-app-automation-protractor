// That test case verify invalid password message while login into Maestrano production environment

describe('Maestrano Production:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 6000);
    }, 900000);

    afterAll(function () {
    });

    it('Verify that alert box is appeared upon enterning invalid password', function () {
        browser.wait(function () {
            return element(by.id('user_email')).isDisplayed();
        });
        element(by.id('user_email')).sendKeys('automation@mailinator.com');
        element(by.id('user_password')).sendKeys('Admin1');
        element(by.buttonText('Sign in')).click();

        //invalid password message
        var alert = protractor.ExpectedConditions;
        var alertText = element(by.css('.alert-danger'));
        browser.wait(alert.presenceOf(alertText), 180000);
        expect(alertText.isPresent()).toBeTruthy();

    }, 900000) // it block end here

}); //describe block end here
