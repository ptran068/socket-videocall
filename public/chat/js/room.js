$(document).ready(function () {
	setHeightResponsive();
	$(window).resize(function() {
		setHeightResponsive();
	})
	$('#triggerCreateRoom').on("click" , function () {
		$('#dialog01').css({'display': 'table'});
	})

	$('#triggerCloseDialog01').on("click" , function () {
		$('#dialog01').css({'display': 'none'});
	})

	$('.dialog-2  .dialog-container-2 .list-result .row-user-result').on('click', function () {

		if ($(this).children('.checkbox').children('input').attr('checked')==undefined) {

			$(this).children('.checkbox').children('input').attr({'checked':'true'});
			const idUser = $(this).attr('id');
			let avatar = $(this).children('.user-avatar').css('background-image');
			avatar = avatar.slice(avatar.indexOf('"')+1, avatar.length);
			avatar = avatar.slice(0, avatar.indexOf('"'));
			const name = $(this).children('.name-user').text();
			let slectedUser = '<div class="row-user-result '+idUser+'" idUser="'+idUser+'">'+
				'<div class="user-avatar" style="background-image: url('+avatar+')"></div>'+
				'<div class="name-user">'+name+'</div>'+
				'<div class="remove-member">'+
					'<button type="button" onclick="removeSelectedMember('+idUser+')"><i class="fa fa-remove"></i></button>'+
				'</div>'+
			'</div>'

			$('.list-member-selected').append(slectedUser);
		}
		
	})

	$('#create-room').on('click', function () {
		let name = $('.dialog-2  .dialog-container-2 .bar-set-name-room input').val();
		let listSelectedMembers = $('.dialog-2  .dialog-container-2 .list-member-selected .row-user-result');
		let members= [];
		$.each(listSelectedMembers, function(index, item) {
			members.push($(item).attr('idUser'));
		});
	})


})

function setHeightResponsive(){
	var height = $(window).height()-50;
	$('.container .list-rooms').css({'height':height});
	$('.container .list-rooms .list-room-box').css({'height': height-132});
	$('.container .content-conversation').css({'height': height});
	$('.container .content-conversation .scroll-area-chat .content').css({'height':height-110});
	$('.container .content-conversation .scroll-right-area-chat').css({'height':height-60});
}

function removeSelectedMember(id){
	$(`.dialog-2  .dialog-container-2 .list-member-selected .row-user-result.${id}`).remove();
	$(`.dialog-2  .dialog-container-2 .list-result #${id} .checkbox input`).removeAttr('checked');
}


