$(function() {

	//发货地址

	function sendaddress() {

		$.get("json/address.json", function(address) {
			var str = "";
			for(var i = 0; i < address.length; i++) {
				str += "<li><a href='javascript:;'>" + address[i] + "</a></li>";
			}

			$(".address ul").html(str);
			$(".address li").each(function() {
				$(this).find('a').click(function() {

					$(".send_adress").find("span").text($(this).text());
					$(this).addClass("address-hover")
						.parent().siblings().find("a").removeClass("address-hover")
				})
			})

		})

	}
	sendaddress();

	//回到顶端
	function toTop() {
		$('.totop').hide();

		$(window).scroll(function() {
			if($("html,body").scrollTop() > 325) {
				$('.totop').show();
			} else {
				$('.totop').hide();
			}
		})

		$('.totop').click(function() {

			$("html,body").animate({
				"scrollTop": 0
			}, 500);
		})

	}
	toTop();

	//获取json数据
	$.get("json/products.json", function(data) {

		var data1 = data.goodsList;

		shop(data1)

	})

	function shop(data1) {

		//购物车
		if(getCookie("cart")) {
			var obj = JSON.parse(getCookie("cart"));
		} else {
			var obj = {};
		}
		var html = "";
		for(var i in obj) {

			for(var j = 0; j < data1.length; j++) {

				if(data1[j].id == i) {

					html += '<li data-id="' + i + '"><img src="' + data1[j].imgsrc + '"><span>' + data1[j].title + '</span><span>' + "￥" + data1[j].price + '</span><span><em class="minus">-</em><input type="text" class="num" value="' + obj[i] + '"><em class="add">+</em></span><strong class="del">删除</strong></li>';

				}
			}

		}

		$(".shop").html(html);

		//操作购物车

		var setNum = $(".num").val()
		
		refreshCar();
		//减去
		$(".minus").click(function() {

			setNum--;
			if(setNum <= 0) {
				setNum = 1;
			}

			$(this).next().val(setNum)

			var id = $(this).parents().parents().attr("data-id");

			obj[id] = $(this).next().val();
			needCash();
			var str = JSON.stringify(obj);
			setCookie("cart", str, 7);

		})
		//添加
		$(".add").click(function() {

			setNum++;

			$(this).prev().val(setNum)
			var id = $(this).parents().parents().attr("data-id");

			obj[id] = $(this).prev().val();
			needCash();
			var str = JSON.stringify(obj);
			setCookie("cart", str, 7);

		})

		//修改
		$('.num').change(function() {
			var id = $(this).parents().parents().attr("data-id");
			obj[id] = $(this).val();
			needCash();
			var str = JSON.stringify(obj);
			setCookie("cart", str, 7);

		})

		//删除

		$(".del").click(function() {
			var id = $(this).parents().attr("data-id");
			console.log($(this).parent().length)
			
			$(this).parent().remove()
			
			delete obj[id];
			needCash();
			var str = JSON.stringify(obj);
			setCookie("cart", str, 7);

		})

		//计算总价
		function needCash() {
			var totalPrice = 0;

			for(var j = 0; j < data1.length; j++) {
				for(var i in obj) {
					if(data1[j].id == i) {
						totalPrice += obj[i] * data1[j].price;
					}
				}
			}
			$(".cash span").text(totalPrice)
		}
		needCash()
	}

})