const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamRoster = [];

function gatherTeamInfo(){
    return inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter manager name: "
        },
        {
          type: "input",
          name: "id",
          message: "Enter manager id: "
        },
        {
          type: "input",
          name: "email",
          message: "Enter manager email: "
        },
        {
          type: "input",
          name: "officeNumber",
          message: "Enter manager office number: "
        }
      ]).then(function(answers) {
        
        teamManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    
        teamRoster.push(teamManager);
        // console.log(teamRoster);
        gatherEngineerInfo();
      });
}

function gatherEngineerInfo(){
    return inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter engineer name: "
        },
        {
          type: "input",
          name: "id",
          message: "Enter engineer id: "
        },
        {
          type: "input",
          name: "email",
          message: "Enter engineer email: "
        },
        {
          type: "input",
          name: "github",
          message: "Enter engineer github: "
        },
        {
          type: "list",
          name: "repeat",
          message: "Would you like to enter another engineer? ",
          choices: ["Yes","No"]
        }
      ]).then(function(answers) {
        
        teamEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
    
        teamRoster.push(teamEngineer);
        // console.log(teamRoster);

        if (answers.repeat == "Yes"){
          gatherEngineerInfo();
        }else{
          gatherInternInfo();
        }
    
      })
}

function gatherInternInfo(){
    return inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter intern name: "
        },
        {
          type: "input",
          name: "id",
          message: "Enter intern id: "
        },
        {
          type: "input",
          name: "email",
          message: "Enter intern email: "
        },
        {
          type: "input",
          name: "school",
          message: "Enter intern school: "
        },
        {
          type: "list",
          name: "repeat",
          message: "Would you like to enter another intern? ",
          choices: ["Yes","No"]
        }
      ]).then(function(answers) {
        
        teamIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
    
        teamRoster.push(teamIntern);
        // console.log(teamRoster);

        if (answers.repeat == "Yes"){
          gatherInternInfo();
        }else{
          checkIfDirExists()
          

        }
    
      })

}

function checkIfDirExists(){

  fs.access(OUTPUT_DIR, function(error) {

    if (error) {
      console.log("Output directory does not exist :(");
      console.log("Creating output directory...");

      fs.mkdirSync(OUTPUT_DIR, {
        recursive: true,
        mode: 0o77
      });

      console.log("Output directory created!");

    } else {
      console.log("Output directory exists!")
      
    }
      
      writeFile();
  })
}

function writeFile(){

  let html = render(teamRoster);
      // console.log(html);
  fs.writeFile(outputPath, html, function (err) {
    if (err) return console.log(err);
    console.log('Successfully wrote to file');
  });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

gatherTeamInfo()


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
