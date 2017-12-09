$(function() {
  ms.clicks();
})

var ms={
  clicks:function() {
    // 点击事件汇总
    $('.category').click(function () {
      ms.categoryClick($(this));
    });
    $('.product>li').click(function () {
      //alert($(this).text());
      ms.productClick($(this));
    });
    // 删除事件
    $('body').on("click", ".delete", function () {
      console.log(123132);
      $(this).parent().remove();
    });
  },
    // 大类点击
  categoryClick:function (ele) {
    var ble=true;
    $('.product').each(function () {
      if($(this).css("display")=="block"){
        ble=false;
      }
    });
    if(ble==true){
      ele.children('.product').show();
    }else {
      ele.children('.product').hide();
    }
  },
  productClick:function (ele) {
    var product=ele.text();
    var num=$('.cashItem tr').size()+1;
    var ble=true;
    $('.name').each(function () {
      if(product==$(this).text()){
        alert("cunzai");
        ble=false;
      }
    });
    
    if($.inArray(product, name)){}
    var itemhtml='<tr>'+
          '<td>'+num+'</td>'+
          '<td class="name">'+product+'</td>'+
          '<td>￥11/杯</td>'+
          '<td>￥10/杯</td>'+
          '<td>1</td>'+
          '<td>11</td>'+
          '<td class="delete"><a>删除</a></td>'+
    '  </tr>';
    if(ble==true){
      $('#cashItem').append(itemhtml);
    }
  }
}
