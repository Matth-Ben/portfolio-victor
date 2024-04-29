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
        var soundButton = document.querySelector('#sound-button');
        updateProgressBar(0);


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
            const progressBar = document.querySelector('.custom-progress-bar--content');
            progressBar.style.width = progress + '%';
        }

        function setVideoProgress(progress) {
            player.getDuration().then(duration => {
                const currentTime = (progress / 100) * duration;
                player.setCurrentTime(currentTime);
            });
        }

        const progressBar = document.querySelector('.custom-progress-bar');
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
    }

    init() {
        player.play();
    }
}


export default CustomVimeo