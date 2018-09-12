// That test case verify adding new company  //

describe('Adding new company:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', browser.params.testWait);
    }, browser.params.testWait);

    it('Verify that user create new company', function () {

        // this fuction checks if onboarding page exists

        function ifOnboardingPageExists () {

            var appButton = element.all(by.css('[ui-sref="onboarding.step2"]'));
            var checkButton = protractor.ExpectedConditions;
            browser.wait(checkButton.presenceOf(appButton), browser.params.onboardingPage);
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

        //Enter login credentials
        element(by.id('user_email')).sendKeys('automation@mailinator.com');
        element(by.id('user_password')).sendKeys('Admin123@');
        element(by.buttonText('Sign in')).click();

        // check if onboarding page exists.
        var OnBoarding = protractor.ExpectedConditions;
        browser.wait(OnBoarding.titleIs('Maestrano - Dashboard - Welcome'), browser.params.onboardingPage).then(function onboardingPageExists() {
            //call ifOnboardingPageExists () function to add an app to dashboard

            browser.sleep(2000);
            ifOnboardingPageExists ();

        }, function () {
        });

        //wait for dashboard to be loaded properly
        var dashboardTitle = protractor.ExpectedConditions;
        browser.wait(dashboardTitle.titleContains('Maestrano - Dashboard - Impac'), browser.params.elementWait);

        var dashboard = protractor.ExpectedConditions;
        var dashboardLinkText = element(by.css('.wrapper'));
        browser.wait(dashboard.visibilityOf(dashboardLinkText), browser.params.elementWait);
        expect(dashboardLinkText.isPresent()).toBeTruthy();

        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf($('.wrapper')), browser.params.elementWait);
        element(by.css('.wrapper')).click();

        browser.wait(function () {
            return element.all(by.buttonText('New Company')).isDisplayed();
        });

        // Adding new company here
        element(by.buttonText('New Company')).click();

        var companypopup = protractor.ExpectedConditions;
        browser.wait(companypopup.visibilityOf($('.modal-content')), browser.params.elementWait);

        element(by.model('modal.model.name')).sendKeys('TEST_COMP_002');

        element(by.buttonText('Create')).getAttribute('disabled').then(function (attr_disable) {
            expect(attr_disable).toBeFalsy();
        })
        element(by.buttonText('Create')).click();

        //After adding new company, check if onboarding pages appears.

        var OnBoardingPage = protractor.ExpectedConditions;
        browser.wait(OnBoardingPage.titleIs('Maestrano - Dashboard - Welcome'), browser.params.onboardingPage).then(function onboardingPageExists() {
            //call ifOnboardingPageExists () function to add an app to dashboard

            browser.sleep(2000);
            ifOnboardingPageExists ();

        }, function () {
        });


        var clickOnMenu = protractor.ExpectedConditions;
        browser.wait(clickOnMenu.elementToBeClickable($('.wrapper')), browser.params.elementWait);
        element(by.css('.wrapper')).click();

        // logout from the maestrano
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

    }, browser.params.testWait); //it block end here

}); //describe block end here
