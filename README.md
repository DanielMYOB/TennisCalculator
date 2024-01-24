# Tennis Calculator Project

Welcome to the Tennis Calculator project! This calculator is designed to assist you with various tennis-related calculations.

## Getting Started

Follow the steps below to set up and run the Tennis Calculator on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Open your terminal and navigate to the project directory.

2. Run the following command to install the project dependencies:

```bash
npm install
```

### Running the Project

To start the Tennis Calculator, use the following command:

```bash
npm start
```

### Running tests

```bash
npm run test
```

### Usage

Use arrows to navigate through the menu, and enter to select:

-> Upload file option takes a relative path from root.
Example: `./data/full_tournament.txt`

-> Query match result takes the match number as an integer.
Example: `1`

-> Get player results takes the name of the player.
Example: `Person A`

### Usage With Docker

# Build Container

`docker build -t tenniscalculator .`

# Run Container

`docker run -it -p 3000:3000 tenniscalculator`

### Assumptions

Have tried to set this project out somewhat similar to how a read-world application might be. The reason for example I have put `Output` into it's own class (just being a wrapper for console.log), is to simulate some kind of logging middleware, and not cluttering main logic with console.logs.

If spending more time, I would refine the test cases especially around game logic, I'm mostly familiar with the basics of tennis but not sure I've covered all testing scenarios.

I would also set up things in Github/Buildkite with unit test/linting steps, etc.
