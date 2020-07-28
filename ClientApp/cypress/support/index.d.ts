/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        sayHello(): any
    }
}