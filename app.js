const inquirer = require("inquirer");
const mySQL = require("mySQL");

const PORT = process.env.PORT || 3000;

//creating the connection variable
var connection = mySQL.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",

    database: "employee_tables_db"
});

//connecting to that connection variable
connection.connect((err) => {
    if (err) throw err;
    console.log('can I see your id ' + connection.threadId);
    initialPrompt()
});

function initialPrompt() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Role", "View Employee", "Update Employee", "Quit"]
    }).then((choice) => {
        switch (choice) {
            case "Add Department":
                addDepartment()
                break;

            case "Add Role":
                addRole()
                break;

            case "Add Employee":
                addEmployee()
                break;

            case "View Department":
                viewDepartment()
                break;

            case "View Role":
                viewRole()
                break;

            case "View Employee":
                viewEmployee()
                break;

            case "Update Employee":
                updateEmployee()
                break;

            default:
                console.log("That concludes our business lunch. Goodbye!")
                connection.end();
                break;
        };
    });
};

