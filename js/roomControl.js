$(function(){
	ctr.clicks();
})
var ctr={
	anit:function(tar,bl){
		if(ctr.ble==true){
			tar.parent().siblings('.selectJ').show();
			ctr.ble=false
		}else{
			tar.parent().siblings('.selectJ').hide();
			ctr.ble=true
		}
			
	},
	ble:true,
	clicks:function(){
		$('.juese').click(function(){
			var seatNum=$(this).parents().find('.seat').attr('seatNum');
			//alert(seatNum);
			ctr.anit($(this),ctr.ble);
		});
		$('.end').click(function(){
			var seatName=[];
			$('.seat').each(function(){
				seatName.push($(this).find('.seatNum').html())
			});
			alert(seatName)
		})
	}
}
