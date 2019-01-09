

$(function () {

	bindEvt();
		
	var adTag = getURLParam("ADTAG");
	if (adTag) {
		$('.to_main').attr('href', 'index.html?ADTAG=' + adTag);
	}

})

var curSd = 0;

function loadScript(url,callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(script.readyState){//IE
		script.onreadystatechange = function(){
			if(script.readyState == "loaded" || script.readyState == "complete"){
				script.onreadystatechange = null;
				if(typeof callback==="function"){callback();}
			}
		}
	}else{
		script.onload = function(){
			if(typeof callback==="function"){callback();}
		}
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function bindEvt(cb){
	var $sd = $('.cl-navi .sd');
	loadScript(['/js/velocity.min.js'], function(){
		loadScript(['/js/velocity.ui.js'], function(){


			$('.cl-navi a').on('hover', function(){
				var $this = $(this);
				if(curSd != $this.data('index')){
					curSd = $this.data('index');
					$this.parent().find('.on').removeClass('on');
					$this.addClass('on');
					$sd.stop().velocity({left: $(this).data('pos')}, {easing: 'spring'});
				}
			});

			$('.cl-navi').mouseleave(function(evt){
				$(this).find('a:eq(1)').trigger('mouseenter');
			});



			if(cb && typeof cb === 'function'){
				cb();
			}

		})
	})


}

function getURLParam(name) {
	var value = location.search.match(new RegExp("[?&]" + name + "=([^&]*)(&?)", "i"));
	return value ? decodeURIComponent(value[1]) : value;
}
