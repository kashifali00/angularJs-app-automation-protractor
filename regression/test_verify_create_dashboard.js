// That test case verify that create dashboard

describe('Test case verifies create dashboard functionality:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', browser.params.testWait);
    }, browser.params.testWait);

    afterAll(function () {
    });

    it('Verify that dashboard is created successfully', function () {

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

        var OnBoardingPage = protractor.ExpectedConditions;
        browser.wait(OnBoardingPage.titleIs('Maestrano - Dashboard - Welcome'), browser.params.onboardingPage).then(function onboardingPageExists() {
            //call ifOnboardingPageExists () function to add an app to dashboard

            ifOnboardingPageExists();

        }, function () {
        });

        var menu = protractor.ExpectedConditions;
        var menuLogout = element(by.css('.wrapper'));
        browser.wait(menu.presenceOf(menuLogout), browser.params.elementWait);
        expect(dashboardLinkText.isPresent()).toBeTruthy();

        var getcurrentUrl = browser.getCurrentUrl();
        getcurrentUrl.then(function (currentPageUrl) {
            var dashTitle = browser.getTitle();
            dashTitle.then(function (dashtitle) {
                expect(dashtitle).toContain('Maestrano - Dashboard - Impac');
            });
        });

        // Creating new dashboard here

        //wait for title
        var dash = protractor.ExpectedConditions;
        browser.wait(dash.titleContains('Maestrano - Dashboard - Impac'), browser.params.elementWait);
        //check if title to be "Maestrano - Dashboard - Impac"
        var dashtitle = browser.getTitle();
        expect(dashtitle).toBe('Maestrano - Dashboard - Impac');

        //wait for "Create Dasboard" to be Displayed

        var createdashboard = protractor.ExpectedConditions;
        browser.wait(createdashboard.visibilityOf(element(by.buttonText('Create Dashboard'))), browser.params.elementWait);
        element(by.buttonText('Create Dashboard')).click();

        //wait for Popup to appear
        var companyField = protractor.ExpectedConditions;
        browser.wait(companyField.visibilityOf($('.modal-content')), browser.params.elementWait);

        //Send dasboard name to Textbox
        element(by.model('model.name')).sendKeys('automated dashboard');

        element(by.buttonText('Add')).click();
        // wait for create dashboard dialog box to be disappeared
        browser.sleep(5000);

        // Logout from Maestrano
        var logout = protractor.ExpectedConditions;
        var logOutMenu = element(by.css('.wrapper'));
        browser.wait(logout.elementToBeClickable(logOutMenu), browser.params.elementWait);
        logOutMenu.click();


        var logoutButton = protractor.ExpectedConditions;
        browser.wait(logoutButton.presenceOf(element.all(by.css('[ui-sref="logout"]'))), browser.params.elementWait);

        element.all(by.css('[ui-sref="logout"]')).first().click();

        // verify logout successful

        var getcurrentUrl = browser.getCurrentUrl();
        getcurrentUrl.then(function (currentPageUrl) {
            var dashTitle = browser.getTitle();
            dashTitle.then(function (dashtitle) {
                expect(dashtitle).toContain('Maestrano');
            });
        });

    }, browser.params.testWait) // it block end here

}); //describe block end here
