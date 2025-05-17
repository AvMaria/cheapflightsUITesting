## Overview

Automated UI regression test suite for ChipFlights using WebdriverIo, Node.js ,Mocha, Chaiand .

## Features

- Automated browser testing with WebdriverIO
- Test organization and execution using Mocha
- Assertions and validations with Chai
- Easy integration and extensibility

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AvMaria/cheapflightsUITesting.git
cd chipflightsUITesting
npm install
```

## For the purposes of this exam, I will provide credentials in this file. However, 
## in a real-world scenario, these should be securely managed and integrated within a CI/CD pipeline.

## In the root directory of your project, create a file named .env

## Add the following environment variables:

BASE_URL=https://www.cheapflights.com.au/


## Running Tests

To execute the test suite, run:

```bash
npm test
```

## Project Structure

- `test/` - Contains all test specifications
- `wdio.conf.js` - WebdriverIO configuration file
