/// <reference types="cypress" />
const element = require("../fixtures/register.json")
import faker from 'faker';

beforeEach(() => {
  cy.visit('https://demo.nopcommerce.com/');
})

describe('Registrar usuário', () => {
  it('Registrar um novo usuário com sucesso', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.gender_male).click();
    cy.xpath(element.first_name).type(Cypress.env('FIRST_NAME'));
    cy.xpath(element.last_name).type(Cypress.env('LAST_NAME'));
    cy.xpath(element.day_of_birthday).select(Cypress.env('DAY_OF_BIRTHDAY'));
    cy.xpath(element.month_of_birthday).select(Cypress.env('MONTH_OF_BIRTHDAY'));
    cy.xpath(element.year_of_birthday).select('1998');
    cy.xpath(element.mail).type(faker.internet.email());
    cy.xpath(element.company_name).type(Cypress.env('COMPANY_NAME'));
    cy.xpath(element.password).type(Cypress.env('PASSWORD'));
    cy.xpath(element.confirm_password).type(Cypress.env('CONFIRM_PASSWORD'));
    cy.xpath(element.btn_register).click();

    cy.MsgRegisterCompleted();
  })

  it('Validar data de nascimento no registro usuário', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.day_of_birthday).select(Cypress.env('DAY_OF_BIRTHDAY'));
    cy.xpath(element.month_of_birthday).select(Cypress.env('MONTH_OF_BIRTHDAY'));
    // cy.xpath(element.year_of_birthday).type(Cypress.env('YEAR_OF_BIRTHDAY'));
    cy.xpath(element.year_of_birthday).select('2000');

    cy.MsgCorrectDate(); 
  })

  it('Validar a mensagem de erro do campo First Name', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.btn_register).click();
    cy.xpath(element.first_name).clear();
    cy.xpath(element.last_name).type(Cypress.env('LAST_NAME'));
    cy.xpath(element.mail).type(faker.internet.email());
    cy.xpath(element.password).type(Cypress.env('PASSWORD'));
    cy.xpath(element.confirm_password).type(Cypress.env('CONFIRM_PASSWORD'));
    cy.xpath(element.btn_register).click();

    cy.MsgFirstNameRequired();
  });

  it('Validar a mensagem de erro do campo Last Name', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.gender_male).click();
    cy.xpath(element.first_name).type(Cypress.env('FIRST_NAME'));
    cy.xpath(element.last_name).clear();
    cy.xpath(element.mail).type(faker.internet.email());
    cy.xpath(element.password).type(Cypress.env('PASSWORD'));
    cy.xpath(element.confirm_password).type(Cypress.env('CONFIRM_PASSWORD'));
    cy.xpath(element.btn_register).click();

    cy.MsgLastNameRequired();
  });

  it('Validar a mensagem de erro do campo Email', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.gender_male).click();
    cy.xpath(element.first_name).type(Cypress.env('FIRST_NAME'));
    cy.xpath(element.last_name).type(Cypress.env('LAST_NAME'));
    cy.xpath(element.mail).clear('');
    cy.xpath(element.password).type(Cypress.env('PASSWORD'));
    cy.xpath(element.confirm_password).type(Cypress.env('CONFIRM_PASSWORD'));
    cy.xpath(element.btn_register).click();

    cy.MsgEmailRequired();
  });

  it('Validar a mensagem de erro do campo Email com e-mail inválido', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.gender_male).click();
    cy.xpath(element.first_name).type(Cypress.env('FIRST_NAME'));
    cy.xpath(element.last_name).type(Cypress.env('LAST_NAME'));
    cy.xpath(element.mail).type('email#gmail.com');
    cy.xpath(element.password).type(Cypress.env('PASSWORD'));
    cy.xpath(element.confirm_password).type(Cypress.env('CONFIRM_PASSWORD'));
    cy.xpath(element.btn_register).click();

    cy.MsgEmailWrong();
  });

  it('Validar a mensagem de erro do campo Password', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.gender_male).click();
    cy.xpath(element.first_name).type(Cypress.env('FIRST_NAME'));
    cy.xpath(element.last_name).type(Cypress.env('LAST_NAME'));
    cy.xpath(element.mail).type(faker.internet.email());
    cy.xpath(element.password).clear();
    cy.xpath(element.confirm_password).type(Cypress.env('CONFIRM_PASSWORD'));
    cy.xpath(element.btn_register).click();

    cy.MsgConfirmPasswordError();
  });

  it('Validar a mensagem de erro do limite de caracteres do campo Password', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.gender_male).click();
    cy.xpath(element.first_name).type(Cypress.env('FIRST_NAME'));
    cy.xpath(element.last_name).type(Cypress.env('LAST_NAME'));
    cy.xpath(element.mail).type(faker.internet.email());
    cy.xpath(element.password).type(12345);
    cy.xpath(element.confirm_password).clear();
    cy.xpath(element.btn_register).click();

    cy.MsgPasswordLeast6Characters();
  });

  it('Validar a mensagem de erro do campo Confirm Password', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.gender_male).click();
    cy.xpath(element.first_name).type(Cypress.env('FIRST_NAME'));
    cy.xpath(element.last_name).type(Cypress.env('LAST_NAME'));
    cy.xpath(element.mail).type(faker.internet.email());
    cy.xpath(element.password).type(Cypress.env('PASSWORD'));
    cy.xpath(element.confirm_password).clear();
    cy.xpath(element.btn_register).click();

    cy.MsgConfirmPasswordRequired();
  });

  it('Validar a mensagem de erro quando as senhas não conferem', () => {
    cy.xpath(element.hrf_register).click();
    cy.xpath(element.gender_male).click();
    cy.xpath(element.first_name).type(Cypress.env('FIRST_NAME'));
    cy.xpath(element.last_name).type(Cypress.env('LAST_NAME'));
    cy.xpath(element.mail).type(faker.internet.email());
    cy.xpath(element.password).type(Cypress.env('PASSWORD'));
    cy.xpath(element.confirm_password).type('Teste@');
    cy.xpath(element.btn_register).click();

    cy.MsgConfirmPasswordError();
  });
})