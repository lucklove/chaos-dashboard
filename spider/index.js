const fs = require('fs');
const puppeteer = require('puppeteer');
const _ = require('lodash');

(async () => {
    try {
        const browser = await puppeteer.launch({headless: false, slowMo: 100, args: ['--start-fullscreen'], defaultViewport: null});
        await savePage(browser, 1, 'http://127.0.0.1:3000/d/H3wXWqfWz/chaos-monitor')
        await browser.close();
    } catch(e) {
        console.error(e);
    }
})();

async function savePage(browser, pageId, pageUrl) {
    const page = await browser.newPage();
    //await fs.mkdir(`/tmp/pages/${pageId}`);

    await page.goto(pageUrl);
    await page.waitFor(() => !!document.querySelector('.dashboard-container .panel-header'));
    const headers = await page.$$('.panel-header');

    await _.map(headers, (_h, i) => async () => {
        await page.goto(pageUrl);
        await page.waitFor(() => !!document.querySelector('.dashboard-container .panel-header'));
        const headers = await page.$$('.panel-header');
        const h = headers[i];
        await h.click();
        let apply = () => {};
        await Promise.all(_.map(await h.$$('.dropdown-menu li'), async li => {
            const isView = await li.evaluate(node => node.innerText.indexOf('View') !== -1)
            if(isView) {
                apply = async () => {
                    li.click();
                    await page.waitFor(() => !!document.querySelector('.panel-container'));
                    const hs = await page.$$('.panel-container');
                    await Promise.all(_.map(hs, async e => {
                        if(await page.evaluate(e => !!e.offsetParent, e)) {
                            await e.screenshot({path: `/Users/joshua/Desktop/${pageId}_${i}.png`});
                        }
                    }));
                };
            }
        }));
        await apply();
    }).reduce((p, c) => async () => { await p(); await c(); async () => {}})();
}