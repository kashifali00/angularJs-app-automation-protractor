// That test case verify that terms of use link is clickable and preset on signup page

describe('Maestrano Production:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 60000);
    }, 90000);


    it('verify that terms of use link is clickable and present', function () {
        var signUpLink = protractor.ExpectedConditions;
        browser.wait(signUpLink.elementToBeClickable(element(by.partialLinkText('have an account? Sign up'))), 50000);

        element(by.partialLinkText('have an account? Sign up')).click();

        var companyField = protractor.ExpectedConditions;
        browser.wait(companyField.visibilityOf($('#user_company')), 5000);

        // check terms of reference checkbox
        expect($('#tos').isPresent()).toBeTruthy();

        // check terms of reference link
        expect(element(by.linkText('the Terms of Use')).getTagName()).toBe('a');

        element(by.linkText("the Terms of Use")).click().then(function () {

            // sleeping browser here so that new window handler could return
            browser.sleep(5000);
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[1];
                browser.switchTo().window(newWindowHandle).then(function () {
                    expect(browser.getTitle()).toMatch('Terms & Conditions');
                });
            });
        });

    }, 90000); // it block end here

}); //describe block end here
