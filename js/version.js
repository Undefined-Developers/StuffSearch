async function loadVersion() {
    try {
        const response = await fetch('/data/data.json');
        if (!response.ok) {
            throw new Error(`HTTP-Error: ${response.status}`);
        }

        const data = await response.json();

        document.getElementById('version').textContent = data.version;
    } catch (error) {
        console.error('Fehler beim Laden der Version:', error);
        document.getElementById('version').textContent = 'Fehler beim Laden!';
    }
}
loadVersion();