# @gautamgiri/simple-react-table

A customizable and lightweight React table component with advanced features such as pagination, searching, filtering, sorting, auto serial counts, auto checkboxes, and more. Easily integrate and configure to meet your project's table requirements with minimal effort. It is also provides complete type-safety.

[![View on GitHub](https://img.shields.io/badge/View%20on-GitHub-181717.svg?style=flat&logo=github)](https://github.com/gautamgiri-dev/simple-react-table)

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
import React from "react";
import SimpleReactTable from "@gautamgiri/simple-react-table";

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
    />
  );
}
```

## Props

### SimpleReactTable Props

| Prop Name               | Type                                                                                     | Description                                                                                                                                              | Default                      |
|-------------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| `data`                  | `T[]`                                                                                     | Array of objects representing the rows of the table. Each object should match the structure of the table's columns.                                       | `[]`                         |
| `headers`               | `ITableHeader<T>`                                                                         | Object that defines the headers of the table. It includes a label, processor function for data transformation, and a visibility toggle.                   | Required                     |
| `onObjectChecked`       | `(obj: T, checked: boolean) => void`                                                      | Callback triggered when an individual row's checkbox is checked or unchecked. It passes the data object and checked state.                                | `null`                       |
| `onAllCheckedChange`    | `(checked: boolean, start: number, offset: number) => void`                               | Callback triggered when the "Select All" checkbox is toggled. It passes the checked state and pagination details (start and offset).                      | `null`                       |
| `customRowClickHandlers`| `(event: React.MouseEvent<HTMLTableRowElement>, row: T) => void`                          | Function that gets triggered when a table row is clicked. It receives the click event and the corresponding row’s data.                                    | `null`                       |
| `customFilters`         | `ITableCustomFilter<T>[]`                                                                 | Array of custom filter functions. Each function should return a boolean to determine if a row should be displayed based on its data.                      | `[]`                         |
| `customPaginator`       | `PaginationProps`                                                                         | Custom pagination settings. You can provide total length, start index, and the number of rows per page.                                                   | `{ totalLength: 0, start: 0, offset: 10 }` |
| `sortingOptions`        | `ITableSortOptions<T>`                                                                    | Configuration for sorting. You can enable sorting and pass a custom sorter function to define how rows are sorted.                                        | `{ enabled: false }`         |
| `searchOptions`         | `ITableSearchOptions`                                                                     | Configuration for enabling and customizing the search functionality, including search behavior and placeholder text.                                      | `{ enabled: false }`         |
| `filterOptions`         | `ITableFilterOptions<T>`                                                                  | Filter configuration for table columns. It allows specifying the columns to filter by and includes a custom value extractor and label.                    | `{ enabled: false }`         |

## Interfaces

### `ITableHeader<T>`

Defines the table headers for each column.

| Prop Name               | Type                                                                                     | Description                                                                                                             |
|-------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `label`                 | `string`                                                                                 | Label displayed for the column header.                                                                                  |
| `processor`             | `(value: any) => string`                                                                  | Function to process or format the data for display in the column.                                                       |
| `hidden`                | `boolean`                                                                                | If set to `true`, the column will be hidden from the table display.                                                     |

### `ITableDataClickListeners<T>`

Defines custom click event listeners for specific data cells.

| Prop Name               | Type                                                                                     | Description                                                                                                             |
|-------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `[columnKey]`           | `(event: React.MouseEvent<HTMLTableCellElement>, row: T) => void`                         | Callback function triggered when a specific cell is clicked. Receives the click event and row data.                     |

### `ITableDataProperties<T>`

Specifies additional HTML properties for individual table cells.

| Prop Name               | Type                                                                                     | Description                                                                                                             |
|-------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `[columnKey]`           | `React.HTMLProps<HTMLTableCellElement>`                                                   | Standard HTML properties for the table cell (like `onClick`, `className`, etc.).                                        |

### `ITableCustomFilter<T>`

Defines a custom filter for filtering the table rows.

| Prop Name               | Type                                                                                     | Description                                                                                                             |
|-------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `(row: T) => boolean`   | `boolean`                                                                                | A function that takes a row and returns a boolean indicating whether the row should be displayed.                       |

### `ITableSortOptions<T>`

Specifies the sorting options for the table.

| Prop Name               | Type                                                                                     | Description                                                                                                             |
|-------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `enabled`               | `boolean`                                                                                | Enables or disables sorting for the table.                                                                              |
| `sorter`                | `(a: T, b: T) => number`                                                                 | A custom sorting function that determines the order of the rows.                                                        |

### `ITableSearchOptions`

Defines the search behavior for the table.

| Prop Name               | Type                                                                                     | Description                                                                                                             |
|-------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `enabled`               | `boolean`                                                                                | Enables or disables the search functionality.                                                                           |
| `placeholder`           | `string`                                                                                 | Placeholder text for the search input field.                                                                            |
| `searchBehaviour`       | `"button" | "type"`                                                                       | Determines if search is triggered by typing (`type`) or by pressing a search button (`button`).                         |
| `onKeywordChange`       | `(keywords: string[]) => void`                                                            | Callback triggered when the search keywords are updated.                                                                |

### `ITableFilterOptions<T>`

Configures filtering behavior for specific table columns.

| Prop Name               | Type                                                                                     | Description                                                                                                             |
|-------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `enabled`               | `boolean`                                                                                | Enables or disables column filtering.                                                                                   |
| `by`                    | `keyof T`                                                                                | Specifies the column to filter by.                                                                                      |
| `label`                 | `string`                                                                                 | The label for the filter input.                                                                                         |
| `valueExtractor`        | `(obj: T[keyof T]) => string | number | readonly string[]`                                             | Extracts the value for filtering from the row’s data.                                                                   |

### `PaginationProps`

Defines the pagination behavior for the table.

| Prop Name               | Type                                                                                     | Description                                                                                                             |
|-------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `totalLength`           | `number`                                                                                 | Total number of rows in the dataset.                                                                                    |
| `start`                 | `number`                                                                                 | Starting index for the current page.                                                                                    |
| `offset`                | `number`                                                                                 | Number of rows displayed per page.                                                                                      |
| `onNext`                | `(paginator: PaginationProps) => void`                                                    | Callback triggered when the "Next" button is clicked.                                                                   |
| `onPrev`                | `(paginator: PaginationProps) => void`                                                    | Callback triggered when the "Previous" button is clicked.                                                               |



## License

MIT License
