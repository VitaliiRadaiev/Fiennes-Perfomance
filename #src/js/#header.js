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