const { browser } = require('@wdio/globals')
const logger = require('@wdio/logger').default;
const log = logger('MiTest');



 class HomePage {
    
   
  
    
    
    get logo() {
      return $('.gPDR-logo-image');      
    }

    get sigInButton(){
      return $('//div[@role="button" and .//span[text()="Sign in"]]')
    } 
    
    get fromButton(){
      return $('input[aria-label="Flight origin input"]');
    }
    get toButton(){
      return $('input[aria-label="Flight destination input"][placeholder="To?"]')
    }

    get searchButton(){
      return $('button[role="button"][aria-label="Search"]')

    }

    get departureDateButton(){
      return $('[role="button"][aria-label="Departure date"]')
    }    

    get expediaCheckbox(){
      return $('input[id*="pres-default-"][type="checkbox"]');
    }

    get firsResultItem(){

      const secondItem =  $$('div[role="group"].Fxw9-result-item-container')[1];
      return secondItem;
    }

    get popUpErrorMessage(){
      return $('button[role="button"][aria-label="An error occurred while trying to perform your search"]');
    }

    async navigate(url){
      await browser.url(url)
      return await browser.getUrl();
    } 

    async fieldInput(button,value){
      await button.click()
      await browser.keys('Backspace'); 
      await browser.keys('Backspace'); 
      if (value!=""){
        await button.setValue(value);
        await browser.pause(1000) // improvment
      await browser.keys('ArrowDown');
      await browser.pause(1000)//improvment
      await browser.keys('Enter');    
      }     
    }
//i think this function is not required
    // async selectDepartureDate (){
    //   await this.departureDateButton.click
    // }
    //it needs to be cleaned up
    async pickfromDate (){

      // 1. Get today's date and format it
      const today = new Date();
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-AU', options); // "16 May 2025"
      const ariaDate = formattedDate.replace(/ (\d{4})$/, ', $1');// "16 May, 2025"

      // 2. Use it in a selector
      const todayButton = await $(`div[role="button"][aria-label*="${ariaDate}"]`);
      await todayButton.waitForClickable();
      await todayButton.click();
    }
    async pickToDate (){

      // 1. Get today's date and format it
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = tomorrow.toLocaleDateString('en-AU', options); // "16 May 2025"
      const ariaDate = formattedDate.replace(/ (\d{4})$/, ', $1');// "16 May, 2025"

      // 2. Use it in a selector
      const todayButton = await $(`div[role="button"][aria-label*="${ariaDate}"]`);
      await todayButton.waitForClickable();
      await todayButton.click();
    }

    async searchFly (){
      await this.searchButton.click();
    }
    async clickExpediaCheckbox (){
      await this.expediaCheckbox.click();
    }

    async searchResult(){
      await this.firsResultItem.waitForClickable()      
    }


      
   
    
 }
module.exports = new HomePage();