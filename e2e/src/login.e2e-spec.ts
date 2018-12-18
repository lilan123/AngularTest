import { browser, element, by, protractor } from 'protractor';


export class LogInPage {

  navigateTo() {
    return browser.get('/');
  }
 
  setUsername = function (username) {
    element(by.id('username-input')).sendKeys(username);
  };
  setPassword = function (password) {
    element(by.id('password-input')).sendKeys(password);
  };
  submitData() {
    return element(by.id('submitBtn')).click();
  }

  signIn(username, password) {
    var page = this;    
    page.setPassword(password);
    page.setUsername(username);
    
    page.submitData();
  }
}


describe('Login', function () {
  let page: LogInPage;
  browser.driver.manage().window().maximize();

  beforeEach(() => {
    page = new LogInPage();
    page.navigateTo();
  });

  
  it('should display an error message when password is empty', () => {
    page.signIn('admin', '');
    expect(element(by.className('invalid-feedback')).getText()).toBe('Password is required');
  });

  it('should display an error message when username is empty', () => {
    page.signIn('','admin');
    expect(element(by.className('invalid-feedback')).getText()).toBe('Username is required');
  });

  it('should display an error message when one of the username or password is wrong', () => {
    page.signIn('admin','admin1');
    expect(element(by.className('alert alert-danger')).getText()).toBe('Username or password is incorrect');
  });

  it('should allow a user to log in', () => {
    page.signIn('admin','admin');
    expect(browser.getCurrentUrl()).toMatch('http://localhost:4200');
  });

});
