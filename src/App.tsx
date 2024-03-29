import './App.css'

interface Person {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
}

const dummyData: Person[] = [
    { firstName: "John", lastName: "Doe", age: 25, email: "john.doe@example.com" },
    { firstName: "Jane", lastName: "Smith", age: 30, email: "jane.smith@example.com" },
    { firstName: "Michael", lastName: "Johnson", age: 40, email: "michael.johnson@example.com" },
    { firstName: "Emily", lastName: "Brown", age: 35, email: "emily.brown@example.com" },
    { firstName: "Daniel", lastName: "Taylor", age: 28, email: "daniel.taylor@example.com" },
    { firstName: "Olivia", lastName: "Anderson", age: 33, email: "olivia.anderson@example.com" },
    { firstName: "James", lastName: "Thomas", age: 45, email: "james.thomas@example.com" },
    { firstName: "Sophia", lastName: "Jackson", age: 27, email: "sophia.jackson@example.com" },
    { firstName: "David", lastName: "White", age: 32, email: "david.white@example.com" },
    { firstName: "Isabella", lastName: "Harris", age: 31, email: "isabella.harris@example.com" },
    { firstName: "Liam", lastName: "Martin", age: 29, email: "liam.martin@example.com" },
    { firstName: "Mia", lastName: "Thompson", age: 38, email: "mia.thompson@example.com" },
    { firstName: "Alexander", lastName: "Garcia", age: 36, email: "alexander.garcia@example.com" },
    { firstName: "Charlotte", lastName: "Martinez", age: 26, email: "charlotte.martinez@example.com" },
    { firstName: "William", lastName: "Robinson", age: 42, email: "william.robinson@example.com" },
    { firstName: "Ava", lastName: "Clark", age: 34, email: "ava.clark@example.com" },
    { firstName: "Ethan", lastName: "Rodriguez", age: 37, email: "ethan.rodriguez@example.com" },
    { firstName: "Harper", lastName: "Lewis", age: 39, email: "harper.lewis@example.com" },
    { firstName: "Emma", lastName: "Lee", age: 41, email: "emma.lee@example.com" },
    { firstName: "Michael", lastName: "Walker", age: 43, email: "michael.walker@example.com" },
    { firstName: "Abigail", lastName: "Hall", age: 44, email: "abigail.hall@example.com" },
    { firstName: "Matthew", lastName: "Allen", age: 46, email: "matthew.allen@example.com" },
    { firstName: "Ella", lastName: "Young", age: 47, email: "ella.young@example.com" },
    { firstName: "Jayden", lastName: "Hernandez", age: 48, email: "jayden.hernandez@example.com" },
    { firstName: "Sofia", lastName: "King", age: 49, email: "sofia.king@example.com" },
    { firstName: "Logan", lastName: "Wright", age: 50, email: "logan.wright@example.com" },
    { firstName: "Grace", lastName: "Lopez", age: 51, email: "grace.lopez@example.com" },
    { firstName: "Lucas", lastName: "Scott", age: 52, email: "lucas.scott@example.com" },
    { firstName: "Avery", lastName: "Green", age: 53, email: "avery.green@example.com" },
    { firstName: "Benjamin", lastName: "Adams", age: 54, email: "benjamin.adams@example.com" },
    { firstName: "Sophie", lastName: "Wilson", age: 55, email: "sophie.wilson@example.com" },
    { firstName: "Jackson", lastName: "Baker", age: 56, email: "jackson.baker@example.com" },
    { firstName: "Madison", lastName: "Roberts", age: 57, email: "madison.roberts@example.com" },
    { firstName: "Jacob", lastName: "Cook", age: 58, email: "jacob.cook@example.com" },
    { firstName: "Chloe", lastName: "Murphy", age: 59, email: "chloe.murphy@example.com" },
    { firstName: "Gabriel", lastName: "Kelly", age: 60, email: "gabriel.kelly@example.com" },
    { firstName: "Zoe", lastName: "Bailey", age: 61, email: "zoe.bailey@example.com" },
    { firstName: "Carter", lastName: "Rivera", age: 62, email: "carter.rivera@example.com" },
    { firstName: "Lily", lastName: "Cooper", age: 63, email: "lily.cooper@example.com" },
    { firstName: "Ryan", lastName: "Parker", age: 64, email: "ryan.parker@example.com" },
    { firstName: "Nora", lastName: "Richardson", age: 65, email: "nora.richardson@example.com" },
    { firstName: "Samuel", lastName: "Wood", age: 66, email: "samuel.wood@example.com" },
    { firstName: "Hannah", lastName: "Hayes", age: 67, email: "hannah.hayes@example.com" },
    { firstName: "Luke", lastName: "Price", age: 68, email: "luke.price@example.com" }
];


function App() {
  return (
    <SimpleReactTable
        autoSerial
        autoCheckBox
        enableSearch
        searchOptions={
        {
            searchBehaviour: "button"
        }
        }
        data={dummyData}
        headers={
        [
            {
                key: 'firstName',
                label: 'First Name'
            },
            {
                key: 'lastName',
                label: 'Last Name'
            },
            {
                key: 'email',
                label: 'Email'
            },
            {
                key: 'age',
                label: 'Age',
                processor(age) {
                    const ageVal = age as number;
                    return <span style={{color: ageVal > 30 ? 'red' : 'blue'}}>{ageVal}</span>
                }
            },
        ]
        }
        customRowClasses={(row) => {
            return row.age > 30 ? "red-background" : "blue-background"
        }}
    />
  )
}

export default App
