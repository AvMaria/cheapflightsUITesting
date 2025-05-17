const { browser } = require("@wdio/globals");
const TestHelper = require("../helpers/TestHelper");
const data = require("../data/testData.json");

class HomePage {
  get logo() {
    return $(".gPDR-logo-image");
  }

  get sigInButton() {
    return $('//div[@role="button" and .//span[text()="Sign in"]]');
  }

  get fromButton() {
    return $('input[aria-label="Flight origin input"]');
  }

  get toButton() {
    return $('input[aria-label="Flight destination input"][placeholder="To?"]');
  }

  get searchButton() {
    return $('button[role="button"][aria-label="Search"]');
  }

  get departureDateButton() {
    return $('[role="button"][aria-label="Departure date"]');
  }

  departureDateButton(date) {
    return $(`div[role="button"][aria-label*="${date}"]`);
  }

  returnDateButton(date) {
    return $(`div[role="button"][aria-label*="${date}"]`);
  }

  get expediaCheckbox() {
    return $('input[id*="pres-default-"][type="checkbox"]');
  }

  get firsResultItem() {
    return $$('div[role="group"].Fxw9-result-item-container')[1];
  }

  get popUpErrorMessage() {
    const label = data.negative_searchFly.error_message;
    return $(`button[role="button"][aria-label="${label}"]`);
  }

  //navigate to the URL and return the URL
  async navigate(url) {
    await browser.url(url);
    return await browser.getUrl();
  }

  async fieldInput(inputText, value) {
    // Here I receive the input text and the value to set
    await inputText.click();

    //Double backspace to delete the text
    await browser.keys("Backspace");
    await browser.keys("Backspace");

    //check if the value is not empty
    //in 1 test case I set the value to empty string
    if (value != "") {
      await inputText.setValue(value);
      await browser.pause(1000);
      // Because the input is a dropdown, I need to select the first item
      await browser.keys("ArrowDown");
      await browser.pause(1000);
      //I select the first item
      await browser.keys("Enter");
    }
  }

  async pickfromDate() {
    //In from date we pick today date
    // so it will work anytime
    const ariaDate = TestHelper.getFormattedTodayDate();
    //I select the departure date button with the date returned from the helper
    const todayButton = await this.departureDateButton(ariaDate);
    if (!(await todayButton.isDisplayed())) {
      throw new Error("From button is not displayed");
    }
    await todayButton.waitForClickable();
    await todayButton.click();
  }

  async pickToDate() {
    //In this case in the To date we pick the date from today + 2 days
    //you can change the number of days to add and send it as a parameter
    //to the helper function
    const futureDate = TestHelper.getFormattedDateFromToday(2);
    //I select the return date button with the date returned from the helper
    const returnDate = await this.returnDateButton(futureDate);

    if (!(await returnDate.isDisplayed())) {
      throw new Error("Future button is not displayed");
    }
    await returnDate.waitForClickable();

    await returnDate.click();
  }

  async searchFly() {
    const btn = await this.searchButton;
    if (!(await btn.isDisplayed())) {
      throw new Error("Search button is not displayed");
    }
    await btn.click();
  }

  async clickExpediaCheckbox() {
    const expediaCheckbox = await this.expediaCheckbox;
    if (await expediaCheckbox.isDisplayed()) {
      await expediaCheckbox.click();
    }
  }
}
module.exports = new HomePage();
