$(function() {

	//左侧列表栏

	function hideShow() {
		//添加内容
		$.get("json/list_left.json", function(con) {

			var txt = template("lMain_menuList", con);

			$(".lMain_menuList dd").html(txt);

		})

		$.get("json/list_left.json", function(data) {

			var html = template("lMain_menuList", data);

			$(".lMain_menuList").html(html);

			//执行效果
			$(".lMain_menuList dl dd").hide();
			$(".lMain_menuList dl dt").css("background", "url(img/list_ico01.gif) no-repeat 10px center");

			$(".lMain_menuList dl dt").click(function() {
				if($(this).siblings().is(":visible")) {
					$(this).siblings().hide();
					$(this).css("background", "url(img/list_ico01.gif) no-repeat 10px center");
				} else {
					$(this).siblings().show();
					$(this).css("background", "url(img/list_ico02.gif) no-repeat 10px center");
				}

			})

		})

	}
	hideShow()

	//右侧内容区
	function listShare() {

		$.get("json/products.json", function(data) {

			var pic = template("listShare", data);

			$(".lMainr_list").html(pic);

			addCart();
		})

	}
	listShare()

	function addCart() {

		//点击按钮加入购物车，存cookie

		if(getCookie("cart")) {
			//cookie取值取的是字符串，字符串转对象的方法是JSON.parse()
			var obj = JSON.parse(getCookie("cart"));
		} else {
			var obj = {};
		}
		refreshCar();

		//获取加入到购物车的商品的数量


		$(".cbtn").click(function() {
//				refreshCar();
			var id = $(this).attr("data-id");
			var liNum=$(this).prev().prev().val();
//			console.log(liNum);
			if(!obj[id]) {
				obj[id] = parseInt(liNum);
			} else {
				obj[id]+=parseInt(liNum);
			}
			//存cookie是，值为字符串，要将json格式的对象转换成字符串  


			var str = JSON.stringify(obj);
			setCookie("cart", str, 7);
			refreshCar()

		})

	}

})