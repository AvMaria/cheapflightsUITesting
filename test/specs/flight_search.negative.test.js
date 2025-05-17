const { expect } = require("chai");
const HomePage = require("../pageobjects/HomePage");

describe("Feature: Search functionality", () => {
    // Before each test we check if the logo and sign-in button are displayed
    // to make sure that the page is loaded correctly
    beforeEach(async () => {

        // Navigate to the home page
        const baseURL = process.env.BASE_URL;
        const url = await HomePage.navigate(baseURL);
        expect(url).to.equal(baseURL);

        // Check if the logo and sign-in button are displayed
        const isLogoDisplayed = await HomePage.logo.isDisplayed();
        expect(isLogoDisplayed).to.be.true;

        // Check if the sign-in button is displayed
        const loginButtonIsDisplayed = await HomePage.sigInButton.isDisplayed();
        expect(loginButtonIsDisplayed).to.be.true;
    });
    
    // Test case for invalid search flight
    it("should show error on invalid input", async () => {
        
        fromButton = await HomePage.fromButton;
        if (!(await fromButton.isDisplayed())) {
            throw new Error("From button is not displayed");
        }
        // I set the value to empty string to simulate invalid input
        await HomePage.fieldInput(fromButton, "");

        toButton = await HomePage.toButton;
        if (!(await toButton.isDisplayed())) {
            throw new Error("To button is not displayed");
        }        
        // I set the value to empty string to simulate invalid input
        await HomePage.fieldInput(toButton, "");

        await browser.pause(5000);

        await HomePage.searchFly();

        await browser.pause(5000);

        // Because the search is invalid, I check if the error message is displayed
        const searchFailedMessage = await HomePage.popUpErrorMessage.isDisplayed();
        
        // validate that the error message is displayed
        expect(searchFailedMessage).to.be.true;

    });
    
    // once the test is done, I clean up the cookies and local storage
    afterEach(async () => {
        try {
            await browser.deleteAllCookies();
            await browser.execute(() => {
                localStorage.clear();
                sessionStorage.clear();
        });
        } catch (err) {
            console.warn("Cleanup failed in afterEach:", err);
        }
    });
});
