// That test case verify that SIGNIN button should be disabled unitl we don't pass credentials

describe('Maestrano Production:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 90000);
    }, 900000);

    afterAll(function () {
    });

    it('Verify that sigin button is disabled until credentails are not passed', function () {

        // check sigin button
        browser.wait(function () {
            return element(by.id('user_email')).isDisplayed();
        });
        expect(element(by.buttonText('Sign in')).isPresent()).toBeTruthy();
        browser.wait(function () {
            return element(by.buttonText('Sign in')).isDisplayed();
        });
        // get the disabled attribute of the button
        element(by.buttonText('Sign in')).getAttribute('disabled').then(function (attr_disable) {
            expect(attr_disable).toBeTruthy();
        })
    }, 900000) // it block end here

}); //describe block end here
