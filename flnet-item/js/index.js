
$(function() {

	//=============banner==========================
	function banner() {

		var $scrollImglist = $(".scrollImg li");
		var $navList = $(".navList li");
		var index = 0;
		$navList.eq(0).addClass("select")
		var timer = setInterval(function() {
			change();

		}, 3000)

		function change() {
			index++;
			if(index == $scrollImglist.length) {
				index = 0;
			}
			$scrollImglist.eq(index).fadeIn()
				.find("img").animate({
					"opacity": 1
				}, 5000)
				.end().siblings().hide();

			$navList.eq(index).addClass("select").siblings().removeClass("select");
		}

		//下标

		$navList.hover(function() {
			$scrollImglist.eq($(this).index()).fadeIn()
				.find("img").animate({
					"opacity": 1
				}, 5000)
				.end().siblings().hide();
			$(this).addClass("select").siblings().removeClass("select");
			clearInterval(timer);
		}, function() {
			clearInterval(timer);

			index = $(this).index();
			timer = setInterval(function() {
				change();

			}, 3000)
		})
		var $btnpre = $('.banner-btnpre');
		var $btnnext = $('.banner-btnnext');
		$(".banner-btn").hide();

		$("#banner").mouseenter(function() {
			clearInterval(timer);
			$(".banner-btn").show().fadeIn();
		})
		$("#banner").mouseleave(function() {
			$(".banner-btn").fadeOut();
			clearInterval(timer);
			timer = setInterval(function() {
				change();
			}, 3000)
		})
		$btnpre.click(function() {
			clearInterval(timer);
			index -= 2;
			change();
			if(index < 0) {
				index = $scrollImglist.length - 1;
			}

		})
		$btnnext.click(function() {
			clearInterval(timer);
			change();
		})

	}

	banner();

	//左侧楼梯

	function leftfloor() {

		$(window).scroll(function() {

			$('#left-floor').hide();
			if($("html,body").scrollTop() > 630 && $("html,body").scrollTop() < 4300) {

				$('#left-floor').animate({
					opacity: "1"
				}, 800).show();

			} else if($("html,body").scrollTop() > 4300) {
				$('#left-floor').animate({
					opacity: "0"
				}, 800).hide();
			}

		})

		$('#left-floor p').each(function() {
			if($(this).find("span").text().length > 2) {
				$(this).css("line-height", "19px");
			} else {
				$(this).css("line-height", "38px");
			}

		})

	}
	leftfloor();

	//主页面产品

	function productFloor() {

		//热卖
		$.get("json/home-products.json", function(hot) {

			var hotproduct = template("hot", hot);

			$("#home-hot ul").html(hotproduct);

		})

		//产品项目
		$.get("json/home-products.json", function(data) {

			var htmla = template("classRoom", data);

			$(".home-floor-item-dteail ul").html(htmla);

		})

		//标题
		$.get("json/home-products.json", function(item) {

			var html = template("classRoom", item);

			$("#mainContent").html(html);

		})

	}
	productFloor();


	$(".home_form").append("<div class='seaLoad'></div>").css({"position":"relative","overflow":"visible"});

})

