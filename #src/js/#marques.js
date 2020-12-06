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
