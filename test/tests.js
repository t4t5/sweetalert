// swal() sould add the modal to the DOM + make it visible
test("modal shows up", function() {
  equal($('.sweet-alert').length, 0);

  swal("Hello world!");
  
  ok($('.sweet-alert').is(':visible'));
});

// Clicking the confirm-button should dismiss the modal
test("dismiss modal with confirm-button", function(assert) {
  var done = assert.async();
  swal("Dismiss me");

  var $modal = $('.sweet-alert');
  $modal.find('button.confirm').click();
  
  setTimeout(function() {
    assert.ok($modal.is(':hidden'));
    done();
  }, 500);
});

test("dismiss modal with esc-key", function(assert) {
  var done = assert.async();
  swal("Dismiss me");

  var $modal = $('.sweet-alert');
  $(document).trigger($.Event('keydown', {
    keyCode: 27 
  }));

  setTimeout(function() {
    assert.ok($modal.is(':hidden'));
    done();
  }, 500);
});

test("modals stays on with esc-key if allowEscapeKey is false", function(assert) {
  var done = assert.async();
  swal({
    title: "Dismiss me",
    allowEscapeKey: false
  });

  var $modal = $('.sweet-alert');
  $(document).trigger($.Event('keydown', {
    keyCode: 27 
  }));

  setTimeout(function() {
    assert.ok($modal.is(':visible'));
    done();
  }, 500);
});

/*
 * Make sure that when using { showCancelButton: true }:
 * - The cancel-button is visible on the modal
 * - Clicking on it dismisses the modal
 */
test("cancel-button works", function(assert) {
  var done = assert.async();
  swal({
    title: "Test",
    showCancelButton: true
  });
  
  var $modal = $('.sweet-alert');
  var $cancelBtn = $modal.find('button.cancel');
  ok($cancelBtn.is(':visible'));

  $cancelBtn.click();

  setTimeout(function() {
    assert.ok($modal.is(':hidden'));
    done();
  }, 500);
});

// Clicking the overlay should not dismiss the modal...
test("clicking the overlay does not dismiss modal", function(assert) {
  var done = assert.async();
  swal("Test");

  var $modal = $('.sweet-alert');
  $('.sweet-overlay').click();

  setTimeout(function() {
    assert.ok($modal.is(':visible'));
    done();
  }, 500);
});


// ...except if we pass allowOutsideClick: true
test("clicking the overlay (with allowOutsideClick option) dismisses modal", function(assert) {
  var done = assert.async();
  swal({
    title: "Test",
    allowOutsideClick: true 
  });

  var $modal = $('.sweet-alert');
  $('.sweet-overlay').click();

  setTimeout(function() {
    assert.ok($modal.is(':hidden'));
    done();
  }, 500);
});

test("timer works", function(assert) {
  var done = assert.async();
  swal({
    title: "Timer test",
    showConfirmButton: false,
    timer: 500
  });

  var $modal = $('.sweet-alert');
  assert.ok($modal.find('button.cancel, button.confirm').is(':hidden'));

  setTimeout(function() {
    assert.ok($modal.is(':hidden'));
    done();
  }, 1000);
});

test("prompt functionality works", function() {
  swal({
    title: "Prompt test",
    type: "input",
    inputPlaceholder: "Placeholder text"
  });

  var $modal = $('.sweet-alert');

  ok($modal.find('fieldset input').is(':visible'));
  equal($modal.find('fieldset input').attr('placeholder'), "Placeholder text");
});
