// setup the reporting

var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: 'reports',
    filename: 'report.html',
    showSummary: true,
    reportTitle: "Regression suite",
    cleanDestination: true
});

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    framework: 'jasmine2',
    specs: ['test_verify_create_dashboard.js'],

    getPageTimeout: 120000,

    params: {
	    host: "https://get.maestrano.com",
        testWait: 1800000,
        elementWait: 60000,
        onboardingPage: 10000

    },

    restartBrowserBetweenTests: false,

    suites: {
        //regression tests
        regression:
              ['test_verify_url_landing.js',
                'test_verify_invalid_password.js',
                'test_verify_sigin_button_disabled.js',
                'test_verify_terms_of_uselink.js',
                'test_verify_sign_up_link.js',
                'test_verify_create_myacc_button.js',
                'test_verify_forgot_password.js',
                'test_verify_pass_reset_email.js',
                'test_verify_sigin_linkedin_sso.js',
                'test_verify_mail_recv_inbox.js',
                'test_verify_create_dashboard.js',
                'test_verify_adding_new_company.js',
                'test_verify_logged_in.js',
                'test_verify_sigin_intuit_sso.js',
                'test_verify_sigin_facebook_sso.js',
                'test_verify_pass_change_reset.js'

              ]
    },

    capabilities: {
        browserName: 'chrome'
    },

    directConnect: false,

    onPrepare: function () {
        // By default, Protractor use data:text/html,<html></html> as resetUrl, but
        // location.replace from the data: to the file: protocol is not allowed
        // (we'll get ‘not allowed local resource’ error), so we replace resetUrl with one
        // with the file: protocol (this particular one will open system's root folder)

        browser.manage().window().setSize(1600, 1000);
        jasmine.getEnv().addReporter(reporter);
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        jasmineNodeOpts: {
            defaultTimeoutInterval: 2500000
        }
    }
}
