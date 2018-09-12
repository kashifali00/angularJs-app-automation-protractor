// That test case verify invalid password message while login into Maestrano production environment

describe('Maestrano Production:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 100000);
    }, 900000);

    afterAll(function () {
    });

    it('Verify Dont have account sign_up is entered to login Maestrano Production environment', function () {

        element.all(by.css('a[href="/mnoe/auth/users/sign_up"]')).click();
        var getcurrentUrl = browser.getCurrentUrl();
        getcurrentUrl.then(function (currentPageUrl) {
            var dashTitle = browser.wait(browser.getTitle(), 990000);
            dashTitle.then(function (dashtitle) {
                expect(dashtitle).toContain('Maestrano');
            });
        });

        var email = protractor.ExpectedConditions;
        browser.wait(email.visibilityOf(element(by.name('user[email]'))), 5000);

        element(by.name('user[email]')).sendKeys('maestranotesting@mailinator.com ');
        element(by.id('user_company')).sendKeys('AUTO_COMP');
        var tos = element(by.id('tos'));
        tos.click();
        element(by.buttonText('Create my account!')).click();

        var alert = protractor.ExpectedConditions;
        var alertText = element(by.css('.alert-success'));
        browser.wait(alert.presenceOf(alertText), 180000);
        expect(alertText.isPresent()).toBeTruthy();
/*
        browser.get('https://www.mailinator.com');

        var mailinator = protractor.ExpectedConditions;
        browser.wait(mailinator.titleContains('Mailinator'), 5000);

        $('#inboxfield').sendKeys('maestranoautomation@mailinator.com');
        element(by.buttonText('Go!')).click();

       element(by.repeater('email in emails').row(0)).click();
       browser.sleep(5000);

       browser.wait(function () {
       return element(by.css('td[valign="middle"]')).isDisplayed();
       });
*/
    }, 900000) //it block end here

}); //describe block end here
