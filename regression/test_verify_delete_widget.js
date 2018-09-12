// This test case verify that it delete widget

describe('Maestrano Production:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', browser.params.testWait);
    }, browser.params.wait);

    afterAll(function () {
    });

    it('Verify that delete widget', function () {

        function ifOnboardingPageExists() {

            var appButton = element.all(by.css('[ui-sref="onboarding.step2"]'));
            var checkButton = protractor.ExpectedConditions;
            browser.wait(checkButton.presenceOf(appButton), browser.params.elementWait);
            appButton.get(1).click();

            //wait for apps category to be loaded properly
            var appsCat = protractor.ExpectedConditions;
            var appCategory = element(by.model('vm.selectedCategory')).$('[value="string:Accounting and Finance"]');
            browser.wait(appsCat.visibilityOf(appCategory), browser.params.elementWait);
            appCategory.click();
            browser.sleep(5000);
            var apps = element.all(by.repeater('app in vm.marketplace.apps | filter:vm.appsFilter | filter:{name: vm.searchTerm}'));
            apps.get(0).click();

            //wait for connect my apps button to be enabled
            var connectButton = protractor.ExpectedConditions;
            var clickOnConnectButton = element(by.buttonText('Connect my apps!'));
            browser.wait(connectButton.elementToBeClickable(clickOnConnectButton), browser.params.elementWait);
            clickOnConnectButton.click();

            //wait for GoTomyDashboard button to be displayed
            var gotoDash = protractor.ExpectedConditions;
            var skip_GoToDashboard = element(by.buttonText('Skip & Go to my dashboard!'));
            browser.wait(gotoDash.visibilityOf(skip_GoToDashboard), browser.params.elementWait);
            skip_GoToDashboard.click();

        } // function ends here
        element(by.id('user_email')).sendKeys('automation@mailinator.com');
        element(by.id('user_password')).sendKeys('Admin123@');
        element(by.buttonText('Sign in')).click();
        // check if onboarding page exists
        var OnBoarding = protractor.ExpectedConditions;
        browser.wait(OnBoarding.titleIs('Maestrano - Dashboard - Welcome'), browser.params.onboardingPage).then(function onboardingPageExists() {
            //call ifOnboardingPageExists () function to add an app to dashboard

            browser.sleep(2000);
            ifOnboardingPageExists();

        }, function () {
        });
        
        var dashTitle = protractor.ExpectedConditions;
        browser.wait(dashTitle.titleContains('Maestrano - Dashboard - Impac'), browser.params.elementWait);

        var getTitle = browser.getTitle();
        expect(getTitle).toBe('Maestrano - Dashboard - Impac');

        var newdashboard = protractor.ExpectedConditions;
        var newdashboardLinkText = element(by.css('[ng-click="showConfirmDelete = !showConfirmDelete"]'));
        browser.wait(newdashboard.elementToBeClickable(newdashboardLinkText), browser.params.elementWait);
        expect(newdashboardLinkText.isPresent()).toBeTruthy();

        element(by.css('[ng-click="showConfirmDelete = !showConfirmDelete"]')).click();

        var deleteicon = protractor.ExpectedConditions;
        var delete_icon = element(by.css('.confirm-delete-popover'));
        browser.wait(deleteicon.presenceOf(delete_icon), browser.params.elementWait);
        expect(delete_icon.isPresent()).toBeTruthy();

        element(by.buttonText('Delete')).click();

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
    }, browser.params.testWait); // it block ends here

}); // describe block ends here
