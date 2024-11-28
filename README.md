# Track Calorie - Webpack Edition

A calorie tracking application built with JavaScript and Webpack, styled with Bootstrap css.

This application helps users track their daily calorie intake. Built using modern JavaScript and bundled with Webpack for optimized performance.

![Track-Calorie](/src//img/Screenshot%202024-11-28%20143341.png)

[Visit Live Demo](https://merry-basbousa-be2432.netlify.app/)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Authors](#authors)
- [Feedback](#feedback)

## Installation

1. Clone the repository:

```bash
  git clone https://github.com/jakolandio3/tracalorie-webpack.git
  cd track-calorie
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory or follow instructions for global variables and using webpack to store `.env` variables for the following:

```bash
   DEFAULT_CALORIES=your-desired-default-Kcal

  #  with Webpack
  npx webpack --env DEFAULT_CALORIES=your-desired-default-Kcal
```

## Usage

To start the development server, run:

```bash
npm run dev
```

To build the project using Webpack for production, run:

```bash
npm run build
```

## Technologies Used

- `Webpack`: Module bundler for assets and scripts.
- `JavaScript`: Core programming language using modern features.
- `HTML5`: Markup language.
- `Bootstrap css`: A front-end framework for faster and easier styling.
- `Local Storage API`: Local storage using user caching.

## Features

- `Component Creation`: Add/Edit/Delete meals and workouts.
- `Responsive algorithms`: Real-time updates on tracking total calories.
- `Persistent data storage`: Local storage handling persistence of your workouts and meals.
- `Responsive design`: Smooth transitions, tracking sliders and models create an optimized look on both web and mobile.

## Project Structure

```plainText
track-calorie/
├── src/
│   ├── app.js              # Main application entry point
│   ├── Storage.js          # Local storage handling
│   ├── Tracker.js          # Calorie tracking logic
│   └── components/         # UI components
│       └── Modal.js        # Modal component
├── public/
│   └── index.html          # Main HTML file
├── webpack.config.js       # Webpack configuration
├── package.json           # Project dependencies
└── README.md             # Project documentation
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file, Webpack CLI or Global Variables in Tracker.js.

- `DEFAULT_CALORIES`: The desired default Kcal amount.

## Scripts

- `npm run dev:` Start the development server hosted with Webpack.
- `npm run build`: Build the project with Webpack for production.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Authors

- @jakolandio3

## Feedback

If you have any feedback, please reach out to me at [jakobdouglas.dev@gmail.com](mailto:jakobdouglas.dev@gmail.com)
