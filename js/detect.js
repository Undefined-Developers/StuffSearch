async function isBraveBrowser() {
    if (navigator.brave && (await navigator.brave.isBrave())) {
        return true;
    }
    return false;
}

document.addEventListener("DOMContentLoaded", async function () {
    if (await isBraveBrowser()) {
        const troubleshootElement = document.createElement("a");
        troubleshootElement.href = "#";
        troubleshootElement.className = "social-icon";
        troubleshootElement.dataset.tooltip = "Troubleshoot";
        
        const img = document.createElement("img");
        img.src = "/images/troubleshoot.png";
        img.style.width = "30px";
        img.style.height = "30px";
        img.style.marginTop = "10px";
        img.alt = "Troubleshoot";
        
        troubleshootElement.appendChild(img);
        
        troubleshootElement.addEventListener("click", function(event) {
            event.preventDefault();
            const popup = document.createElement("div");
            popup.className = "troubleshoot-popup";
            popup.style.position = "fixed";
            popup.style.top = "20%";
            popup.style.left = "50%";
            popup.style.transform = "translate(-50%, 0)";
            popup.style.background = "black";
            popup.style.padding = "20px";
            popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
            popup.style.zIndex = "1000";
            popup.style.borderRadius = "10px";

            const text = document.createElement("p");
            text.textContent = "Looks like you are using the brave browser. If you experience any issues please try turning off brave shields";

            const gif = document.createElement("img");
            gif.src = "/images/troubleshoot/brave.gif";
            gif.style.width = "100%";
            gif.style.marginTop = "10px";

            const closeButton = document.createElement("button");
            closeButton.className = "troubleshoot-close-button";
            closeButton.textContent = "Close";
            closeButton.style.marginTop = "10px";
            closeButton.addEventListener("click", function() {
                document.body.removeChild(popup);
            });

            popup.appendChild(text);
            popup.appendChild(gif);
            popup.appendChild(closeButton);
            document.body.appendChild(popup);
        });

        document.querySelector("footer").appendChild(troubleshootElement);
    }
});
