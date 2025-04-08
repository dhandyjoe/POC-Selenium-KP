require = require('esm')(module);
const { expect } = require('chai');
const { Builder, By } = require('selenium-webdriver');

let driver;

describe('Mocha Hooks in Selenium', function () {
    this.beforeEach(async function () {
        this.timeout(10000);
        console.log("Launching browser...");
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https://staging-sally.kbfinansia.com/auth/login')
    });

    it('valid login', async function () {
        this.timeout(10000);
        let fieldUsername = await driver.findElement(By.id('username'));
        let fieldPassword = await driver.findElement(By.id('password'));
        let buttonLogin = await driver.findElement(By.xpath("//button[@class='kt-form btn-login btn btn-primary btn-lg btn-block font-weight-bold']"));

        await fieldUsername.sendKeys("dhandyjoenathan")
        await fieldPassword.sendKeys("201017Dj*#*#")
        await buttonLogin.click()
        await driver.findElement(By.xpath('//*[@id="kt_subheader"]/div/div/h3')).getText().then((text) => {
            expect(text).to.equal("Profile");
        });

        await driver.quit();
    });

    it('invalid login', async function () {
        this.timeout(10000);
        let fieldUsername = await driver.findElement(By.id('username'));
        let fieldPassword = await driver.findElement(By.id('password'));
        let buttonLogin = await driver.findElement(By.xpath("//button[@class='kt-form btn-login btn btn-primary btn-lg btn-block font-weight-bold']"));

        await fieldUsername.sendKeys("qweqwe")
        await fieldPassword.sendKeys("qweqwe")
        await buttonLogin.click()
        await driver.findElement(By.xpath("//div[@class='alert-text']")).getText().then((text) => {
            expect(text).to.equal("Mohon masukan Password yang sesuai (Minimal 8 karakter)");
        });

        await driver.quit();
    });

    it('username password is null', async function () {
        this.timeout(10000);
        // let fieldUsername = await driver.findElement(By.id('username'));
        // let fieldPassword = await driver.findElement(By.id('password'));
        let buttonLogin = await driver.findElement(By.xpath("//button[@class='kt-form btn-login btn btn-primary btn-lg btn-block font-weight-bold']"));

        // await fieldUsername.sendKeys("qweqwe")
        // await fieldPassword.sendKeys("qweqwe")
        await buttonLogin.click()
        await driver.findElement(By.xpath("//div[normalize-space()='Password tidak boleh kosong']")).getText().then((text) => {
            expect(text).to.equal("Password tidak boleh kosong");
        });
        await driver.findElement(By.xpath("//div[normalize-space()='Username tidak boleh kosong']")).getText().then((text) => {
            expect(text).to.equal("Username tidak boleh kosong");
        });


        await driver.quit();
    });

    // afterEach(async function () {
    //     let iconProfile = await driver.findElement(By.xpath(`/html/body/div[2]/div/div/div[1]/div/div[1]/div/div[2]/div[2]/div[1]/img`));
    //     await iconProfile.click();

    //     let buttonLogout = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[1]/div/div[1]/div/div[2]/div[2]/div[2]/div[2]/div/button'))
    //     await buttonLogout.click();

    //     let buttonLogoutYes = await driver.findElement(By.xpath('/html/body/div[6]/div/div[3]/button[1]'))
    //     await buttonLogoutYes.click();

    //     await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div/div[2]/div/h3')).getText().then((text) => {
    //         expect(text).to.equal("LOGIN");
    //     });

    //     await driver.quit();
    // });
});
