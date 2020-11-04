// index.js
async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 201) // Created
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
    return compiledTemplate({ jokes });
}

async function main() {
    try {
        let jokes = await get('/joke/api/jokes');
        let div = document.getElementById('jokesDiv')
        div.innerHTML = await generateJokesTable(jokes);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();

let rydButton = document.getElementById('clear')
let opretButton = document.getElementById('opretButton')

opretButton.onclick = async () => {
    if (setup.value && punchline.value) {
        try {
            await post("/joke/api/jokes", { setup: setup.value, punchline: punchline.value });

        } catch (e) {
        }
        setup.value = ''
        punchline.value = ''
        main();
    }
}
rydButton.onclick = async () => {
    setup.value = ''
    punchline.value = ''
}
let selectSite = document.getElementById('selectSite')


async function getSites() {
    try {
        let result = await get('https://krdo-joke-registry.herokuapp.com/api/services');
        createSelect(result)
    }
    catch (e) {
        console.log(e);
    }
}

getSites()


function createSelect(result) {
    let siteArray = []
    console.log(result)
    for (let i = 0; i < result.length; i++) {
        siteArray.push(result[i].address)
        let option = document.createElement('option')
        option.text = siteArray[i]
        selectSite.add(option, i)
    }
}

