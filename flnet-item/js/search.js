//搜索栏(引用百度搜索)
function abc(dat1) {

	var dat = dat1.s;
	var sstr = "";

	for(var a in dat) {
		if(a <= 5) {
			sstr += "<li>" + dat[a] + "</li>";
		}
	}

	$(".seaLoad").css({
		"position": "absolute",
		"top": "40px",
		"z-index": "900",
		"width": "418px",
		"border": "1px solid #ddd"
	}).html(sstr).children();
	$(".seaLoad li").css({
		"line-height": "30px",
		"border-bottom": "1px dashed #cecece",
		"paddingLeft": "30px",
		"z-index": "9000",
		"background": "#ddd"
	}).click(function() {
		$("#txt").val($(this).text());
		$(".seaLoad").hide();
		$("#btn").click(function() {
//			location.href = "https://www.baidu.com/s?ie=UTF-8&wd=" + $("#txt").val();
window.open(location.href = "https://www.baidu.com/s?ie=UTF-8&wd=" + $("#txt").val());
			
		})
	})
	$("#txt").focus(function() {
		$(".seaLoad").show();
	})

}

window.onload = function() {

	$("#txt").bind("keyup", function() {

		var val1 = $("#txt").val();

		links = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val1 + "&cb=abc";

		$.ajax({
			type: "post",
			url: links,
			dataType: "jsonp",
			async: true

		});
	})
}