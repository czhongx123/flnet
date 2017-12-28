$(function() {

	//获取网址id

	var str = location.search;

	var id = str.split("=")[1];

	$.get("json/products.json", function(data) {

		var data1 = data.goodsList;

		for(var i = 0; i < data1.length; i++) {

			if(data1[i].id == id) {

				var pic = template("sDetail", data1[i]);
				$("#detailMain").html(pic);

				zoomImg();
				detailCart();
			}

		}

	})

	function zoomImg() {
		//========================================
		//放大镜

		$(".showImg").hide();
		$(".magnifier").hide();
		$(".midImg").mouseenter(function() {
			$(".showImg").show();
			$(".magnifier").show();

		})
		$(".midImg").mouseleave(function() {
			$(".showImg").hide();
			$(".magnifier").hide();
		})

		$(".midImg").mousemove(function(e) {
			var x = e.pageX - $(".midImg").offset().left - $(".magnifier").width() / 2;
			var y = e.pageY - $('.midImg').offset().top - $('.magnifier').height() / 2;

			if(x <= 0) {
				x = 0;
			}
			if(y <= 0) {
				y = 0;
			}
			if(x >= $(".midImg").innerWidth() - $(".magnifier").outerWidth()) {
				x = $(".midImg").innerWidth() - $(".magnifier").outerWidth();
			}
			if(y >= $(".midImg").innerHeight() - $(".magnifier").outerHeight()) {
				y = $(".midImg").innerHeight() - $(".magnifier").outerHeight();
			}

			var bx = -x / $('.midImg img').width() * $('.showImg img').width();
			var by = -y / $('.midImg img').height() * $('.showImg img').height();

			$('.magnifier').css({
				"left": x + "px",
				"top": y + "px"
			});
			$('.showImg img').css({
				"left": bx + "px",
				"top": by + "px"
			});

		})

		//划过小图切换大图

		$(".smallImg a").hover(function() {

			$(".midImg img").attr("src", $(this).find('img')[0].src);
			$(".showImg img").attr("src", $(this).find('img')[0].src);

			$(this).addClass("hover").siblings().removeClass("hover");

			var index = $(this).index();

		})
	}
	
	function detailCart(){
		
		if(getCookie("cart")){
				var obj = JSON.parse(getCookie("cart"));
			}else{
				var obj = {};
			}
			//取购物车中该商品的数量
			var num = obj[id];
			refreshCar();
			$(".qty").val(num);
			if(!num){
				$(".qty").val(1)
				num=1;
			}
			
	
			$('.minus').click(function(){
				num--;
				if(num<=1){
					num=1;

				}
				$(".qty").val(num)
				
			})
			$('.add').click(function(){
			
				num++;
				$(".qty").val(num)

			})
	;	
			$(".toCar").click(function(){
						
				obj[id]=parseInt(num);
//				refreshCar();
				var str = JSON.stringify(obj);
				setCookie("cart",str,7);
				refreshCar();
			})
		
	}
	
	

})