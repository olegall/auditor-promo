$(function() {
	$(window).scroll(function() {
			if ($(this).scrollTop() != 0) {
				$('#toTop').fadeIn();
			} else {
				$('#toTop').fadeOut();
			}
		});
		$('#toTop').click(function() {
			$('body,html').animate({scrollTop:0},800);
		});
		$('.fon_1 .call').css('width', '160px'); // !!! хак. перекрываю для Айфона. убрать
		$('.contacts button').css('width', '205px'); // !!! хак. перекрываю для Айфона. убрать
	});
	
	$(document).ready(function(){
		animate('.call, .claim-btn, .free button', '.contacts', 1500);
		$('.contacts button').click(function(){
			validate();
			let name = $('.contacts input[name="name"]').val();
			let phone = $('.contacts input[name="phone"]').val();
			let email = $('.contacts input[name="email"]').val();
			let comment = $('.contacts .comment').val();
			let durationMs = 5000;
			$.ajax({
				type: "POST",
				url: '../sendMail.php',
				data: {name: name,
					   phone: phone,
					   email: email,
					   comment: comment}
			}).done(function(result) {
				result ? 
				$(".mail-success").attr('style', 'none').addClass('show-mail-result').fadeOut( durationMs, function() {}) : 
				$(".mail-failed").attr('style', 'none').addClass('show-mail-result').fadeOut( durationMs, function() {});
				$('.contacts input, .contacts textarea').val('');
			});
		});		
	});
	
	$(function() {
		$("#telephone").mask("+7(999)999-99-99");
	});
	
	function animate(from, to, duration) {
		$(from).click(function() {
			let top = $(to).offset().top;
			$('body, html').animate({scrollTop: top}, duration);
		});
	}	
	
	function validate(){
		let inputs = Array.from($('.contacts .name, .contacts .email'));
		console.log(inputs);
		inputs.forEach(function (input, idx) {
			input.classList.remove('validation-failed');
			if (!input.value){
				input.classList.add('validation-failed');
				throw 'Не заполнено поле';
			}
		});	
}