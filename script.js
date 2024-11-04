function consumeApi1() {
    fetch('https://picsum.photos/v2/list')
        .then(response => response.json())
        .then(data => {
            const galleryDiv = document.getElementById("image-gallery");
            data.forEach(item => {
                let img = document.createElement("img");
                img.src = item.download_url;
                img.alt = item.author; 
                galleryDiv.appendChild(img); 
            });
        })
        .catch(error => console.error("Erro ao carregar imagens:", error));
}


function findJobs(){
    fetch('https://jobicy.com/api/v2/remote-jobs?count=10&geo=brazil')
    .then(response =>response.json())
    .then(data => {
        const jobs = data.jobs; 
        if (Array.isArray(jobs)) {
            montarPagina(jobs);
        } else {
            console.error("Jobs não é um array", jobs);
        }
    })
    .catch(error => {
        console.error("Houve um problema com a requisição Fetch:", error);
    });
}

function montarPagina(jobs) {
    const contentDiv = document.getElementById("contentJobs");
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let trHead = document.createElement("tr");
    
    const headers = ["ID", "Título", "Empresa", "Descrição"];
    headers.forEach(header => {
        let th = document.createElement("th");
        th.innerHTML = header;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    jobs.forEach(job => {
        let trBody = document.createElement("tr");
        let tdId = document.createElement("td");
        tdId.innerHTML = job.id; 
        let tdTitle = document.createElement("td");
        tdTitle.innerHTML = job.jobTitle; 
        let tdCompany = document.createElement("td");
        tdCompany.innerHTML = job.companyName; 
        let tdDescription = document.createElement("td");
        tdDescription.innerHTML = job.jobExcerpt ? job.jobExcerpt : ""; 

        trBody.appendChild(tdId);
        trBody.appendChild(tdTitle);
        trBody.appendChild(tdCompany);
        trBody.appendChild(tdDescription);
        tbody.appendChild(trBody);
    });

    table.appendChild(tbody);
    contentDiv.appendChild(table); 
}

findJobs();

function fetchSkins() {
    fetch('https://bymykel.github.io/CSGO-API/api/pt-BR/stickers.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            montarContainers(data);
        })
        .catch(function(error) {
            console.error("Houve um problema com a requisição Fetch:", error);
        });
}

function montarContainers(stickers) {
    var container = document.getElementById("card-container");

    stickers.forEach(function(sticker) {
        var card = document.createElement("div");
        card.className = "card";

        var image = document.createElement("img");
        image.src = sticker.image;
        image.alt = sticker.name;

        var cardContent = document.createElement("div");
        cardContent.className = "card-content";

        var title = document.createElement("h3");
        title.className = "card-title";
        title.textContent = sticker.name;

        var description = document.createElement("p");
        description.className = "card-description";
        description.textContent = sticker.description;

        var rarity = document.createElement("p");
        rarity.className = "card-rarity";
        rarity.textContent = "Raridade: " + sticker.rarity.name;
        rarity.style.color = sticker.rarity.color;

        var tournamentEvent = document.createElement("p");
        tournamentEvent.className = "card-tournament";
        tournamentEvent.textContent = "Evento: " + sticker.tournament_event;

        var tournamentTeam = document.createElement("p");
        tournamentTeam.className = "card-team";
        tournamentTeam.textContent = "Time: " + sticker.tournament_team;

        cardContent.appendChild(title);
        cardContent.appendChild(description);
        cardContent.appendChild(rarity);
        cardContent.appendChild(tournamentEvent);
        cardContent.appendChild(tournamentTeam);

        card.appendChild(image);
        card.appendChild(cardContent);

        container.appendChild(card);
    });
}

fetchSkins();


function fetchKeys() {
    fetch('https://bymykel.github.io/CSGO-API/api/pt-BR/keys.json') 
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            displayKeys(data);
        } else {
            console.error("Resposta inesperada", data);
        }
    })
    .catch(error => {
        console.error("Houve um problema com a requisição Fetch:", error);
    });
}

function displayKeys(keys) {
    const contentDiv = document.getElementById("contentKeys");

    if (!contentDiv) {
        console.error("Elemento 'content' não encontrado.");
        return;
    }

    keys.forEach(key => {
        const container = document.createElement("div");
        container.style.marginBottom = "20px";

        const title = document.createElement("h3");
        title.innerText = key.name;
        container.appendChild(title);

        const description = document.createElement("p");
        description.innerText = key.description;
        container.appendChild(description);

        const image = document.createElement("img");
        image.src = key.image;
        image.alt = key.name;
        image.style.width = "150px";
        container.appendChild(image);

        contentDiv.appendChild(container);
    });
}

fetchKeys();