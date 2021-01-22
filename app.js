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
        switch (choice.choice) {
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

function addDepartment() {
    inquirer.prompt({

        type: "input",
        name: "addDepartment",
        message: "Which department would you like to add?"

    }).then((ans) => {

        connection.query("INSERT INTO department (name) VALUES (?)", [ans.addDepartment], (err, res) => {
            if (err) throw err;
            console.log(`"${ans.addDepartment}" added as new Department`);
        });

    });
};

function addRole() {

    const depIds = [];

    connection.query("SELECT id, name FROM department;", (err, res) => {
        if (err) throw err;

        for (i in res) {
            newOb = {};
            newOb.id = res[i].id;
            newOb.name = res[i].name;
            depIds.push(newOb);
        }

        inquirer.prompt(
            [{

                type: "input",
                name: "addTitle",
                message: "What is the title of the role would you like to add?"

            },
            {

                type: "number",
                name: "addSalary",
                message: "What is the salary for this position?"

            },
            {

                type: "list",
                name: "addDepart",
                choices: depIds,
                message: "What department are you adding this role to?"

            }]
        ).then((ans) => {

            let departIds;
            for (i in depIds) {
                if (depIds[i].name === ans.deptName) {
                    departIds = depIds[i].id;
                }
            }

            connection.query("INSERT INTO role (title), (salary), (department_id) VALUES (?, ? , ?)", [ans.addTitle, ans.addSalary, departIds], (err, res) => {
                if (err) throw err;
                console.log(`"${ans.addTitle}" added as new role, at "${ans.addSalary}", in "${departIds}" department.`);
            });

        });
    });
};