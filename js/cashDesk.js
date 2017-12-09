$(function() {
  ms.clicks();
  ms.showhtml();
})
var retailItem={};
var submitItem={};
var ms={
  //初始化收银台
  init:function () {
      $('#cashItem').html("");
      $('#price').text("￥"+0);
      $('#vipprice').text("￥"+0);
      submitItem={};
      $('.payways>ul>li').each(function () {
        $(this).removeClass();
      });
      $('.payways>ul>li').eq(0).addClass('selected');
  },
  showhtml:function () {
    retailItem=shuju;
    //i
    for(var i=0;i<retailItem.class.length;i++){
      var innerHtml='<div class="category">'+retailItem.class[i]+'<i class="glyphicon glyphicon-chevron-down"></i>'+
        '<ul class="product">'+'</ul>'+'</div>';
      $('.products').append(innerHtml);
      //j
      for(var j=0;j<retailItem.param.length;j++){
        if(retailItem.param[j].class==retailItem.class[i]){
          $('.product').eq(i).append("<li>"+retailItem.param[j].name+"<li>");
        }
      }  //j
    }  //i
  },
  clicks:function() {
    // 点击事件汇总
    $('body').on("click", ".category", function () {
      ms.categoryClick($(this));
    });
    $('body').on("click", ".product>li", function () {
      //alert($(this).text());
      ms.productClick($(this));
    });
    // 删除事件
    $('body').on("click", ".delete", function () {
      ms.productdelete($(this))
    });
    //结算并打印
    $('body').on("click", "#submit", function () {
      ms.submitSave();
    });
    $('body').on("click", ".payways ul>li", function () {
      $('.payways>ul>li').each(function () {
        $(this).removeClass();
      })
      ms.choosepayway($(this));
    });
  },
  productdelete:function (ele) {
    ele.parent().remove();
    for(var i=0;i<$('.num').size();i++){
      $('.num').eq(i).text(i+1);
    }
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
  //填充商品明细
  productClick:function (ele) {
    var product=ele.text();
    var num=$('.cashItem tr').size()+1;
    var price=10;
    var vipprice=9;
    for(var j=0;j<retailItem.param.length;j++){
      if(retailItem.param[j].name==product){
        price=retailItem.param[j].price;
        vipprice=retailItem.param[j].vipprice;
      }
    };
    var ble=true;
    $('.name').each(function () {
      if(product==$(this).text()){
        ble=false;
      }
    });

    var itemhtml='<tr class="productitem" namedata="'+product+'">'+
          '<td class="num">'+num+'</td>'+
          '<td class="name">'+product+'</td>'+
          '<td>￥<span class="price">'+price+'</span>/杯</td>'+
          '<td>￥<span class="vipprice">'+vipprice+'</span>/杯</td>'+
          '<td class="sum">1</td>'+
          '<td>￥<span class="allprice">'+price+'</span></td>'+
          '<td class="delete"><a>删除</a></td>'+
    '  </tr>';
    if(ble==true){
      $('#cashItem').append(itemhtml);
    }else {
      $('.productitem').each(function () {
        if($(this).attr('namedata')==product){
          var sum=$(this).find('.sum').html();
          var price=$(this).find('.price').html();
          sum=Number(sum)+1;

          $(this).find('.sum').html(sum);
          $(this).find('.allprice').html(sum*price);
        }
      })
    };
    ms.sumTotal();
  },
  //付款方式选择
  choosepayway:function (ele) {
    ele.addClass('selected');
  },
  // 计算总金额并更新页面
  sumTotal:function () {
    var sumTotal=0;
    var vipsumTotal=0;
    $('.productitem').each(function () {
      var thissum=Number($(this).find('.sum').text());
      var thisprice=Number($(this).find('.price').text());
      var thisvipprice=Number($(this).find('.vipprice').text())
      sumTotal=sumTotal+thissum*thisprice;
      vipsumTotal=vipsumTotal+thissum*thisvipprice;
      $('#price').text("￥"+sumTotal);
      $('#vipprice').text("￥"+vipsumTotal);
    });
  },
  // 打印配置
  print:function () {
     var newwindow = window.open("","aaa");
     newwindow.document.write('');
     newwindow.window.print();
  },
  //结算并打印
  submitSave:function () {
  //  ms.payway();
    ms.print();
  //  ms.init();

  },
  // 获取付款方式
  payway:function () {
    var payway=$('.payways').find('.selected').text();
    return payway;
  }
}








//
