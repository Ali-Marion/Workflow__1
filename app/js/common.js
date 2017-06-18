var index = 0;
var interval;
var album = new Array(	'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 	'photo6.jpg', 'photo7.jpg', 'photo8.jpg');
function nextPhoto() {
	var img = document.getElementById('photo');
	index++;
	if (index >= album.length)
		index = 0;
	img.src = '../img/'+album[index];
}
function previousPhoto() {
	var img = document.getElementById('photo');
	index--;
	if (index < 0)
		index = album.length - 1;
	img.src = '../img/'+album[index];
}
function slidePhoto() {
	if (interval){
		clearInterval(interval);
		interval = null;
	}				
	else
		interval = setInterval('nextPhoto()', 2000);
}
window.onload = function() {
	var img = document.getElementById('photo');
	img.src = '../img/'+album[index];
	img.onclick = nextPhoto;
	var but = document.getElementById('two');
	but.onclick = nextPhoto;
	var but2 = document.getElementById('one');
	but2.onclick = previousPhoto;
	var but3 = document.getElementById('slide');
	but3.onclick = slidePhoto;
};