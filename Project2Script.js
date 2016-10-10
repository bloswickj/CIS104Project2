/**
 *   @author Bloswick, John (bloswickj@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Project 1 || created: 09.10.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let continueInput;
let custPolicy, custFaultAccidents, custPremium, custAge, custPremiumDuedate, currentYear, currentMonth, currentDay, custBirthDay, custBirthMonth, custBirthYear;
let custNameF, custNameL;


function main(){

    process.stdout.write('\x1Bc');

    if (continueInput == null) {
        SetContinueInput();
    }

    currentDay = GetCurrentDay();
    currentMonth = GetCurrentMonth();
    currentYear = GetCurrentYear();

    if (continueInput === 1) {
        SetCustPolicy();
        SetCustFaultAccidents();
        SetCustNameF();
        SetCustNameL();
        SetCustBirthYear();
        SetCustBirthMonth();
        SetCustBirthDay();
        SetCustAge();
        CalculateCustPremium();
        SetCustPremiumDate();
        PrintInfo();
        SetContinueInput();
        return main();
    }
    PrintGoodbye();
}

main();

function SetCustPolicy(){
    custPolicy = PROMPT.question('\nPlease enter customer policy number: ');
    if(isNaN(custPolicy)){
        console.log('That is not a valid policy number. Please try again.');
        return SetCustPolicy();
    }
}

function SetCustFaultAccidents() {
    custFaultAccidents = PROMPT.question('\nPlease enter customers number of at fault accidents: ');
    if (isNaN(custFaultAccidents) || custFaultAccidents < 0 || custFaultAccidents > 999) {
        console.log('That is not a valid at fault accident number. Please try again.');
        return SetCustFaultAccidents();
    }
}

function SetCustNameF(){
    custNameF = PROMPT.question('\nPlease enter your first name: ');
}

function SetCustNameL(){
    custNameL = PROMPT.question('\nPlease enter your last name: ');
}

function SetCustAge(){
    var today = new Date();
    var customerDate = new Date;
    customerDate.setFullYear(custBirthYear, custBirthMonth, custBirthDay);
    custAge = today.getYear() - customerDate.getYear();
}

function SetCustBirthYear() {
    custBirthYear = PROMPT.question('\nPlease enter customer birth YEAR: ');
    if (isNaN(custBirthYear) || custBirthYear < 1900 || custBirthYear > currentYear - 15) {
        console.log('That is not a valid year. Please try again.');
        return SetCustBirthYear();
    }
}

function SetCustBirthMonth() {
    custBirthMonth = PROMPT.question('\nPlease enter customer birth MONTH: ');
    if (isNaN(custBirthMonth) || custBirthMonth < 1 || custBirthMonth > 12) {
        console.log('That is not a valid month. Please try again.');
        return SetCustBirthMonth();
    }
}


function SetCustBirthDay() {
    custBirthDay = PROMPT.question('\nPlease enter customer birth DAY: ');
    if (isNaN(custBirthDay) || custBirthDay < 1 || custBirthDay > 31) {
        console.log('That is not a valid day. Please try again.');
        return SetCustBirthDay();
    }
    if (custBirthMonth == 2 && custBirthDay > 28) {
        console.log('That is not a valid day. Please try again.');
        return SetCustBirthDay();
    }
    if (custBirthMonth == 4, 6, 9, 11 && custBirthDay >30) {
        console.log('That is not a valid day. Please try again.');
        return SetCustBirthDay();
    }
}

function GetCurrentDay(){
    var today = new Date();
    currentDay = today.getDate();
    return currentDay;
}

function GetCurrentMonth(){
    var today = new Date();
    currentMonth = today.getMonth()+1;
    return currentMonth;
}

function GetCurrentYear(){
    var today = new Date();
    currentYear = today.getFullYear();
    return currentYear;
}

function CalculateCustPremium(){
    custPremium = 0;
    const BASEPRICE = 100;
    const ADD10 = 10;
    const ADD20 = 20;
    const ADD30 = 30;

    if (custAge > 15 && custAge < 30){
        custPremium = BASEPRICE + custFaultAccidents * 50 + ADD20;
    }
    else if (custAge >= 30 && custAge < 45){
        custPremium = BASEPRICE + custFaultAccidents * 50 + ADD10;
    }
    else if (custAge > 60){
        custPremium = BASEPRICE + custFaultAccidents * 50 + ADD30;
    }
    else{
        custPremium = BASEPRICE + custFaultAccidents * 50;
    }
}

function SetCustPremiumDate(){

    let nextYear = currentYear + 1;
    custPremiumDuedate = `${currentDay}/${currentMonth}/${nextYear}`;
}

function SetContinueInput(){
    if (continueInput === 1) {
        continueInput = Number(PROMPT.question(`\nDo you want to start over? [0=no, 1=yes]: `));
        if (continueInput !== 0 && continueInput !== 1) {
            console.log(`${continueInput} is an incorrect response. Please try again.`);
            continueInput = 1;
            return SetContinueInput();
        }
    } else {
        continueInput = 1;
    }
}
function PrintInfo(){
    console.log('\nHere is the information for the customer.');
    console.log(`\nPolicy number: ${custPolicy}`);
    console.log(`Name: ${custNameF} ${custNameL}`);
    console.log(`Age: ${custAge}`);
    console.log(`Premium: ${custPremium}`);
    console.log(`Premium Due Date: ${custPremiumDuedate}`);

}

function PrintGoodbye(){
    console.log('Goodbye.')
}

