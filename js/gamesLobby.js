$(function(){
	funs.listens();
})
var funs={
	listens:function(){
		$('.seat').on("click",function(){
			funs.animateStart(0,15);
			//alert($(this).parents('.room').attr('numdata')+"号房间"+$(this).attr('seatdata')+"号座位");
			
		})
	},
	getRoom:function(){
		$.ajax({
			type:"post",
			url:"",
			success:function(data){
				
			},
			error:function(data){
				
			},
			async:true
		});
	},
	animateStart:function(start,end){
		if(start<end){
			$('.setbox').css({
				"display":"block",
				"height":start+"rem"
			});
			start=start+0.3;
			setTimeout(function(){
				funs.animateStart(start,end);
			},1)
		};
	},
	animateEnd:function(){
		$('.setbox').css({
			"display":"none"
		});
	}
}
	