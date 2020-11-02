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
    return compiledTemplate({ jokes });
}

async function main() {
    try {
        let jokes = await get('/joke/api/jokes');
        let div = document.getElementById("container")
        div.innerHTML = await generateJokesTable(jokes)
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();

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

let knap = document.getElementById("Knap");
knap.onclick = async () => {
    try {
        await post("/joke/api/jokes", { setup: 'setup.value', punchline: 'punchline.value' })
    } catch (e) {
        console.log(e);
    }
}
