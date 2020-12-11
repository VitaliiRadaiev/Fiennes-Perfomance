// ==  slider ==========================================================================
{
	let slider = document.querySelectorAll('.slider-text');
	if(slider.length>0) {
		slider.forEach(item => {
			let mySwiper = new Swiper(item.querySelector('.slider-text__body'), {
			slidesPerView:1,
			//loop: true,
			speed: 600,
			autoplay: {
			  delay: 8000,
			   disableOnInteraction: false, 
			},
			spaceBetween: 15,
			pagination: {
			    el: item.querySelector('.swiper-pagination'),
			     clickable: true,
			     renderBullet: function(index, className) {
			     	return '<div class="' + className + '"> <span class="progress"></span> </div>'
			     }
			  },
			 on: {

			 	slideChangeTransitionStart: function(current) {
			 		let pagination = item.querySelector('.swiper-pagination');
			 		let lenght = pagination.children.length;
			 		
			 		for(let i = 0; i < lenght; i++) {
			 			if(i == current.activeIndex) break;
			 			pagination.children[i].classList.add('isShow');
			 		}

			 		for(let i = current.activeIndex; i < lenght; i++) {
			 			pagination.children[i].classList.remove('isShow');
			 			pagination.children[i].firstElementChild.style.transform = 'scaleX(0)';
			 		}
			 	}
			 }, 

			})

			let sliderBg  = new Swiper(item.querySelector('.slider-text__bg'), {
				slidesPerView:1,
				speed: 600,
				effect: 'fade',
			})

			mySwiper.controller.control = sliderBg;
		})
	}
}
// == and  slider ==========================================================================
