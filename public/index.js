// index.js
async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function getText(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.text();
}

async function generateJokesTable(jokes) {
    let template = await getText('/index.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({jokes});
}

async function main() {
    try {
        let jokes = await get('/joke');
        document.body.innerHTML = await generateJokesTable(jokes);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();