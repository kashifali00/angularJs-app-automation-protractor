
describe('That test case verifies currency selection:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', browser.params.testWait);
    }, browser.params.testWait);

    afterAll(function () {
    });

    it('verify currency selection', function () {

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
            var skipGoToDashboard = element(by.buttonText('Skip & Go to my dashboard!'));
            browser.wait(gotoDash.visibilityOf(skipGoToDashboard), browser.params.elementWait);
            skipGoToDashboard.click();

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

        var dashboard = protractor.ExpectedConditions;
        var dashboardLinkText = element(by.css('.wrapper'));
        browser.wait(dashboard.visibilityOf(dashboardLinkText), browser.params.elementWait);
        expect(dashboardLinkText.isDisplayed()).toBeTruthy();

        var getcurrentUrl = browser.getCurrentUrl();
        getcurrentUrl.then(function (currentPageUrl) {
            var dashTitle = browser.getTitle();
            dashTitle.then(function (dashtitle) {
                expect(dashtitle).toContain('Maestrano - Dashboard - Impac');
            });
        });
        
        var currencyCond = protractor.ExpectedConditions;
        var currencySelect = element(by.model("data.currency"));
        browser.wait(currencyCond.visibilityOf(currencySelect), browser.params.elementWait);

        // click on currency select drop down
        currencySelect.click();
        
        // verify the list of available currencies
        var currencyUSD = currencySelect.$("[label='USD']").getText();
        expect(currencyUSD.getText()).toBe("USD");
        
        var currencyAUD = currencySelect.$("[label='AUD']").getText();
        expect(currencyAUD.getText()).toBe("AUD");
        
        var currencyCAD = currencySelect.$("[label='CAD']").getText();
        expect(currencyCAD.getText()).toBe("CAD");
        
        var currencyCNY = currencySelect.$("[label='CNY']").getText();
        expect(currencyCNY.getText()).toBe("CNY");
        
        var currencyEUR = currencySelect.$("[label='EUR']").getText();
        expect(currencyEUR.getText()).toBe("EUR");
        
        var currencyGBP = currencySelect.$("[label='GBP']").getText();
        expect(currencyGBP.getText()).toBe("GBP");
        
        var currencyINR = currencySelect.$("[label='INR']").getText();
        expect(currencyINR.getText()).toBe("INR");
        
        var currencyJPY = currencySelect.$("[label='JPY']").getText();
        expect(currencyJPY.getText()).toBe("JPY");
        
        var currencyNZD = currencySelect.$("[label='NZD']").getText();
        expect(currencyNZD.getText()).toBe("NZD");
        
        var currencySGD = currencySelect.$("[label='SGD']").getText();
        expect(currencySGD.getText()).toBe("SGD");
        
        var currencyPHP = currencySelect.$("[label='PHP']").getText();
        expect(currencyPHP.getText()).toBe("PHP");
        
        var currencyAED = currencySelect.$("[label='AED']").getText();
        expect(currencyAED.getText()).toBe("AED");
        
        var currencyIDR = currencySelect.$("[label='IDR']").getText();
        expect(currencyIDR.getText()).toBe("IDR");
        
        // select AUD currency
        currencySelect.$("[label='AUD']").click();
        
        // verify that AUD currency was selected properly
        var getCurrencyAUD = currencySelect.$("[selected='selected']").getText();
        expect(getCurrencyAUD).toBe("AUD");
        browser.sleep(1000);
    
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf($('.wrapper')), browser.params.elementWait);
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

    }, browser.params.testWait) // it block end here

}); //describe block end here
