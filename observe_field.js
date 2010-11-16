/** observe input field for content changes every frequency seconds since last keydown.
 	Initial version is https://github.com/splendeo/jquery.observe_field, slightly improved to works
  nice in my projects.
*/
jQuery.fn.observe_field = function(frequency, callback) {

  return this.each(function(){
    var element = $(this);
    var prev = element.val();

    var chk = function() {
      var val = element.val();
      if(prev != val){
        prev = val;
        element.map(callback); // invokes the callback on the element
      }
    };
    frequency = frequency * 1000; // translate to milliseconds
		element.bind('blur',function() { 
			this.ti && clearInterval(this.ti);
    });
    this.ti = setInterval(chk, frequency);
    // reset counter after user interaction
    element.bind('keyup', function() {
      this.ti && clearInterval(this.ti);
      this.ti = setInterval(chk, frequency);
    });
  });

};
