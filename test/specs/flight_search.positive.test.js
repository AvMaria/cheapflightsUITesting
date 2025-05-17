const { expect } = require("chai");
const HomePage = require("../pageobjects/HomePage");
const data = require("../data/testData.json");

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

  // Test case for valid search input
  it("Should navigate to home page and display results based on a valid search input", async () => {
    
    const fromButton = await HomePage.fromButton;
    if (!(await fromButton.isDisplayed())) {
      throw new Error("From button is not displayed");
    }
    // I set the origin to the value from the test data
    await HomePage.fieldInput(fromButton, data.positive_searchFly.from);

    const toButton = await HomePage.toButton;
    if (!(await toButton.isDisplayed())) {
      throw new Error("To button is not displayed");
    }
    // I set the destination to the value from the test data
    await HomePage.fieldInput(toButton, data.positive_searchFly.to);
   
    await HomePage.pickfromDate();
    await HomePage.pickToDate();

    // I check this otherwise it will open a new tab
    await HomePage.expediaCheckbox.click();

    await browser.pause(5000);

    await HomePage.searchFly();

    await browser.pause(5000);

    //I get the current URL to check if the search was successful
    const currentUrl = await browser.getUrl();
    expect(currentUrl).contain("/flight-search");

    // I get the first result item to check if the search was successful
    const flysearchresult = await HomePage.firsResultItem.isDisplayed();

    //validate that the first result item is displayed
    // this means that the search was successful
    expect(flysearchresult).to.be.true;
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
