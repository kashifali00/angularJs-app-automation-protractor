// That test case verify that view dashboard list

describe('This test verifies dashboard list :', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', browser.params.testWait);
    }, browser.params.testWait);

    afterAll(function () {
    });

    it('Dashboard list', function () {
        
        function createDashboard () {
            
            // creating dashboard list here
            
            browser.sleep(3000)
            var createdashboard1 = protractor.ExpectedConditions;
            browser.wait(createdashboard1.visibilityOf(element(by.buttonText('Create Dashboard'))), browser.params.elementWait);
            
            element(by.buttonText('Create Dashboard')).click();

            //wait for Popup to appear
            var companyField = protractor.ExpectedConditions;
            browser.wait(companyField.visibilityOf($('.modal-content')), browser.params.elementWait);

           //Send dasboard name to Textbox
            element(by.model('model.name')).sendKeys('dashboard1');

            element(by.buttonText('Add')).click();
        
            browser.sleep(6000);
            
            element(by.buttonText('Create Dashboard')).click();
            
            var companyField = protractor.ExpectedConditions;
            browser.wait(companyField.visibilityOf($('.modal-content')), browser.params.elementWait);

            //Send dasboard name to Textbox
            element(by.model('model.name')).sendKeys('dashboard2');

            element(by.buttonText('Add')).click();
           
            browser.sleep(3000);
           
            element(by.css('[ng-click="toggleShowDashboardsDropdown()"]')).click();
            var getDashboardList = element.all(by.repeater('dhb in dashboardsList'));
            expect(getDashboardList.count()).toBe(2);
        }

        function ifOnboardingPageExists () {

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

        var dash_link = protractor.ExpectedConditions;

        var dropDownDashboard = element(by.css('[ng-click="toggleShowDashboardsDropdown()"]'));
        browser.wait(dash_link.visibilityOf(dropDownDashboard), 10000).then( function success() {
            element(by.css('[ng-click="toggleShowDashboardsDropdown()"]')).click();

        // Verifying dashboard list here but first we need to delete all dashboard and create new ones and then compare those
        // it could be possible someone later can add new dashboard and test would be failed if the dashboard count or dashboard names are
        // hard coded. so make it more generic we must need to cater this situation

        var getDashboardList = element.all(by.repeater('dhb in dashboardsList'));
        getDashboardList.count().then(function (dashboardListCount) {
            for(var dash=0; dash<dashboardListCount; dash++) {
                var createdashboard = protractor.ExpectedConditions;
                browser.wait(createdashboard.visibilityOf(element(by.css('.fa.fa-trash-o'))), browser.params.elementWait);
                browser.sleep(1000);
                element(by.css('.fa.fa-trash-o')).click();

                var companyField = protractor.ExpectedConditions;
                browser.wait(companyField.visibilityOf($('.modal-content')), browser.params.elementWait);

                element(by.buttonText('Delete')).getAttribute('disabled').then(function (attr_disable) {
                    expect(attr_disable).toBeFalsy();

                })

                element(by.buttonText('Delete')).click();

            }
            
            // After deleting the dashboard we must need to create new ones which we know the names. so the list can be compared
            createDashboard ();
        });

        }, function failure () {
            
            // failure is the case when there would be no dashboard initially, so let create few dashbarod here so that we could compare the dashboard list later
            
            createDashboard ();

        });
        
        browser.sleep(1000);

        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf($('.wrapper')), browser.params.elementWait);
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