// That test case verify Company Page

describe('Test case verifies company page:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', browser.params.testWait);
    }, browser.params.elementWait);

    afterAll(function () {
    });

    it('verify my Company page', function () {
        // this fuction checks if onboarding page exists

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

        // check dashboard load properly
        var dash = protractor.ExpectedConditions;
        browser.wait(dash.titleContains('Maestrano - Dashboard - Impac'), browser.params.elementWait);

        var dashtitle = browser.getTitle();
        expect(dashtitle).toBe('Maestrano - Dashboard - Impac');

        element(by.css('.dhb-icon-company')).click();

        // verify company page

        var companyPageMenuItems = element.all(by.css('.nav.nav-tabs li'));
        expect(companyPageMenuItems.get(0).getText()).toBe("Billing");
        expect(companyPageMenuItems.get(1).getText()).toBe("Members");
        expect(companyPageMenuItems.get(2).getText()).toBe("Teams");
        expect(companyPageMenuItems.get(3).getText()).toBe("Settings");

        //logout from Maestrano

        var getcurrentUrl = browser.getCurrentUrl();
        getcurrentUrl.then(function (currentPageUrl) {
            var compTitle = browser.getTitle();
            compTitle.then(function (comptitle) {
                expect(comptitle).toContain('Maestrano - Dashboard - Company');
            });
        });

        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf($('[ng-click="selectBox.toggle()"]')), browser.params.elementWait);
        element(by.css('.wrapper')).click();

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

    }, browser.params.testWait) // it block end here

}); //describe block end here
