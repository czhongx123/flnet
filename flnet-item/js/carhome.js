//$(function() {

function refreshCar() {

	if(getCookie("cart")) {
		var obj = JSON.parse(getCookie("cart"));
	} else {
		var obj = {};
	}

	//获取购物车的商品的数量	
	var sum = 0;
	for(var i in obj) {
		sum += parseInt(obj[i]);
	}

	$(".cart").text(sum)

	if(sum) {

		$(".bycar").css("background", "url(img/cart_pop04.png) no-repeat -12px")

	}

}
refreshCar()

//})