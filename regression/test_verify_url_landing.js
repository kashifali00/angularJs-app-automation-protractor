// That test case verify that Maestrano production url is accessible through browser

describe('Maestrano Production:', function () {

    beforeAll(function () {
        browser.get(browser.params.host + '/mnoe/auth/users/sign_in', 60000);
    });

    afterAll(function () {
    });

    it('verify that maestrano production url is accessible through browser', function () {
        var getTitle = browser.getTitle();
        getTitle.then(function (title) {
            expect(title).toContain('Maestrano');
        });
    }) // it block end here

}); //describe block end here
