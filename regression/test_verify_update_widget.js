// That test case verify that create dashboard

describe('Maestrano Production:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 90000);
    }, 900000);

    afterAll(function () {
    });

    it('Verify that create dashboard', function () {

        function ifOnboardingPageExists() {

            var appButton = element.all(by.css('[ui-sref="onboarding.step2"]'));
            var checkButton = protractor.ExpectedConditions;
            browser.wait(checkButton.presenceOf(appButton), 60000);
            appButton.get(1).click();

            //wait for apps category to be loaded properly
            var appsCat = protractor.ExpectedConditions;
            var appCategory = element(by.model('vm.selectedCategory')).$('[value="string:Accounting and Finance"]');
            browser.wait(appsCat.visibilityOf(appCategory), 60000);
            appCategory.click();
            browser.sleep(5000);
            var apps = element.all(by.repeater('app in vm.marketplace.apps | filter:vm.appsFilter | filter:{name: vm.searchTerm}'));
            apps.get(0).click();

            //wait for connect my apps button to be enabled
            var connectButton = protractor.ExpectedConditions;
            var clickOnConnectButton = element(by.buttonText('Connect my apps!'));
            browser.wait(connectButton.elementToBeClickable(clickOnConnectButton), 60000);
            clickOnConnectButton.click();

            //wait for GoTomyDashboard button to be displayed
            var gotoDash = protractor.ExpectedConditions;
            var skip_GoToDashboard = element(by.buttonText('Skip & Go to my dashboard!'));
            browser.wait(gotoDash.visibilityOf(skip_GoToDashboard), 60000);
            skip_GoToDashboard.click();

        } // function ends here
        element(by.id('user_email')).sendKeys('automation@mailinator.com');
        element(by.id('user_password')).sendKeys('Admin123@');
        element(by.buttonText('Sign in')).click();

        // check if onboarding page exists
        var OnBoarding = protractor.ExpectedConditions;
        browser.wait(OnBoarding.titleIs('Maestrano - Dashboard - Welcome'), 10000).then(function onboardingPageExists() {
            //call ifOnboardingPageExists () function to add an app to dashboard

            browser.sleep(2000);
            ifOnboardingPageExists();

        }, function () {
        });

        var dashboard = protractor.ExpectedConditions;
        var dashboardLinkText = element(by.css('.wrapper'));
        browser.wait(dashboard.visibilityOf(dashboardLinkText), 180000);
        expect(dashboardLinkText.isDisplayed()).toBeTruthy();

        var getcurrentUrl = browser.getCurrentUrl();
        getcurrentUrl.then(function (currentPageUrl) {
            var dashTitle = browser.getTitle();
            dashTitle.then(function (dashtitle) {
                expect(dashtitle).toContain('Maestrano - Dashboard - Impac');
            });
        });

        var widgetlist = protractor.ExpectedConditions;
        var newwidgetlist = element(by.id('widget-selector'));
        browser.wait(widgetlist.presenceOf(newwidgetlist), 180000);
        expect(newwidgetlist.isPresent()).toBeTruthy();

        var wButton = element(by.css('[ng-click="onDisplayWidgetSelector()"]'));

        var widgetButton = protractor.ExpectedConditions;
        browser.wait(widgetButton.visibilityOf(wButton), 50000);
        wButton.click();

        var categories = element.all(by.css('.col-md-12 p'));
        expect(categories.getText()).toEqual(['Accounting', 'Invoicing', 'HR / Payroll', 'Sales', '']);
        categories.get(0).click();

        var widgets = element.all(by.repeater('widgetTemplate in getWidgetsForSelectedCategory()'));
        widgets.get(0).click();

        var wSettingButton = element(by.css('[ng-click="toggleEditMode()"]'));

        browser.sleep(2000);
        wSettingButton.click();

        var timeRanges = element(by.model('selectedPreset'));

        browser.sleep(2000);
        timeRanges.$('[label="Last 4 quarters"]').click();

        var chartInterval = element(by.model('timePeriodSetting.period'));
        browser.sleep(2000);

        chartInterval.$('[label="WEEKLY"]').click();
        browser.sleep(1000);

        element(by.buttonText('Save')).click();

        var wSettingButton = element(by.css('[ng-click="toggleEditMode()"]'));
        browser.sleep(2000);
        wSettingButton.click();

        browser.sleep(2000);

        var chartInterval = element(by.model('timePeriodSetting.period'));
        var getLabelInterval = chartInterval.$('[label="WEEKLY"]').getAttribute('label');
        expect(getLabelInterval).toEqual("WEEKLY");


        EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(element(by.css('.wrapper'))), 5000);
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

    }, 900000) // it block end here

}); //describe block end here
