document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('background-video');
    const initialImage = document.getElementById('background-image');
    const finalImage = document.getElementById('final-background');

    video.addEventListener('canplay', function() {
        video.style.opacity = '1';
        initialImage.style.opacity = '0';
        video.play();
    });

    video.addEventListener('ended', function() {
        video.style.opacity = '0';
        finalImage.style.opacity = '1';
    });

    video.load();
});