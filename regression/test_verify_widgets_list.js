
describe('That test case verifies dashboard widgets list:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', browser.params.testWait);
    }, browser.params.testWait);

    afterAll(function () {
    });

    var index_accounting = 0;
    var index_invoicing = 0;
    var index_hr = 0;
    var index_sales = 0;

    var wid_list_accounting = ["Account balance", "Accounts comparison", "Expenses / Revenue", "Payable / Receivable",
                                "Assets summary", "Liabilities summary", "Assets / Liabilities summary", "Assets vs Liabilities",
                                "Custom calculation", "EBITDA", "Overall turnover", "Cash summary", "Balance sheet", "Profit & Loss",
                                "Expense to total expenses", "Expense to turnover", "Detailed accounts classes",
                                "Accounts classes comparison"
    ];

    var wid_list_invoicing = ["Invoices list", "Paid invoices", "Due invoices", "All invoices", "Purchase orders list", "Paid purchase orders",
                              "Due purchase orders", "All purchase orders", "Top-customers summary", "Aged payables and receivables"
    ];

    var wid_list_hr = ["Workforce summary", "Salaries summary", "Employees list", "Employee details", "Payroll taxes",
                       "Superannuation balance", "Leave balance", "Payroll summary", "Timesheets"
    ];

    var wid_list_sales = ["Sales summary", "Sales by location", "Sales by industry", "Sales by customer", "Sales list", "Growth per product",
                          "Sales by price range", "Customer details", "Gross margin", "Aged sales", "Sales comparison", "Leads list",
                          "Number of leads", "Sales cycle", "Leads funnel", "Opportunities funnel", "Top opportunities", "Break-even",
                          "Sales forecast", "Net sales", "Team performance", "Top Customers By Sales", "New vs Existing Customers"
    ];

    it('Verify that list of available widgets', function () {

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

        var widgetlist = protractor.ExpectedConditions;
        var newwidgetlist = element(by.id('widget-selector'));
        browser.wait(widgetlist.presenceOf(newwidgetlist), browser.params.testWait);
        expect(newwidgetlist.isPresent()).toBeTruthy();
        
        var categories = element.all(by.css('.col-md-12 p'));
        categories.get(0).click();

        var widgets = element.all(by.repeater('widgetPattern in getWidgetsForSelectedCategory()'));
        widgets.count().then(function (total_account) {

            for (var wid_account= 0; wid_account<total_account; wid_account++) {
                widgets.get(wid_account).getText().then(function (widgetText) {

                    expect(widgetText).toBe(wid_list_accounting[index_accounting]);
                    index_accounting++
                });
            }
        });
        for (var cat=1; cat<3; cat++) {
            categories.get(cat).click();

            var widgets = element.all(by.repeater('widgetPattern in getWidgetsForSelectedCategory()'));
            widgets.count().then(function (total_invoice) {

                for (var wid_invoice=0; wid_invoice<total_invoice; wid_invoice++) {
                    widgets.get(wid_invoice).getText().then(function (widgetText) {
                        expect(widgetText).toBe(wid_list_invoicing[index_invoicing]);
                        index_invoicing++
                    });
                }
            });

            categories.get(2).click();

            var widgets = element.all(by.repeater('widgetPattern in getWidgetsForSelectedCategory()'));
            widgets.count().then(function (total_hr) {

                for (var wid_hr=0; wid_hr<total_hr; wid_hr++) {
                    widgets.get(wid_hr).getText().then(function (widgetText) {
                        expect(widgetText).toBe(wid_list_hr[index_hr]);
                        index_hr++
                    });
                }
            });

            categories.get(3).click();

            var widgets = element.all(by.repeater('widgetPattern in getWidgetsForSelectedCategory()'));
            widgets.count().then(function (total_sales) {

                for (var wid_sal=0; wid_sal<total_sales; wid_sal++) {
                    widgets.get(wid_sal).getText().then(function (widgetText) {
                        expect(widgetText).toBe(wid_list_sales[index_sales]);
                        index_sales++
                    });
                }
            });
        }

        EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(element(by.css('.wrapper'))), browser.params.elementWait);
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
