$(document).ready(function () {
    init();

    function init() {
        var current = 0;
        var audio = $('#audMainPlayer');
        var playlist = $('#ulPlaylist');
        var tracks = playlist.find('li a');
        var len = tracks.length;
        audio[0].volume = 1;
        audio[0].play();

        playlist.on('click', 'a', function (e) {
            e.preventDefault();
            link = $(this);
            current = link.parent().index();
            run(link, audio[0]);

            // Update play count
            const songId = link.parent().data('song-id');
            updatePlayCount(songId);
        });

        audio[0].addEventListener('ended', function (e) {
            current++;
            if (current == len) {
                current = 0;
                link = playlist.find('a')[0];
            } else {
                link = playlist.find('a')[current];
            }
            run($(link), audio[0]);
            
            // Update play count for the next song
            const songId = $(link).parent().data('song-id');
            updatePlayCount(songId);
        });
    }

    function run(link, player) {
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        player.load();
        player.play();
    }

    function updatePlayCount(songId) {
        fetch(`update_play_count.php?song_id=${songId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById(`playCount-${songId}`).textContent = data.count;
            })
            .catch(error => console.error('Error updating play count:', error));
    }
});
