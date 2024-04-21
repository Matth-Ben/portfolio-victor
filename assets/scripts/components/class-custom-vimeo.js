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
            const progressBar = document.querySelector('.custom-progress-bar-content');
            progressBar.style.width = progress + '%';
        }

        function setVideoProgress(progress) {
            const duration = player.getDuration();
            const currentTime = (progress / 100) * duration;
            player.setCurrentTime(currentTime);
        }

        const progressBar = document.querySelector('.custom-progress-bar');
        const progressBarContent = document.querySelector('.custom-progress-bar-content');
        progressBar.addEventListener('click', function(event) {
            const progressBarWidth = progressBarContent.offsetWidth;
            const clickX = event.offsetX;
            console.log(clickX);
            const progress = (clickX / progressBarWidth) * 100;
            setVideoProgress(progress);
        });
    }

    init() {
        player.play();
        this.updateProgressBar(0);
    }
}


export default CustomVimeo