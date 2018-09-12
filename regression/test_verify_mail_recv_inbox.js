//That test case verify that mail received in inbox

describe('Mail received in inbox:', function () {

   beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 7000);
    }, 90000);


   it('verify that mail received in inbox', function () {

       var string_in_url = protractor.ExpectedConditions;

       //wait for url to contain sign in
        browser.wait(string_in_url.titleContains('Maestrano'), 90000);

        var getTitle = browser.getTitle();
        getTitle.then(function (title) {
            expect(title).toContain('Maestrano');
        });

         var signUpLink = protractor.ExpectedConditions;
        browser.wait(signUpLink.elementToBeClickable(element(by.partialLinkText('receive confirmation instructions?'))), 6000);

        element(by.partialLinkText('receive confirmation instructions?')).click();

        var emailField = protractor.ExpectedConditions;
        browser.wait(emailField.visibilityOf(element(by.css('[placeholder="*Email"]'))), 50000);

       //verify Resend confirmation instructions button exists
        var getButton = element(by.css('[disabled="disabled"]'));
        expect(getButton.getText()).toContain('Resend confirmation instructions');

       //verify Resend confirmation instructions has disabled property true
        element(by.buttonText('Resend confirmation instructions')).getAttribute('disabled').then(function (attr_disable) {
            expect(attr_disable).toBeTruthy();
        })

       //Enter values to textbox
        element(by.id('user_email')).sendKeys('automation@mailinator.com');
        element(by.buttonText('Resend confirmation instructions')).click();

       //Check if notification widget is div
        expect(element(by.css('.notification-widget')).getTagName()).toBe('div');

       //check if alert has poped up
        var alert = protractor.ExpectedConditions;
        var alertText = element(by.css('.alert-success'));
        browser.wait(alert.presenceOf(alertText), 180000);
        expect(alertText.isPresent()).toBeTruthy();

   }, 90000); // it block end here

}); //describe block end here
