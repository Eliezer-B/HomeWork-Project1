import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { appendFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { open } from "node:fs/promises";

const rl = readline.createInterface({ input, output });

const stringRegex = /[A-Za-z]/g;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const numberRegex = /^[0-9]+$/;

const questions = async () => {
  let firstName = await rl.question("What is your First Name ? ");
  while (!firstName.match(stringRegex)) {
    console.log("first name must be  string");
    firstName = await rl.question("What is your first Name? ");
  }

  let lastName = await rl.question("What is your Last Name? ");
  while (!lastName.match(stringRegex)) {
    console.log("last name must be  string");
    lastName = await rl.question("What is your last Name? ");
  }

  const dob = await rl.question("What is your DOB?(DD/MM/YYYY) ");

  let ID = await rl.question("What is your ID num? ");
  while (!ID.match(numberRegex)) {
    console.log("ID must include only nembers");
    ID = await rl.question("What is your ID num? ");
  }

  let email = await rl.question("What is your E-mail? ");

  while (!email.match(emailRegex)) {
    console.log("email must be valid");
    email = await rl.question("What is your E-mail? ");
  }

  const userData = { firstName, lastName, dob, ID, email };

  await appendFile("./data.txt", `${JSON.stringify(userData)}\n`);
  console.log('user was added successfully');
  addOrSearchUser();
  // rl.close();
};

const searchUser = async () => {
  const idForSearch = await rl.question("Please Enter ID to search? ");
  const file = await open("./data.txt");
  for await (const line of file.readLines()) {
    if (line.includes(idForSearch)) {
      console.log(`we found your user \n ${line} `);
    }
  }
  const contents = await readFile("./data.txt", { encoding: "utf8" });
  if (!contents.includes(idForSearch)) {
    console.log("we couldn't find a user with this such ID please try again");
  }
  addOrSearchUser()
};

const addOrSearchUser = async () => {
  const addOrSearch = await rl.question(
    "please choose (A)Add or (S)Search a user "
  );
  if (addOrSearch === "A") {
    questions();
  }
  if (addOrSearch === "S") {
    searchUser();
  }
};

addOrSearchUser();

// rl.on("close", function () {
//   console.log("\nBYE BYE !!!");
//   process.exit(0);
// });
