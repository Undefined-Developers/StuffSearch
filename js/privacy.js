async function updateLastUpdated() {
    try {
        const response = await fetch('/data/data.json');
        if (!response.ok) throw new Error('Cannot load data.json');
        
        const data = await response.json();
        document.getElementById('last-updated').textContent = data.lastUpdated || 'Date not found';
    } catch (error) {
        console.error('Can not load date:', error);
        document.getElementById('last-updated').textContent = 'Cannot load lastUpdated';
    }
}

updateLastUpdated();


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })

  
  