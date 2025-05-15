const { browser } = require('@wdio/globals')

 class HomePage {
  
  
    async navigate(){
        await browser.url('https://www.cheapflights.com.au/')
    }      
    
}
module.exports = new HomePage();