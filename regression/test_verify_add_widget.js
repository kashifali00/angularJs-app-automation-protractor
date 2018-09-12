describe('That test case verifies create widget functionality:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', browser.params.testWait);
    }, browser.params.wait);

    afterAll(function () {
    });

    it('Verify that widget is added successfully', function () {

        // this function add widget to dashboard
        function addWidget () {

            browser.sleep(3000);

            var buttonAddWidget = element(by.buttonText('Add Widget'));
            buttonAddWidget.isEnabled().then(function buttonEnabled () {
                buttonAddWidget.click();
            }, function buttonNotEnabled () {

            });

            // select Accounting category and add all widget for that category
            var categories = element.all(by.css('.col-md-12 p'));
            categories.get(0).click();

            var widgets = element.all(by.repeater('widgetTemplate in getWidgetsForSelectedCategory()'));
            widgets.count().then(function (total) {

                for(var wid=0; wid<total; wid++) {
                    widgets.get(wid).click();
                    browser.sleep(1000);
                    element(by.buttonText('Add Widget')).click();

                }

            });

            // refresh the browser and check the count of widget
            browser.refresh();

            browser.sleep(1000);
            var dashboardList = element.all(by.repeater('widget in currentDhb.widgets'));
            expect(dashboardList.count()).toEqual(widgets.count());

            // now delete the dashboard to make it less messy for other tests

            var createdashboard = protractor.ExpectedConditions;
            browser.wait(createdashboard.visibilityOf(element(by.css('.fa.fa-trash-o'))), browser.params.elementWait);
            element(by.css('.fa.fa-trash-o')).click();

            var companyField = protractor.ExpectedConditions;
            browser.wait(companyField.visibilityOf($('.modal-content')), browser.params.elementWait);

            element(by.buttonText('Delete')).getAttribute('disabled').then(function (attr_disable) {
                expect(attr_disable).toBeFalsy();

            })

            element.all(by.buttonText('Delete')).first().click();
        }

        // this function creates dashboard
        function createDashboard () {

            // creating dashboard list here
            var createdashboard1 = protractor.ExpectedConditions;
            browser.wait(createdashboard1.visibilityOf(element(by.buttonText('Create Dashboard'))), browser.params.elementWait);

            element(by.buttonText('Create Dashboard')).click();

            //wait for Popup to appear
            var companyField = protractor.ExpectedConditions;
            browser.wait(companyField.visibilityOf($('.modal-content')), browser.params.elementWait);

           //Send dasboard name to Textbox
            element(by.model('model.name')).sendKeys('dashboard1');

            element(by.buttonText('Add')).click();

        }

        // this function verifies if onboarding page exists then add app for initial onboarding
        function ifOnboardingPageExists() {

            browser.sleep(2000);
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

        // first we need to check if there is existing dashboard preset. if not then create the dashboard first then add widget to it

        var dash_link = protractor.ExpectedConditions;

        var dropDownDashboard = element(by.css('[ng-click="toggleShowDashboardsDropdown()"]'));
        browser.wait(dash_link.visibilityOf(dropDownDashboard), 10000).then( function success() {

            // dashboard is already present, now add widget to it
            addWidget();

        }, function failure () {

            // failure is the case when there would be no dashboard initially, so let create first create dashbarod here
            // so that we could add widget to it

            createDashboard ();
            addWidget();

        });

        browser.sleep(2000);
        EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.css('.wrapper'))), browser.params.elementWait);
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
    }, browser.params.testWait); // it block ends here

}); // describe block ends here
