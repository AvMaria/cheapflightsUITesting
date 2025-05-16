const { expect } = require('chai');
const HomePage = require('../pageobjects/HomePage');


describe('Feature: Search functionality', () => {   
    beforeEach(async () => {
        const baseURL = process.env.BASE_URL;
        const url = await HomePage.navigate(baseURL);
        expect(url).to.equal(baseURL);
        const isLogoDisplayed = await HomePage.logo.isDisplayed();
            expect(isLogoDisplayed).to.be.true;

            const loginButtonIsDisplayed = await HomePage.sigInButton.isDisplayed();
            expect(loginButtonIsDisplayed).to.be.true;


       
    })   

    it('Should navigate to home page and display results based on a valid search input', async () => {   

           
            //I think all this function can be set togeter as one method in home page  
            await HomePage.fieldInput(HomePage.fromButton,"Brisbane");
            await HomePage.fieldInput(HomePage.toButton,"Sydney");
            //await HomePage.selectDepartureDate
            await HomePage.pickfromDate();
            await HomePage.pickToDate()
            await HomePage.clickExpediaCheckbox()
            await browser.pause(5000)
            await HomePage.searchFly();            
            await browser.pause(5000)
            //needs to be cleaned up
            const currentUrl = await browser.getUrl();
            expect(currentUrl).contain('/flight-search');            
            const flysearchresult = await HomePage.firsResultItem.isDisplayed();
            expect(flysearchresult).to.be.true
            await browser.pause(5000);
    });
    it('should show error on invalid input', async () => {
        await HomePage.fieldInput(HomePage.fromButton,"");
        await HomePage.fieldInput(HomePage.toButton,"");
        //await HomePage.clickExpediaCheckbox()
        await browser.pause(5000)
        await HomePage.searchFly();            
        await browser.pause(5000)
        const searchFailedMessage = await HomePage.popUpErrorMessage.isDisplayed();
        expect (searchFailedMessage).to.be.true

    })
    afterEach(async () => {
        // Clean up after each test (e.g., clear cookies)
        await browser.deleteAllCookies();
        await browser.execute(() => {
        localStorage.clear();
        sessionStorage.clear();
        });
    });
});
