import {  appendFile, writeFile } from "node:fs";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = () =>
  rl.question("What is your First Name ? ", (firstName) => {
    rl.question("What is your Last Name? ", (lastName) => {
      rl.question("What is your Age? ", (age) => {
        rl.question("What is your ID num? ", (ID) => {
          rl.question("What is your E-mail? ", (email) => {
            // TODO: Log the answer in a database
            const data = { firstName, lastName, age, ID, email };
            const me = { name: "Adam", age: 30 };

            appendFile("data.test", "test", (err) => {
              if (err) throw err;
              console.log('The "data to append" was appended to file!');
            });

            console.log(
              `Your information:  
          First Name: ${firstName} 
          Last Name: ${lastName} 
          Age: ${age}
          ID: ${ID}
          E-mail:${email}
          
          `
            );

            rl.close();
          });
        });
      });
    });
  });

data();

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

const test = "test "