// // == hero slider ==========================================================================
// {
// 	let heroSlider = document.querySelector('.hero-slider .swiper-container');
// 	if(heroSlider) {

// 		var mySwiper = new Swiper(heroSlider, {
// 		slidesPerView:1,
// 		//loop: true,
// 		effect: 'fade',
// 		autoplay: {
// 		  delay: 4000,
// 		},
// 		speed: 1000,

// 		// pagination: {
// 		//     el: heroSlider.querySelector('.swiper-pagination'),
// 		//      clickable: true,
// 		//      type: 'progressbar',
// 		//   },
// 		scrollbar: {
// 		  el: heroSlider.querySelector('.swiper-scrollbar'),
// 		},
// 		})
// 	}
// }
// // == and hero slider ==========================================================================

// == hero slider ==========================================================================
{
	let heroSlider = document.querySelector('.hero-slider .swiper-container');
	if (heroSlider) {

		let mySwiper = new Swiper(heroSlider, {
			slidesPerView: 1,
			effect: 'fade',
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			speed: 1000,

			pagination: {
				el: heroSlider.querySelector('.swiper-pagination'),
				clickable: true,
				renderBullet: function (index, className) {
					return '<div class="' + className + '"> <span class="progress"></span> </div>'
				}
			},
			on: {

				slideChangeTransitionStart: function (current) {
					let pagination = heroSlider.querySelector('.swiper-pagination');
					let lenght = pagination.children.length;

					for (let i = 0; i < lenght; i++) {
						if (i == current.activeIndex) break;
						pagination.children[i].classList.add('isShow');
					}

					for (let i = current.activeIndex; i < lenght; i++) {
						pagination.children[i].classList.remove('isShow');
						pagination.children[i].firstElementChild.style.transform = 'scaleX(0)';
					}
				}
			}
			// scrollbar: {
			//   el: heroSlider.querySelector('.swiper-scrollbar'),
			// },
		})
	}
}
// == and hero slider ==========================================================================


// ==  slider ==========================================================================
{
	let slider = document.querySelectorAll('.slider');
	if (slider.length > 0) {
		slider.forEach(item => {
			var mySwiper = new Swiper(item.querySelector('.swiper-container'), {
				slidesPerView: 1,
				effect: 'fade',
				//loop: true,
				speed: 600,
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				},
				spaceBetween: 15,
				pagination: {
					el: item.querySelector('.swiper-pagination'),
					clickable: true,
					renderBullet: function (index, className) {
						return '<div class="' + className + '"> <span class="progress"></span> </div>'
					}
				},
				on: {

					slideChangeTransitionStart: function (current) {
						let pagination = item.querySelector('.swiper-pagination');
						let lenght = pagination.children.length;

						for (let i = 0; i < lenght; i++) {
							if (i == current.activeIndex) break;
							pagination.children[i].classList.add('isShow');
						}

						for (let i = current.activeIndex; i < lenght; i++) {
							pagination.children[i].classList.remove('isShow');
							pagination.children[i].firstElementChild.style.transform = 'scaleX(0)';
						}
					}
				},
				// scrollbar: {
				//   el: item.querySelector('.swiper-scrollbar'),
				// },
			})
		})
	}
}
// == and  slider ==========================================================================


// ==  slider-2 ==========================================================================
{
	let slider = document.querySelector('.slider-2 .swiper-container');
	if (slider) {

		var mySwiper = new Swiper(slider, {
			slidesPerView: 'auto',
			speed: 600,
			spaceBetween: 65,
			centeredSlides: true,
			scrollbar: {
				el: slider.querySelector('.swiper-scrollbar'),
				draggable: true,
			},
			on: {
				slideChange: () => {
					console.log('test11')
					if (mySwiper) {
						console.dir(mySwiper);
					}
				}
			},
			breakpoints: {
				320: {
					spaceBetween: 15
				},
				768: {
					spaceBetween: 30
				},
				1024: {
					spaceBetween: 65
				},
			},
		})

		mySwiper.on('slideChange', function () {
			console.log('slide changed');
		});

	}

}
// == and  slider-2 ==========================================================================
