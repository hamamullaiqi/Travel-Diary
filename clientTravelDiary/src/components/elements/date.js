export const getFullTime = (time) => {
	let mouth = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"november",
		"Desember",
	];

	let date = time.getDate();
	let mouthIndex = time.getMonth(); //hanya mengembalikan index
	let yaer = time.getFullYear();
	let hours = time.getHours();
	let minutes = time.getMinutes();

	let fullTime = `${date} ${mouth[mouthIndex]} ${yaer} ${hours}: ${minutes} WIB `;

	return fullTime;
};

export const getDistanceTime = (time) => {
	let timePost = time; //waktu ketika membuat postingan
	let timeNow = new Date(); // waktu sekarang

	//untuk mencari jarak waktu post dengan waktu sekarang
	let distance = timeNow - timePost;

	//inisialisasi melisecond, detik  dalam satu jam, dan jam dalam satuhari
	let milisecond = 1000; // dalam 1 detik
	let secondInHouse = 3600; //dalam 1  jam
	let hoursInDay = 23; // jam dalam 1 hari

	//inisialisasi menit dan second
	let minutes = 60;
	let second = 60;

	let distanceDay = Math.floor(
		distance / (milisecond * secondInHouse * hoursInDay)
	);

	//variable penampung dan menconversi
	// jam
	let distanceHours = Math.floor(distance / (milisecond * minutes * second)); //milisecond*detik*menit

	//menit
	let distanceMinutes = Math.floor(distance / (milisecond * minutes));

	//detik
	let distanceSeconds = Math.floor(distance / milisecond);

	// kondisi untuk menampilkan hari , jam, menit dan detik
	if (distanceDay >= 1) {
		return `${distanceDay} Day ago`;
	} else if (distanceHours >= 1) {
		return `${distanceHours} Hourse ago`;
	} else if (distanceMinutes >= 1) {
		return `${distanceMinutes} Minutes ago`;
	} else if(distanceSeconds >= 1) {
		return ` ${distanceSeconds} Second ago`;
	}
};
