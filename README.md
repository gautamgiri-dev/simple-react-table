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
      enableSearch={true}
      enableFilters={true}
    />
  );
}
```

## Props

#### `data: T[]`

- **Type**: `T[]`
- **Description**: Array of objects representing the rows of the table.
- **Required**: Yes

#### `headers: ITableHeader<T>`

- **Type**: `ITableHeader<T>`
- **Description**: Defines the table columns and their properties.
- **Required**: Yes

#### `theme?: TailwindColor`

- **Type**: `TailwindColor`
- **Description**: Theme color applied to the table.
- **Required**: No

#### `className?: string`

- **Type**: `string`
- **Description**: Additional class names for styling the table.
- **Required**: No

#### `autoSerial?: boolean`

- **Type**: `boolean`
- **Description**: Automatically adds a serial number column to the table.
- **Default**: `false`
- **Required**: No

#### `autoCheckBox?: boolean`

- **Type**: `boolean`
- **Description**: Automatically adds a checkbox column for selecting rows.
- **Default**: `false`
- **Required**: No

#### `enableFilters?: boolean`

- **Type**: `boolean`
- **Description**: Enables column-based filters.
- **Default**: `false`
- **Required**: No

#### `enableSearch?: boolean`

- **Type**: `boolean`
- **Description**: Enables the search functionality.
- **Default**: `false`
- **Required**: No

#### `clearSearch?: boolean`

- **Type**: `boolean`
- **Description**: Option to clear the search input.
- **Required**: No

#### `isLoading?: boolean`

- **Type**: `boolean`
- **Description**: Toggles a loading state for the table.
- **Default**: `false`
- **Required**: No

#### `loadingComponent?: React.ReactNode`

- **Type**: `React.ReactNode`
- **Description**: Custom component to display when the table is in a loading state.
- **Required**: No

#### `filterOptions?: ITableFilterOptions<T>[]`

- **Type**: `ITableFilterOptions<T>[]`
- **Description**: Array of filter options for the table.

#### `searchOptions?: ITableSearchOptions`

- **Type**: `ITableSearchOptions`
- **Description**: Options to configure the search functionality.

#### `sortingOptions?: ITableSortOptions<T>[]`

- **Type**: `ITableSortOptions<T>[]`
- **Description**: Sorting options for columns.

#### `customClasses?: ICustomClasses<T>`

- **Type**: `ICustomClasses<T>`
- **Description**: Custom CSS classes for different parts of the table.

#### `tableDataProperties?: ITableDataProperties<T>`

- **Type**: `ITableDataProperties<T>`
- **Description**: Additional HTML properties for table data cells.

#### `tableDataClickListeners?: ITableDataClickListeners<T>`

- **Type**: `ITableDataClickListeners<T>`
- **Description**: Click event handlers for each column.

#### `customFilters?: ITableCustomFilter<T>[]`

- **Type**: `ITableCustomFilter<T>[]`
- **Description**: Custom filter functions for the table.

#### `customRowTitles?: ((row: T) => string) | string`

- **Type**: `((row: T) => string) | string`
- **Description**: Custom title for each row.

#### `customRowClickHandlers?: (event?: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row?: T) => void`

- **Type**: `(event?: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row?: T) => void`
- **Description**: Event handler for row clicks.

#### `onObjectChecked?: (obj: T, checked: boolean) => void`

- **Type**: `(obj: T, checked: boolean) => void`
- **Description**: Event handler for checkbox selection.

#### `onAllCheckedChange?: (checked: boolean, start: number, offset: number) => void`

- **Type**: `(checked: boolean, start: number, offset: number) => void`
- **Description**: Event handler for "select all" checkboxes.

#### `customPaginator?: PaginationProps`

- **Type**: `PaginationProps`
- **Description**: Custom pagination configuration.

## License

MIT License
