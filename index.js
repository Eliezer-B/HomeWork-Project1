import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { appendFile } from "node:fs/promises";

const rl = readline.createInterface({ input, output });

const strinRegex = /[A-Za-z]/g;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;



const data = async () => {
  let firstName = await rl.question("What is your First Name ? ");
  while (!firstName.match(strinRegex)) {
    console.log("first name must be  string");
    firstName = await rl.question("What is your first Name? ");
  }

  let lastName = await rl.question("What is your Last Name? ");
  while (!lastName.match(strinRegex)) {
    console.log("last name must be  string");
    lastName = await rl.question("What is your last Name? ");
  }

  const dob = await rl.question("What is your DOB?(DD/MM/YYYY) ");

  const ID = await rl.question("What is your ID num? ");

  let email = await rl.question("What is your E-mail? ");

  while (!email.match(emailRegex)) {
    console.log("email must be valid");
    email = await rl.question("What is your E-mail? ");
  }

  const userData = { firstName, lastName, dob, ID, email };
 

  await appendFile("./data.txt", `${JSON.stringify(userData)}\n`);

  rl.close();
};

const addOrSearchUser = async () => {
  const addOrSearch = await rl.question(
    "please choose Add or Search a user (press add || Search)"
  );
  if (addOrSearch === "add") {
    data();
  } else {
    console.log("you choose to search a user ");
  }

  // addOrSearchUser()
};

addOrSearchUser();

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
