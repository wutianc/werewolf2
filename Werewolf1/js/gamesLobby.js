$(function(){
	loggy.listen();
})
var loggy={
	listen:function(){
		$('#startGame').on('click',function(){
			$('.rooms').css({
				"display":"none"
			});
			$('.roomInfo').css({
				"display":"block"
			})
		})
	}	
}
