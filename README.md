# @gautamgiri/simple-react-table

A customizable and lightweight React table component with advanced features such as pagination, searching, filtering, sorting, auto serial counts, auto checkboxes, and more. Easily integrate and configure to meet your project's table requirements with minimal effort.

## Features

- **Pagination Support**: Easily paginate large datasets.
- **Search Functionality**: Search through table data with customizable search options.
- **Filtering Options**: Apply filters to specific columns or across the entire dataset.
- **Sorting**: Enable sorting for individual columns.
- **Auto Serial Counts**: Automatically generate a serial number column.
- **Auto Checkboxes**: Add a checkbox column to select rows.
- **Custom Click Listeners**: Attach custom event handlers to table rows and cells.
- **Customizable**: Customize column headers, table styles, pagination, and more.

## Installation

```bash
npm install @gautamgiri/simple-react-table
```

Or using yarn:
```bash
yarn add @gautamgiri/simple-react-table
```

## Usage
Here’s how to use the SimpleReactTable component in your project:

```tsx
import React from 'react';
import SimpleReactTable from '@gautamgiri/simple-react-table';

const data = [
  { id: 1, name: "John Doe", age: 28 },
  { id: 2, name: "Jane Smith", age: 32 },
  // Add more data here...
];

const headers = {
  id: { label: "ID" },
  name: { label: "Name" },
  age: { label: "Age" },
};

function MyComponent() {
  return (
    <SimpleReactTable
      data={data}
      headers={headers}
      autoSerial={true}
      autoCheckBox={true}
      enableSearch={true}
      enableFilters={true}
    />
  );
}
```

## Props

| Prop                           | Type                                      | Description                                                        | Required | Default |
|--------------------------------|-------------------------------------------|--------------------------------------------------------------------|----------|---------|
| `data`                         | `T[]`                                     | Array of objects representing the rows of the table.              | Yes      |         |
| `headers`                      | `ITableHeader<T>`                         | Defines the table columns and their properties.                   | Yes      |         |
| `theme`                        | `TailwindColor`                           | Theme color applied to the table.                                 | No       |         |
| `className`                   | `string`                                  | Additional class names for styling the table.                     | No       |         |
| `autoSerial`                  | `boolean`                                 | Automatically adds a serial number column to the table.           | No       | `false` |
| `autoCheckBox`                | `boolean`                                 | Automatically adds a checkbox column for selecting rows.          | No       | `false` |
| `enableFilters`                | `boolean`                                 | Enables column-based filters.                                     | No       | `false` |
| `enableSearch`                | `boolean`                                 | Enables the search functionality.                                 | No       | `false` |
| `clearSearch`                 | `boolean`                                 | Option to clear the search input.                                 | No       |         |
| `isLoading`                   | `boolean`                                 | Toggles a loading state for the table.                            | No       | `false` |
| `loadingComponent`            | `React.ReactNode`                         | Custom component to display when the table is in a loading state. | No       |         |
| `filterOptions`               | `ITableFilterOptions<T>[]`                | Array of filter options for the table.                            | No       |         |
| `searchOptions`               | `ITableSearchOptions`                     | Options to configure the search functionality.                   | No       |         |
| `sortingOptions`              | `ITableSortOptions<T>[]`                  | Sorting options for columns.                                      | No       |         |
| `customClasses`               | `ICustomClasses<T>`                       | Custom CSS classes for different parts of the table.              | No       |         |
| `tableDataProperties`         | `ITableDataProperties<T>`                 | Additional HTML properties for table data cells.                 | No       |         |
| `tableDataClickListeners`     | `ITableDataClickListeners<T>`             | Click event handlers for each column.                             | No       |         |
| `customFilters`               | `ITableCustomFilter<T>[]`                 | Custom filter functions for the table.                            | No       |         |
| `customRowTitles`             | `((row: T) => string) | string`       | Custom title for each row.                                       | No       |         |
| `customRowClickHandlers`      | `(event?: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row?: T) => void` | Event handler for row clicks.                                     | No       |         |
| `onObjectChecked`             | `(obj: T, checked: boolean) => void`     | Event handler for checkbox selection.                             | No       |         |
| `onAllCheckedChange`          | `(checked: boolean, start: number, offset: number) => void` | Event handler for "select all" checkboxes.                      | No       |         |
| `customPaginator`             | `PaginationProps`                         | Custom pagination configuration.                                   | No       |         |

## License
MIT License