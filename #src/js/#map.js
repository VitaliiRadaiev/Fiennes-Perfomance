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
}