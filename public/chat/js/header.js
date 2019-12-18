$(document).ready(function(){

	//-------------------- hiệu ứng kéo rèm của header-----------------------
	var isFixed = false;
	async function setHeader(top) {
		if (top >= 70 && !isFixed) {
			$('body').css({'padding-top':"50px"})
			$('.header').css({'position': 'fixed', 'z-index': '1000', "top":"-100%" , 'opacity':"0.5"});
			await $('.header').stop().animate({top: "+0%" , opacity: "+1"}, 100);
			isFixed = true ;
		} else if (top == 0 && isFixed) {
			$('body').css({'padding-top':"0px"})
			$('.header').removeAttr("style");
			isFixed = false;
		}	
	}

	$(window).scroll( function() {
		var top = $(window).scrollTop();
		setHeader(top);
	})
	//----------------------hết phần hiệu ứng kéo rèm ------------------------

	//----------------------xư lý click on  user avatar-----------------------

	function showUserMenu() {
		var check = $('.header .block-hu-user .menu-right-dropdown').attr('isShow');
		if (check==="0"){
			$('.header .block-hu-user .menu-right-dropdown').css({"display":"table"})
			$('.header .block-hu-user .menu-right-dropdown').attr({"isShow":"1"})

		} else {
			$('.header .block-hu-user .menu-right-dropdown').css({"display":"none"})
			$('.header .block-hu-user .menu-right-dropdown').attr({"isShow":"0"})
		}
	} 
	$('.header .block-hu-user .avatar').on("click", function() {
		showUserMenu();		
	})
	//-------------------------------------------------------------------------//
	// --------------------show dialog ----------------------------------------
	$('.header .block-hu-user .menu-right-dropdown .item-dropdown-menu-1 .user-avatar div').on("click", function(){
		$('.header .dialog').css({"display":"table"});
		$('.header .block-hu-user .menu-right-dropdown').css({"display":"none"})
		$('.header .block-hu-user .menu-right-dropdown').attr({"isShow":"0"})
	})

	$('.header .dialog .dialog-container .dialog-action .btn-cancel').on("click", function() {
		$('.header .dialog').css({"display":"none"});
	})
	//------------------show avatar đã chọn-------------------------------------
	function showAvatarChoosed() {
		$('.dialog .dialog-container .dialog-content .fileContainer').on("change", function(event) {

			var tmppath =$(this).val().replace(/.*(\/|\\)/, '');

			$('.dialog .dialog-container .dialog-content .btn-fake-choose-file').text(tmppath)

			// console.log(tmppath)
			// let image = $('.dialog .dialog-container .dialog-content .fileContainer[type=file]').html();
			// alert(image);

		})
	}

	showAvatarChoosed()
	//----------------------------------------------------------------------------------
})