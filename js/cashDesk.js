jQuery(function() {
  ms.clicks();
  ms.showhtml();
})
var retailItem={};
var submitItem={};
var ms={
  //初始化收银台
  init:function () {
      jQuery('#cashItem').html("");
      jQuery('#price').text("￥"+0);
      jQuery('#vipprice').text("￥"+0);
      submitItem={};
      jQuery('.payways>ul>li').each(function () {
        jQuery(this).removeClass();
      });
      jQuery('.payways>ul>li').eq(0).addClass('selected');
  },
  //初始界面显示
  showhtml:function () {
    retailItem=shuju;
    //i
    for(var i=0;i<retailItem.class.length;i++){
      var innerHtml='<div class="category">'+retailItem.class[i]+'<i class="glyphicon glyphicon-chevron-down"></i>'+
        '<ul class="product">'+'</ul>'+'</div>';
      jQuery('.products').append(innerHtml);
      //j
      for(var j=0;j<retailItem.param.length;j++){
        if(retailItem.param[j].class==retailItem.class[i]){
          jQuery('.product').eq(i).append("<li>"+retailItem.param[j].name+"<li>");
        }
      }  //j
    }  //i
  },
  // 点击事件汇总
  clicks:function() {
    
    jQuery('body').on("click", ".category", function () {
      ms.categoryClick(jQuery(this));
    });
    jQuery('body').on("click", ".product>li", function () {
      //alert(jQuery(this).text());
      ms.productClick(jQuery(this));
    });
    // 删除事件
    jQuery('body').on("click", ".delete", function () {
      ms.productdelete(jQuery(this))
    });
    //结算并打印
    jQuery('body').on("click", "#submit", function () {
      ms.submitSave();
    });
    jQuery('body').on("click", ".payways ul>li", function () {
      jQuery('.payways>ul>li').each(function () {
        jQuery(this).removeClass();
      })
      ms.choosepayway(jQuery(this));
    });
  },
  //删除商品明细
  productdelete:function (ele) {
    ele.parent().remove();
    for(var i=0;i<jQuery('.num').size();i++){
      jQuery('.num').eq(i).text(i+1);
    }
  },
    // 大类点击
  categoryClick:function (ele) {
    var ble=true;
    jQuery('.product').each(function () {
      if(jQuery(this).css("display")=="block"){
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
    var num=jQuery('.cashItem tr').size()+1;
    var price=10;
    var vipprice=9;
    for(var j=0;j<retailItem.param.length;j++){
      if(retailItem.param[j].name==product){
        price=retailItem.param[j].price;
        vipprice=retailItem.param[j].vipprice;
      }
    };
    var ble=true;
    jQuery('.name').each(function () {
      if(product==jQuery(this).text()){
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
      jQuery('#cashItem').append(itemhtml);
    }else {
      jQuery('.productitem').each(function () {
        if(jQuery(this).attr('namedata')==product){
          var sum=jQuery(this).find('.sum').html();
          var price=jQuery(this).find('.price').html();
          sum=Number(sum)+1;

          jQuery(this).find('.sum').html(sum);
          jQuery(this).find('.allprice').html(sum*price);
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
    jQuery('.productitem').each(function () {
      var thissum=Number(jQuery(this).find('.sum').text());
      var thisprice=Number(jQuery(this).find('.price').text());
      var thisvipprice=Number(jQuery(this).find('.vipprice').text())
      sumTotal=sumTotal+thissum*thisprice;
      vipsumTotal=vipsumTotal+thissum*thisvipprice;
      jQuery('#price').text("￥"+sumTotal);
      jQuery('#vipprice').text("￥"+vipsumTotal);
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
    var payway=jQuery('.payways').find('.selected').text();
    return payway;
  }
}








//
