# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Challenge

### Challenge Details

API Endpoint: Digital Product Passport Data
The data provided contains verifiable credentials for a car battery. Your challenge is to fetch this data, process it, and present it in a dynamic and interactive front-end application.

### Requirements

#### Data Handling

Fetch data from the provided API and handle potential errors (e.g., invalid responses, network issues).
Process the data as needed to display key information in a structured manner.

#### Dynamic Interface

Build interactive components to display the data (e.g., expandable sections, filtering options, or sortable tables).
Ensure the application responds to user actions in a meaningful way.

#### Focus on Functionality

Styling is not the primary focus; a basic, clean design is sufficient. However, the UI should be clear and functional.
Ensure the interface is responsive and works on different screen sizes.

#### Interactivity

Include interactive elements such as:
Filters for specific data fields (e.g., product specifications).
Search functionality for quick navigation.
Charts or tables that allow users to explore the data dynamically.

#### Bonus Features (Optional)

Implement creative or innovative ways to visualize complex data to enhance user understanding.
Add features like real-time data updates or additional pages for detailed insights.

### Work log

| Time      | Description                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------- |
| 1-2 Hours | setting up structure and basic configuration, also some time was spend on setting up dev environment. |
| 20 min    | Add Loader component with tests                                                                       |
