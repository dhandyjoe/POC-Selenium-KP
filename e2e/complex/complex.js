import expect from 'chai'
const { Builder, By, until } = require('selenium-webdriver');

let driver;

async function checkBulan() {
    const bulanElement = await driver.findElement(By.xpath("/html/body/div[6]/div[2]/div[1]/table/thead/tr[1]/th[2]"));
    const bulanText = await bulanElement.getText();

    if (bulanText === 'Feb 2025') {
        await driver.findElement(By.xpath("/html/body/div[6]/div[2]/div[1]/table/tbody/tr[1]/td[7]")).click();
        await driver.findElement(By.xpath("/html/body/div[6]/div[2]/div[1]/table/tbody/tr[5]/td[6]")).click();
        await driver.findElement(By.xpath("//button[normalize-space()='Apply']")).click();
    } else {
        await driver.findElement(By.xpath("//th[@class='prev available']")).click();
        await checkBulan();
    }
}

describe('Mocha Hooks in Selenium', function () {
    beforeEach(async function () {
        this.timeout(10000);
        console.log("Launching browser...");
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https://staging-sally.kbfinansia.com/auth/login')

        let fieldUsername = await driver.findElement(By.id('username'));
        let fieldPassword = await driver.findElement(By.id('password'));
        let buttonLogin = driver.findElement(By.xpath("//button[@class='kt-form btn-login btn btn-primary btn-lg btn-block font-weight-bold']"));

        await fieldUsername.sendKeys("dhandyjoenathan")
        await fieldPassword.sendKeys("201017Dj*#*#")
        await buttonLogin.click()
        await driver.findElement(By.xpath("//h3[@class='kt-subheader__title']")).getText().then((text) => {
            expect(text).to.equal("Profile");
        });
    });

    context('Manajemen Prospek', () => {
        it('data not found', async function () {
            this.timeout(10000);
            await driver.findElement(By.xpath("//span[normalize-space()='Kunjungan Dealer']")).click()
            await driver.findElement(By.xpath("//span[normalize-space()='Manajemen Prospek']")).click()
            await driver.findElement(By.xpath("//h3[contains(@class,'kt-portlet__head-title')]")).getText().then((text) => {
                expect(text).to.equal("Manajemen Prospek");
            });

            await driver.findElement(By.xpath("//input[@id='period']")).click()
            let pickDate = await driver.findElement(By.xpath("/html/body/div[6]/div[2]/div[1]/table/tbody/tr[1]/td[3]"))
            await driver.actions({ async: true }).doubleClick(pickDate)
            await driver.findElement(By.xpath("//button[normalize-space()='Apply']")).click()
            await driver.findElement(By.xpath("//button[@id='filter']")).click()

            await driver.sleep(2000)
            await driver.findElement(By.xpath("//td[@class='dt-empty']")).getText().then((text) => {
                expect(text).to.equal("No data available in table");
            });
        })

        it('valid data', async function () {
            this.timeout(10000);
            await driver.findElement(By.xpath("//span[normalize-space()='Kunjungan Dealer']")).click()
            await driver.findElement(By.xpath("//span[normalize-space()='Manajemen Prospek']")).click()
            await driver.findElement(By.xpath("//h3[contains(@class,'kt-portlet__head-title')]")).getText().then((text) => {
                expect(text).to.equal("Manajemen Prospek");
            });

            await driver.findElement(By.xpath("//input[@id='period']")).click()

            await checkBulan();

            await driver.findElement(By.xpath("//button[@id='filter']")).click()

            await driver.findElement(By.xpath("/html/body/div[2]/div/div/div[2]/div/div/div[2]/div/div[2]/div[2]/div[3]/div[3]/table")).isDisplayed()
            await driver.sleep(2000)
            let btnDetail = await driver.findElement(By.xpath("//tbody/tr[1]/td[7]/div[1]/a[1]"));
            await btnDetail.click()

            // Data Dealer
            await driver.findElement(By.xpath("//h3[normalize-space()='Data Dealer']")).getText().then((text) => {
                expect(text).to.equal("Data Dealer");
            });
            await driver.findElement(By.xpath("//b[normalize-space()='Data Kunjungan']")).getText().then((text) => {
                expect(text).to.equal("Data Kunjungan");
            });
            await driver.findElement(By.xpath("//b[normalize-space()='Data Dealer']")).getText().then((text) => {
                expect(text).to.equal("Data Dealer");
            });
            await driver.findElement(By.xpath("//b[normalize-space()='Data Prospek']")).getText().then((text) => {
                expect(text).to.equal("Data Prospek");
            });

            await driver.findElement(By.xpath("//label[normalize-space()='VISIT FINISHED']")).getText().then((text) => {
                expect(text).not.null
            });
            await driver.findElement(By.xpath("//div[6]//div[1]//div[2]//label[1]")).getText().then((text) => {
                expect(text).not.null
            });
            await driver.findElement(By.xpath("//label[normalize-space()='081255807890']")).getText().then((text) => {
                expect(text).not.null
            });

            // Data Stock Financing
            await driver.findElement(By.xpath("//button[normalize-space()='Data Stock Financing']")).click()
            await driver.sleep(1000)
            await driver.findElement(By.xpath("//h3[normalize-space()='Data Stock Financing']")).getText().then((text) => {
                expect(text).to.equal("Data Stock Financing");
            });
            await driver.findElement(By.xpath("//label[normalize-space()='Jumlah Stock Unit Saat Kunjungan']")).getText().then((text) => {
                expect(text).to.equal("Jumlah Stock Unit Saat Kunjungan");
            });
            await driver.findElement(By.xpath("//label[normalize-space()='Restock Bulan Ini']")).getText().then((text) => {
                expect(text).to.equal("Restock Bulan Ini");
            });
            await driver.findElement(By.xpath("//label[normalize-space()='Stock Unit Terjual Bulan Ini']")).getText().then((text) => {
                expect(text).to.equal("Stock Unit Terjual Bulan Ini");
            });
            await driver.findElement(By.xpath("//label[normalize-space()='Memiliki Pembiayaan Dari Multi Finance Lain']")).getText().then((text) => {
                expect(text).to.equal("Memiliki Pembiayaan Dari Multi Finance Lain");
            });

            await driver.findElement(By.xpath("/html/body/div[2]/div/div/div[2]/div/div/div[3]/div/div[2]/div[2]/div[1]/table")).isDisplayed()

            // Data Stock Financing
            await driver.findElement(By.xpath("//button[normalize-space()='Dokumen Pendukung']")).click()
            await driver.sleep(1000)
            await driver.findElement(By.xpath("//h3[normalize-space()='Data Dokumen Pendukung']")).getText().then((text) => {
                expect(text).to.equal("Data Dokumen Pendukung");
            });

            // await driver.findElement(By.xpath("//div[1]//div[1]//div[3]//div[1]//div[3]//div[2]//div[1]//div[2]//div[1]//div[1]//img[1]")).click()
            // await driver.findElement(By.xpath('//*[@id="modalImageAddress"]/div/div')).isDisplayed()
            // await driver.findElement(By.xpath('//*[@id="modalImageAddress"]/div/div/div[1]/button')).click()

            await driver.findElement(By.xpath(`//div[@id='data-document']//a[contains(@class,'btn btn-secondary px-5 mr-2')][normalize-space()='Kembali']`)).click()

            await driver.findElement(By.xpath("//h3[contains(@class,'kt-portlet__head-title')]")).getText().then((text) => {
                expect(text).to.equal("Manajemen Prospek");
            });
        })
    })

    context('Master Kunjungan Dealer', () => {
        it('valid', async function () {
            this.timeout(10000);
            await driver.findElement(By.xpath("//span[normalize-space()='Kunjungan Dealer']")).click()
            await driver.findElement(By.xpath("//span[normalize-space()='Master Kunjungan Dealer']")).click()
            await driver.findElement(By.xpath("//h3[@class='kt-portlet__head-title']")).getText().then((text) => {
                expect(text).to.equal("Master Kunjungan Dealer");
            });

            // EDIT
            await driver.findElement(By.xpath("//input[@id='dt-search-0']")).sendKeys("MO")
            await driver.sleep(1000)
            await driver.findElement(By.xpath("//td[@class='sorting_1']")).getText().then((text) => {
                expect(text).to.equal("MO");
            });

            await driver.findElement(By.xpath("//a[contains(@href,'master-kunjungan-dealer/MO/form')]")).click()
            await driver.findElement(By.xpath("//h3[normalize-space()='Penalti']")).isDisplayed()
            await driver.findElement(By.xpath("//h3[normalize-space()='Target Aktivitas Kunjungan / Bulan']")).isDisplayed()

            await driver.findElement(By.xpath("//input[@id='input-1']")).clear()
            await driver.findElement(By.xpath("//input[@id='input-1']")).sendKeys('30')
            await driver.findElement(By.xpath("//input[@id='input-2']")).clear()
            await driver.findElement(By.xpath("//input[@id='input-2']")).sendKeys('30')
            await driver.findElement(By.xpath("//input[@id='input-3']")).clear()
            await driver.findElement(By.xpath("//input[@id='input-3']")).sendKeys('30')
            await driver.findElement(By.xpath("//input[@id='input-allBranch']")).clear()
            await driver.findElement(By.xpath("//input[@id='input-allBranch']")).sendKeys('30')

            await driver.findElement(By.xpath("//button[@id='btn-simpan']")).click()
            await driver.sleep(500)
            await driver.findElement(By.xpath("//button[contains(@type,'button')][normalize-space()='Simpan']")).click()
            await driver.sleep(1000)
            await driver.findElement(By.xpath("//button[normalize-space()='Mengerti']")).click()
            await driver.sleep(1000)

            // Detail
            await driver.findElement(By.xpath("//input[@id='dt-search-0']")).sendKeys("MO")
            await driver.sleep(1000)
            await driver.findElement(By.xpath("//td[@class='sorting_1']")).getText().then((text) => {
                expect(text).to.equal("MO");
            });

            await driver.findElement(By.xpath("//a[@title='Detail']")).click()
            await driver.findElement(By.xpath("//h3[@class='kt-portlet__head-title']")).getText().then((text) => {
                expect(text).to.equal("MO");
            });
            await driver.findElement(By.xpath("//h6[normalize-space()='Penalti']")).isDisplayed()
            await driver.findElement(By.xpath("//h6[normalize-space()='Target Aktivitas Kunjungan / Bulan']")).isDisplayed()

            await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]")).getText().then((text) => {
                expect(text).to.equal("30%");
            });
            await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[2]")).getText().then((text) => {
                expect(text).to.equal("30%");
            });
            await driver.findElement(By.xpath("//tbody/tr[3]/td[2]")).getText().then((text) => {
                expect(text).to.equal("30%");
            });
            await driver.findElement(By.xpath("//a[@class='btn btn-secondary']")).click()

            await driver.findElement(By.xpath("//h3[@class='kt-portlet__head-title']")).getText().then((text) => {
                expect(text).to.equal("Master Kunjungan Dealer");
            });
        })
    })

    context('Manajemen Kunjungan Dealer', () => {
        it('valid', async function () {
            this.timeout(1000000);
            await driver.findElement(By.xpath("//span[normalize-space()='Kunjungan Dealer']")).click()
            await driver.findElement(By.xpath("//span[normalize-space()='Manajemen Kunjungan Dealer']")).click()
            await driver.findElement(By.xpath("//h3[@class='kt-portlet__head-title']")).getText().then((text) => {
                expect(text).to.equal("Kunjungan Dealer");
            });
            await driver.sleep(500)

            // Create Penugasan
            await driver.findElement(By.xpath("//a[@class='btn btn-primary ml-auto']")).click()
            await driver.findElement(By.xpath("//h3[@class='kt-portlet__head-title']")).getText().then((text) => {
                expect(text).to.equal("Form Penugasan Kunjungan Dealer");
            });

            await driver.findElement(By.xpath("//span[@id='select2-dealer_name-container']")).click()
            await driver.sleep(1000)
            await driver.findElement(By.xpath("//input[@role='searchbox']")).sendKeys('118 MOBILINDO')
            await driver.sleep(4000)
            await driver.findElement(By.xpath('//*[@id="select2-dealer_name-results"]/li[1]')).click()
            await driver.sleep(3000)

            await driver.findElement(By.xpath("//span[@id='select2-pic-container']")).click()
            await driver.sleep(1000)
            await driver.findElement(By.xpath("//input[@role='searchbox']")).sendKeys('ABDUL MUIS')
            await driver.sleep(4000)
            await driver.findElement(By.xpath('//*[@id="select2-pic-results"]/li[1]')).click()
            await driver.sleep(3000)

            await driver.findElement(By.xpath("//input[@id='task_date']")).click()
            await driver.findElement(By.xpath("//button[normalize-space()='Apply']")).click()

            await driver.findElement(By.xpath("//input[@id='visit_count']")).sendKeys('5')

            await driver.findElement(By.xpath("//button[@id='btn-submit']")).click()
            await driver.findElement(By.xpath("//div[@id='swal2-content']")).getText().then((text) => {
                expect(text).to.equal("Kunjungan ke dealer 118 MOBILINDO akan ditugaskan kepada ABDUL MUIS dengan 5 kelipatan kunjungan");
            });

            await driver.findElement(By.xpath("//button[normalize-space()='Tugaskan']")).click()
            await driver.sleep(1000)
            await driver.findElement(By.xpath("//button[normalize-space()='Mengerti']")).click()
            await driver.sleep(1000)

            // Detail
            await driver.findElement(By.xpath("//tbody/tr[1]/td[4]")).getText().then((text) => {
                expect(text).to.equal("ABDUL MUIS");
            });
            await driver.findElement(By.xpath("//tbody/tr[1]/td[8]/div[1]/a[1]")).click()
            await driver.sleep(500)

            await driver.findElement(By.xpath("//h3[normalize-space()='Data Dealer']")).getText().then((text) => {
                expect(text).to.equal("Data Dealer");
            });

            await driver.findElement(By.xpath("//b[normalize-space()='Data Kunjungan']")).isDisplayed()
            await driver.findElement(By.xpath("//b[normalize-space()='Data Dealer']")).isDisplayed()

            await driver.findElement(By.xpath("//label[normalize-space()='TASK ACTIVE']")).getText().then((text) => {
                expect(text).to.equal("TASK ACTIVE");
            });
            await driver.findElement(By.xpath("//label[normalize-space()='Ya']")).getText().then((text) => {
                expect(text).to.equal("Ya");
            });
            await driver.findElement(By.xpath("//label[normalize-space()='118 MOBILINDO']")).getText().then((text) => {
                expect(text).to.equal("118 MOBILINDO");
            });

            await driver.findElement(By.xpath("//div[@id='data-dealer']//a[contains(@class,'btn btn-secondary px-5 mr-2')][normalize-space()='Kembali']")).click()

            await driver.findElement(By.xpath("//h3[@class='kt-portlet__head-title']")).getText().then((text) => {
                expect(text).to.equal("Kunjungan Dealer");
            });
        })

    })

    afterEach(async function () {
        let iconProfile = driver.findElement(By.xpath(`/html/body/div[2]/div/div/div[1]/div/div[1]/div/div[2]/div[2]/div[1]/img`));
        iconProfile.click();

        let buttonLogout = driver.findElement(By.xpath('/html/body/div[2]/div/div/div[1]/div/div[1]/div/div[2]/div[2]/div[2]/div[2]/div/button'))
        buttonLogout.click();

        let buttonLogoutYes = driver.findElement(By.xpath('/html/body/div[6]/div/div[3]/button[1]'))
        buttonLogoutYes.click();

        // let textLogin = driver.findElement(By.xpath("//h3[@class='kt-login__title text-left']")).getText()
        // textLogin.should.to.equal('LOGIN')

        driver.quit();
    });
});
