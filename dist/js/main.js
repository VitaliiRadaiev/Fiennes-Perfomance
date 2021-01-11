var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================

//========================================
//Spollers
function spollerInit() {
	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];

			spoller.addEventListener("click", function (e) {
				e.preventDefault();
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							el.parentElement.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');

				
				if(spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}

//

$(document).ready(function() {
	// ==== Popup form handler====

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup_content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function() {
		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===;
	// === Burger Handler =====================================================================
	function burgerBtnAnimation(e) {
		$('.burger span:nth-child(1)').toggleClass('first');
		$('.burger span:nth-child(2)').toggleClass('second');
		$('.burger span:nth-child(3)').toggleClass('third');
		$('.burger span:nth-child(4)').toggleClass('fourth');
		let classNameElem = document.querySelector('.burger').dataset.activel;
		document.querySelector(`.${classNameElem}`).classList.toggle('open');
		_slideToggle(document.querySelector(`.${classNameElem}`));
	}
	$('.burger').click((e) => burgerBtnAnimation(e));
// === Burger Handler =====================================================================	;
	
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}; 

// === Проверка, поддержка браузером формата webp ==================================================================

	function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
	callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

	if (support == true) {
	document.querySelector('body').classList.add('webp');
	}else{
	document.querySelector('body').classList.add('no-webp');
	}
	});

// === // Проверка, поддержка браузером формата webp ==================================================================

// === Конвертация svg картинки в svg код ==================================================================
$('img.img-svg').each(function(){
  var $img = $(this);
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');
  $.get(imgURL, function(data) {
    var $svg = $(data).find('svg');
    if(typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass+' replaced-svg');
    }
    $svg = $svg.removeAttr('xmlns:a');
    if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
      $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    }
    $img.replaceWith($svg);
  }, 'xml');
});
// === // Конвертация svg картинки в svg код ==================================================================



// === COMMON ==================================================================
function cardJournalHandler() {
	let cards = document.querySelectorAll('.card-journal');
	if(cards.length>0) {
		cards.forEach(card => {
			let textBlock = card.querySelector('.card-journal__text');
			if(textBlock.innerText.length >= 200) {
				textBlock.innerText = [...textBlock.innerText].slice(0,200).join('') + '...';
			}
		})
	}
}

