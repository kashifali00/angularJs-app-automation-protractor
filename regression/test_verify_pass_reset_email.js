// That test case verify reset password eamil link

describe('Password reset:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 6000);
   }, 90000);

    it('verify that password reset email link in inbox', function () {

        var string_in_url = protractor.ExpectedConditions;
        //wait for url to contain sign in
        browser.wait(string_in_url.titleContains('Maestrano'), 90000);

        var getTitle = browser.getTitle();
        getTitle.then(function (title) {
            expect(title).toContain('Maestrano');
        });

        //check forgot password link on the page

        var forgotPassLink = element(by.linkText('Forgot your password?'));
        expect(forgotPassLink.getText()).toContain('Forgot your password?');

        expect(element(by.linkText('Forgot your password?')).getTagName()).toBe('a');

        element(by.linkText('Forgot your password?')).click();

        // check password recovery page appears

        var emailField = protractor.ExpectedConditions;
        browser.wait(emailField.visibilityOf(element(by.model('user.email'))), 5000);

        var passRecoveryPage = element(by.buttonText('Password Recovery'));
        expect(passRecoveryPage.getText()).toMatch('Password Recovery');

        // enter email where password reset link will be sent
        element(by.model('user.email')).sendKeys('automation@mailinator.com');
        element(by.buttonText('Password Recovery')).click();

        //check if alert has poped up
         var alert = protractor.ExpectedConditions;
         var alertText = element(by.css('.alert-success'));
         browser.wait(alert.presenceOf(alertText), 180000);
         expect(alertText.isPresent()).toBeTruthy();

    }, 90000); // it block end here

}); //describe block end here
