$(function() {

	$("#phoneSelect").attr("checked", "checked");
	//切换注册方式

	$("#phoneSelect").click(function() {

		$(".byPhone").show();
		$(".byEmail").hide();

	})
	$("#emailSelect").click(function() {
		$(".byPhone").hide();
		$(".byEmail").show();

		$("#emL").focus()

	})

	//生成验证码
	$(".codeItem a").click(function() {
		$(".codeItem img").attr("src", "http://www.flnet.com/Account/GetVryImgGen?" + Math.floor(Math.random() * 10000))

	})

	//判断失去焦点

	$('.register_forml p span ').hide();

	$('.emailItem p span ').show();
	$("input[placeholder]").bind({
		focus: function() {

			$(this).siblings().find("span").hide();

		},
		blur: function() {
			if(this.value == "") {

				$(this).css("border", "1px solid #f02118");

			}

			//验证手机
			var regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ig;

			if(!$("#tel").val().match(regPhone)) {

				$(".telItem p span").show().text("电话格式错误");

			}

			if($(':focus').length == 0) {
				if($(this).attr("id") == "tel" && this.value == "") {
					$(".telItem p span").show().text("请输入有效手机号");

				} else if($(this).attr("id") == "code" && this.value == "") {
					$(".codeItem p span").show().text("验证码长度为四位");
				} else if($(this).attr("id") == "psd" && this.value == "") {
					$(".psdItem p span").show().text("密码不能为空");
				} else if($(this).attr("id") == "cpsd" && this.value == "") {
					$(".cpsdItem p span").show().text("密码不能为空");
				} else if($(this).attr("id") == "psdE" && this.value == "") {
					$(".psdItemE p span").show().text("密码不能为空");
				} else if($(this).attr("id") == "cpsdE" && this.value == "") {
					$(".cpsdItemE p span").show().text("密码不能为空");
				}
			}

		}
	})

	//表单数据验证

	//邮箱/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
	//验证邮箱格式
	$("#emL").change(function() {
		var regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		if(!$("#emL").val().match(regEmail)) {

			$(".emailItem p span").show().text("邮箱格式错误");
		}
	})

	//密码是否一致
	var psd = true;

	$("#cpsd").bind({
		blur: function() {

			if($("#psd").val() != $("#cpsd").val()) {
				$(".cpsdItem p span").show().text("密码不一致");
				psd = false;
			}

		}
	})
	$("#cpsdE").bind({
		blur: function() {

			if($("#psdE").val() != $("#cpsdE").val()) {
				$(".cpsdItemE p span").show().text("密码不一致");
				psd = false;
			}

		}
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

	//注册验证

	$(".register_submit").click(function() {

		//核对用电话注册
		if($("#code").is(':visible')) {
			var phone1 = $("#tel").val();
			var psd1 = $("#psd").val();

			if($(".byPhone p span").is(":hidden")) {

				$.getJSON("http://datainfo.duapp.com/shopdata/userinfo.php", {
					status: "register",
					userID: phone1,
					password: psd1
				}, function(data) {
					if(data == 1) {
						location.href = "login.html";

					} else {
						alert("该用户名已注册")
					}

				})

			}

		}
		//核对用邮箱注册
		if($("#emailSelect").is('checked')) {
			var e1 = $("#emL").val();
			var epsd1 = $("#psdE").val();
			if($(".byEmail p span").is(":hidden")) {

				$.getJSON("http://datainfo.duapp.com/shopdata/userinfo.php", {
					status: "register",
					userID: e1,
					password: epsd1
				}, function(data) {
					if(data == 1) {
						location.href = "login.html";

					} else {
						alert("该用户名已注册")
					}

				})

			}

		}

	})

})