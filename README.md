# Scheduler Application

## Overview

The Scheduler Application is a React-based application that leverages the DayPilot Scheduler library to display and manage scheduling events. The application supports features like adding events, navigating through months, exporting schedules to PDF, and toggling between light and dark modes. Additionally, it includes a country selector using the ReactFlagsSelect component.

## Demo

You can view a live demo of the application [here](https://scheduler-react-khushi.netlify.app).

## Features

- **Event Management**: Create and view events on a daily scale.
- **Dark Mode**: Toggle between light and dark themes.
- **PDF Export**: Export the scheduler view to a PDF document.
- **Navigation**: Navigate through different months and jump to the current date.
- **Country Selector**: Select a country using the ReactFlagsSelect component.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/scheduler-app.git
   cd scheduler-app
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start the application**:
   ```sh
   npm start
   ```

## Usage

### Adding Events

- Click and drag to select a time range on the scheduler.
- Enter the event name in the prompt that appears and click "OK" to save.

### Navigating

- Use the `<` and `>` buttons to navigate to the previous and next months, respectively.
- Click "Today" to jump to the current date.

### Exporting to PDF

- Click the "Export to PDF" button (if available) to download the current scheduler view as a PDF document.

### Dark Mode Toggle

- Use the toggle switch in the footer to switch between light and dark modes.

### Country Selector

- Select a country from the dropdown menu provided by the ReactFlagsSelect component.

## Code Structure

- **src/components/Scheduler.js**: Main component for the scheduler.
- **src/assets/**: Directory for image assets.
- **src/scheduler.css**: CSS for styling the scheduler component.

## Dependencies

- **react**: JavaScript library for building user interfaces.
- **daypilot-pro-react**: DayPilot Scheduler component for React.
- **jspdf**: Library to generate PDF documents.
- **moment**: Library for date and time manipulation.
- **react-flags-select**: Country selector component.

## Configuration

The scheduler configuration is managed through the `config` state variable. Key settings include:

- **cellWidth**: Width of each cell.
- **cellHeight**: Height of each cell.
- **rowHeaderWidth**: Width of the row header.
- **timeHeaders**: Configuration for time headers.
- **days**: Number of days displayed.
- **scale**: Time scale (e.g., "Day").
- **startDate**: Start date of the scheduler.

### Custom Event Rendering

Events can be customized using the `onBeforeEventRender` function to change their appearance based on conditions, such as the associated resource.

### PDF Export

The `exportToPdf` function handles exporting the scheduler view to a PDF document. It splits the view into pages based on the number of rows per page and adjusts image dimensions accordingly.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to reach out to [your.email@example.com](mailto:your.email@example.com).

## Reflection

### 3 Things Learned

1. **Integration of DayPilot Scheduler**: Understanding how to integrate and customize the DayPilot Scheduler in a React application.
2. **PDF Export Functionality**: Learning how to export scheduler views to PDF using the jsPDF library.
3. **Dark Mode Implementation**: Implementing a dark mode toggle for better user experience.

### Most Difficult Part

The most challenging part was ensuring the PDF export functionality worked seamlessly with various configurations and rendered the scheduler view correctly across multiple pages.

### What Would Have Done Differently

Given more time, I would improve the user interface for a more polished look, enhance error handling and validation for event creation, and implement additional features like recurring events and more advanced filtering options.

---

This README file provides a comprehensive guide to understanding, installing, and using the Scheduler Application. If you have any further questions, please do not hesitate to contact us.