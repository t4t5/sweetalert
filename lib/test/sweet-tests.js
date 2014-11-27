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

QUnit.test( "Scroll Box", function( assert ) {
	swal({
		title: "Scroll",
		text:  "Newline<br>newline<br>newline<br>newline<br>newline<br>newline<br>newline<br>newline<br>newline<br>newline<br>newline<br>newline",
		scrollHeight: 100
	});

	var alert = document.querySelector(".sweet-alert"),
		scroll = alert.querySelector(".scrollBox"),
		text = alert.getElementsByTagName("h2")[0].innerHTML,
		okButton = alert.getElementsByTagName("button")[1];
		
	assert.equal(text, "Scroll");
	assert.equal(getElementContentHeight(scroll),100);
	$(okButton).trigger("click");
	
	swal({
		title: "No Scroll",
		text:  "Some text"
	});
	
	scroll = alert.querySelector(".scrollBox");
		
	assert.ok(scroll == null);
	$(okButton).trigger("click");
});

QUnit.test( "Deny Outside Click", function( assert ) {
	swal({
		title: "Deny outside click",
		text:  "Default"
	});
	var alert = document.querySelector(".sweet-alert"),
		overlay = document.querySelector(".sweet-overlay"),
		okButton = alert.getElementsByTagName("button")[1];
	
	$(overlay).trigger("click");
	assert.equal($(alert).css("display"), "block" );
	$(okButton).trigger("click");
});

QUnit.test( "Allow Outside Click", function( assert ) {
	swal({
		title: "Allow outside click",
		text:  "Outside click closes alert",
		allowOutsideClick: true
	});
	var alert = document.querySelector(".sweet-alert"),
		overlay = document.querySelector(".sweet-overlay");
		
	assert.equal($(overlay).css("display"), "block" );
	$(overlay).click();
	assert.equal($(alert).css("display"), "none" );
});
