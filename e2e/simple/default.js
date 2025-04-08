const { By, Builder, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require("assert");

async function validLogin() {
    let driver;

    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();
    await driver.manage().window().maximize();
    await driver.get('https://staging-sally.kbfinansia.com/auth/login')


    let fieldUsername = await driver.findElement(By.id('username'));
    let fieldPassword = await driver.findElement(By.id('password'));
    let buttonLogin = await driver.findElement(By.xpath("//button[@class='kt-form btn-login btn btn-primary btn-lg btn-block font-weight-bold']"));

    await fieldUsername.sendKeys("dhandyjoenathan")
    await fieldPassword.sendKeys("201017Dj*#*#")
    await buttonLogin.click()

    let iconProfile = await driver.findElement(By.xpath(`/html/body/div[2]/div/div/div[1]/div/div[1]/div/div[2]/div[2]/div[1]/img`));
    await iconProfile.click();

    let buttonLogout = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[1]/div/div[1]/div/div[2]/div[2]/div[2]/div[2]/div/button'))
    await buttonLogout.click();

    let buttonLogoutYes = await driver.findElement(By.xpath('/html/body/div[6]/div/div[3]/button[1]'))
    await buttonLogoutYes.click();

    let textLogin = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div/div[2]/div/h3')).getText()
    assert.equal("LOGIN", textLogin);

    await driver.quit();
}

async function invalidLogin() {
    let driver;

    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();
    await driver.manage().window().maximize();
    await driver.get('https://staging-sally.kbfinansia.com/auth/login')

    // let title = await driver.getTitle();
    // assert.equal("Sally | Login", title);

    // await driver.manage().setTimeouts({ implicit: 500 });

    let fieldUsername = await driver.findElement(By.id('username'));
    let fieldPassword = await driver.findElement(By.id('password'));
    let buttonLogin = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div/div[2]/form/div[3]/button'));

    await fieldUsername.sendKeys("dhandyjoenathan")
    await fieldPassword.sendKeys("qweqwe")
    await buttonLogin.click()

    let textAlertError = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div/div[2]/div[2]/div')).getText()
    assert.equal("Mohon masukan Password yang sesuai (Minimal 8 karakter)", textAlertError);

    await driver.quit();
}

validLogin()
// invalidLogin()