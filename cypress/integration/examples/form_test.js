//write test here

const { findAllByRole } = require("@testing-library/react");

describe("Form app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  const textInput = () => cy.get('input[name="name"]');
  const emailInput = () => cy.get('input[name="email"]');
  const passwordInput = () => cy.get('input[name="password"]');
  const submitButton = () => cy.get("#submitBtn");
  const role = () => cy.get('select[name="role"]');
  const radioBtn = () => cy.get('input[value="Node.js"]');
  const checkBox = () => cy.get('input[name="agree"]');

  it("sanity test to make sure test work", () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
  });
  it("can type in the input fields", () => {
    textInput()
      .should("have.value", "")
      .type("Teara Edwards")
      .should("have.value", "Teara Edwards");
    emailInput()
      .should("have.value", "")
      .type("test@account.com")
      .should("have.value", "test@account.com");
    passwordInput().type("password1").should("have.value", "password1");
  });
  it("can select a role", () => {
    role()
      .select("Front End Engineer")
      .should("have.value", "Front End Engineer");
  });
  it("can select a favorite language", () => {
    radioBtn().click().should("have.value", "Node.js");
  });
  it("checkbox works", () => {
    checkBox().click().should("be.enabled");
  });
  it("submit button is disabled until all fields are correctly field in", () => {
    submitButton().should("be.disabled");

    textInput().type("Teara Edwards").should("have.value", "Teara Edwards");
    emailInput()
      .type("test@account.com")
      .should("have.value", "test@account.com");
    passwordInput().type("Password1").should("have.value", "Password1");
    role()
      .select("Back End Engineer")
      .should("have.value", "Back End Engineer");
    radioBtn().click().should("have.value", "Node.js");
    checkBox().click().should("be.enabled");
    submitButton().should("be.not.disabled");
  });
});
