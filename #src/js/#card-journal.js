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

cardJournalHandler();