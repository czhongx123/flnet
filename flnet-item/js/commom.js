
$(function(){
	
	//发货地址
	
	function sendaddress(){
		
		$.get("json/address.json",function(address){
			var str="";
			for(var i=0;i<address.length;i++){
				str+="<li><a href='javascript:;'>"+address[i]+"</a></li>";
			}

			$(".address ul").html(str);
			$(".address li").each(function(){
			$(this).find('a').click(function(){
				
				$(".send_adress").find("span").text($(this).text());
				$(this).addClass("address-hover")
				.parent().siblings().find("a").removeClass("address-hover")
			})
			})

			
		})
		
		
		
	}
	sendaddress();
	
	//左侧悬浮
	function leftdiv(){
		$('#left-div1').mouseenter(function(){
			$(this).animate({left:"-45px"},100);
			$("#left-div2").animate({left:"0"},100).show()
		})
		$('#left-div2').mouseleave(function(){
			$(this).animate({left:"-90px"},100);
			$("#left-div1").animate({left:"0"},200).show()
		})
		
	}
	leftdiv()
	
	//回到顶端
	function toTop(){
		$('.totop').hide();
		
		$(window).scroll(function(){
			if($("html,body").scrollTop()>325){
				$('.totop').show();
			}else{
				$('.totop').hide();
			}
		})
		
		$('.totop').click(function(){
			
			$("html,body").animate({
				"scrollTop":0
	},500);
		})
		
	}
	toTop();
	
	//搜索应用
//	function searchInut(){
//		$("#txt").focusin(function(){
//			var $oScript=$('<script></script>');
//			 $oScript.attr('src',"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$("#txt").val()+"&cb=abc")
//			 $("head").append($oScript);
//			 abc(data);
//			 
//			function abc(data){
//				data=data.s;
//				var str = "";
//				for(var i = 0; i < data.length; i++){
//					str+="<li>"+data[i]+"</li>";
//				}
//				$("form").append("ul").addClass("oSearch")
//				$('.oSearch').append(str);
//		} 
//			 
//			 
//		})
//		
		
		
		
		
//	}
//	 searchInut();
	
	
	//头部新闻更新
	function newsrefresh(){
		
		$.get("json/news.json",function(newsdata){

					var index=0;
					setInterval(function(){
					$("#header-wrap .news").text(newsdata[index])	
					index++;
					
						if(index==newsdata.length){
							index=0;
						}

					},2000)
			})
	}
	newsrefresh();
	
	
	//侧导航
	function subNav(){

		
		$.get("json/nav.json",function(navlist4){
				var navoa = template("itemListoa",navlist4);
				$(".nav-list1").html(navoa);
				var navob = template("itemListob",navlist4);
				$(".uo").html(navob);
	
				
			
				var navta = template("itemListta",navlist4);
				$(".nav-list2").html(navta);
				var navtb = template("itemListtb",navlist4);
				$(".ut").html(navtb);
	
				

				var navsa = template("itemListsa",navlist4);
				$(".nav-list3").html(navsa);
				var navsb = template("itemListsb",navlist4);
				$(".us").html(navsb);
	
				
				
				var nava = template("itemListfa",navlist4);
				$(".nav-list4").html(nava);
				var navb = template("itemListfb",navlist4);
				$(".uf").html(navb);
	
				})
			
		
		

		
	}
	subNav()
	
	
	
	//购物车生成标签
	
	function addcar(){
		
//		
//		$(".buycar").append("<span class='cart'>0</span><div class='carList'><em class='c1'>您的购物车是空的，赶紧选购吧</em></div>").attr({href:"cart.html",target:"_blank"})
		$(".buycar").append("<span class='cart'>0</span>").children().attr({href:"cart.html",target:"_blank"})
		
		$(".bycar").attr({href:"cart.html",target:"_blank"})
		
		
		
	}
	addcar()
	
	
	
	
	
	
	
	
	
})
