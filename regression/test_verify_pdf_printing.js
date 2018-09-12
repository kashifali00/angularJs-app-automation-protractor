describe('Maestrano Production:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 60000);

    }, 900000);

    afterAll(function () {
    });

    it('Verify that PDF printing', function () {
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

        var dashboardtitle = 'new auto_dashboard';

        var dashTitle = protractor.ExpectedConditions;
        browser.wait(dashTitle.titleContains('Maestrano - Dashboard - Impac'), 90000);

        var getTitle = browser.getTitle();
        expect(getTitle).toBe('Maestrano - Dashboard - Impac');

        //Check if dashboard exist or not if not then add new dashboard
        element(by.css('[ng-click="toggleShowDashboardsDropdown()"]')).isDisplayed().then(function (result) {
            if (!result) {

                var createdashboard = protractor.ExpectedConditions;
                browser.wait(createdashboard.visibilityOf(element(by.buttonText('Create Dashboard'))), 50000);
                element(by.buttonText('Create Dashboard')).click();

                var companyField = protractor.ExpectedConditions;
                browser.wait(companyField.visibilityOf($('.modal-content')), 5000);

                element(by.model('model.name')).sendKeys(dashboardtitle);

                element(by.buttonText('Add')).getAttribute('disabled').then(function (attr_disable) {
                    expect(attr_disable).toBeFalsy();
                });

                element(by.buttonText('Add')).click();
            }
        });

        //check if widget exist or not if not add new widgets
        element.all(by.repeater('widget in currentDhb.widgets')).isDisplayed().then(function (result) {
            if (!result) {
                var categories = element.all(by.css('.col-md-12 p'));

                expect(categories.getText()).toEqual(['Accounting', 'Invoicing', 'HR / Payroll', 'Sales', '']);

                categories.get(0).click();

                var widgets = element.all(by.repeater('widgetPattern in getWidgetsForSelectedCategory()'));
                widgets.count().then(function (total) {
                    for (var wid = 0; wid < total; wid++) {
                        widgets.get(wid).click();
                        browser.sleep(1000);
                        element(by.buttonText('Add Widget')).click();
                    }
                });
            }
        });

        //check if print button is displayed/present or not
        var printbutton = protractor.ExpectedConditions;
        var printicon = element(by.css('.fa.fa-print'));
        browser.wait(printbutton.elementToBeClickable(printicon), 180000);
        expect(printicon.isPresent()).toBeTruthy();

        //click on print button
        element(by.css('.fa.fa-print')).click();

        //check if dashboard title is visible at print paga or not
        var companyField = protractor.ExpectedConditions;
        browser.wait(companyField.visibilityOf($('.dashboard-title.ng-binding')), 5000);

        var dashboard_title = element.all(by.css('.dashboard-title.ng-binding'));
        expect(dashboard_title.getText()).toContain('auto updated dashboard');

        element.all(by.css('[ng-click="print()"]')).click();

        var print_view = protractor.ExpectedConditions;
        var print_view_visible = element(by.css('.focus-outline-visible'));
        browser.wait(print_view.presenceOf(print_view_visible), 180000);
        expect(print_view_visible.isPresent()).toBeTruthy();

        element.all(by.buttonText('Save')).click();

    }, 900000); // it block ends here

}); // describe block ends here