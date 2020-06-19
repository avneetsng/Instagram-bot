let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
let page = process.argv[3];
let numPosts = process.argv[4];
let url, pwd, user;

(async function () {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    url = credentials.url;
    user = credentials.user;
    pwd = credentials.pwd;
    // starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"],

    });
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    
    await tab.goto(url, {
        waitUntil: "networkidle2"
    });

    tab.setDefaultNavigationTimeout(50000);
    await tab.waitForSelector("input[aria-label='Phone number, username, or email']");
    await tab.type("input[aria-label='Phone number, username, or email']", user, { delay: 200 });
    await tab.type("input[aria-label='Password']", pwd, { delay: 200 });

    await tab.waitForSelector('button[type="submit"]');
    await Promise.all([
    tab.waitForNavigation({
        waitUntil: 'networkidle2',
    }),
    tab.click('button[type="submit"]'),
    ]);

    await tab.goto(url + page, {
        waitUntil: 'networkidle2',
      });
    
    await tab.waitForSelector( ".Nnq7C.weEfm" );
    let posts = await tab.$$( ".Nnq7C.weEfm div a" );
    let post=posts[0];

    await Promise.all([
        await post.click(),
        tab.waitForNavigation({ waitUntil:"networkidle2" })
    ])
let i=0;
do{
    
    await tab.waitForSelector(".fr66n button")
   
        await tab.click(".fr66n button");
        
    await Promise.all([
        tab.click(" ._65Bje.coreSpriteRightPaginationArrow "),
    ])
    i++;
    console.log( (i)+" Post liked" );

}
while( i < numPosts )
       
})();