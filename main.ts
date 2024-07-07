#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';



let yellow = chalk.yellow.italic
let blue = chalk.blue.italic
let white = chalk.white.italic.bold
let red = chalk.red.italic
let cyan = chalk.cyanBright.italic

console.log(cyan("\t\t WELCOME TO THE ATM MADE BY ADIL MALIK \n"));
console.log(cyan("The Atm pin is : 4545 \n"))
let userPin = "4545"
let balance = 10000

const openATM = async () => {

    let prompt = await inquirer.prompt([
        {
            name: "userId",
            type: "string",
            message: yellow("Please Enter Your Name")
        },
        {
            name: "pinCode",
            type: "string",
            message: yellow("Please Enter Your Pin Code")
        }
    ])

    if (prompt.pinCode === userPin) {
        console.log(white(`\n WELCOME ${prompt.userId} \n`));
        await main_ATM()
    } else {
        console.log(red("Incorrect pin Code"));
        openATM()
    }

}


async function main_ATM() {
    let main_features = await inquirer.prompt([
        {
            message: "Please Select Your Action Do you Perform",
            type: "list",
            name: "action",
            choices: ["Withdrwal", "Fast Cash", "Check Balance", "Exit"]
        },
    ])

    let isExit = false
    do {
        if (main_features.action === "Withdrwal") {
            await withDrow()
            return
        } else if (main_features.action === "Check Balance") {
            console.log(white(`Your Balance is : ${balance}`));
            return
        } else if (main_features.action === "Fast Cash") {
            await fastCash()
            return
        } else if (main_features.action === "Exit") {
            isExit = true
        }
    }
    while (!isExit)
}




async function withDrow() {

    let promptWithdraw = await inquirer.prompt([
        {
            name: "Withdraw",
            type: "number",
            message: "Please Enter you Amount",
        },
    ]);

    if (promptWithdraw.Withdraw > balance) {
        console.log(red(`You Have Infuicient Balance your balance Is  ${balance}`))
        return;
    }


    balance -= promptWithdraw.Withdraw
    console.log(cyan(`Your are sucessFully Withdraw ${promptWithdraw.Withdraw}`));

    /// check balance funtion
    await checkBalanceConfirm()
}




async function fastCash(): Promise<void> {
    let promptfastCash = await inquirer.prompt([
        {
            name: "fastCash",
            type: "list",
            choices: [1000, 2000, 3000, 5000],
            message: "Select Amount In given Amounts.",
        },
    ]);

    if (promptfastCash.fastCash > balance) {
        console.log(red(`You Have Infuicient Balance your balance Is  ${balance}`))
        return;
    }


    balance -= promptfastCash.fastCash
    console.log(cyan(`you are successFully Cash with Fast cash ${promptfastCash.fastCash}`));

    //// Check balance funtion
    await checkBalanceConfirm()
}




async function checkBalanceConfirm(): Promise<void> {
    let againPrompt = await inquirer.prompt([
        {
            name: "check",
            type: "confirm",
            message: yellow("Do you want to check balance ?")
        }
    ])
    if (againPrompt.check === true) {
        await againCheckBalance()
        return
    } else {
        console.log(white("Thank you for using this ATM"));
    }
}


async function againCheckBalance(): Promise<void> {

    let prompt = await inquirer.prompt([
        {
            name: "pinCode",
            type: "string",
            message: yellow("Please Enter Your Pin Code")
        }
    ])

    if (prompt.pinCode === userPin) {
        await main_ATM()
    } else {
        console.log(red("Incorrect pin Code"));
        openATM()
    }

}
















openATM()









