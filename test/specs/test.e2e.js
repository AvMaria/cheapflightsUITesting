const { expect } = require('@wdio/globals')
//const { expect } = require('chai');

const HomePage = require ('../pageobjects/HomePage');




describe('search cheap flight', () => {
    it('should display search resoults', async () => {
        
        await HomePage.navigate();
        //await expect(SecurePage.flashAlert).toBeExisting()
        //await expect(SecurePage.flashAlert).toHaveText(
            //expect.stringContaining('You logged into a secure area!'))
    })
})