cardJournalHandler();;
// ==  slider ==========================================================================
{
	let slider = document.querySelectorAll('.reviews-slider');
	if(slider.length>0) {
		slider.forEach(item => {
			let paginationMode = null;
			var mySwiper = new Swiper(item.querySelector('.swiper-container'), {
			slidesPerView:1,
			autoHeight: true,
			//loop: true,
			speed: 600,
			spaceBetween: 15,
			autoplay: {
			  delay: 8000,
			   disableOnInteraction: false,
			},
			// scrollbar: {
			//   el: item.querySelector('.swiper-scrollbar'),
			// },
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

		});

	}
}
// == and  slider ==========================================================================
;
function cardVideoHandler() {
	function togglePlayPause(video,btn) {
		if(video.paused) {
			video.play();
			btn.firstElementChild.className = 'icon-pause2';

		} else {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
		}
	}

	let videoBlock = document.querySelectorAll('.video-block');
	if(videoBlock.length) {
		let timerId;
		videoBlock.forEach((item) => {

			//let videoWrap = card.querySelector('.card-video__video-wrap');
			let video = item.querySelector('.video-block__video');
			let btn = item.querySelector('.video-block__play-pause');
			//let time = item.querySelector('.card-video__duration-time');
			//let btnLink = item.querySelector('.card-video__btn');

			if(video) {
				btn.addEventListener('click', (e) => {
					e.preventDefault();
					togglePlayPause(video,btn);
				});
				video.addEventListener('ended', () => {
					video.pause();
					btn.firstElementChild.className = 'icon-play3';
				});
				video.addEventListener('mousemove', (e) => { 
					if(!video.paused) {
						btn.style.opacity = '1';
						
							clearTimeout(timerId);
							timerId = setTimeout(() => {
								btn.style.opacity = '0';
							}, 2000);

					} else {
						btn.style.opacity = '1';
					}

				});

			}
		})
	}

}

cardVideoHandler();;
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
;
// === COMMON ==================================================================


// === HEADER ==================================================================
{
	let btn = document.querySelector('.header__switch-btn'); {
		if(btn) {
			btn.addEventListener('click', (e) => {
				if(document.documentElement.clientWidth < 992) {
					if(e.target.closest('.drop-menu')) return;
					btn.classList.toggle('active');
					btn.querySelector('.drop-menu').classList.toggle('active');
				}
			})

			document.body.addEventListener('click', (e) => {
				if(document.documentElement.clientWidth < 992) {
					if(!e.target.closest('.header__switch-btn')) {
						btn.classList.remove('active');
						btn.querySelector('.drop-menu').classList.remove('active');
					}
				}
			})
		}
	}
}

{
	let navMenu = document.querySelector('.header__menu-list');
	if(navMenu) {
		function addClasses() {
			if(document.documentElement.clientWidth < 992) {
				navMenu.classList.add('_spollers', '_one');
				navMenu.querySelectorAll('.header__menu-list > li > a').forEach(link => {
					if(link.nextElementSibling) {
						link.classList.add('_spoller');

					}
					
				})
			}
		}

		function removeClasses() {
				navMenu.classList.remove('_spollers', '_one');
				navMenu.querySelectorAll('.header__menu-link').forEach(link => {
					link.classList.remove('_spoller');
				})
		}
		addClasses() ;
		spollerInit();
		
		window.addEventListener('resize', function() {
			if(document.documentElement.clientWidth < 992) {
				addClasses();
				spollerInit();
			} else {
				removeClasses();
			}
		})
	}
};
// === // HEADER ==================================================================


// === HOME ==================================================================
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
;
// === // HOME ==================================================================

// === MARQUES ==================================================================
{
	let menuTable = document.querySelector('.info-block__nav');
	if(menuTable) {
		document.querySelectorAll('.info-block__triggers').forEach((item) => {
			item.addEventListener('click', function(e) {
				e.preventDefault();
				const id = e.target.getAttribute('href').replace('#','');

				document.querySelectorAll('.info-block__triggers').forEach((child) => {
					child.classList.remove('active');
				});

				document.querySelectorAll('.info-block__tabs-content').forEach((child) => {
					child.classList.remove('active');
				});

				item.classList.add('active');
				document.getElementById(id).classList.add('active');
			});
		});
	}


	let tabs = document.querySelectorAll('.info-block__tabs-content');
	if(tabs.length>0) {

		tabs.forEach(contetn => {
			addColumns(contetn.querySelector('.info-block__tabs-text-wrap'));
			distributeEl(contetn.querySelector('.info-block__tabs-text-wrap'))
			contetn.style.display = 'none'
		})


		function addColumns(block) {
			let arr = [...block.children];
			let num = Math.ceil(arr.length / 3);
			block.classList.add('block-columns-3');

			for(let i = 0; i < 3; i++) {
				let column = document.createElement('div');
				column.className = 'column';

				let innerArr = arr.slice(0, num);

				arr = arr.filter((item, index) => {
					if(item != innerArr[index]) return item;
				})


				if(innerArr.length) {
					innerArr.forEach(item => {
						column.append(item);
					})
				}

				block.append(column);
			}

		}

		function distributeEl(block) {
			let thamb = true;
			let count = 0;
			while (thamb) {

				console.log('tick')
				let column1 = block.children[0];
				let column2 = block.children[1];
				let column3 = block.children[2];

				const findHeight = (column) => {
					let count = 0;
					for(let el of column.children) {
						count += el.scrollHeight;
					}
					return count;
				}

				findHeight(column2)

				let arrElHeight = [findHeight(column1), findHeight(column2), findHeight(column3)];
				let maxHeight = Math.max(...arrElHeight);
				let maxHeightIndex = arrElHeight.indexOf(maxHeight)

				let minHeight = Math.min(...arrElHeight);
				let minHeightIndex = arrElHeight.indexOf(minHeight)


				if(maxHeight - minHeight > 200) {
					let el = block.children[maxHeightIndex].lastElementChild;
					block.children[minHeightIndex].append(el);
				} else {
					thamb = false;
				}

				count++;

				if(count >= 10) {
					thamb = false;
				}
			}
		}
	}
}
;
// === // MARQUES ==================================================================

// === CONTACT ==================================================================
//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}; 
// === // CONTACT ==================================================================



// === text-content animation ==================================================================
{
let block = document.querySelectorAll('.text-content');
if(block.length>0){
	block.forEach(item => {
		let children = item.querySelector('.container_small').children;
		let delay = -0.5;
		for(let el of children) {
			el.style.transitionDelay = (delay += 0.5) + 's';
		}
	})
	}
}
// === text-content animation ==================================================================


});

// === GOOGLE MAP ==================================================================
// ==== //  google map ===============

{


	let isMap = document.getElementById("map");
	if(isMap) {
		var map;

		// let center = {
		// 	lat: 51.735394,
		// 	lng: -1.666271,
		// }

		// let markerPosition = {
		// 	lat: 51.735394,
		// 	lng: -1.666271,
		// }

		// Функция initMap которая отрисует карту на странице
		function initMap() {

			// В переменной map создаем объект карты GoogleMaps и вешаем эту переменную на <div id="map"></div>
			map = new google.maps.Map(document.getElementById('map'), {
				// При создании объекта карты необходимо указать его свойства
				// center - определяем точку на которой карта будет центрироваться
				center: {lat: +global.lat, lng: +global.lng},
				// zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.

				zoom: 16,

				// Добавляем свои стили для отображения карты
				//styles: 
			});

			// Создаем маркер на карте
			var marker = new google.maps.Marker({

				// Определяем позицию маркера
			    position: {lat: +global.lat, lng: +global.lng},

			    // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
			    map: map,

			    // Пишем название маркера - появится если навести на него курсор и немного подождать
			    title: '',
			    label: '',

			    // Укажем свою иконку для маркера
			   // icon: 'img/contact/googlMarker.svg',
			});

		}
	}
};
// === // GOOGLE MAP ==================================================================