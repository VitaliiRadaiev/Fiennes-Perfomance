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
}