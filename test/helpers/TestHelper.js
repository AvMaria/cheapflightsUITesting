/**
 * TestHelper.js
 * Utility functions for WebdriverIO tests
 */

class TestHelper {

    /// Get the current date formatted as "16 May 2025"
    static getFormattedTodayDate() {
        // Get the current date 
        const today = new Date();
        // format the date to "16 May 2025"
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        // Localize the date to Australian English
        const formattedDate = today.toLocaleDateString('en-AU', options); 
        // Replace the last 4 digits (year) with a comma and the year
        const formattedDateWithComma = formattedDate.replace(/ (\d{4})$/, ', $1'); 
        return formattedDateWithComma;
    }

    /// Get the date formatted as "16 May 2025" based on the number of days to add
    static getFormattedDateFromToday(daysToAdd) {
        // Get the current date
        const date = new Date();
        // Add the specified number of days to the current date
        date.setDate(date.getDate() + daysToAdd);
        // Format the date to "16 May 2025"
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        // Localize the date to Australian English
        const formattedDate = date.toLocaleDateString('en-AU', options);
        // Adds a comma before the year in the formatted date (e.g., "16 May 2025" -> "16 May, 2025")
        const formattedDateWithComma = formattedDate.replace(/ (\d{4})$/, ', $1');
        return  formattedDateWithComma;
    }
}

module.exports = TestHelper;