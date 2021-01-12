// let textAnimation = document.querySelectorAll('.textAnimation');
// if(textAnimation.length) {
//     textAnimation.forEach(async (item) => {
//         let text1 = item.querySelector('.text-1');
//         let text2 = item.querySelector('.text-2');
//        await typeText(text1, 'test test test test', false, false, 1000);
//        typeText(text2, 'test test test test', true, true, 1000);
       
        
//     })
// }


// async function typeText(htmlBLock, text, infinity = false, backward = false, deley = 0) {
//     let t = [text];
    
//     let line = 0;
//     let count = 0;
//     let out = '';
//     let htmlOut = htmlBLock;
//     let isPrinted = false;
    
//     console.log(t);
//     let result = await new Promise((resolve, reject) => {
//         setTimeout( () =>{
//             function typeLine(time = false) {
//                 console.log(time);
                
//                 let interval = setTimeout(() => {

//                     if(isPrinted) {
//                         count--;
//                         console.log(out.slice(0,count));
//                         htmlOut.innerHTML = out.slice(0,count) + '<span class="text-line"></span>';

//                         if(count <= 0) {
//                             line++;
//                             isPrinted = false;
//                             clearTimeout(interval);
//                             typeLine()
//                             return 
//                         }
                        
//                         typeLine(true);
                        
//                     } else {

//                         if(!t[line]) {
                            

                            
//                         }

//                         out += t[line][count];
//                         htmlOut.innerHTML = out + '<span class="text-line"></span>';
//                         htmlOut.style.opacity = 1;
//                         count++;


//                         if(count >= t[line].length) {
//                             if(backward) {
//                                 isPrinted = true;
//                                 clearTimeout(interval);
//                                 typeLine(true)
//                                 return                     
                                
//                             } else {
//                                 count = 0;
//                                 line++;
//                                 if(line == t.length) {
//                                     if(!infinity) {
//                                         clearTimeout(interval);
//                                         htmlOut.innerHTML = out;
//                                         resolve();
//                                         return true;
//                                     } else {
//                                         out = '';
//                                         line = 0;
//                                     }
//                                 }
//                             }
    
//                         }
//                     }
                    

        
//                     typeLine();
//                 }, time ? 100 : getRandomInt(getRandomInt(200 * 3.0)));
//             }
            
//             typeLine();
            
//         }, deley)
//     })
    
// }

// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }




{

let textAnimation = document.querySelectorAll('.textAnimation');



if (textAnimation.length > 0) {
	window.addEventListener('scroll', startTextAnim);
	function startTextAnim() {
		for (let index = 0; index < textAnimation.length; index++) {
			const item = textAnimation[index];
			const animItemHeight = item.offsetHeight;
			const animItemOffset = offset(item).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                let text1 = item.querySelector('.text-1 .typed');
                let text1Strings = item.querySelector('.text-1 .typed-strings')
                let text2 = item.querySelector('.text-2 .typed');
                let text2Strings = item.querySelector('.text-2 .typed-strings')
                
                
                if (item.classList.contains('isShow')) {
					return
				} else {
                    item.classList.add('isShow');
                    let typed = new Typed(text1, {
                        stringsElement: text1Strings,
                        typeSpeed: 150,
                        backSpeed: 0,
                        backDelay: 500,
                        startDelay: 1000,
                        cursorChar: '',
                        onComplete: (self) => {
                            console.log('complete');
                            item.querySelector('.text-1 .typed-cursor').style.display = "none";
                            
    
                            let typed = new Typed(text2, {
                                stringsElement: text2Strings,
                                typeSpeed: 100,
                                backSpeed: 0,
                                backDelay: 500,
                                startDelay: 1000,
                                loop: true,
                                cursorChar: '',
                            })
                        },
                    });
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
}

    
    // if(textAnimation.length) {


    //     textAnimation.forEach(async (item) => {
    //         let text1 = item.querySelector('.text-1 .typed');
    //         let text1Strings = item.querySelector('.text-1 .typed-strings')
    //         let text2 = item.querySelector('.text-2 .typed');
    //         let text2Strings = item.querySelector('.text-2 .typed-strings')

    //         let typed = new Typed(text1, {
    //             stringsElement: text1Strings,
    //             typeSpeed: 150,
    //             backSpeed: 0,
    //             backDelay: 500,
    //             startDelay: 1000,
    //             cursorChar: '',
    //             onComplete: (self) => {
    //                 console.log('complete');
    //                 item.querySelector('.text-1 .typed-cursor').style.display = "none";

    //                 let typed = new Typed(text2, {
    //                     stringsElement: text2Strings,
    //                     typeSpeed: 100,
    //                     backSpeed: 0,
    //                     backDelay: 500,
    //                     startDelay: 1000,
    //                     loop: true,
    //                     cursorChar: '',
    //                 })
    //             },
    //         });
    //     })
    // }
}