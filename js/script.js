//function loadDefaultSearchEngine() {
  //  const savedEngine = localStorage.getItem("defaultSearchEngine") || "brave"; 
    //document.getElementById("searchEngineSelect").value = savedEngine;
    //updateSearchFormAction(savedEngine);

    function updateSearchFormAction(engine) {
        const searchForm = document.getElementById("searchForm");
        const actionUrls = {
            google: "https://www.google.com/search",
            bing: "https://www.bing.com/search",
            duckduckgo: "https://duckduckgo.com",
            ecosia: "https://www.ecosia.org/search",
            yahoo: "https://search.yahoo.com/search",
            brave: "https://search.brave.com/search"
        };
        searchForm.action = actionUrls[engine];
    }

    function onEngineChange() {
        const selectedEngine = document.getElementById("searchEngineSelect").value;
        updateSearchFormAction(selectedEngine);
    }

    //window.addEventListener("DOMContentLoaded", loadDefaultSearchEngine);
//}

const searchEngines = {
    "brave": "https://search.brave.com/search",
    "google": "https://www.google.com/search",
    "bing": "https://www.bing.com/search",
    "duckduckgo": "https://duckduckgo.com",
    "ecosia": "https://www.ecosia.org/search",
    "yahoo": "https://search.yahoo.com/search"
};

document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "search.stuffmaker.org" : "StuffSearch";
});

function getSearchQuery() {
    const params = new URLSearchParams(window.location.search);
    return {
        search: params.get('search') || '',
        engine: params.get('engine') || 'brave',
        go: params.get('go') || 'false'
    };
}

function redirectToSearchEngine() {
    const { search, engine, go } = getSearchQuery();
    if (go === 'true' && search) {
        const engineUrl = searchEngines[engine];
        const searchUrl = `${engineUrl}?q=${encodeURIComponent(search)}`;
        window.location.href = searchUrl;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const { search, engine } = getSearchQuery();
    const input = document.querySelector('.input');
    const select = document.querySelector('#search-engine-select');

    if (search) input.value = search;
    if (engine) select.value = engine;

    updateSearchAction();
    redirectToSearchEngine(); 
});

function copyShareLink() {
    const input = document.querySelector('.input');
    const select = document.querySelector('#search-engine-select');
    const searchQuery = encodeURIComponent(input.value.trim());
    const selectedEngine = select.value;

    if (searchQuery) {
        const shareLink = `https://search.fwh.is?search=${searchQuery}&engine=${selectedEngine}`;
        navigator.clipboard.writeText(shareLink).then(() => {
            const messageElement = document.getElementById("message");
            messageElement.textContent = "Link copied to clipboard. You can now paste to share.";
            messageElement.style.color = "green";
        }).catch(err => {
            console.error('Failed to copy: ', err);
            const messageElement = document.getElementById("message");
            messageElement.textContent = "Failed to copy link.";
            messageElement.style.color = "red";
        });
    } else {
        const messageElement = document.getElementById("message");
        messageElement.textContent = "Please enter a search query before sharing.";
        messageElement.style.color = "red";
    }
}

function updateSearchAction() {
    const form = document.querySelector('#Search');
    const select = document.querySelector('#search-engine-select');
    const engineUrl = searchEngines[select.value];
    form.action = engineUrl;
}

//window.addEventListener("DOMContentLoaded", loadDefaultSearchEngine);


const bgImage = new Image();
bgImage.src = '/images/background.jpg';
bgImage.onload = () => {
    document.body.classList.add("loaded");
};