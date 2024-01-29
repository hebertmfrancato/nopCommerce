/// <reference types="cypress" />
const element = require("../fixtures/register.json")

Cypress.Commands.add('Register', (firstName, lastName, dayOfBirthday, monthOfBirthday, yearOfBirthday, mail, companyName, password, confirmPassword) => {
    cy.xpath("//a[@class='ico-register']").click();
    cy.xpath("//input[@type='radio'][@id='gender-male']").click();
    cy.xpath(element.first_name).type(firstName);
    cy.xpath(element.last_name).type(lastName);
    cy.xpath(element.day_of_birthday).select(dayOfBirthday);
    cy.xpath(element.month_of_birthday).select(monthOfBirthday);
    cy.xpath(element.year_of_birthday).select(yearOfBirthday);
    cy.xpath(element.mail).type(mail);
    cy.xpath(element.company_name).type(companyName);
    cy.xpath(element.password).type(password);
    cy.xpath(element.confirm_password).type(confirmPassword);
    cy.xpath(element.btn_register).click();
})

Cypress.Commands.add('MsgRegisterCompleted', () => {
    cy.xpath(element.registration_completed).should('be.visible').contains('Your registration completed');
})

Cypress.Commands.add('MsgCorrectDate', () => {
    cy.xpath(element.day_of_birthday).should('be.visible').contains('15');
    cy.xpath(element.month_of_birthday).should('be.visible').contains('December');
    cy.xpath(element.year_of_birthday).should('be.visible').contains('2000');
})

Cypress.Commands.add('MsgFirstNameRequired', () => {
    cy.xpath(element.msg_firstname_required).should('be.visible').contains('First name is required.');
})

Cypress.Commands.add('MsgLastNameRequired', () => {
    cy.xpath(element.msg_lastname_required).should('be.visible').contains('Last name is required.');
})

Cypress.Commands.add('MsgEmailRequired', () => {
    cy.xpath(element.msg_email_required).should('be.visible').contains('Email is required.');
})

Cypress.Commands.add('MsgEmailWrong', () => {
    cy.xpath(element.msg_email_required).should('be.visible').contains('Wrong email');
})

Cypress.Commands.add('MsgPasswordRequired', () => {
    cy.xpath(element.msg_password_required).should('be.visible').contains('Password is required.');
})

Cypress.Commands.add('MsgPasswordLeast6Characters', () => {
    cy.xpath(element.msg_password_required).should('be.visible').contains('Password must meet the following rules: must have at least 6 characters');
})

Cypress.Commands.add('MsgConfirmPasswordError', () => {
    cy.xpath(element.msg_confirm_password_error).should('be.visible').contains('The password and confirmation password do not match.');
})

Cypress.Commands.add('MsgConfirmPasswordRequired', () => {
    cy.xpath(element.msg_confirm_password_error).should('be.visible').contains('Password is required.');
})

// const faker = require('faker');
// Cypress.Commands.add('generateUniqueEmail', () => {
//   const uniqueEmail = `test${faker.random.number()}@gmail.com`;
//   Cypress.env('MAIL', uniqueEmail);
//   return uniqueEmail;
// });