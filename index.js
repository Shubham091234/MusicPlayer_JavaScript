        const audioPlayer = document.getElementById('audioPlayer');
        const playPauseButton = document.getElementById('playPauseButton');
        const stopButton = document.getElementById('stopButton');
        const nextButton = document.getElementById('nextButton');
        const prevButton = document.getElementById('prevButton');
        const progressBar = document.getElementById('progressBar');
        const currentProgress = document.getElementById('currentProgress');
        const timeDisplay = document.getElementById('timeDisplay');
        const img = document.querySelector('img');

        // Define your playlist
        const playlist = [
            {
                src: 'song1.mp3',
                image: 'artist1.jpg',
                artist: 'Arijit Singh',
                song: 'Raabta',
            },
            {
                src: 'song2.mp3',
                image: 'artist2.jpg',
                artist: 'Artist 2',
                song: 'Song 2',
            },
            {
                src: 'song3.mp3',
                image: 'artist3.jpg',
                artist: 'Artist 3',
                song: 'Song 3',
            },
        ];

        let currentSongIndex = 0;
        loadSong(currentSongIndex);

        
        function loadSong(index) {
            const song = playlist[index];
            audioPlayer.src = song.src;
            playPause();
            updateSongInfo(song);
        }


        audioPlayer.addEventListener('ended', next);

playPauseButton.addEventListener('click', playPause);
function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play()
            .then(() => {
                // Playback started successfully
                playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
                img.classList.add("anime");
            })
            .catch(error => {
                // Handle any playback errors here
                console.error('Playback error:', error);
            });
    } else {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        img.classList.remove("anime");
    }
}


        stopButton.addEventListener('click', stop);
        function stop() {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            img.classList.remove("anime");
        }

        nextButton.addEventListener('click', next);
        function next() {
            if (currentSongIndex < playlist.length - 1) {
                currentSongIndex++;
            } else {
                currentSongIndex = 0;
            }
            loadSong(currentSongIndex);
        }


        prevButton.addEventListener('click', prev);
        function prev() {
            if (currentSongIndex > 0) {
                currentSongIndex--;
            } else {
                currentSongIndex = playlist.length - 1;
            }
            loadSong(currentSongIndex);
        }

        function updateSongInfo(song) {
            document.querySelector('h3').textContent = song.artist;
            document.querySelector('h2').textContent = song.song;
            document.querySelector('img').src = song.image;
        }

        progressBar.addEventListener('click', updateProgressBar);
        function updateProgressBar(e) {
            const width = e.offsetX / progressBar.clientWidth;
            audioPlayer.currentTime = width * audioPlayer.duration;
        }

        audioPlayer.addEventListener('timeupdate', () => {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;

            const progressPercentage = (currentTime / duration) * 100;
            currentProgress.style.width = progressPercentage + '%';

            const minutesCurrent = Math.floor(currentTime / 60);
            const secondsCurrent = Math.floor(currentTime % 60);
            const minutesTotal = Math.floor(duration / 60);
            const secondsTotal = Math.floor(duration % 60);

            timeDisplay.textContent = `${minutesCurrent}:${secondsCurrent} / ${minutesTotal}:${secondsTotal}`;
        });

    

    
       