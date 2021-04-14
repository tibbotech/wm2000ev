


//----------------------------------------------
function readData(){
	$.get( "ajax.html", function( data ) {		
	var d = $.parseJSON(data);

	$("#greenSlider").slider('setValue',d["greenValue"]);
	$('#greenValue').html(d["greenValue"]);
	$("#redSlider").slider('setValue',d["redValue"]);
	$('#redValue').html(d["redValue"]);
	$("#blueSlider").slider('setValue',d["blueValue"]);
	$('#blueValue').html(d["blueValue"]);
	});
}

$('.sliderDown').on('click', function(clickEvt){
	var sliderControl=$(this).parent().children('.sliderBody');
	var valueControl=$(this).parent().children('.sliderValue');
	var value=sliderControl.slider('getValue');
	value++;
	sliderControl.slider('setValue',value);
	valueControl.html(value);
	$.ajax({ data: {
		'id': sliderControl.attr('id'),
		'value': value
		}
	});
});

$('.sliderUp').on('click', function(clickEvt){
	var sliderControl=$(this).parent().children('.sliderBody');
	var valueControl=$(this).parent().children('.sliderValue');
	var value=sliderControl.slider('getValue');
	value--;
	sliderControl.slider('setValue',value);
	valueControl.html(value);

	$.ajax({ data: {
		'id': sliderControl.attr('id'),
		'value': value
		}
	});
});

$.ajaxSetup({
  url: "recive.html",
  global: false,
  type: "POST"
});

$('#greenSlider').slider({
	id: "slider12g", 
	min: 0, 
	max: 100,
	orientation: "vertical",
	value: 50
});

$('#redSlider').slider({
	id: "slider12r", 
	min: 0, 
	max: 100,
	orientation: "vertical",
	value: 50
});

$('#blueSlider').slider({
	id: "slider12b", 
	min: 0, 
	max: 100,
	orientation: "vertical",
	value: 50
});

var curSlider=new Object();

$('#greenValue').html($('#greenSlider').slider('getValue'));
$('#redValue').html($('#redSlider').slider('getValue'));
$('#blueValue').html($('#blueSlider').slider('getValue'));

$('.sliderBody').on('change', function(slideEvt){
	$(this).parent().children('.sliderValue').html($(this).slider('getValue'));
	
	if(curSlider.id==undefined||curSlider.id!=this.id){
		curSlider.id=this.id;
		curSlider.value=this.value
	}
	if(Number(this.value)>Number(curSlider.value)+5||Number(this.value)<Number(curSlider.value)-5){
		curSlider.value=this.value;
		$.ajax({ data: {
			'id': this.id,
			'value': this.value
			}
		});
	}
});


$('.sliderBody').on('slideStop', function(slideEvt){
	curSlider.id=this.id;
	curSlider.value=this.value;
	$.ajax({ data: {
		'id': this.id,
		'value': this.value
		}
	});
});

