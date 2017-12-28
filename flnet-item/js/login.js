$(function() {
	//焦点判定
	$(".error p").hide();
	$("input[placeholder]").bind({
		focus: function() {
			$(this).css("border-color", "#78d0fa");
			if($('input[placeholder]:focus').length) {
				$(".error p").hide()
			}

		},
		blur: function() {
			//		if(this.value==""){
			$(this).css("border-color", "#d9d9d9");
			//		}

			if($(':focus').length == 0) {
				if($(this).attr("id") == "login_name" && this.value == "") {
					$(".error p").show().text("请填写用户名");

				} else if($(this).attr("id") == "login_psd" && this.value == "") {
					$(".error p").show().text("请填写密码");
				} else if($(this).attr("id") == "code" && this.value == "") {
					$(".error p").show().text("请填写验证码");
				}
			}

		}
	})

	//获取验证码http:www.flnet.com/Account/GetVryImgGen?4609

	$(".changeCode").click(function() {
		$(".codeShare img").attr("src", "http://www.flnet.com/Account/GetVryImgGen?" + Math.floor(Math.random() * 10000))

	})

	//用户名和密码判定

	//	匹配手机号:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
	//匹配邮箱：/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
	$('.submitBtn').click(function() {

		var name1 = $("#login_name").val();

		var phsd = $("#login_psd").val();

		$.getJSON("http://datainfo.duapp.com/shopdata/userinfo.php", {
			status: "login",
			userID: name1,
			password: phsd
		}, function(data) {
			if(typeof(data) == "object") {
				location.href = "index.html";

			} else if(data == 2) {
				alert("用户名与密码不符")
			} else {
				alert("请核对用户名和密码后重新登录")
			}

		})

	})

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

})