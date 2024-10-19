import "./App.css";
import {
  ITableHeader,
  SimpleReactTable,
} from "../lib/components/SimpleReactTable.tsx";
import clsx from "clsx";

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

const dummyData: Person[] = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 25,
    email: "john.doe@example.com",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    age: 30,
    email: "jane.smith@example.com",
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    age: 40,
    email: "michael.johnson@example.com",
  },
  {
    firstName: "Emily",
    lastName: "Brown",
    age: 35,
    email: "emily.brown@example.com",
  },
  {
    firstName: "Daniel",
    lastName: "Taylor",
    age: 28,
    email: "daniel.taylor@example.com",
  },
  {
    firstName: "Olivia",
    lastName: "Anderson",
    age: 33,
    email: "olivia.anderson@example.com",
  },
  {
    firstName: "James",
    lastName: "Thomas",
    age: 45,
    email: "james.thomas@example.com",
  },
  {
    firstName: "Sophia",
    lastName: "Jackson",
    age: 27,
    email: "sophia.jackson@example.com",
  },
  {
    firstName: "David",
    lastName: "White",
    age: 32,
    email: "david.white@example.com",
  },
  {
    firstName: "David",
    lastName: "White",
    age: 32,
    email: "david.white@example.com",
  },
  {
    firstName: "David",
    lastName: "White",
    age: 32,
    email: "david.white@example.com",
  },
  {
    firstName: "David",
    lastName: "White",
    age: 32,
    email: "david.white@example.com",
  },
  {
    firstName: "David",
    lastName: "White",
    age: 32,
    email: "david.white@example.com",
  },
  {
    firstName: "David",
    lastName: "White",
    age: 32,
    email: "david.white@example.com",
  },
  {
    firstName: "David",
    lastName: "White",
    age: 32,
    email: "david.white@example.com",
  },
];

const tableHeaders: ITableHeader<Person> = {
  firstName: {
    label: "First Name",
  },
  lastName: {
    label: "Last Name",
  },
  age: {
    label: "Age",
    renderer(age) {
      return (
        <span className={clsx(age > 30 ? "text-red-600" : "text-blue-600")}>
          {age}
        </span>
      );
    },
  },
};

function App() {
  return (
    <SimpleReactTable
      autoSerial
      autoCheckBox
      theme="indigo"
      searchOptions={{
        searchBehaviour: "button",
        onKeywordChange(keywords) {
          console.log(keywords);
        },
      }}
      primaryFilterOptions={{
        by: "firstName",
        label: "First Name",
      }}
      data={dummyData}
      headers={tableHeaders}
      customHeaders={[
        {
          label: "Action",
          renderer: () => <span>Edit</span>,
        },
      ]}
      customPaginator={{
        onNext: (prop) => console.log(prop),
        onPrev: (prop) => console.log(prop),
        start: 0,
        offset: 10,
        totalLength: dummyData.length,
        onOffsetChange: (prop) => console.log(prop),
      }}
    />
  );
}

export default App;
