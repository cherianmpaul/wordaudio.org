$(document).ready(function () {
	init();
	function init(){
		var current = 0;
		var audio = $('#audMainPlayer');
		var playlist = $('#ulPlaylist');
		var tracks = playlist.find('li a');
		var len = tracks.length;
		audio[0].volume = 1;
		audio[0].play();
		playlist.on('click','a', function(e){
			e.preventDefault();
			link = $(this);
			current = link.parent().index();
			run(link, audio[0]);
		});
		audio[0].addEventListener('ended',function(e){
			current++;
			if(current == len){
				current = 0;
				link = playlist.find('a')[0];
			}else{
				link = playlist.find('a')[current];    
			}
			run($(link),audio[0]);
		});
	}
	function run(link, player){
			player.src = link.attr('href');
			par = link.parent();
			par.addClass('active').siblings().removeClass('active');
			document.body.scrollTop = document.documentElement.scrollTop = 0;
			player.load();
			player.play();
	}
});
