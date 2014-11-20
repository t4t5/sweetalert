module("Utilities");
QUnit.test( "Hex to RGB", function( assert ) {
	assert.equal(hexToRgb('#123456'), "18, 52, 86");
	assert.equal(hexToRgb('#AABBCC'), "170, 187, 204");
});


module("swal");
QUnit.test( "Defaults", function( assert ) {
	swal("Test Title");
	var alert = document.querySelector(".sweet-alert"),
		text = alert.getElementsByTagName("h2")[0].innerHTML,
		okButton = alert.getElementsByTagName("button")[1],
		cancelButton = alert.getElementsByTagName("button")[0];
	
	assert.equal($(cancelButton).css("display"), "none");
	assert.equal($(okButton).css("background-color"), "rgb(174, 222, 244)");
	assert.equal(text, "Test Title");
	$(okButton).trigger("click");
});

QUnit.test( "Message Text", function( assert ) {
	swal("Test Title", "Test Body");
	var alert = document.querySelector(".sweet-alert"),
		text = alert.getElementsByTagName("h2")[0].innerHTML,
		body = alert.getElementsByTagName("p")[0].innerHTML,
		okButton = alert.getElementsByTagName("button")[1];
	
	assert.equal(text, "Test Title");
	assert.equal(body, "Test Body");
	$(okButton).trigger("click");
});