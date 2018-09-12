// That test case verify that create my account button

describe('Create My Account Button:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 6000);
   }, 90000);

    it('verify that create my account button', function () {
        var signUpLink = protractor.ExpectedConditions;
	    browser.wait(signUpLink.elementToBeClickable(element(by.partialLinkText('have an account? Sign up'))),50000);

        element(by.partialLinkText('have an account? Sign up')).click();

        var companyField = protractor.ExpectedConditions;
        browser.wait(companyField.visibilityOf($('#user_company')),5000);

        // check terms of reference checkbox
        expect($('#tos').isPresent()).toBeTruthy();

        // check terms of reference link
        expect(element(by.linkText('the Terms of Use')).getTagName()).toBe('a');

        //verify create my account button exists
        var getButton = element(by.buttonText('Create my account!'));
        expect(getButton.getText()).toContain('Create my account!');

        //verify create my account has disabled property true
        element(by.buttonText('Create my account!')).getAttribute('disabled').then(function (attr_disable) {
            expect(attr_disable).toBeTruthy();
        })

    }, 90000); // it block end here

}); //describe block end here
