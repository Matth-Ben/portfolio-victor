import Vimeo from '@vimeo/player';

class CustomVimeo
{
    constructor( element )
    {
        const videoUrl = element.getAttribute('data-video');
        const options = {
            id: videoUrl,
            autoplay: false,
            controls: true,
            loop: false,
            muted: false,
        };

        const player = new Vimeo(element, options);
        const progressBar = document.querySelector('.custom-progress-bar');
        const progressBarContent = document.querySelector('.custom-progress-bar--content');
        var soundButton = document.querySelector('#sound-button');
        var resetButton = document.querySelector('#reset-button');
        var playButton = document.querySelector('#play-button');
        var allVideosButton = document.querySelector('#all-videos-button');

        updateProgressBar(0);

        // Gérez l'événement 'play' du lecteur Vimeo
        player.on('play', function() {
            // Affichez les boutons et la barre de progression
            resetButton.style.display = 'block';
            soundButton.style.display = 'block';
            progressBar.style.display = 'block';

            // Cachez le bouton "Play" et le bouton "All videos"
            playButton.style.display = 'none';
            allVideosButton.style.display = 'none';
        });

        player.on('timeupdate', function(data) {
            const currentTime = data.seconds;
            const duration = data.duration;
            
            // Calculate the progress percentage
            const progress = (currentTime / duration) * 100;
            
            // Update the custom progress bar
            updateProgressBar(progress);
        });

        function updateProgressBar(progress) {
            // Update the progress bar element with the new progress value
            progressBarContent.style.width = progress + '%';
        }

        function setVideoProgress(progress) {
            player.getDuration().then(duration => {
                const currentTime = (progress / 100) * duration;
                player.setCurrentTime(currentTime);
            });
        }

        progressBar.addEventListener('click', function(event) {
            const progressBarWidth = progressBar.offsetWidth;
            const clickX = event.offsetX;
            const progress = (clickX / progressBarWidth) * 100;
            setVideoProgress(progress);
        });

        // Gérez les clics sur le bouton de son
        soundButton.addEventListener('click', function() {
            // Obtenez l'état actuel du son
            player.getVolume().then(function(volume) {
                if (volume > 0) {
                    // Si le son est activé, désactivez-le
                    player.setVolume(0);
                    soundButton.textContent = 'Sound OFF';
                } else {
                    // Si le son est désactivé, activez-le
                    player.setVolume(1);
                    soundButton.textContent = 'Sound ON';
                }
            });
        });

        // Gérez les clics sur le bouton de réinitialisation
        resetButton.addEventListener('click', function() {
            // Arrêtez la vidéo
            player.pause();
            // Réinitialisez le temps de la vidéo à 0
            player.setCurrentTime(0);
            // Réinitialisez la barre de progression
            progressBarContent.style.width = '0%';
            // Cachez les boutons et la barre de progression
            resetButton.style.display = 'none';
            soundButton.style.display = 'none';
            progressBar.style.display = 'none';

            // Affichez le bouton "Play" et le bouton "All videos"
            playButton.style.display = 'block';
            allVideosButton.style.display = 'block';
            // Affichez à nouveau l'image de mise en avant Vimeo
            player.loadVideo(options.id).then(function(id) {
                // la vidéo est chargée
            });
        });
    }

    init() {
        player.play();
    }
}


export default CustomVimeo