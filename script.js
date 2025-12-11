'use strict';
// import{digits,letters} from './drone_text.js'
console.clear();
let airDrag =0.8;
// This is a prime example of what starts out as a simple project
// and snowballs way beyond its intended size. It's a little clunky
// reading/working on this single file, but here it is anyways :)
const digits={
	1: [
        "0011100",
        "0011100",
		"0011100",
		"0011100",
        "0011100",
		"0011100",
		"0011100",
        "0011100",
		"0011100",
		"0011100",
    ],
    0: [
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "1111111",
        "1111111"
    ],
    2: [
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111",
        "1100000",
        "1100000",
        "1111111",
        "1111111"
    ],
    3: [
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111"
    ],
    4: [
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "0000011",
        "0000011"
    ],
    5: [
        "1111111",
        "1111111",
        "1100000",
        "1100000",
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111"
    ],
    6: [
        "1111111",
        "1111111",
        "1100000",
        "1100000",
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1111111",
        "1111111"
    ],
    7: [
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "0000011",
        "0000011",
        "0000011",
        "0000011",
        "0000011",
        "0000011"
    ],
    8: [
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1111111",
        "1111111"
    ],
    9: [
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111"
    ]
}
const letters = {
	A: [
        "00100",
        "01010",
        "10001",
        "10001",
        "11111",
        "10001",
        "10001",
        "10001"
    ],
    B: [
        "11110",
        "10001",
        "10001",
        "11110",
        "10001",
        "10001",
        "10001",
        "11110"
    ],
    C: [
        "01111",
        "10000",
        "10000",
        "10000",
        "10000",
        "10000",
        "01111",
        "00000"
    ],
    D: [
        "11110",
        "10001",
        "10001",
        "10001",
        "10001",
        "10001",
        "11110",
        "00000"
    ],
    E: [
        "11111",
        "10000",
        "10000",
        "11111",
        "10000",
        "10000",
        "11111",
        "00000"
    ],
    F: [
        "11111",
        "10000",
        "10000",
        "11111",
        "10000",
        "10000",
        "10000",
        "00000"
    ],
    G: [
        "01111",
        "10000",
        "10000",
        "10111",
        "10001",
        "10001",
        "01111",
        "00000"
    ],
    H: [
        "10001",
        "10001",
        "10001",
        "11111",
        "10001",
        "10001",
        "10001",
        "10001"
    ],
    I: [
        "11111",
        "00100",
        "00100",
        "00100",
        "00100",
        "00100",
        "11111",
        "00000"
    ],
    J: [
        "11111",
        "00001",
        "00001",
        "00001",
        "00001",
        "10001",
        "01110",
        "00000"
    ],
    K: [
        "10001",
        "10010",
        "10100",
        "11000",
        "10100",
        "10010",
        "10001",
        "00000"
    ],
    L: [
        "10000",
        "10000",
        "10000",
        "10000",
        "10000",
        "10000",
        "11111",
        "00000"
    ],
    M: [
        "10001",
        "11011",
        "10101",
        "10101",
        "10001",
        "10001",
        "10001",
        "10001"
    ],
    N: [
        "10001",
        "11001",
        "10101",
        "10101",
        "10011",
        "10011",
        "10001",
        "10001"
    ],
    O: [
        "01110",
        "10001",
        "10001",
        "10001",
        "10001",
        "10001",
        "01110",
        "00000"
    ],
    P: [
        "11110",
        "10001",
        "10001",
        "11110",
        "10000",
        "10000",
        "10000",
        "00000"
    ],
    Q: [
        "01110",
        "10001",
        "10001",
        "10001",
        "10001",
        "10101",
        "01110",
        "00001"
    ],
    R: [
        "11110",
        "10001",
        "10001",
        "11110",
        "10100",
        "10010",
        "10001",
        "00000"
    ],
    S: [
        "01111",
        "10000",
        "10000",
        "01110",
        "00001",
        "00001",
        "11110",
        "00000"
    ],
    T: [
        "11111",
        "00100",
        "00100",
        "00100",
        "00100",
        "00100",
        "00100",
        "00000"
    ],
    U: [
        "10001",
        "10001",
        "10001",
        "10001",
        "10001",
        "10001",
        "01110",
        "00000"
    ],
    V: [
        "10001",
        "10001",
        "10001",
        "10001",
        "01010",
        "01010",
        "00100",
        "00000"
    ],
    W: [
        "10001",
        "10001",
        "10001",
        "10101",
        "10101",
        "11011",
        "10001",
        "00000"
    ],
    X: [
        "10001",
        "10001",
        "01010",
        "00100",
        "01010",
        "10001",
        "10001",
        "00000"
    ],
    Y: [
        "10001",
        "10001",
        "01010",
        "00100",
        "00100",
        "00100",
        "00100",
        "00000"
    ],
    Z: [
        "11111",
        "00001",
        "00010",
        "00100",
        "01000",
        "10000",
        "11111",
        "00000"
    ],
	1: [
        "111",
        "111",
        "111",
        "111",
        "111",
        "111",
        "111",
        "111",
        "111",
        "111"
    ],
    0: [
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "1111111",
        "1111111"
    ],
    2: [
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111",
        "1100000",
        "1100000",
        "1111111",
        "1111111"
    ],
    3: [
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111"
    ],
    4: [
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "0000011",
        "0000011"
    ],
    5: [
        "1111111",
        "1111111",
        "1100000",
        "1100000",
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111"
    ],
    6: [
        "1111111",
        "1111111",
        "1100000",
        "1100000",
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1111111",
        "1111111"
    ],
    7: [
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "0000011",
        "0000011",
        "0000011",
        "0000011",
        "0000011",
        "0000011"
    ],
    8: [
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1111111",
        "1111111"
    ],
    9: [
        "1111111",
        "1111111",
        "1100011",
        "1100011",
        "1111111",
        "1111111",
        "0000011",
        "0000011",
        "1111111",
        "1111111"
    ]
};


const IS_MOBILE = window.innerWidth <= 640;
const IS_DESKTOP = window.innerWidth > 800;
const IS_HEADER = IS_DESKTOP && window.innerHeight < 300;
// Detect high end devices. This will be a moving target.
const IS_HIGH_END_DEVICE = (() => {
	const hwConcurrency = navigator.hardwareConcurrency;
	if (!hwConcurrency) {
		return false;
	}
	// Large screens indicate a full size computer, which often have hyper threading these days.
	// So a quad core desktop machine has 8 cores. We'll place a higher min threshold there.
	const minCount = window.innerWidth <= 1024 ? 4 : 8;
	return hwConcurrency >= minCount;
})();
// Prevent canvases from getting too large on ridiculous screen sizes.
// 8K - can restrict this if needed
const MAX_WIDTH = 7680;
const MAX_HEIGHT = 4320;
const GRAVITY = 0.9; // Acceleration in px/s
let simSpeed = 1;

function getDefaultScaleFactor() {
	if (IS_MOBILE) return 0.9;
	if (IS_HEADER) return 0.75;
	return 1;
}



// Width/height values that take scale into account.
// USE THESE FOR DRAWING POSITIONS
let stageW, stageH;

// All quality globals will be overwritten and updated via `configDidUpdate`.
let quality = 3;
let isLowQuality = false;
let isNormalQuality = false;
let isHighQuality = true;

const QUALITY_LOW = 1;
const QUALITY_NORMAL = 2;
const QUALITY_HIGH = 3;

const SKY_LIGHT_NONE = 0;
const SKY_LIGHT_DIM = 1;
const SKY_LIGHT_NORMAL = 2;

const COLOR = {
	Red: '#ff0043',

	Blue: '#1e7fff',
	Gray:'#C0C0C0',
	
	White: '#ffffff',
	Orange:'#FFA500',
	Gold: '#ffbf36',


};
// 	/**
// 	 * Chuyển mã màu thành ,màu tối hơn
// 	 * @param {*} hex 
// 	 * @param {*} amount 
// 	 * @returns 
// 	 */
// 	function darkenColor(hex, amount) {
//     // Chuyển mã HEX sang RGB
//     let [r, g, b] = hex.match(/\w\w/g).map((c) => parseInt(c, 16));
    
//     // Giảm giá trị RGB
//     r = Math.max(0, r - amount);
//     g = Math.max(0, g - amount);
//     b = Math.max(0, b - amount);

	

//     // Chuyển lại sang HEX
//     return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
// }
function darkenColor(hex, amount) {
    // Kiểm tra định dạng mã màu HEX hợp lệ
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        console.error(`Invalid HEX color: ${hex}`);
        return hex; // Giữ nguyên màu gốc nếu không hợp lệ
    }

    // Chuyển mã HEX sang RGB
    let [r, g, b] = hex.match(/\w\w/g).map((c) => parseInt(c, 16));
    
    // Giảm giá trị RGB
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    // Chuyển lại sang HEX
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
// Special invisible color (not rendered, and therefore not in COLOR map)
const INVISIBLE = '_INVISIBLE_';

const PI_2 = Math.PI * 2;
const PI_HALF = Math.PI * 0.5;

// Stage.disableHighDPI = true;
const trailsStage = new Stage('trails-canvas');
const mainStage = new Stage('main-canvas');
const stages = [
	trailsStage,
	mainStage
];




// Hàm chuyển màu dần dần


// Hàm hỗ trợ: Nội suy màu (chuyển dần dần giữa 2 màu)
function interpolateColor(startRGB, endRGB, t) {
    const r = Math.round(startRGB[0] + t * (endRGB[0] - startRGB[0]));
    const g = Math.round(startRGB[1] + t * (endRGB[1] - startRGB[1]));
    const b = Math.round(startRGB[2] + t * (endRGB[2] - startRGB[2]));
    return `rgb(${r}, ${g}, ${b})`;
}

// Hàm hỗ trợ: Phân tích màu từ chuỗi "rgb(r, g, b)"
function parseColor(colorString) {
    const match = colorString.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (!match) return [0, 0, 0]; // Mặc định là màu đen nếu không parse được
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}
// Mảng lưu các Drone đang hoạt động
/**
 * Mảng tạo đối tượng drone
 * x: vị trí ngang 0->1
 * y: vị trí cao 0->1
 * radius: độ lớn 1->5
 * speedX: tốc độ ngang
 * speedY: tốc độ dọc
 * color: màu
 * life: thời gian sống
 */
class Drone {
	
    constructor(x, y, radius=2, speedX =0 , speedY=0, color=COLOR.Blue, life) {
        this.x = x *maxW;
        this.y = (1 - y)*maxH;
        this.radius = radius;
		this.minRadius = 2;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
		this.pistilColor = COLOR.White;
		this.baseRadius = radius;
        this.life = life;
		this.strobeInterval = null;
    }

    // update(timeStep, speed, gAcc=0) {
	// 	//Thêm hệ số lắc lư theo gió
	// 	let kk =Math.random()<0.51?-1:1
	// 	let hh =Math.random() * kk/7;
    //     this.x += this.speedX * speed+hh;
    //     this.y += this.speedY * speed+hh;
	// 	//đã fix Trọng lực = 0 ở update()
    //     this.speedY += gAcc;
    //     this.life -= timeStep;
    // }
	// update(timeStep, speed, gAcc = 0, targetX = null, targetY = null) {
	// 	// Nếu có vị trí mục tiêu, tính hướng di chuyển
	// 	if (targetX !== null && targetY !== null) {
	// 		const dx = targetX - this.x; // Khoảng cách đến mục tiêu theo X
	// 		const dy = targetY - this.y; // Khoảng cách đến mục tiêu theo Y
	// 		const distance = Math.sqrt(dx * dx + dy * dy); // Khoảng cách tổng
	
	// 		if (distance > 1) { // Chỉ di chuyển nếu còn xa hơn 1 pixel
	// 			this.speedX = (dx / distance) * speed; // Tính tốc độ theo hướng X
	// 			this.speedY = (dy / distance) * speed; // Tính tốc độ theo hướng Y
	// 		} else {
	// 			this.speedX = 0; // Đến nơi thì dừng lại
	// 			this.speedY = 0;
	// 		}
	// 	}
	
	// 	// // Thêm hiệu ứng lắc lư theo gió
	// 	// let kk = Math.random() < 0.51 ? -1 : 1;
	// 	// let hh = Math.random() * kk / 7;
	// 	// this.x += this.speedX * timeStep + hh; // Cập nhật vị trí X
	// 	// this.y += this.speedY * timeStep + hh; // Cập nhật vị trí Y
	
	// 	// Ảnh hưởng bởi trọng lực
	// 	this.speedY += gAcc;
	
	// 	// Giảm thời gian tồn tại (nếu cần)
	// 	this.life -= timeStep;
	// }
	update(dt) {
		if (this.targetX === null || this.targetY === null) return;

		const dx = this.targetX - this.x;
		const dy = this.targetY - this.y;
		const dist = Math.sqrt(dx*dx + dy*dy);

		if (dist < 1) {
			this.x = this.targetX;
			this.y = this.targetY;
			this.speedX = 0;
			this.speedY = 0;
			return;
		}

		// di chuyển đều theo thời gian
		this.x += this.speedX * dt;
		this.y += this.speedY * dt;
	}
	/**
	 * Thay đổi tốc độ của vật 1->100
	 * @param {*} speedX 
	 * @param {*} speedY 
	 */
	setSpeed(speedX, speedY){
		this.speedX = speedX;
        this.speedY = speedY;
	}
	/**
	 * Đặt vị trí mục tiêu và thời gian di chuyển đến đó
	 * @param {*} x 
	 * @param {*} y 
	 * @param {*} duration 
	 */
	setTarget(x, y, duration=1000) {
		this.targetX = x;
		this.targetY = y;
		const dx = x - this.x;
		const dy = y - this.y;
		this.speedX = dx / duration;
		this.speedY = dy / duration;
	}
	
    isAlive() {
        return this.life>0;
    }
}

/**
 * Lớp đội hình Drone update 2025 phục vụ cho việc di chuyển đội hình phù hợp hơn 
 */
class FormationV2{
	constructor(){
		this.drones = [];
		this.centerX=null;
		this.centerY=null;
		this.radius=null;


	}
	/**
	 * Thêm drone vào formation
	 * @param {*} n 
	 * @param {*} size 
	 * @param {*} life - thời gian sống của drone -> đội hình
	 */
	addDrones(n,size, life=1000000){
		let mmm = drones.length // vị trí bắt đầu lấy drone từ mảng global drones
		// Tạo thêm drone nếu chưa đủ
		for(let i=0;i<n;i++){
			drones.push(new Drone(-1,-1,size,0,0,COLOR.Yellow,life))
		}
		for(let i =0; i<n;i++){
			this.drones.push(drones[mmm+i])
		}
	}
	/**
	 * Đổi màu cho tất cả drone của formation
	 * @param {*} color 
	 */
	setColor(color,pistilColor=COLOR.White){
		this.drones.forEach(drone=>{
			this.fadeColor(drone, color, COLOR.White,120);
			
		})
	}


	/**
	 * Tạo hiệu ứng đổi màu ngẫu nhiên
	 * @param {*} interval - tần suất đổi màu
	 */
	setRandomColor(interval = 64){
		const updateColors = () => {
			// Chia drone thành 2 nhóm: 50% thành màu đen, 50% thành màu ngẫu nhiên
			const blackCount = Math.floor(this.drones.length * 0.8); // Số lượng drone thành màu đen
			const shuffledDrones = [...this.drones].sort(() => Math.random() - 0.7); // Trộn ngẫu nhiên mảng drones
	
			// Đổi màu
			shuffledDrones.forEach((drone, index) => {
				if (index < blackCount) {
					drone.color = "black"; // Màu đen
					drone.pistilColor = "rgba(55, 52, 50, 0)";
				} else {
					drone.color = getRandomColor(); // Màu ngẫu nhiên
					drone.pistilColor = COLOR.White;
				}
			});
		};
	
		// Đặt khoảng thời gian thay đổi màu
		setInterval(updateColors, interval);
	}
	/**
	 * tạo hiệu ứng nhấp nháy 
	 * @param {*} duration - thời gian nhấp nháy
	 * @param {*} interval - thời gian nhấp nháy
	 * @param {*} troll - tỉ lệ số lượng màu đen 0->1
	 * @param {*} colorStrobe - màu nhấp nháy
	 */
	setRandomColorV2(duration = 2000000,colorStrobe = null,interval = 64, troll = 0.9) {
		const color = this.drones[1].color
		// Lưu màu ban đầu
		const updateColors = () => {
			const shuffledDrones = [...this.drones].sort(() => Math.random() - troll);
			const targetColor2 = colorStrobe || getRandomColor(); // Màu ngẫu nhiên hoặc màu được chỉ định
			
			shuffledDrones.forEach((drone, index) => {
				if (Math.random() < 0.5) {
					const isBlack = Math.random() < troll; // 90% cơ hội chuyển thành màu đen
	
					const targetColor = isBlack ? "black" : targetColor2;
					const targetPistilColor = isBlack ? "rgba(55, 52, 50, 0)" : COLOR.White;
	
					this.fadeColor(drone, targetColor, targetPistilColor, interval);
				}
			});
		};
	
		// Thiết lập bộ đếm thời gian
		const effectInterval = setInterval(updateColors, interval);
		setTimeout(() => {
			clearInterval(effectInterval); // Dừng cập nhật màu
		}, duration);
		
	}
	fadeColor(drone, targetColor, targetPistilColor, duration) {
		const currentColor = parseColor(drone.color); // Hàm để lấy giá trị RGB từ `drone.color`
		const targetRGB = parseColor(targetColor);
	
		const steps = Math.floor(duration / 16); // Số bước chuyển (dựa trên 60FPS)
		let step = 0;
	
		const interval = setInterval(() => {
			if (step >= steps) {
				// Kết thúc chuyển đổi, đặt màu cuối cùng
				drone.color = targetColor;
				drone.pistilColor = targetPistilColor;
				clearInterval(interval);
				return;
			}
	
			// Tính toán màu mới
			drone.color = interpolateColor(currentColor, targetRGB, step / steps);
			drone.pistilColor = targetPistilColor; // Pistil chuyển ngay lập tức (nếu cần)
	
			step++;
		}, 16); // 16ms cho mỗi frame (60FPS)
	}
	/**
	 * Vẽ ký tự số
	 * @param {*} digit - số 2
	 * @param {*} startX - vị trí bắt đầu x
	 * @param {*} startY - vị trí bắt đầu y
	 * @param {*} spacing - khoảng cách giữa các drone
	 */
	drawDigit(digit, startX, startY, spacing) {
		const matrix = digits[digit]; // Lấy ma trận của số
		let droneIndex = 0;
		for (let row = 0; row < matrix.length; row++) {
			for (let col = 0; col < matrix[row].length; col++) {
				if (matrix[row][col] === '1') {
					// Đặt drone tại vị trí tương ứng
					this.drones[droneIndex].x = startX + col * spacing;
					this.drones[droneIndex].y = startY + row * spacing;
					droneIndex++;
					
				}
			}
		}
		let formationLifetime = this.formationLifetime;
		let startTime = Date.now();
		const updateFormation = () => {
			const currentTime = Date.now();
			const elapsedTime = currentTime - startTime;
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				this.reset(); // Dừng việc cập nhật đội hình nếu hết thời gian
				return;
			}
			requestAnimationFrame(updateFormation);
		}
	
		// Bắt đầu cập nhật đội hình
		requestAnimationFrame(updateFormation);
		
	}
	/**
	 * vẽ kí tư chữ
	 * @param {*} letter - chữ 'a'
	 * @param {*} startX 
	 * @param {*} startY 
	 * @param {*} spacing 
	 */
	drawLetter(letter, startX, startY, spacing) {
		letter = letter.toUpperCase()
		const matrix = letters[letter]; // Lấy ma trận của ký tự
		let droneIndex = 0;
		for (let row = 0; row < matrix.length; row++) {
			for (let col = 0; col < matrix[row].length; col++) {
				if (matrix[row][col] === '1') {
					// Đặt drone tại vị trí tương ứng
					this.drones[droneIndex].x = startX + col * spacing;
					this.drones[droneIndex].y = startY + row * spacing;
					droneIndex++;
				}
			}
		}
		
	}
}

/**
 * Lớp đội hình Drone được update 2024
 */
class Formation {
	
    constructor() {
        this.drones = [];
		this.centerX=null;
		this.centerY=null;
		this.radius=null;
		this.length = 0;
		this.formationLifetime =10000;
		 // Mảng lưu danh sách các drone
    }
	/**
	 * Thêm Drone vào formation
	 * @param {*} drone 
	 */
    addDrone(drone) {
        this.drones.push(drone);
    }

	
	/**
	 * Đổi màu cho tất cả drone của formation
	 * @param {*} color 
	 */
	setColor(color,pistilColor=COLOR.White){

		this.drones.forEach(drone=>{
			this.fadeColor(drone, color, COLOR.White,120);
			
		})
	}
	
	/**
	 * Tjay đổi radius của drone
	 * @param {*} radius 
	 */
	setRadiusDrone(radius){
		this.drones.forEach(drone=>{
			drone.radius = radius;
		})
	}
	/**
	 * Đặt vị trí cho drone =-1
	 * @param {*} x 
	 * @param {*} y 
	 */
	reset(){
		this.drones.forEach(drone=>{
			drone.x=-1;
			drone.y=-1;
		})
	}
    updateFormation(timeStep, speed, gAcc) {
        this.drones.forEach(drone => drone.update(timeStep, speed, gAcc));
    }
	/**
	 * Tạo tọa độ x, y của đội hình và bán kính, thời gian sống của đội hình
	 * @param {*} mx 
	 * @param {*} my 
	 * @param {*} radius 
	 * @param {*} formationLifetime - thời gian tồn tại
	 */
	setFormation(mx,my,formationLife=10000,radius){
		this.centerX=mx;
		this.centerY=my;
		this.radius=radius;
		this.formationLifetime=formationLife;
	}
	/**
	 * Config lại các giá trị của Formation
	 * @param {*} mx 
	 * @param {*} my 
	 * @param {*} radius 
	 */
	setCenter(mx, my){
		this.centerX=mx;
		this.centerY=my;
		
	}
	
	/**
	 * tạo size tăng dần theo kích cỡ
	 * @param {*} check - =1 thì lớn giảm dần
	 * @returns 
	 */
	setReduceSize(check=1) {
		if(this.drones.length<1) return
		
		let maxRadius = this.drones[1].radius*1.2;
		let minRadius = 0.4;
		let total = (maxRadius-minRadius)/this.drones.length
		
		if(check == 1){
			let i = 0;
			while(i<this.drones.length){
					this.drones[i].radius = maxRadius
					i++;
					maxRadius-=total
					console.log('hehe',i)
			}
		}else{ 
			let i = this.drones.length-1;
			while(i>=0){
					this.drones[i].radius = maxRadius
					i--;
					maxRadius-=total
			}
		}	
	}
	/**
	 * Chuyển đổi màu lần lượt với khoảng cách thời gian giữa các drone
	 * @param {*} color Màu đích
	 * @param {*} timeGap Khoảng cách thời gian giữa các lần đổi màu (ms)
	 */
	async setColorV2(color, timeGap=0.7,pistilColor=COLOR.White) {
		// Hàm delay đơn giản
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		color = color??getRandomColor()
		// Thay đổi màu lần lượt cho từng drone
		for (let i = 0; i < this.drones.length-2; i++) {
			const drone = this.drones[i];
			const drone1v1 = this.drones[i+1];
			const drone1v2 = this.drones[i+2];
			// Gọi hàm đổi màu với hiệu ứng
			this.fadeColor(drone, color, pistilColor, 120);
			this.fadeColor(drone1v1, '#000000', '#000000', 120);
			this.fadeColor(drone1v2, '#000000','#000000', 120);

			// Đợi trước khi chuyển sang drone tiếp theo
			await delay(timeGap);
		}
	}
	async setColorV3(color1, timeGap=0.7) {
		// Hàm delay đơn giản
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		color1 = color1??getRandomColor()

		let half = this.drones.length/2
		// Thay đổi màu lần lượt cho từng drone
		for (let i = 0; i < half-2; i++) {
			const drone1 = this.drones[i];
			const drone1v1 = this.drones[i+1];
			const drone1v2 = this.drones[i+2];
			const drone2 = this.drones[i+half]
			const drone2v1 = this.drones[i+1+half];
			const drone2v2 = this.drones[i+2+half];


			// Gọi hàm đổi màu với hiệu ứng
			this.fadeColor(drone1, color1, COLOR.White, 120);
			this.fadeColor(drone1v1, '#000000', '#000000', 120);
			this.fadeColor(drone1v2, '#000000','#000000', 120);
			this.fadeColor(drone2, color1, COLOR.White, 120);
			this.fadeColor(drone2v1, '#000000', '#000000', 120);
			this.fadeColor(drone2v2, '#000000','#000000', 120);
			
			// Đợi trước khi chuyển sang drone tiếp theo
			await delay(timeGap);
		}
		

	}
	/**
	 * Tạo hiệu ứng đổi màu ngẫu nhiên
	 * @param {*} interval 
	 */
	setRandomColor(interval = 64){
		const updateColors = () => {
			// Chia drone thành 2 nhóm: 50% thành màu đen, 50% thành màu ngẫu nhiên
			const blackCount = Math.floor(this.drones.length * 0.8); // Số lượng drone thành màu đen
			const shuffledDrones = [...this.drones].sort(() => Math.random() - 0.7); // Trộn ngẫu nhiên mảng drones
	
			// Đổi màu
			shuffledDrones.forEach((drone, index) => {
				if (index < blackCount) {
					drone.color = "black"; // Màu đen
					drone.pistilColor = "rgba(55, 52, 50, 0)";
				} else {
					drone.color = getRandomColor(); // Màu ngẫu nhiên
					drone.pistilColor = COLOR.White;
				}
			});
		};
	
		// Đặt khoảng thời gian thay đổi màu
		setInterval(updateColors, interval);
	}
	/**
	 * tạo hiệu ứng nhấp nháy 
	 * @param {*} duration - thời gian nhấp nháy
	 * @param {*} interval - thời gian nhấp nháy
	 * @param {*} troll - tỉ lệ số lượng màu đen 0->1
	 * @param {*} colorStrobe - màu nhấp nháy
	 */
	setRandomColorV2(duration = 2000000,colorStrobe = null,interval = 64, troll = 0.9) {
		const color = this.drones[1].color
		// Lưu màu ban đầu
		const updateColors = () => {
			const shuffledDrones = [...this.drones].sort(() => Math.random() - troll);
			const targetColor2 = colorStrobe || getRandomColor(); // Màu ngẫu nhiên hoặc màu được chỉ định
			
			shuffledDrones.forEach((drone, index) => {
				if (Math.random() < 0.5) {
					const isBlack = Math.random() < troll; // 90% cơ hội chuyển thành màu đen
	
					const targetColor = isBlack ? "black" : targetColor2;
					const targetPistilColor = isBlack ? "rgba(55, 52, 50, 0)" : COLOR.White;
	
					this.fadeColor(drone, targetColor, targetPistilColor, interval);
				}
			});
		};
	
		// Thiết lập bộ đếm thời gian
		const effectInterval = setInterval(updateColors, interval);
		setTimeout(() => {
			clearInterval(effectInterval); // Dừng cập nhật màu
		}, duration);
		
	}
	fadeColor(drone, targetColor, targetPistilColor, duration) {
		const currentColor = parseColor(drone.color); // Hàm để lấy giá trị RGB từ `drone.color`
		const targetRGB = parseColor(targetColor);
	
		const steps = Math.floor(duration / 16); // Số bước chuyển (dựa trên 60FPS)
		let step = 0;
	
		const interval = setInterval(() => {
			if (step >= steps) {
				// Kết thúc chuyển đổi, đặt màu cuối cùng
				drone.color = targetColor;
				drone.pistilColor = targetPistilColor;
				clearInterval(interval);
				return;
			}
	
			// Tính toán màu mới
			drone.color = interpolateColor(currentColor, targetRGB, step / steps);
			drone.pistilColor = targetPistilColor; // Pistil chuyển ngay lập tức (nếu cần)
	
			step++;
		}, 16); // 16ms cho mỗi frame (60FPS)
	}
	/**
	 * Tạo đội hình vòng xoay ngang
	 * @param {*} agn - tốc độ mở rộng độ lớn / nên để 0 để đứng im
	 * @param {*} check - chiều vòng xoay 
	 * @param {*} speed - tốc độ /default Math.PI / 600
	 * @param {*} tiltAngle - góc nghiêng /default -Math.PI / 2.02
	 */
	setCircleFormationV2(agn=0,check=1,speed = Math.PI / 600, tiltAngle = -Math.PI / 2.02) {
		let time = 0; // Biến thời gian để tính góc xoay
		let formationLifetime = this.formationLifetime; // Thời gian tồn tại đội hình
		const angleStep = (2 * Math.PI) / this.drones.length; // Khoảng cách giữa các drone trên vòng tròn
		const cosTilt = Math.cos(tiltAngle); // Tính cos của góc nghiêng
		const sinTilt = Math.sin(tiltAngle); // Tính sin của góc nghiêng
		// const color = this.drones[0].color; // Màu sắc mặc định của drone
		let elapsedTime = 0; // Biến để theo dõi thời gian đã trôi qua
		const startTime = Date.now(); // Thời điểm bắt đầu
		// Hàm cập nhật đội hình theo thời gian
		const update = () => {
			//tạo hiệu ứng mở rộng
			this.radius = this.radius + agn*Math.sin(time);
			this.centerY = this.centerY + agn* Math.cos(time)/10;
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			const currentTime = Date.now(); // Lấy thời gian hiện tại
			const elapsedTime = currentTime - startTime; // Tính thời gian đã trôi qua

			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				//trả về vị trí ban đầu
				this.reset()
				return; // Dừng quy trình
			}
			
			time += speed; // Tăng thời gian để thay đổi góc quay
			const rotationAngle = time; // Góc quay hiện tại
	
			this.drones.forEach((drone, index) => {
				 // Màu sắc mặc định
				const angle = angleStep * index + rotationAngle*check; // Góc quay cho mỗi drone
				const x = this.radius * Math.cos(angle); // Tọa độ X trên vòng tròn
				const y = this.radius * Math.sin(angle); // Tọa độ Y trên vòng tròn
	
				// Biến đổi 3D với góc nghiêng tiltAngle
				const transformedX = x; // Trục X giữ nguyên
				const transformedY = y * cosTilt; // Trục Y bị thu nhỏ theo cos(tiltAngle)
				const depth = y * sinTilt; // Chiều sâu để tạo hiệu ứng 3D
	
				// Đặt lại vị trí drone
				drone.x = this.centerX + transformedX;
				drone.y = this.centerY + transformedY;
	
				// Tạo hiệu ứng "độ sâu" bằng cách thay đổi kích thước hoặc màu sắc dựa trên `depth`
				// drone.radius = drone.baseRadius + depth * 0.005; // Kích thước thay đổi theo độ sâu
				// drone.pistilColor = depth > 0 ? COLOR.White : "rgba(185, 185, 224, 0.8)"; // Màu sắc thay đổi theo độ sâu
			});
	
			// Gọi lại hàm cập nhật liên tục
			requestAnimationFrame(update);
		};
	
		// Bắt đầu cập nhật đội hình
		update();
	}
	
	/**
	 * Tạo đội hình xuay tròn 3D với tốc độ di chuyển
	 * @param {*} tiltAngleX - độ nghiêng X
	 * @param {*} tiltAngleY - độ ngjiêng Y
	 * @param {*} speed -tốc độ xoay
	 * @param {*} deltaX - tọa độ x thêm vào
	 * @param {*} deltaY -	tọa độ y thêm vào
	 */
	setCircleFormationV3({tiltAngleX = Math.PI / 2.1, tiltAngleY = Math.PI / 3.6,check=1, speed = Math.PI / 900,deltaX = 0, deltaY = 0 }={} ) {
		let formationLifetime = this.formationLifetime;
		let time = 0; // Biến thời gian để tính góc xoay
		const angleStep = (2 * Math.PI) / this.drones.length; // Khoảng cách giữa các drone trên vòng tròn
		const cosTiltX = Math.cos(tiltAngleX); // Tính cos của góc nghiêng X
		const sinTiltX = Math.sin(tiltAngleX); // Tính sin của góc nghiêng X
		const cosTiltY = Math.cos(tiltAngleY); // Tính cos của góc nghiêng Y
		const sinTiltY = Math.sin(tiltAngleY); // Tính sin của góc nghiêng Y
		const startTime = Date.now(); // Thời điểm bắt đầu
	
		let offsetX = deltaX; // Offset cho vị trí X
		let offsetY = deltaY; // Offset cho vị trí Y
		
		// Hàm cập nhật đội hình theo thời gian
		const update = () => {
			const currentTime = Date.now(); // Lấy thời gian hiện tại
			const elapsedTime = currentTime - startTime; // Tính thời gian đã trôi qua
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				this.reset();
				return; // Dừng quy trình
			}
	
			time += speed; // Tăng thời gian để thay đổi góc quay
			const rotationAngle = time; // Góc quay hiện tại
			let radius = drones[0].radius
			// Cập nhật vị trí di chuyển của đội hình
			this.centerX += offsetX;
			this.centerY += offsetY;
	
			this.drones.forEach((drone, index) => {
				const angle = angleStep * index + rotationAngle*check; // Góc quay cho mỗi drone
				const x = this.radius * Math.cos(angle); // Tọa độ X trên vòng tròn
				const y = this.radius * Math.sin(angle); // Tọa độ Y trên vòng tròn
	
				// Biến đổi 3D với góc nghiêng trên cả hai trục
				const transformedX = x * cosTiltY - y * sinTiltX; // Trục X biến đổi theo nghiêng Y và X
				const transformedY = y * cosTiltX - x * sinTiltY; // Trục Y biến đổi theo nghiêng X và Y
				const depth = (y * sinTiltY+80)/100; // Chiều sâu để tạo hiệu ứng 3D
				
				
				// Đặt lại vị trí drone cộng thêm offset
				drone.x = this.centerX + transformedX ;
				drone.y = this.centerY + transformedY ;
				
				// Tạo hiệu ứng "độ sâu" bằng cách thay đổi kích thước hoặc màu sắc dựa trên `depth`
				// drone.radius = drone.baseRadius; // Kích thước thay đổi theo độ sâu
				// drone.color = depth > 0 ? "rgba(255, 0, 0, 1)" : "rgba(0, 0, 255, 0.8)"; // Màu sắc thay đổi theo độ sâu
			});
	
			// Gọi lại hàm cập nhật liên tục
			requestAnimationFrame(update);
		};
	
		// Bắt đầu cập nhật đội hình
		update();
	}
	/**
	 * Tạo đội hình xuay tròn 3D với tốc độ di chuyển kích cỡ theo độ sâu
	 * @param {*} tiltAngleX - độ nghiêng X
	 * @param {*} tiltAngleY - độ ngjiêng Y
	 * @param {*} speed -tốc độ xoay
	 * @param {*} deltaX - tọa độ x thêm vào
	 * @param {*} deltaY -	tọa độ y thêm vào
	 */
	setCircleFormationV3c5({tiltAngleX = Math.PI / 2.1, tiltAngleY = Math.PI / 3.6, speed = Math.PI / 900,deltaX = 0, deltaY = 0}={} ) {
		let formationLifetime = this.formationLifetime;
		let time = 0; // Biến thời gian để tính góc xoay
		const angleStep = (2 * Math.PI) / this.drones.length; // Khoảng cách giữa các drone trên vòng tròn
		const cosTiltX = Math.cos(tiltAngleX); // Tính cos của góc nghiêng X
		const sinTiltX = Math.sin(tiltAngleX); // Tính sin của góc nghiêng X
		const cosTiltY = Math.cos(tiltAngleY); // Tính cos của góc nghiêng Y
		const sinTiltY = Math.sin(tiltAngleY); // Tính sin của góc nghiêng Y
		const startTime = Date.now(); // Thời điểm bắt đầu
	
		let offsetX = deltaX; // Offset cho vị trí X
		let offsetY = deltaY; // Offset cho vị trí Y
		
		// Hàm cập nhật đội hình theo thời gian
		const update = () => {
			const currentTime = Date.now(); // Lấy thời gian hiện tại
			const elapsedTime = currentTime - startTime; // Tính thời gian đã trôi qua
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				this.reset();
				return; // Dừng quy trình
			}
	
			time += speed; // Tăng thời gian để thay đổi góc quay
			const rotationAngle = time; // Góc quay hiện tại
			
			// Cập nhật vị trí di chuyển của đội hình
			this.centerX += offsetX;
			this.centerY += offsetY;
	
			this.drones.forEach((drone, index) => {
				const angle = angleStep * index + rotationAngle; // Góc quay cho mỗi drone
				const x = this.radius * Math.cos(angle); // Tọa độ X trên vòng tròn
				const y = this.radius * Math.sin(angle); // Tọa độ Y trên vòng tròn
	
				// Biến đổi 3D với góc nghiêng trên cả hai trục
				const transformedX = x * cosTiltY - y * sinTiltX; // Trục X biến đổi theo nghiêng Y và X
				const transformedY = y * cosTiltX - x * sinTiltY; // Trục Y biến đổi theo nghiêng X và Y
				const depth = (y * sinTiltY+80)/100; // Chiều sâu để tạo hiệu ứng 3D
				
	
				// Đặt lại vị trí drone cộng thêm offset
				drone.x = this.centerX + transformedX ;
				drone.y = this.centerY + transformedY ;
				
				// Tạo hiệu ứng "độ sâu" bằng cách thay đổi kích thước hoặc màu sắc dựa trên `depth`
				drone.radius = drone.baseRadius * depth>0?drone.baseRadius * depth:drone.baseRadius * depth*-1; // Kích thước thay đổi theo độ sâu
				// drone.color = depth > 0 ? "rgba(255, 0, 0, 1)" : "rgba(0, 0, 255, 0.8)"; // Màu sắc thay đổi theo độ sâu
				
				
			})
			;
	
			// Gọi lại hàm cập nhật liên tục
			requestAnimationFrame(update);
		};
	
		// Bắt đầu cập nhật đội hình
		update();
	}
	/**
	 * Đội hình xoay tròn 3D hay dùng
	 * @param {*} tiltAngleX - độ nghiêng X
	 * @param {*} tiltAngleY - độ nghiêng Y
	 * @param {*} speed 
	 */
	setCircleFormationV1( {tiltAngleX = Math.PI / 2, tiltAngleY = Math.PI / 2, speed = Math.PI / 900}={}) {
		let formationLifetime = this.formationLifetime;
		let time = 0; // Biến thời gian để tính góc xoay
		const angleStep = (2 * Math.PI) / this.drones.length; // Khoảng cách giữa các drone trên vòng tròn
		const cosTiltX = Math.cos(tiltAngleX); // Tính cos của góc nghiêng X
		const sinTiltX = Math.sin(tiltAngleX); // Tính sin của góc nghiêng X
		const cosTiltY = Math.cos(tiltAngleY); // Tính cos của góc nghiêng Y
		const sinTiltY = Math.sin(tiltAngleY); // Tính sin của góc nghiêng Y
		const startTime = Date.now(); // Thời điểm bắt đầu
	
		// Hàm cập nhật đội hình theo thời gian
		const update = () => {
			const currentTime = Date.now(); // Lấy thời gian hiện tại
			const elapsedTime = currentTime - startTime; // Tính thời gian đã trôi qua
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				this.reset();
				return; // Dừng quy trình
			}
	
			time += speed; // Tăng thời gian để thay đổi góc quay
			const rotationAngle = time; // Góc quay hiện tại
	
			// Cập nhật vị trí di chuyển của đội hình
			
	
			this.drones.forEach((drone, index) => {
				const angle = angleStep * index + rotationAngle; // Góc quay cho mỗi drone
				const x = this.radius * Math.cos(angle); // Tọa độ X trên vòng tròn
				const y = this.radius * Math.sin(angle); // Tọa độ Y trên vòng tròn
	
				// Biến đổi 3D với góc nghiêng trên cả hai trục
				const transformedX = x * cosTiltY - y * sinTiltX; // Trục X biến đổi theo nghiêng Y và X
				const transformedY = y * cosTiltX - x * sinTiltY; // Trục Y biến đổi theo nghiêng X và Y
				const depth = x * sinTiltX + y * sinTiltY; // Chiều sâu để tạo hiệu ứng 3D
	
				// Đặt lại vị trí drone cộng thêm offset
				drone.x = this.centerX + transformedX ;
				drone.y = this.centerY + transformedY ;
	
				// Tạo hiệu ứng "độ sâu" bằng cách thay đổi kích thước hoặc màu sắc dựa trên `depth`
				// drone.radius = drone.baseRadius + depth * 0.05; // Kích thước thay đổi theo độ sâu
				// drone.color = depth > 0 ? "rgba(255, 0, 0, 1)" : "rgba(0, 0, 255, 0.8)"; // Màu sắc thay đổi theo độ sâu
			});
	
			// Gọi lại hàm cập nhật liên tục
			requestAnimationFrame(update);
		};
	
		// Bắt đầu cập nhật đội hình
		update();
	}
	
	/**
	 * Tạo đội hình hình cầu
	 */
	setSphereFormation(speedX=0.000,speedY=0.001, speedZ=0 ) {
		let formationLifetime = this.formationLifetime;
		const totalDrones = this.drones.length;
		const angleStepPhi = Math.PI / Math.sqrt(totalDrones); // Chia góc φ (từ 0 đến π) đều
		const angleStepTheta = (2 * Math.PI) / Math.sqrt(totalDrones); // Chia góc θ (từ 0 đến 2π) đều
		let startTime = Date.now(); // Lưu thời gian bắt đầu để kiểm tra độ tồn tại đội hình
		let rotationAngleX = 0;
		let rotationAngleY = 0;
		let rotationAngleZ = 0;
		// Tạo một hàm update để di chuyển đội hình
		const updateFormation = () => {
			const currentTime = Date.now();
			const elapsedTime = currentTime - startTime;
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				this.reset(); // Dừng việc cập nhật đội hình nếu hết thời gian
				return;
			}
	
			// Tăng góc xoay theo tốc độ xác định
			rotationAngleX += speedX; // Chỉnh sửa theo tốc độ bạn muốn
			rotationAngleY += speedY;
			rotationAngleZ += speedZ;
	
			// Cập nhật vị trí đội hình
			
	
			this.drones.forEach((drone, index) => {
				// Tính toán góc φ (từ 0 đến π) và θ (từ 0 đến 2π)
				const phi = (index % Math.sqrt(totalDrones)) * angleStepPhi; // Từ trên xuống dưới
				const theta = Math.floor(index / Math.sqrt(totalDrones)) * angleStepTheta; // Vòng quanh trục Z
	
				// Chuyển đổi tọa độ cầu (r, θ, φ) sang Descarte (x, y, z)
				let x = this.radius * Math.sin(phi) * Math.cos(theta); // X trên mặt cầu
				let y = this.radius * Math.sin(phi) * Math.sin(theta); // Y trên mặt cầu
				let z = this.radius * Math.cos(phi); // Z trên mặt cầu (độ cao)
	
				// Biến đổi tọa độ dựa trên góc xoay (rotationAngleX, rotationAngleY, rotationAngleZ)
				let tempY = y * Math.cos(rotationAngleX) - z * Math.sin(rotationAngleX);
				let tempZ = y * Math.sin(rotationAngleX) + z * Math.cos(rotationAngleX);
				y = tempY;
				z = tempZ;
	
				let tempX = x * Math.cos(rotationAngleY) + z * Math.sin(rotationAngleY);
				tempZ = -x * Math.sin(rotationAngleY) + z * Math.cos(rotationAngleY);
				x = tempX;
				z = tempZ;
	
				tempX = x * Math.cos(rotationAngleZ) - y * Math.sin(rotationAngleZ);
				tempY = x * Math.sin(rotationAngleZ) + y * Math.cos(rotationAngleZ);
				x = tempX;
				y = tempY;
	
				// Đặt lại vị trí drone với tâm hình cầu (centerX, centerY)
				drone.x = this.centerX + x;
				drone.y = this.centerY + y;
			});
	
			// Tiếp tục gọi lại updateFormation mỗi frame
			requestAnimationFrame(updateFormation);
		}
	
		// Bắt đầu cập nhật đội hình
		requestAnimationFrame(updateFormation);
	}

    setLineFormation(startX, startY, spacing, horizontal = true) {
        this.drones.forEach((drone, index) => {
            if (horizontal) {
                drone.x = startX + index * spacing;
                drone.y = startY;
            } else {
                drone.x = startX;
                drone.y = startY + index * spacing;
            }
        });
    }
	
	/**
	 * Tạo hình ngôi sao
	 * @param {*} centerX tâm x
	 * @param {*} centerY tâm y
	 * @param {*} R_outer khoảng cách cạnh ngoài
	 * @param {*} R_inner khoảng cách cạnh trong
	 */
	setStarFormation(centerX, centerY, R_outer, R_inner) {
		const numPoints = this.drones.length; // Số drone cần sắp xếp
		const starPoints = []; // Lưu tọa độ ngôi sao
		
		// Góc bắt đầu để đỉnh trên cùng thẳng đứng
		const totalAngles = Math.PI * 2; // 360 độ
		const step = totalAngles / (5 * 2); // Góc giữa các đỉnh (10 điểm)
		const startAngle = -Math.PI / 2; // Đỉnh trên cùng nằm ở trục y âm (góc -90 độ)
		
		// Tính toán 10 điểm của ngôi sao
		for (let i = 0; i < 10; i++) {
			// Đỉnh ngoài (i chẵn) hoặc đỉnh trong (i lẻ)
			const radius = i % 2 === 0 ? R_outer : R_inner;
			const angle = startAngle + i * step;

			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);
			starPoints.push({ x, y });
		}

		// Gán tọa độ cho từng drone
		this.drones.forEach((drone, index) => {
			const point = starPoints[index % 10]; // Lặp lại điểm nếu drones > 10
			drone.x = point.x;
			drone.y = point.y;
		});
		let formationLifetime = this.formationLifetime;
		let startTime = Date.now();
		const updateFormation = () => {
			const currentTime = Date.now();
			const elapsedTime = currentTime - startTime;
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				this.reset(); // Dừng việc cập nhật đội hình nếu hết thời gian
				return;
			}
			requestAnimationFrame(updateFormation);
		}
	
		// Bắt đầu cập nhật đội hình
		requestAnimationFrame(updateFormation);
	}
	setStarFormationV2(centerX, centerY, R_outer, R_inner) {
		const numDrones = this.drones.length; // Số lượng drone
		const starPoints = []; // Lưu tọa độ các điểm của ngôi sao
		const totalAngles = Math.PI * 2; // 360 độ
		const step = totalAngles / (5 * 2); // Góc giữa các đỉnh (10 điểm)
		const startAngle = -Math.PI / 2; // Đỉnh trên cùng nằm ở trục y âm (góc -90 độ)
	
		// Tính toán tọa độ cho 10 điểm của ngôi sao (5 đỉnh ngoài và 5 đỉnh trong)
		for (let i = 0; i < 10; i++) {
			// Đỉnh ngoài (i chẵn) hoặc đỉnh trong (i lẻ)
			const radius = i % 2 === 0 ? R_outer : R_inner;
			const angle = startAngle + i * step;
	
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);
			starPoints.push({ x, y });
		}
	
		// Xác định số hàng và phân bổ drone vào các vị trí của ngôi sao
		const rows = Math.ceil(numDrones / 10); // Số hàng, mỗi hàng có tối đa 10 drone
		let droneIndex = 0;
	
		// Duyệt qua các hàng và phân bổ drone
		for (let row = 0; row < rows; row++) {
			const yOffset = (row / rows) * (R_outer + R_inner); // Tính độ cao của mỗi hàng
	
			// Duyệt qua các điểm của ngôi sao để phân bổ drone
			for (let i = 0; i < 10; i++) {
				if (droneIndex < numDrones) {
					const point = starPoints[i];
	
					// Cập nhật tọa độ drone
					const drone = this.drones[droneIndex];
					drone.x = point.x;
					drone.y = point.y + yOffset; // Dịch chuyển theo trục Y theo hàng
					droneIndex++;
				}
			}
		}
	}

	setRectangleFormation(startX, startY, width, height) {
		const nums = this.drones.length; // Số lượng drone có sẵn

		// Tính số hàng và số cột tối ưu
		const numCols = Math.ceil(Math.sqrt(nums * (width / height))); // Số cột
		const numRows = Math.ceil(nums / numCols); // Số hàng

		const colSpacing = width / (numCols - 1); // Khoảng cách giữa các cột
		const rowSpacing = height / (numRows - 1); // Khoảng cách giữa các hàng

		let droneIndex = 0;

		for (let row = 0; row < numRows; row++) {
			for (let col = 0; col < numCols; col++) {
				if (droneIndex < nums) {
					const x = startX + col * colSpacing;
					const y = startY + row * rowSpacing;
					this.drones[droneIndex].x = x;
					this.drones[droneIndex].y = y;
					droneIndex++;
				} else {
					break; // Nếu hết drone thì dừng lại
				}
			}
		}
		let formationLifetime = this.formationLifetime;
		let startTime = Date.now();
		const updateFormation = () => {
			const currentTime = Date.now();
			const elapsedTime = currentTime - startTime;
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				this.reset(); // Dừng việc cập nhật đội hình nếu hết thời gian
				return;
			}
			requestAnimationFrame(updateFormation);
		}
	
		// Bắt đầu cập nhật đội hình
		requestAnimationFrame(updateFormation);
	}
	
	setHeartFormation(centerX=100, centerY=100, size=100) {
		const nums = this.drones.length; // Số lượng drone
		const heartPoints = []; // Danh sách tọa độ của hình trái tim
		console.log('hello')
		// Công thức parametric cho hình trái tim
		// x = 16 * sin³(t), y = 13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t)
		// Scale theo `size` và di chuyển về `centerX, centerY`
		for (let i = 0; i < nums; i++) {
			const t = (Math.PI * 2 * i) / nums; // Góc chia đều từ 0 -> 2π
			const x = centerX + size * 16 * Math.pow(Math.sin(t), 3);
			const y =
				centerY -
				size *
					(13 * Math.cos(t) -
						5 * Math.cos(2 * t) -
						2 * Math.cos(3 * t) -
						Math.cos(4 * t));
			heartPoints.push({ x, y });
		}

		// Gán tọa độ từ heartPoints cho drones
		this.drones.forEach((drone, index) => {
			const point = heartPoints[index];
			drone.x = point.x;
			drone.y = point.y;
		});
		let formationLifetime = this.formationLifetime;
		let startTime = Date.now();
		const updateFormation = () => {
			const currentTime = Date.now();
			const elapsedTime = currentTime - startTime;
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				this.reset(); // Dừng việc cập nhật đội hình nếu hết thời gian
				return;
			}
			requestAnimationFrame(updateFormation);
		}
	
		// Bắt đầu cập nhật đội hình
		requestAnimationFrame(updateFormation);
	}
	/**
	 * Vẽ ký tự số
	 * @param {*} digit - số 2
	 * @param {*} startX 
	 * @param {*} startY 
	 * @param {*} spacing 
	 */
	drawDigit(digit, startX, startY, spacing) {
		const matrix = digits[digit]; // Lấy ma trận của số
		let droneIndex = 0;
		for (let row = 0; row < matrix.length; row++) {
			for (let col = 0; col < matrix[row].length; col++) {
				if (matrix[row][col] === '1') {
					// Đặt drone tại vị trí tương ứng
					this.drones[droneIndex].x = startX + col * spacing;
					this.drones[droneIndex].y = startY + row * spacing;
					droneIndex++;
					
				}
			}
		}
		let formationLifetime = this.formationLifetime;
		let startTime = Date.now();
		const updateFormation = () => {
			const currentTime = Date.now();
			const elapsedTime = currentTime - startTime;
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			if (elapsedTime >= formationLifetime) {
				this.reset(); // Dừng việc cập nhật đội hình nếu hết thời gian
				return;
			}
			requestAnimationFrame(updateFormation);
		}
	
		// Bắt đầu cập nhật đội hình
		requestAnimationFrame(updateFormation);
		
	}
	/**
	 * vẽ kí tư chữ
	 * @param {*} letter - chữ 'a'
	 * @param {*} startX 
	 * @param {*} startY 
	 * @param {*} spacing 
	 */
	drawLetter(letter, startX, startY, spacing) {
		letter = letter.toUpperCase()
		const matrix = letters[letter]; // Lấy ma trận của ký tự
		let droneIndex = 0;
		for (let row = 0; row < matrix.length; row++) {
			for (let col = 0; col < matrix[row].length; col++) {
				if (matrix[row][col] === '1') {
					// Đặt drone tại vị trí tương ứng
					this.drones[droneIndex].x = startX + col * spacing;
					this.drones[droneIndex].y = startY + row * spacing;
					droneIndex++;
				}
			}
		}
		
	}
	//Đang lỗi
	drawText(text, startX, startY, spacing, letterSpacing) {
		for (let i = 0; i < text.length; i++) { // Sửa "lenght" thành "length"
			const char = text[i].toUpperCase(); // Đảm bảo chữ cái viết hoa
			if (letters[char]) { // Kiểm tra ký tự có tồn tại trong `letters`
				const xOffset = i * (letters[char][0].length * spacing + letterSpacing);
				this.drawLetter(char, startX + xOffset, startY, spacing);
			} else {
				console.warn(`Character "${char}" is not defined in letters.`);
			}
		}
	}
	
	
	

	
	
}


let maxW = window.innerWidth - 2;
let maxH = window.innerHeight;

// Khởi tạo các drone
// create drone
const drones = [];
//colors
let colors =[COLOR.Gold,COLOR.Red,COLOR.Blue,COLOR.Gold,
	COLOR.Red,COLOR.Blue,COLOR.Gold,
	COLOR.Red,COLOR.Blue,COLOR.Gold,COLOR.Gold
	
	
]


// function seqDrone(){
// 	// Tạo đội hình
// 	const formation = new Formation();
// 	drones.forEach(drone => formation.addDrone(drone));
// 	formation.setCircleFormation(300, 300, 100);


// 	// Tạo điều phối viên
// 	const showController = new ShowController();
// 	drones.forEach(drone => showController.addDrone(drone));
// 	showController.addFormation(formation);


// 	// Chạy màn trình diễn
// 	showController.startShow();
// 	setInterval(() => {
// 		showController.updateAll(0.016, 1, 0);
// 	}, 16);

// 	console.log(showController.activeFormations
// 	)


// 	console.log(drones);
// }








// Fullscreen helpers, using Fscreen for prefixes.
function fullscreenEnabled() {
	return fscreen.fullscreenEnabled;
}

// Note that fullscreen state is synced to store, and the store should be the source
// of truth for whether the app is in fullscreen mode or not.
function isFullscreen() {
	return !!fscreen.fullscreenElement;
}

// Attempt to toggle fullscreen mode.
function toggleFullscreen() {
	if (fullscreenEnabled()) {
		if (isFullscreen()) {
			fscreen.exitFullscreen();
		} else {
			fscreen.requestFullscreen(document.documentElement);
		}
	}
}

// Sync fullscreen changes with store. An event listener is necessary because the user can
// toggle fullscreen mode directly through the browser, and we want to react to that.
fscreen.addEventListener('fullscreenchange', () => {
	store.setState({ fullscreen: isFullscreen() });
});
// Simple state container; the source of truth.
const store = {
	_listeners: new Set(),
	_dispatch(prevState) {
		this._listeners.forEach(listener => listener(this.state, prevState))
	},

	state: {
		// will be unpaused in init()
		paused: true,
		soundEnabled: false,
		menuOpen: false,
		openHelpTopic: null,
		fullscreen: isFullscreen(),
		// Note that config values used for <select>s must be strings, unless manually converting values to strings
		// at render time, and parsing on change.
		config: {
			quality: String(IS_HIGH_END_DEVICE ? QUALITY_HIGH : QUALITY_NORMAL), // will be mirrored to a global variable named `quality` in `configDidUpdate`, for perf.
			shell: 'Random',
			size: IS_DESKTOP
				? '3' // Desktop default
				: IS_HEADER
					? '1.2' // Profile header default (doesn't need to be an int)
					: '2', // Mobile default
			autoLaunch: true,
			finale: false,
			skyLighting: SKY_LIGHT_NORMAL + '',
			hideControls: IS_HEADER,
			longExposure: false,
			scaleFactor: getDefaultScaleFactor()
		}
	},

	setState(nextState) {
		const prevState = this.state;
		this.state = Object.assign({}, this.state, nextState);
		this._dispatch(prevState);
		this.persist();
	},

	subscribe(listener) {
		this._listeners.add(listener);
		return () => this._listeners.remove(listener);
	},

	// Load / persist select state to localStorage
	// Mutates state because `store.load()` should only be called once immediately after store is created, before any subscriptions.
	load() {
		const serializedData = localStorage.getItem('cm_fireworks_data');
		if (serializedData) {
			const {
				schemaVersion,
				data
			} = JSON.parse(serializedData);

			const config = this.state.config;
			switch (schemaVersion) {
				case '1.1':
					config.quality = data.quality;
					config.size = data.size;
					config.skyLighting = data.skyLighting;
					break;
				case '1.2':
					config.quality = data.quality;
					config.size = data.size;
					config.skyLighting = data.skyLighting;
					config.scaleFactor = data.scaleFactor;
					break;
				default:
					throw new Error('version switch should be exhaustive');
			}
			console.log(`Loaded config (schema version ${schemaVersion})`);
		}
		// Deprecated data format. Checked with care (it's not namespaced).
		else if (localStorage.getItem('schemaVersion') === '1') {
			let size;
			// Attempt to parse data, ignoring if there is an error.
			try {
				const sizeRaw = localStorage.getItem('configSize');
				size = typeof sizeRaw === 'string' && JSON.parse(sizeRaw);
			}
			catch (e) {
				console.log('Recovered from error parsing saved config:');
				console.error(e);
				return;
			}
			// Only restore validated values
			const sizeInt = parseInt(size, 10);
			if (sizeInt >= 0 && sizeInt <= 4) {
				this.state.config.size = String(sizeInt);
			}
		}
	},

	persist() {
		const config = this.state.config;
		localStorage.setItem('cm_fireworks_data', JSON.stringify({
			schemaVersion: '1.2',
			data: {
				quality: config.quality,
				size: config.size,
				skyLighting: config.skyLighting,
				scaleFactor: config.scaleFactor
			}
		}));
	}
};


if (!IS_HEADER) {
	store.load();
}

// Actions
// ---------

function togglePause(toggle) {
	const paused = store.state.paused;
	let newValue;
	if (typeof toggle === 'boolean') {
		newValue = toggle;
	} else {
		newValue = !paused;
	}

	if (paused !== newValue) {
		store.setState({ paused: newValue });
	}
}

function toggleSound(toggle) {
	if (typeof toggle === 'boolean') {
		store.setState({ soundEnabled: toggle });
	} else {
		store.setState({ soundEnabled: !store.state.soundEnabled });
	}
}

function toggleMenu(toggle) {
	if (typeof toggle === 'boolean') {
		store.setState({ menuOpen: toggle });
	} else {
		store.setState({ menuOpen: !store.state.menuOpen });
	}
}

function updateConfig(nextConfig) {
	nextConfig = nextConfig || getConfigFromDOM();
	store.setState({
		config: Object.assign({}, store.state.config, nextConfig)
	});

	configDidUpdate();
}

// Map config to various properties & apply side effects
function configDidUpdate() {
	const config = store.state.config;

	quality = qualitySelector();
	isLowQuality = quality === QUALITY_LOW;
	isNormalQuality = quality === QUALITY_NORMAL;
	isHighQuality = quality === QUALITY_HIGH;

	if (skyLightingSelector() === SKY_LIGHT_NONE) {
		appNodes.canvasContainer.style.backgroundColor = '#000';
	}

	Spark.drawWidth = quality === QUALITY_HIGH ? 0.75 : 1;
}

// Selectors
// -----------

const isRunning = (state = store.state) => !state.paused && !state.menuOpen;
// Whether user has enabled sound.
const soundEnabledSelector = (state = store.state) => state.soundEnabled;
// Whether any sounds are allowed, taking into account multiple factors.
const canPlaySoundSelector = (state = store.state) => isRunning(state) && soundEnabledSelector(state);
// Convert quality to number.
const qualitySelector = () => +store.state.config.quality;
const shellNameSelector = () => store.state.config.shell;
// Convert shell size to number.
const shellSizeSelector = () => +store.state.config.size;
const finaleSelector = () => store.state.config.finale;
const skyLightingSelector = () => +store.state.config.skyLighting;
const scaleFactorSelector = () => store.state.config.scaleFactor;



// Help Content
const helpContent = {
	shellType: {
		header: 'Shell Type',
		body: 'The type of firework that will be launched. Select "Random" for a nice assortment!'
	},
	shellSize: {
		header: 'Shell Size',
		body: 'The size of the fireworks. Modeled after real firework shell sizes, larger shells have bigger bursts with more stars, and sometimes more complex effects. However, larger shells also require more processing power and may cause lag.'
	},
	quality: {
		header: 'Quality',
		body: 'Overall graphics quality. If the animation is not running smoothly, try lowering the quality. High quality greatly increases the amount of sparks rendered and may cause lag.'
	},
	skyLighting: {
		header: 'Sky Lighting',
		body: 'Illuminates the background as fireworks explode. If the background looks too bright on your screen, try setting it to "Dim" or "None".'
	},
	scaleFactor: {
		header: 'Scale',
		body: 'Allows scaling the size of all fireworks, essentially moving you closer or farther away. For larger shell sizes, it can be convenient to decrease the scale a bit, especially on phones or tablets.'
	},
	autoLaunch: {
		header: 'Auto Fire',
		body: 'Launches sequences of fireworks automatically. Sit back and enjoy the show, or disable to have full control.'
	},
	finaleMode: {
		header: 'Finale Mode',
		body: 'Launches intense bursts of fireworks. May cause lag. Requires "Auto Fire" to be enabled.'
	},
	hideControls: {
		header: 'Hide Controls',
		body: 'Hides the translucent controls along the top of the screen. Useful for screenshots, or just a more seamless experience. While hidden, you can still tap the top-right corner to re-open this menu.'
	},
	fullscreen: {
		header: 'Fullscreen',
		body: 'Toggles fullscreen mode.'
	},
	longExposure: {
		header: 'Open Shutter',
		body: 'Experimental effect that preserves long streaks of light, similar to leaving a camera shutter open.'
	}
};

const nodeKeyToHelpKey = {
	shellTypeLabel: 'shellType',
	shellSizeLabel: 'shellSize',
	qualityLabel: 'quality',
	skyLightingLabel: 'skyLighting',
	scaleFactorLabel: 'scaleFactor',
	autoLaunchLabel: 'autoLaunch',
	finaleModeLabel: 'finaleMode',
	hideControlsLabel: 'hideControls',
	fullscreenLabel: 'fullscreen',
	longExposureLabel: 'longExposure'
};


// Render app UI / keep in sync with state
const appNodes = {
	stageContainer: '.stage-container',
	canvasContainer: '.canvas-container',
	controls: '.controls',
	menu: '.menu',
	menuInnerWrap: '.menu__inner-wrap',
	pauseBtn: '.pause-btn',
	pauseBtnSVG: '.pause-btn use',
	soundBtn: '.sound-btn',
	soundBtnSVG: '.sound-btn use',
	shellType: '.shell-type',
	shellTypeLabel: '.shell-type-label',
	shellSize: '.shell-size',
	shellSizeLabel: '.shell-size-label',
	quality: '.quality-ui',
	qualityLabel: '.quality-ui-label',
	skyLighting: '.sky-lighting',
	skyLightingLabel: '.sky-lighting-label',
	scaleFactor: '.scaleFactor',
	scaleFactorLabel: '.scaleFactor-label',
	autoLaunch: '.auto-launch',
	autoLaunchLabel: '.auto-launch-label',
	finaleModeFormOption: '.form-option--finale-mode',
	finaleMode: '.finale-mode',
	finaleModeLabel: '.finale-mode-label',
	hideControls: '.hide-controls',
	hideControlsLabel: '.hide-controls-label',
	fullscreenFormOption: '.form-option--fullscreen',
	fullscreen: '.fullscreen',
	fullscreenLabel: '.fullscreen-label',
	longExposure: '.long-exposure',
	longExposureLabel: '.long-exposure-label',

	// Help UI
	helpModal: '.help-modal',
	helpModalOverlay: '.help-modal__overlay',
	helpModalHeader: '.help-modal__header',
	helpModalBody: '.help-modal__body',
	helpModalCloseBtn: '.help-modal__close-btn'
};

// Convert appNodes selectors to dom nodes
Object.keys(appNodes).forEach(key => {
	appNodes[key] = document.querySelector(appNodes[key]);
});

// Remove fullscreen control if not supported.
if (!fullscreenEnabled()) {
	appNodes.fullscreenFormOption.classList.add('remove');
}

// First render is called in init()
function renderApp(state) {
	const pauseBtnIcon = `#icon-${state.paused ? 'play' : 'pause'}`;
	const soundBtnIcon = `#icon-sound-${soundEnabledSelector() ? 'on' : 'off'}`;
	appNodes.pauseBtnSVG.setAttribute('href', pauseBtnIcon);
	appNodes.pauseBtnSVG.setAttribute('xlink:href', pauseBtnIcon);
	appNodes.soundBtnSVG.setAttribute('href', soundBtnIcon);
	appNodes.soundBtnSVG.setAttribute('xlink:href', soundBtnIcon);
	appNodes.controls.classList.toggle('hide', state.menuOpen || state.config.hideControls);
	appNodes.canvasContainer.classList.toggle('blur', state.menuOpen);
	appNodes.menu.classList.toggle('hide', !state.menuOpen);
	appNodes.finaleModeFormOption.style.opacity = state.config.autoLaunch ? 1 : 0.32;

	appNodes.quality.value = state.config.quality;
	appNodes.shellType.value = state.config.shell;
	appNodes.shellSize.value = state.config.size;
	appNodes.autoLaunch.checked = state.config.autoLaunch;
	appNodes.finaleMode.checked = state.config.finale;
	appNodes.skyLighting.value = state.config.skyLighting;
	appNodes.hideControls.checked = state.config.hideControls;
	appNodes.fullscreen.checked = state.fullscreen;
	appNodes.longExposure.checked = state.config.longExposure;
	appNodes.scaleFactor.value = state.config.scaleFactor.toFixed(2);

	appNodes.menuInnerWrap.style.opacity = state.openHelpTopic ? 0.12 : 1;
	appNodes.helpModal.classList.toggle('active', !!state.openHelpTopic);
	if (state.openHelpTopic) {
		const { header, body } = helpContent[state.openHelpTopic];
		appNodes.helpModalHeader.textContent = header;
		appNodes.helpModalBody.textContent = body;
	}
}

store.subscribe(renderApp);

// Perform side effects on state changes
function handleStateChange(state, prevState) {
	const canPlaySound = canPlaySoundSelector(state);
	const canPlaySoundPrev = canPlaySoundSelector(prevState);

	if (canPlaySound !== canPlaySoundPrev) {
		if (canPlaySound) {
			soundManager.resumeAll();
		} else {
			soundManager.pauseAll();
		}
	}
}

store.subscribe(handleStateChange);


function getConfigFromDOM() {
	return {
		quality: appNodes.quality.value,
		shell: appNodes.shellType.value,
		size: appNodes.shellSize.value,
		autoLaunch: appNodes.autoLaunch.checked,
		finale: appNodes.finaleMode.checked,
		skyLighting: appNodes.skyLighting.value,
		longExposure: appNodes.longExposure.checked,
		hideControls: appNodes.hideControls.checked,
		// Store value as number.
		scaleFactor: parseFloat(appNodes.scaleFactor.value)
	};
};

const updateConfigNoEvent = () => updateConfig();
appNodes.quality.addEventListener('input', updateConfigNoEvent);
appNodes.shellType.addEventListener('input', updateConfigNoEvent);
appNodes.shellSize.addEventListener('input', updateConfigNoEvent);
appNodes.autoLaunch.addEventListener('click', () => setTimeout(updateConfig, 0));
appNodes.finaleMode.addEventListener('click', () => setTimeout(updateConfig, 0));
appNodes.skyLighting.addEventListener('input', updateConfigNoEvent);
appNodes.longExposure.addEventListener('click', () => setTimeout(updateConfig, 0));
appNodes.hideControls.addEventListener('click', () => setTimeout(updateConfig, 0));
appNodes.fullscreen.addEventListener('click', () => setTimeout(toggleFullscreen, 0));
// Changing scaleFactor requires triggering resize handling code as well.
appNodes.scaleFactor.addEventListener('input', () => {
	updateConfig();
	handleResize();
});

Object.keys(nodeKeyToHelpKey).forEach(nodeKey => {
	const helpKey = nodeKeyToHelpKey[nodeKey];
	appNodes[nodeKey].addEventListener('click', () => {
		store.setState({ openHelpTopic: helpKey });
	});
});

appNodes.helpModalCloseBtn.addEventListener('click', () => {
	store.setState({ openHelpTopic: null });
});

appNodes.helpModalOverlay.addEventListener('click', () => {
	store.setState({ openHelpTopic: null });
});



// Constant derivations
const COLOR_NAMES = Object.keys(COLOR);
const COLOR_CODES = COLOR_NAMES.map(colorName => COLOR[colorName]);
// Invisible stars need an indentifier, even through they won't be rendered - physics still apply.
const COLOR_CODES_W_INVIS = [...COLOR_CODES, INVISIBLE];
// Map of color codes to their index in the array. Useful for quickly determining if a color has already been updated in a loop.
const COLOR_CODE_INDEXES = COLOR_CODES_W_INVIS.reduce((obj, code, i) => {
	obj[code] = i;
	return obj;
}, {});
// Tuples is a map keys by color codes (hex) with values of { r, g, b } tuples (still just objects).
const COLOR_TUPLES = {};
COLOR_CODES.forEach(hex => {
	COLOR_TUPLES[hex] = {
		r: parseInt(hex.substr(1, 2), 16),
		g: parseInt(hex.substr(3, 2), 16),
		b: parseInt(hex.substr(5, 2), 16),
	};
});

// Get a random color.
function randomColorSimple() {
	return COLOR_CODES[Math.random() * COLOR_CODES.length | 0];
}
function getRandomColor() {
	return COLOR_CODES[Math.random() * COLOR_CODES.length | 0];
}

// Get a random color, with some customization options available.
let lastColor;
function randomColor(options) {
	const notSame = options && options.notSame;
	const notColor = options && options.notColor;
	const limitWhite = options && options.limitWhite;
	let color = randomColorSimple();

	// limit the amount of white chosen randomly
	if (limitWhite && color === COLOR.White && Math.random() < 0.6) {
		color = randomColorSimple();
	}

	if (notSame) {
		while (color === lastColor) {
			color = randomColorSimple();
		}
	}
	else if (notColor) {
		while (color === notColor) {
			color = randomColorSimple();
		}
	}

	lastColor = color;
	return color;
}

function whiteOrGold() {
	return Math.random() < 0.5 ? COLOR.Gold : COLOR.White;
}


// Shell helpers
function makePistilColor(shellColor) {
	return (shellColor === COLOR.White || shellColor === COLOR.Gold) ? randomColor({ notColor: shellColor }) : whiteOrGold();
}
// Unique shell types
const crysanthemumShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 0.72;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil,
		pistilColor,
		streamers,
		flower:false
		,smiley:false //tạo mặt cười
		,hearth:false //hiệu ứng trái tim
		,star:false
		
		
		
	};
};
const flowerShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 1;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil:true,
		pistilColor,
		
		flower:true
	};
};
const catShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 1;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil:false,
		pistilColor,
	
		cat:true
	};
};
const snowShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 1;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil,
		pistilColor,
		streamers,
		snow:true
	};
};
const fishShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 1;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil,
		pistilColor,
		streamers,
		fish:true
	};
};
const smileyShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 1;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		
		streamers,
		smiley:true
	};
};

const waveShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 1;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		
		
		strobe:true,
		wave:true
	};
};
const hearthShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 1;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil:true,
		pistilColor,
		streamers:false,
		hearth:true
	};
};
const birdShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 0.72;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil,
		pistilColor,
		strobe:true,
		streamers:false,
		bird:true
	};
};
const butterflyShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 0.72;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil,
		pistilColor,
		streamers:false,
		butterfly:true
	};
};
const lotusShell = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 0.72;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8; getRandomShellSize()
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil,
		pistilColor,
		streamers:false,
		lotus:true
	};
};
//type Shells

const crysanthemumShellV2 = (size = 1) => {
	const glitter = Math.random() < 0.25;
	const singleColor = Math.random() < 0.72;
	const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
	const pistil = singleColor && Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(color);
	const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
	const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
	let starDensity = glitter ? 1.1 : 1.25;
	if (isLowQuality) starDensity *= 0.8;
	if (isHighQuality) starDensity = 1.2;
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 900 + size * 200,
		starDensity,
		color,
		secondColor,
		glitter: glitter ? 'light' : '',
		glitterColor: whiteOrGold(),
		pistil,
		pistilColor,
		streamers
	};
};
const ghostShell = (size = 1) => {
	// Extend crysanthemum shell
	const shell = crysanthemumShell(size);
	// Ghost effect can be fast, so extend star life
	shell.starLife *= 1.5;
	// Ensure we always have a single color other than white
	let ghostColor = randomColor({ notColor: COLOR.White });
	// Always use streamers, and sometimes a pistil
	shell.streamers = true;
	const pistil = Math.random() < 0.42;
	const pistilColor = pistil && makePistilColor(ghostColor);
	// Ghost effect - transition from invisible to chosen color
	shell.color = INVISIBLE;
	shell.secondColor = ghostColor;
	// We don't want glitter to be spewed by invisible stars, and we don't currently
	// have a way to transition glitter state. So we'll disable it.
	shell.glitter = '';
	return shell;
};


const strobeShell = (size = 1) => {
	const color = randomColor({ limitWhite: true });
	return {
		shellSize: size,
		spreadSize: 280 + size * 92,
		starLife: 1100 + size * 200,
		starLifeVariation: 0.40,
		starDensity: 1.1,
		color,
		glitter: 'light',
		glitterColor: COLOR.White,
		strobe: true,
		strobeColor: Math.random() < 0.5 ? COLOR.White : null,
		pistil: Math.random() < 0.5,
		pistilColor: makePistilColor(color),
	};
};


const palmShell = (size = 1) => {
	const color = randomColor();
	const thick = Math.random() < 0.5;
	return {
		shellSize: size,
		color,
		spreadSize: 250 + size * 75,
		starDensity: thick ? 0.15 : 0.4,
		starLife: 1800 + size * 200,
		glitter: thick ? 'thick' : 'heavy',
	};
};

const ringShell = (size = 1) => {
	const color = randomColor();
	const pistil = Math.random() < 0.85;
	return {
		shellSize: size,
		ring: true,
		color,
		spreadSize: 300 + size * 100,
		starLife: 1100 + size * 200,
		starCount: 2.2 * PI_2 * (size + 1),
		pistil,
		pistilColor: makePistilColor(color),
		glitter: !pistil ? 'light' : '',
		glitterColor: color === COLOR.Gold ? COLOR.Gold : COLOR.White,
		streamers: Math.random() < 0.3,
		snow:false,
		fish:false,
		lotus:false,
		hearth:false,
		wave:false,
		flower:false,
		bird:false,
		cat:false,
		butterfly:false,
				
		

	};
	// return Object.assign({}, defaultShell, config);
};

const crossetteShell = (size = 1) => {
	const color = randomColor({ limitWhite: true });
	return {
		shellSize: size,
		spreadSize: 300 + size * 100,
		starLife: 750 + size * 160,
		starLifeVariation: 0.4,
		starDensity: 0.85,
		color,
		crossette: true,
		pistil: Math.random() < 0.5,
		pistilColor: makePistilColor(color)
	};
};

const floralShell = (size = 1) => ({
	shellSize: size,
	spreadSize: 300 + size * 120,
	starDensity: 0.12,
	starLife: 500 + size * 50,
	starLifeVariation: 0.5,
	color: Math.random() < 0.65 ? 'random' : (Math.random() < 0.15 ? randomColor() : [randomColor(), randomColor({ notSame: true })]),
	floral: true
});

const fallingLeavesShell = (size = 1) => ({
	shellSize: size,
	color: INVISIBLE,
	spreadSize: 300 + size * 120,
	starDensity: 0.12,
	starLife: 500 + size * 50,
	starLifeVariation: 0.5,
	glitter: 'medium',
	glitterColor: COLOR.Gold,
	fallingLeaves: true,
});

const willowShell = (size = 1) => ({
	shellSize: size,
	spreadSize: 300 + size * 100,
	starDensity: 0.6,
	starLife: 3000 + size * 300,
	glitter: 'willow',
	glitterColor: COLOR.Gold,
	color: INVISIBLE
});

const crackleShell = (size = 1) => {
	// favor gold
	const color = Math.random() < 0.75 ? COLOR.Gold : randomColor();
	return {
		shellSize: size,
		spreadSize: 380 + size * 75,
		starDensity: isLowQuality ? 0.65 : 1,
		starLife: 600 + size * 100,
		starLifeVariation: 0.32,
		glitter: 'light',
		glitterColor: COLOR.Gold,
		color,
		crackle: true,
		pistil: Math.random() < 0.65,
		pistilColor: makePistilColor(color)
	};
};

const horsetailShell = (size = 1) => {
	const color = randomColor();
	return {
		shellSize: size,
		horsetail: true,
		color,
		spreadSize: 250 + size * 38,
		starDensity: 0.9,
		starLife: 2500 + size * 300,
		glitter: 'medium',
		glitterColor: Math.random() < 0.5 ? whiteOrGold() : color,
		// Add strobe effect to white horsetails, to make them more interesting
		strobe: color === COLOR.White
	};
};

// // vietnam shell
// const vietnamShell=(size=1){

// }
function randomShellName() {
	return Math.random() < 0.5 ? 'Crysanthemum' : shellNames[(Math.random() * (shellNames.length - 1) + 1) | 0];
}

function randomShell(size) {
	// Special selection for codepen header.
	if (IS_HEADER) return randomFastShell()(size);
	// Normal operation
	return shellTypes[randomShellName()](size);
}

function shellFromConfig(size) {
	return shellTypes[shellNameSelector()](size);
}

// Get a random shell, not including processing intensive varients
// Note this is only random when "Random" shell is selected in config.
// Also, this does not create the shell, only returns the factory function.
const fastShellBlacklist = ['Falling Leaves', 'Floral', 'Willow'];
function randomFastShell() {
	const isRandom = shellNameSelector() === 'Random';
	let shellName = isRandom ? randomShellName() : shellNameSelector();
	if (isRandom) {
		while (fastShellBlacklist.includes(shellName)) {
			shellName = randomShellName();
		}
	}
	return shellTypes[shellName];
}
function getRandomShell(){
	const isRandom = shellNameSelector() === 'Random';
	let shellName = isRandom ? randomShellName() : shellNameSelector();
	if (isRandom) {
		while (fastShellBlacklist.includes(shellName)) {
			shellName = randomShellName();
		}
	}
	
	let shell = new Shell({...shellTypes[shellName](1)})
	return shell;
}


const shellTypes = {
	'Random': randomShell,
	'Crackle': crackleShell,
	'Crossette': crossetteShell,
	'Crysanthemum': crysanthemumShell,
	'Flower':flowerShell,
	'Hearth':hearthShell,
	'Wave':waveShell,
	'Smiley':smileyShell,
	'Cat':catShell,
	'Fish':fishShell,
	'Snow':snowShell,
	'Bird':birdShell,
	'Lotus':lotusShell,
	'Butterfly':butterflyShell,
	'Falling Leaves': fallingLeavesShell,
	'Floral': floralShell,
	'Ghost': ghostShell,
	'Horse Tail': horsetailShell,
	'Palm': palmShell,
	'Ring': ringShell,
	'Strobe': strobeShell,
	'Willow': willowShell,

};


const shellNames = Object.keys(shellTypes);
function init() {
	// Remove loading state
	document.querySelector('.loading-init').remove();
	appNodes.stageContainer.classList.remove('remove');

	// Populate dropdowns
	function setOptionsForSelect(node, options) {
		node.innerHTML = options.reduce((acc, opt) => acc += `<option value="${opt.value}">${opt.label}</option>`, '');
	}

	// shell type
	let options = '';
	shellNames.forEach(opt => options += `<option value="${opt}">${opt}</option>`);
	appNodes.shellType.innerHTML = options;
	// shell size
	options = '';
	['3"', '4"', '6"', '8"', '12"', '16"'].forEach((opt, i) => options += `<option value="${i}">${opt}</option>`);
	appNodes.shellSize.innerHTML = options;

	setOptionsForSelect(appNodes.quality, [
		{ label: 'Low', value: QUALITY_LOW },
		{ label: 'Normal', value: QUALITY_NORMAL },
		{ label: 'High', value: QUALITY_HIGH }
	]);

	setOptionsForSelect(appNodes.skyLighting, [
		{ label: 'None', value: SKY_LIGHT_NONE },
		{ label: 'Dim', value: SKY_LIGHT_DIM },
		{ label: 'Normal', value: SKY_LIGHT_NORMAL }
	]);

	// 0.9 is mobile default
	setOptionsForSelect(
		appNodes.scaleFactor,
		[0.5, 0.62, 0.75, 0.9, 1.0, 1.5, 2.0]
			.map(value => ({ value: value.toFixed(2), label: `${value * 100}%` }))
	);

	// Begin simulation
	togglePause(false);

	// initial render
	renderApp(store.state);

	// Apply initial config
	configDidUpdate();
}


function fitShellPositionInBoundsH(position) {
	const edge = 0.36;
	return (1 - edge * 2) * position + edge;
}

function fitShellPositionInBoundsV(position) {
	return position * 0.75;
}

function getRandomShellPositionH() {
	return fitShellPositionInBoundsH(Math.random());
}

function getRandomShellPositionV() {
	return fitShellPositionInBoundsV(Math.random());
}

function generateShellSizes(baseSize, x, height) {
	const maxVariance = Math.min(2.5, baseSize);
	const variance = Math.random() * maxVariance;
	const size = baseSize - variance;
	const centerOffset = Math.random() * (1 - height * 0.65) * 0.5;
	const newX = Math.random() < 0.5 ? 0.5 - centerOffset : 0.5 + centerOffset;

	return {
		size,
		x: fitShellPositionInBoundsH(newX),
		height: fitShellPositionInBoundsV(height)
	};
}
function getRandomShellSize() {
	const baseSize = shellSizeSelector();;
	const maxVariance = Math.min(2.5, baseSize);
	const variance = Math.random() * maxVariance;
	const size = baseSize - variance;
	const height = maxVariance === 0 ? Math.random() : 1 - (variance / maxVariance);
	const centerOffset = Math.random() * (1 - height * 0.65) * 0.5;
	const x = Math.random() < 0.5 ? 0.5 - centerOffset : 0.5 + centerOffset;
	return {
		size,
		x: fitShellPositionInBoundsH(x),
		height: fitShellPositionInBoundsV(height)
	};
}


// Launches a shell from a user pointer event, based on state.config
function launchShellFromConfig(event) {
	const shell = new Shell(shellFromConfig(shellSizeSelector()));
	const w = mainStage.width;
	const h = mainStage.height;

	shell.launch(
		event ? event.x / w : getRandomShellPositionH(),
		event ? 1 - event.y / h : getRandomShellPositionV()
	);
}


// Sequences
// -----------

function seqDrone(){
	// --- Cập nhật Drone ---
	
}

function seqRandomShell() {
	const size = getRandomShellSize();
	const shell = new Shell(shellFromConfig(size.size));
	shell.launch(size.x, size.height);

	let extraDelay = shell.starLife;
	if (shell.fallingLeaves) {
		extraDelay = 4600;
	}

	return 900 + Math.random() * 600 + extraDelay;
}

function seqRandomFastShell() {
	const shellType = randomFastShell();
	const size = getRandomShellSize();
	const shell = new Shell(shellType(size.size));
	shell.launch(size.x, size.height);

	let extraDelay = shell.starLife;

	return 900 + Math.random() * 600 + extraDelay;
}

function seqTwoRandom() {
	const size1 = getRandomShellSize();
	const size2 = getRandomShellSize();
	const shell1 = new Shell(shellFromConfig(size1.size));
	const shell2 = new Shell(shellFromConfig(size2.size));
	const leftOffset = Math.random() * 0.2 - 0.1;
	const rightOffset = Math.random() * 0.2 - 0.1;
	shell1.launch(0.3 + leftOffset, size1.height);
	setTimeout(() => {
		shell2.launch(0.7 + rightOffset, size2.height);
	}, 100);

	let extraDelay = Math.max(shell1.starLife, shell2.starLife);
	if (shell1.fallingLeaves || shell2.fallingLeaves) {
		extraDelay = 4600;
	}

	return 900 + Math.random() * 600 + extraDelay;
}

function seqTriple() {
	const shellType = randomFastShell();
	const baseSize = shellSizeSelector();
	const smallSize = Math.max(0, baseSize - 1.25);

	const offset = Math.random() * 0.08 - 0.04;
	const shell1 = new Shell(shellType(baseSize));
	shell1.launch(0.5 + offset, 0.7);

	const leftDelay = 1000 + Math.random() * 400;
	const rightDelay = 1000 + Math.random() * 400;

	setTimeout(() => {
		const offset = Math.random() * 0.08 - 0.04;
		const shell2 = new Shell(shellType(smallSize));
		shell2.launch(0.2 + offset, 0.1);
	}, leftDelay);

	setTimeout(() => {
		const offset = Math.random() * 0.08 - 0.04;
		const shell3 = new Shell(shellType(smallSize));
		shell3.launch(0.8 + offset, 0.1);
	}, rightDelay);

	return 4000;
}

function seqPyramid() {
	const barrageCountHalf = IS_DESKTOP ? 7 : 4;
	const largeSize = shellSizeSelector();
	const smallSize = Math.max(0, largeSize - 3);
	const randomMainShell = Math.random() < 0.78 ? crysanthemumShell : ringShell;
	const randomSpecialShell = randomShell;

	function launchShell(x, useSpecial) {
		const isRandom = shellNameSelector() === 'Random';
		let shellType = isRandom
			? useSpecial ? randomSpecialShell : randomMainShell
			: shellTypes[shellNameSelector()];
		const shell = new Shell(shellType(useSpecial ? largeSize : smallSize));
		const height = x <= 0.5 ? x / 0.5 : (1 - x) / 0.5;
		shell.launch(x, useSpecial ? 0.75 : height * 0.42);
	}

	let count = 0;
	let delay = 0;
	while (count <= barrageCountHalf) {
		if (count === barrageCountHalf) {
			setTimeout(() => {
				launchShell(0.5, true);
			}, delay);
		} else {
			const offset = count / barrageCountHalf * 0.5;
			const delayOffset = Math.random() * 30 + 30;
			setTimeout(() => {
				launchShell(offset, false);
			}, delay);
			setTimeout(() => {
				launchShell(1 - offset, false);
			}, delay + delayOffset);
		}

		count++;
		delay += 200;
	}

	return 3400 + barrageCountHalf * 250;
}
function vietNamV3Seq() {

	seqDoubleFive()


}
/**
 * Bắn liên tục 2 bên
 */
async function seqDoubleFive() {

	let i = 0;
	let time = 0;
	let height = -0.3
	seqSparkLeft(0, 0.45, -0.3)
	seqSparkRight(0.55, 1, -0.7)
	setTimeout(() => {
		seqSparkRight(0, 0.45, -0.7)
		seqSparkLeft(0.55, 1, -0.3)
	}, 550);
	while (i < 5) {
		let shell = new Shell({
			...shellTypes['Crysanthemum'](2),
			strobe: true,
			pistil: true,
			pistilColor: COLOR.Red,
			color: COLOR.Gold,
		})
		shell.launch(0.1, height)
		shell.launch(0.9, height)
		time += 100
		height += 0.2
		await new Promise(resolve => setTimeout(resolve, time));
		i++

	}
}
function vietNamV1Seq() {
	// playMusic("https://shellsound.s3.ap-southeast-2.amazonaws.com/y2mate.com+-+ABBA++Happy+New+Year.mp3");
	const size = getRandomShellSize();
	const bigsize = size * 2;
	const smallsize = size * 0.5;
	VietNamFlag();

	setTimeout(() => {
		let shell = new Shell(shellTypes['Ghost'](5))
		let shell2 = new Shell(shellTypes['Willow'](5))
		shell.launch(0.4, 0.3)
		shell2.launch(0.4, 0.3)
		setTimeout(() => {
			let shell = new Shell(shellTypes['Ghost'](5))
			let shell2 = new Shell(shellTypes['Willow'](5))
			shell.launch(0.6, 0.4)
			shell2.launch(0.6, 0.4)
		}, 2000);
		setTimeout(() => {
			seqPalmAndStrobeShell(0.5, 0.5)
		}, 4000);
		setTimeout(() => {
			seqSparkWithShellLeft(150)
		}, 7000);
		setTimeout(() => {
			seqSparkWithShellRight(150)
		}, 9000);
		setTimeout(() => {
			seqPalmAndStrobeShell(0.5, 0.5)
		}, 10000);
	}, 16000 - 3000);
	setTimeout(() => {
		seqSparkHalfMid(0.2, 0.6, 5, 50)
		seqSparkHalfRight(0.8, 0.6, 5, 50)
		seqSparkHalfLeft(0.2, 0.8, 10, 50)
		seqSparkHalfRight(0.8, 0.8, 10, 50)
		setTimeout(() => {
			seqSparkHalfMid(0.2, 0.9, 10, 50)
			seqSparkHalfMid(0.8, 1.5, 10, 50)
		}, 3000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crysanthemum'](5))
			shell.launch(0.2, 0.4)
			shell.launch(0.8, 0.5)
		}, 2000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crysanthemum'](5))
			shell.launch(0.3, 0.4)
			shell.launch(0.7, 0.5)
		}, 5000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Strobe'](5))
			shell.launch(0.35, 0.4)
			shell = new Shell(shellTypes['Strobe'](5))
			shell.launch(0.65, 0.5)
		}, 7000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Strobe'](5))
			let shell2 = new Shell(shellTypes['Crackle'](5))
			let shell3 = new Shell(shellTypes['Willow'](5))
			shell.launch(0.5, 0.5)
			shell2.launch(0.5, 0.5)
			shell3.starLifeVariation *= 5
			shell3.launch(0.5, 0.5)
		}, 9600);
	}, 28000);
	setTimeout(() => {
		seqTripleV2(0.3, 0.5)
		seqTripleV2(0.7, 0.6)
		setTimeout(() => {
			seqSparkHalfMid(0.5, 0.8, 10, 50)
		}, 2000);
		setTimeout(() => {
			seqShellHeightLeftToRight(4, 50)
		}, 2500);
		setTimeout(() => {
			seqShellHeightRightToLeft(4, 50)
		}, 3000);
		setTimeout(() => {
			seqRandomSparkPosition(0.35, 0.65)
			setTimeout(() => {
				seqRandomSparkPosition(0.36, 0.641)
			}, 1000);
			setTimeout(() => {
				seqRandomShellPosition(0.33, 0.67)
			}, 2000);
		}, 3000)
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crackle'](7))
			shell.launch(0.5, 0.5)
		}, 4000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crackle'](7))
			shell.launch(0.6, 0.5)
		}, 7000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crackle'](7))
			shell.launch(0.4, 0.5)
		}, 8000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crackle'](7))
			shell.launch(0.3, 0.5)
		}, 9000);
		setTimeout(() => {
			seqQuarRandomShell(0.36, 0.3)
		}, 10000);
		setTimeout(() => {
			seqQuarRandomShell(0.74, 0.7)
		}, 12000);
	}, 42000);
	setTimeout(() => {
		setTimeout(() => {
			seqSparkHalfMid(0.5, 0.8, 10, 50)
		}, 2000 - 1000);
		setTimeout(() => {
			seqShellHeightLeftToRight(4, 50)
		}, 2500 - 1000);
		setTimeout(() => {
			seqShellHeightRightToLeft(4, 50)
		}, 3000 - 1000);
		setTimeout(() => {
			seqRandomSparkPosition(0.35, 0.65)
			setTimeout(() => {
				seqRandomSparkPosition(0.36, 0.641)
			}, 1000);
			setTimeout(() => {
				seqRandomShellPosition(0.33, 0.67)
			}, 2000);
		}, 2000)
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crackle'](7))
			shell.launch(0.5, 0.5)
		}, 3000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crackle'](7))
			shell.launch(0.6, 0.5)
		}, 6000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crackle'](7))
			shell.launch(0.4, 0.5)
		}, 7000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crackle'](7))
			shell.launch(0.68, 0.5)
		}, 8000);
		setTimeout(() => {
			seqQuarRandomShell(0.31, 0.3)
		}, 10000);
		setTimeout(() => {
			seqQuarRandomShell(0.85, 0.7)
		}, 12000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Floral'](5))
			shell.launch(0.3, 0.3)
			setTimeout(() => {
				let shell = new Shell(shellTypes['Ring'](5))
				let shell1 = new Shell(shellTypes['Ring'](5))
				let shell2 = new Shell(shellTypes['Ring'](5))
				shell.launch(0.4, 0.4)
				shell1.launch(0.6, 0.5)
				shell2.launch(0.55, 0.6)
				let shell3 = new Shell(shellTypes['Falling Leaves'](7))
				shell3.launch(0.5, 0.5)
			}, 1500);
		}, 14000);
	}, 60000);
	setTimeout(() => {
		seqDoubleCrysanthemum(0.3, 0.6)
		setTimeout(() => {
			seqDoubleCrysanthemum(0.7, 0.5)
		}, 900);
		setTimeout(() => {
			seqDoubleCrysanthemum(0.35, 0.6)
			setTimeout(() => {
				seqDoubleCrysanthemum(0.65, 0.5)
			}, 700);
		}, 3000);
		setTimeout(() => {
			seqSparkFull(0.1, 1)
		}, 8000);
		setTimeout(() => {
			let shell = new Shell(shellTypes['Crysanthemum'](6))
			shell.launch(0.6, 0.5)
			setTimeout(() => {
				let shell2 = new Shell(shellTypes['Crysanthemum'](6))
				shell2.launch(0.3, 0.6)
			}, 300);
		}, 6000);
		setTimeout(() => {
			seqShellMidHeight(50);
			setTimeout(() => {
				let shell1 = new Shell(shellTypes['Floral'](6))
				let shell2 = new Shell(shellTypes['Floral'](6))
				shell1.launch(0.3, 0.6)
				shell2.launch(0.7, 0.5)
			}, 3000);
			setTimeout(() => {
				seqShellFastFull(0.5, -0.5)
				setTimeout(() => {
					seqShellFastFull(0.4, -0.1)
					seqShellFastFull(0.6, -0.1)
				}, 350);
				setTimeout(() => {
					seqShellFastFull(0.7, -0.2)
					seqShellFastFull(0.3, -0.2)
				}, 550);
			}, 7000);
		}, 12000);
		setTimeout(() => {
			let shell = new Shell({
				...shellTypes['Crysanthemum'](6.6),
				strobe: true,
				strobeColor: COLOR.White,
			})
			shell.launch(0.5, 0.5)
		}, 22000);
	}, 60000 + 22000);
	setTimeout(() => {
		seqShellHeightLeftToRight(8, 15)
		setTimeout(() => {
			seqShellHeightRightToLeft(8, 15)
		}, 7000);
		setTimeout(() => {
			seqShellMidShort(50)
		}, 12000);
	}, 60000 + 44000);
	setTimeout(() => {
		seqShellMidHeight(50)
		setTimeout(() => {
			seqShellLeft(10)
			setTimeout(() => {
				seqShellRight(10)
			}, 350);
		}, 3000);
		setTimeout(() => {
			seqSparkLeft(0.1, 0.4, -0.3)
			seqSparkRight(0.6, 0.9, -0.7)
			setTimeout(() => {
				seqSparkRight(0.1, 0.4, -0.3)
				seqSparkLeft(0.6, 0.9, -0.7)
			}, 450);
			setTimeout(() => {
				seqSparkHalfMid(0.25, 0.9, 10, 50)
				seqSparkHalfMid(0.75, 0.9, 10, 50)
			}, 750);
			setTimeout(() => {
				seqSparkHalfMid(0.25, 0.9, 10, 50)
				seqSparkHalfMid(0.75, 0.9, 10, 50)
			}, 1000);
			setTimeout(() => {
				seqSparkFull(0.1, 1);
			}, 3000);
			setTimeout(() => {
				seqShellShortLeftToRight(5, 0.1, 50)
				seqShellHeightRightToLeft(5, 50)
			}, 4000);
			setTimeout(() => {
				seqShellShortRightToLeft(7, 0.6, 50)
				seqShellHeightLeftToRight(9, 50)
			}, 5000);
			setTimeout(() => {
				seqShellMidHeight(50)
				seqShellMidShort(50)
			}, 7000);
			setTimeout(() => {
				seqSparkLeft(0.1, 0.45, -0.7)
				setTimeout(() => {
					seqSparkRight(0.55, 1, -0.3)
				}, 350);
			}, 9000);
			setTimeout(() => {
				seqSparkLeft(0.1, 0.4, -0.4)
				setTimeout(() => {
					seqSparkRight(0.6, 1, -0.7)
				}, 450);
				setTimeout(() => {
					seqSparkRight(0.1, 0.4, -0.4)
					setTimeout(() => {
						seqSparkLeft(0.6, 1, -0.3)
					}, 450)
				}, 700);
				setTimeout(() => {
					let shell = new Shell({
						...shellTypes['Crysanthemum'](5),
						strobe: true
					})
					let shell2 = new Shell(shellTypes['Floral'](5))
					shell.launch(0.5, 0.5)
					shell2.launch(0.5, 0.5)
				}, 800);
			}, 10000);
		}, 8000);
	}, 60000 + 55000);
	setTimeout(() => {//happynew late
		seqSparkLeft(0.1, 0.4, -0.3)
		seqSparkRight(0.6, 0.9, -0.7)
		setTimeout(() => {
			seqSparkRight(0.1, 0.4, -0.3)
			seqSparkLeft(0.6, 0.9, -0.7)
		}, 450);
		setTimeout(() => {
			seqSparkHalfMid(0.25, 0.9, 10, 50)
			seqSparkHalfMid(0.75, 0.9, 10, 50)
		}, 750);
		setTimeout(() => {
			seqSparkHalfMid(0.25, 0.9, 10, 50)
			seqSparkHalfMid(0.75, 0.9, 10, 50)
		}, 1000);
		setTimeout(() => {
			seqSparkFull(0.1, 1);
		}, 3000);
		setTimeout(() => {
			seqShellShortLeftToRight(5, 0.1, 50)
			seqShellHeightRightToLeft(5, 50)
		}, 4000);
		setTimeout(() => {
			seqShellShortRightToLeft(7, 0.6, 50)
			seqShellHeightLeftToRight(7, 50)
		}, 5000);
		setTimeout(() => {
			seqShellMidHeight(50)
			seqShellMidShort(50)
		}, 7000);
		setTimeout(() => {
			seqSparkLeft(0.1, 0.45, -0.7)
			setTimeout(() => {
				seqSparkRight(0.55, 1, -0.3)
			}, 350);
		}, 9000);
		setTimeout(() => {
			seqSparkLeft(0.1, 0.4, -0.4)
			setTimeout(() => {
				seqSparkRight(0.6, 1, -0.7)
			}, 450);
			setTimeout(() => {
				seqSparkRight(0.1, 0.4, -0.4)
				setTimeout(() => {
					seqSparkLeft(0.6, 1, -0.3)
				}, 450)
			}, 700);
			setTimeout(() => {
				let shell = new Shell({
					...shellTypes['Crysanthemum'](5),
					strobe: true
				})
				let shell2 = new Shell(shellTypes['Floral'](5))
				shell.launch(0.5, 0.5)
				shell2.launch(0.5, 0.5)
			}, 800);
		}, 10000);
	}, 120000 + 13000);
	setTimeout(() => {
		seqDoubleFive()
		setTimeout(() => {
			let shell = new Shell({
				...shellTypes['Crysanthemum'](6),
				floral: true,
				pistil: true,
				pistilColor: COLOR.Gold,
				color: COLOR.Red,
			})
			let shell2 = new Shell(shellTypes['Willow'](6))
			shell.launch(0.5, 0.4)
			shell2.launch(0.5, 0.4)
		}, 450);
		setTimeout(() => {
			let shell = new Shell({
				...shellTypes['Crysanthemum'](3),
				color: COLOR.Gold,
				pistil: true,
				pistilColor: COLOR.Red,
				strobe: true,
				strobeColor: COLOR.White,
				willow: true
			})
			let time = shell.starLifeVariation;

			shell.starLifeVariation = time * 3
			shell.burst(1080, 900)//cao5 1
			soundManager.playSound('burst');
			setTimeout(() => {
				shell.burst(1080, 737)//cao4	2
				shell.starLifeVariation = time * 2.5
				soundManager.playSound('burst');

			}, 150);
			setTimeout(() => {
				shell.starLifeVariation = time * 2.2
				shell.burst(1080, 443)//cao 2 3	
				soundManager.playSound('burst');
			}, 300);
			setTimeout(() => {
				shell.starLifeVariation = time * 1.9
				shell.burst(810, 296)//cao nhât 4
				shell.burst(1350, 296)//cao nhât 4
				soundManager.playSound('burst');
				soundManager.playSound('burst');
			}, 450);
			setTimeout(() => {
				shell.starLifeVariation = time * 1.6
				shell.burst(630, 443)//cao 2 5
				soundManager.playSound('burst');
				soundManager.playSound('burst');

				shell.burst(1530, 443)//cao 2 5
			}, 600);
			setTimeout(() => {
				shell.starLifeVariation = time * 1.3
				shell.burst(810, 590)//cao3 6
				soundManager.playSound('burst');
				shell.burst(1350, 590)//cao3 6
				soundManager.playSound('burst');
			}, 750);
			setTimeout(() => {
				shell.starLifeVariation = time * 1
				shell.burst(890, 737)//cao4 7
				soundManager.playSound('burst');
				soundManager.playSound('burst');
				shell.burst(1270, 730)//cao4 7
			}, 900);
		}, 850);
	}, 120000 + 31000);


}

function seqSmallBarrage() {
	seqSmallBarrage.lastCalled = Date.now();
	const barrageCount = IS_DESKTOP ? 11 : 5;
	const specialIndex = IS_DESKTOP ? 3 : 1;
	const shellSize = Math.max(0, shellSizeSelector() - 2);
	const randomMainShell = Math.random() < 0.78 ? crysanthemumShell : ringShell;
	const randomSpecialShell = randomFastShell();

	// (cos(x*5π+0.5π)+1)/2 is a custom wave bounded by 0 and 1 used to set varying launch heights
	function launchShell(x, useSpecial) {
		const isRandom = shellNameSelector() === 'Random';
		let shellType = isRandom
			? useSpecial ? randomSpecialShell : randomMainShell
			: shellTypes[shellNameSelector()];
		const shell = new Shell(shellType(shellSize));
		const height = (Math.cos(x * 5 * Math.PI + PI_HALF) + 1) / 2;
		shell.launch(x, height * 0.75);
	}

	let count = 0;
	let delay = 0;
	while (count < barrageCount) {
		if (count === 0) {
			launchShell(0.5, false)
			count += 1;
		}
		else {
			const offset = (count + 1) / barrageCount / 2;
			const delayOffset = Math.random() * 30 + 30;
			const useSpecial = count === specialIndex;
			setTimeout(() => {
				launchShell(0.5 + offset, useSpecial);
			}, delay);
			setTimeout(() => {
				launchShell(0.5 - offset, useSpecial);
			}, delay + delayOffset);
			count += 2;
		}
		delay += 200;
	}

	return 3400 + barrageCount * 120;
}
seqSmallBarrage.cooldown = 15000;
seqSmallBarrage.lastCalled = Date.now();

function testMusic(){
	
	let radius = 400
	
	let shell = new Shell(shellTypes['Crysanthemum'](2));
	shell.launch(0.5,0.5)
}
async function seqSparkDownAll(left, right, hight,coutShell=10,time=100,check=true){
	let timen =time
	//Fix lại left right
	// left = left*maxW
	// right = right*maxW
	// hight *= maxH

	let i = 0
	let shell = new Shell(shellTypes['Crysanthemum'](6));
	shell.color=COLOR.Gold
	while(i<coutShell){
		await new Promise(resolve => setTimeout(resolve, timen));
		let x = left + Math.random() * (right - left);
		let height =0.4+ Math.random()*0.2;
		let random = Math.random()*50
		for(let j= 0;j<2;j++){
			shell.launchV3(x,hight+random,height,undefined,check);
		}
		
		timen+=10;
	
		i++;

	}
}
async function seqSparkDown(left, right, hight,cout=20,time=1000,check=true){
	let i = 0;
	
	while(i<cout){
		await new Promise(resolve => setTimeout(resolve, time));
		left-=20
		right+=20
		seqSparkDownAll(left, right,hight, 10, 10,check)
		i++
	}
}
function seqTripleRingShell(x, height, size=6) {
	const shell1 = new Shell(shellTypes['Ring'](size));
	// Launch the first shel  
	shell1.launch(x, height);
	const shell2 = new Shell(shellTypes['Ring'](size * 0.80));
	shell2.launch(x, height);
	const shell3 = new Shell(shellTypes['Ring'](size * 1.12));
	shell3.launch(x, height);
}
async function seqShellHeightLeftToRight(count, time) {
	const size = getRandomShellSize();
	let sizeh = 0.1;
	let timen = time * 0.05;
	let position = 0.1;
	let heightl = -0.3;
	let life = 0.2;
	while (position < 1 - (18 - count) * 0.05) {

		const shell = new Shell({
			...shellTypes['Crysanthemum'](size.size - 0.24 + sizeh)
		});
		shell.starLifeVariation = life;
		await new Promise(resolve => setTimeout(resolve, timen));
		shell.launch(position, heightl);
		sizeh += 0.15;
		position += 0.05;
		heightl += 0.04;
		timen += 15;
		life += 0.085;
	}
	setTimeout(() => {
		const lastShell = new Shell(shellTypes['Ring'](size.size * 1.7));
		lastShell.launch(0.5, 0.5)
	}, timen - 15);
}
/**
 * thấp dần từ trái sang phải và bắt đầu bên trái
 * @param {*} count 
 * @param {*} position 
 * @param {*} time 
 */
async function seqShellShortLeftToRight(count, position, time) {
	const size = getRandomShellSize();
	let sizeh = 0.1;
	let timen = time * 0.05;
	let heightl = 0.1;
	let spreadposition = 0.45 / count;
	let life = 0.2;
	while (position > 0) {
		const shell = new Shell({
			...shellTypes['Crysanthemum'](size.size - 0.24 + sizeh)
		});
		shell.starLifeVariation = life;
		await new Promise(resolve => setTimeout(resolve, timen));
		shell.launch(position, heightl);
		sizeh += 0.15;
		position -= spreadposition;
		heightl += 0.05;
		timen += 15;
		life += 0.085;
	}
	setTimeout(() => {
		const lastShell = new Shell(shellTypes['Ring'](size.size * 1.7));
		lastShell.launch(0.5, 0.5)
	}, timen - 15);
}
async function seqShellHeightRightToLeft(count, time) {
	const size = getRandomShellSize();
	let sizeh = 0.1;
	let timen = time * 0.05;
	let position = 0.9;
	let heightl = -0.3;
	let life = 0.2;
	while (position - (18 - count) * 0.05 > 0) {

		const shell = new Shell({
			...shellTypes['Crysanthemum'](size.size - 0.24 + sizeh)
		});
		shell.starLifeVariation = life;
		await new Promise(resolve => setTimeout(resolve, timen));
		shell.launch(position, heightl);
		sizeh += 0.15;
		position -= 0.05;
		heightl += 0.05;
		timen += 15;
		life += 0.085;
	}
	setTimeout(() => {
		const lastShell = new Shell(shellTypes['Ring'](size.size * 1.7));
		lastShell.launch(0.5, 0.5)
	}, timen - 15);
}
async function seqShellShortRightToLeft(count, position, time) {
	const size = getRandomShellSize();
	let sizeh = 0.1;
	let timen = time * 0.05;
	let heightl = 0.1;
	let spreadposition = (1 - position) / count;
	let life = 0.2;
	while (position <= 1) {

		const shell = new Shell({
			...shellTypes['Crysanthemum'](size.size - 0.24 + sizeh)
		});
		shell.starLifeVariation = life;
		await new Promise(resolve => setTimeout(resolve, timen));
		shell.launch(position, heightl);
		sizeh += 0.15;
		position += spreadposition;
		heightl += 0.05;
		timen += 15;
		life += 0.085;
	}
	setTimeout(() => {
		const lastShell = new Shell(shellTypes['Ring'](size.size * 1.7));
		lastShell.launch(0.5, 0.5)
	}, timen - 15);
}

function seqShellMidHeight(time,cout=5) {
	seqShellHeightRightToLeft(cout, 0.66, time)
	seqShellHeightLeftToRight(cout, 1 - 0.64, time)
	setTimeout(() => {
		const size = getRandomShellSize()
		seqTripleRingShell(0.5, 0.5, size.size * 1.7)
	}, time);
}
function seqShellMidShort(time,cout) {
	setTimeout(() => {
		const size = getRandomShellSize()
		size.size = 3;
		seqTripleRingShell(0.5, 0.5, size.size * 1.3)
	}, time);
	seqShellShortRightToLeft(cout, 0.66, time * 0.05)
	seqShellShortLeftToRight(cout, 1 - 0.64, time * 0.05)

}
function seqShellLeft(time) {
	seqShellHeightLeftToRight(6, time * 0.005)
	setTimeout(() => {
		const size = getRandomShellSize()
		seqTripleRingShell(0.5, 0.3, size.size * 1.9)
	}, time * 0.005);
}
function seqShellRight(time) {
	seqShellHeightRightToLeft(6, time * 0.005)
	setTimeout(() => {
		const size = getRandomShellSize()
		seqTripleRingShell(0.5, 0.3, size.size * 1.9)
	}, time * 0.00005);
}
async function seqSparkLeft(left, right, height, count_shell=15) {
	const shell = new Shell(shellTypes['Crysanthemum'](6))
	let spread = Math.abs(right - left) / count_shell;
	let time = 50;
	while (left <= right) {
		await new Promise(resolve => setTimeout(resolve, 50));
		shell.launchV2(left, height, 0.5);
		height += 0.05
		time += 5;
		left += spread;
	}
}
async function seqSpark(left, right,height=0,posistionX=0,countSpark =10,huong=1,time = 10){
	var i = 0;
	let hs = (right-left)/countSpark;
	let vt = (huong==1)?left:right;


	let shell = new Shell({...shellTypes['Floral'](3),color:getRandomColor(),streamers:true})
	if(huong==1){
		while(vt<=right){
			await new Promise(resolve => setTimeout(resolve, time));
			shell.launchV2(vt,height,posistionX);
			vt+=hs;
			time+=1;
			
		}
	}else{
		while(vt>=left){
			await new Promise(resolve => setTimeout(resolve, time));
			shell.launchV2(vt,height,posistionX);
			vt-=hs;
			time+=1;
		
		}
	}
		
}

async function seqSparkCount(left, right,count=2,height,posistionX=0,countSpark =15,wait=100, huong=1){
	let i = 0;
	while(i<count){
		await new Promise(resolve => setTimeout(resolve, wait));
		seqSpark(left,right,height,posistionX,countSpark, huong);
		i++;
	}
}
async function seqSparkShortToHeight(left, right,height=-0.5,posistionX=0) {
	let i = 0;
	
	while(i<5){
		await new Promise(resolve => setTimeout(resolve, 300));
		seqSpark(left,right,height, posistionX)
		height+=0.05;
		i++;
	}
}
/**
 * Này để bắn 2 bên vào giữa liên tục
 * @param {*} mid 
 */
function seqSpackMidAll(mid){
	seqSparkShortToHeight(0,mid-0.2,-0,5,5)
	seqSparkShortToHeight(mid+0.2,1,-0.5,-5)
}
function seqSpackMidShortToHeight(mid=0.5){
	seqSparkRight(0,mid-0.1,-0.3)
	seqSparkLeft(mid+0.1, 1, 0.3)
	
}

async function seqSparkRight(left, right, height, count_shell=15) {
	const shell = new Shell(shellTypes['Crysanthemum'](6))
	let spread = (right - left) /  count_shell;
	let time = 50;
	while (right >= left) {
		await new Promise(resolve => setTimeout(resolve, 50));
		shell.launchV2(right, height, -0.5);
		height += 0.05
		time += 5;
		right -= spread;
	}
}

async function seqSparkFull(left, right,count=2, wait = 900, count_shell = 20) {
	let i = 0
	let time = 0;
	while (i < count) {
		await new Promise(resolve => setTimeout(resolve, time));
		setTimeout(() => {
			seqSparkLeft(left, right, -0.3, count_shell)
		}, time);
		setTimeout(() => {
			seqSparkRight(left, right, -0.7, count_shell)
		}, time + wait);
		time += wait;
		i++;
	}
}

function seqFiveShell(position, height) {
	let vt = position - 0.1;
	let i = 0
	while (i < 5) {
		let size = getRandomShellSize();
		size.size = 3
		let shelltype = randomFastShell();
		let shell = new Shell(shelltype(size.size))
		shell.starLifeVariation *= 0.65
		let mt = (Math.random() < 0.5) ? -1 : 1
		let number = 0.1 + mt * Math.random() * 0.1
		shell.launch(vt, height + number);
		vt += 0.05;
		i++
	}
}
async function seqShellFastFull(position, height) {
	let time = 50;
	for (let i = 0; i < 4; i++) {
		await new Promise(resolve => setTimeout(resolve, time));
		seqFiveShell(position, height);
		time += 300
	}


}
function seqDoubleCrysanthemum(x, y) {
	const size = getRandomShellSize();
	const shell1 = new Shell({
		...shellTypes['Crysanthemum'](3),
		pistil: 1

	});
	const shell2 = new Shell({
		...shellTypes['Crysanthemum'](4),
		pistil: 1

	});
	shell2.starLifeVariation = 0.75;
	shell1.starLifeVariation = shell2.starLifeVariation + 0.11;
	if (shell1.color == shell2.color) {
		shell2.color = randomColorSimple();
	}
	// Launch the first shell

	shell1.launch(x, y);

	// Launch the second shell with a delay
	shell2.launch(x, y);


}
function seqDoubleShell(x,y,shell, {strobe, crackle,ghost, floral}={}){
	shell = shell??getRandomShell()
	shell.strobe = strobe?true:false;
	shell.crackle = crackle?true:false;
	shell.ghost = ghost?true:false
	shell.floral=floral?true:false
	shell.launch(x,y)
	shell.size*= 0.4
	setTimeout(() => {
		shell.launch(Math.abs(1-x),y)
	}, 300);
}
function seqTripleShell(x, y, shell, midShell, {strobe, crackle,ghost, floral}={}){
	midShell=midShell??getRandomShell()
	seqDoubleShell(x,y,shell, strobe, crackle,ghost, floral)
	setTimeout(() => {
		midShell.launch(0.5,y+0.3)
	}, 500);
	
}
function seqQuarShell(x,y,shell,shell2,{strobe, crackle,ghost, floral}={}){
	seqDoubleShell(x,y,shell, strobe, crackle,ghost, floral)
	setTimeout(() => {
		seqDoubleShell(x+0.2,y+0.3,shell2, strobe, crackle,ghost, floral)
	}, 500);
}
function seqTripleV2(x, y) {
	const size = getRandomShellSize();
	const shell1 = new Shell(shellTypes['Horse Tail'](size.size * 0.25));
	// Launch the first shell
	shell1.launch(x, y - 0.5);
	const shell2 = new Shell(shellTypes['Horse Tail'](size.size * 0.1));
	// Launch the second shell with a delay
	setTimeout(() => {

		shell2.launch(x, y - 0.1);
	}, 350);
	setTimeout(() => {
		const shell3 = new Shell({
			...shellTypes['Crysanthemum'](size.size),
			
		});
		const shell4 = new Shell(shellTypes['Crysanthemum'](size.size * 0.65));
		shell4.starLifeVariation = 0.75;
		shell3.starLifeVariation = shell4.starLifeVariation + 0.11;
		if (shell3.color == shell4.color) {
			shell4.color = randomColorSimple();
		}
		// Launch the first shell

		shell3.launch(x, y);

		// Launch the second shell with a delay
		setTimeout(() => {
			shell4.launch(x, y);
		}, 150);
	}, 650);



}
/**
 * bắn 2 pháo palm và strobe cùng 1 vị trí
 * @param {} x 
 * @param {*} y 
 */
function seqPalmAndStrobeShell(x, y) {

	const shell1 = new Shell(shellTypes['Palm'](4));
	// Launch the first shell

	shell1.launch(x, y);
		// Launch the second shell with a delay

	const shell2 = new Shell({...shellTypes['Strobe'](4), color:COLOR.White});
	shell2.color = shell1.color;
	shell2.launch(x, y);
}
function seqQuarRandomShell(x, height) {
	const size = getRandomShellSize();
	const shelltype = randomFastShell();
	const shell1 = new Shell(shelltype(size.size));
	shell1.launch(x, height);
	setTimeout(() => {
		const shell2 = new Shell(shelltype(size.size));
		shell2.launch(x, height);
	}, 150);
	setTimeout(() => {
		const shell3 = new Shell(shelltype(size.size));
		shell3.launch(x, height);
	}, 350);
	setTimeout(() => {
		const shell4 = new Shell({
			...shelltype(size.size),
			strobe: true
		});
		shell4.launch(x, height);
	}, 550);
	// Launch the first shell
}
/**
 * tạo các tia lửa theo vòng cung từ trái qua phải
 * @param {tâm} position 
 * @param {độ cao} height1 
 * @param {số lần} count 
 * @param {khoảng thời gian mỗi lần} time 
 */
async function seqSparkHalfLeft(position, height1, count, time=50) {
	let height = -height1 + 0.58 * position * 2;
	count = count;
	let positionLast = -Math.floor(count);
	const size = getRandomShellSize();
	const shell1 = new Shell(shellTypes['Ring'](size.size));
	let timen = time * 0.05;

	while (positionLast <= 0) {
		await new Promise(resolve => setTimeout(resolve, timen));
		shell1.launchV2(position, height, Math.floor(positionLast))
		positionLast += 1;
		height += 0.05;
		timen += 80 * 0.05;
	}
	height += 0.53 * position * 2
	while (positionLast < count + 1) {
		await new Promise(resolve => setTimeout(resolve, timen));
		shell1.launchV2(position, height, positionLast)
		positionLast += 1;
		height -= 0.05;
		timen += 80 * 0.05;
	}
}
function creatFiveShell(left, right,shell,color,hight=-0.3) {

	let spread = Math.abs(right - left) / 5;
	while (left <= right) {
		let number = 0.01 + Math.random() * 0.01
		shell=shell??getRandomShell()
		shell.color=color??getRandomColor();
		shell.launch(left + number, hight + number)
		left += spread;
	}
}
/**
 * Bắn liên tục cùng lúc 1 loại pháo 
 * @param {*} left 
 * @param {*} right 
 * @param {*} shell 
 * @param {*} size - kích cỡ nhỏ thôi 0.7->0.9
 * @param {*} count 
 * @param {*} time 
 */
async function seqShellAllInOne(left, right,shell,color, count=3,time=50,hight=-0.3) {
	let i = 0;

	while (i < count) {
		await new Promise(resolve => setTimeout(resolve, time));
		creatFiveShell(left, right,shell,color,hight)
	
		i++
	}
}
async function seqSparkHalfRight(position, height1, count, time) {
	let height = -height1 + 0.58 * position * 2;
	count = count;
	let positionLast = Math.floor(count);
	const size = getRandomShellSize();
	const shell1 = new Shell(shellTypes['Ring'](size.size));
	let timen = time * 0.05;

	while (positionLast > 0) {
		await new Promise(resolve => setTimeout(resolve, timen));
		shell1.launchV2(position, height, Math.floor(positionLast));
		positionLast -= 1;
		height += 0.05;
		timen += 80 * 0.05;
	}

	height -= 0.58 * position * 2;
	while (positionLast > -count - 1) {
		await new Promise(resolve => setTimeout(resolve, timen));
		shell1.launchV2(position, height, positionLast);
		positionLast -= 1;
		height -= 0.05;
		timen += 80 * 0.05;
	}
}
function seqSparkHalfMid(position, height, count, time) {
	seqSparkHalfLeft(position, height, count, time)
	seqSparkHalfRight(position, height, count, time)
}
function seqSparkHalfTrip(position, time) {
	time *= 0.05
	const shell = new Shell(shellTypes['Crysanthemum'](5))
	seqSparkHalfLeft(position, 1 + (position > 0.5 ? position : -position), 5, time)
	setTimeout(() => {
		seqSparkHalfRight(position, 0.5 + (position > 0.5 ? position : -position), 5, time)
		
	}, time + 550);
	setTimeout(() => {
		seqSparkHalfLeft(position, 1 + (position > 0.5 ? position : -position), 5, time)

	}, time + 550 * 2);
}
function doubleShell(x, y) {
	let shell = new Shell(shellTypes['Crysanthemum'](5));
	let shell2 = new Shell(shellTypes['Strobe'](5));
	shell.launch(x, y)
	shell2.launch(x, y)
	// size.size=5
	// let shell=randomFastShell()
	// let shell2=randomFastShell()
	// let shell1=randomFastShell()
	// let shell3=randomFastShell()
	// shell.size=shell1.size=size
	// size.size+=1;
	// shell2.size=shell3.size=size
	// shell.launch(x,y)
	// shell2.launch(x,y)
	// shell1.launch(x+number,y)
	// shell3.launch(x+number,y)
}
function seqSparkHalfTripTwo(time) {
	seqSparkHalfTrip(0.2, time)
	seqSparkHalfTrip(0.8, time)
}
async function seqSparkWithShellLeft(time) {
	const size = getRandomShellSize();
	let timen = time * 0.05;
	const shell = new Shell(shellTypes['Floral'](size.size))
	let positionSh = 0.1;
	let heightSh = -0.2;
	let goc = 0;
	while (positionSh < 0.5) {
		await new Promise(resolve => setTimeout(resolve, timen));
		const shell = new Shell(shellTypes['Ring'](size.size))
		shell.launchV2(positionSh, heightSh, goc)
		positionSh += 0.05;
		heightSh += 0.05;
		timen += 150 * 0.05
		goc += 0.3;
	}
	setTimeout(() => {
		shell.burst(900, 300);
		soundManager.playSound('burst');
	}, time + 400);
}
async function seqSparkWithShellRight(time) {
	const size = getRandomShellSize();
	let timen = time * 0.05;
	const shell = new Shell(shellTypes['Crackle'](size.size * 2))
	let positionSh = 0.9;
	let heightSh = -0.2;
	let goc = 0;
	while (positionSh > 0.5) {
		await new Promise(resolve => setTimeout(resolve, timen));
		const shell1 = new Shell(shellTypes['Ring'](size.size))
		shell1.launchV2(positionSh, heightSh, goc)
		positionSh -= 0.05;
		heightSh += 0.05;
		timen += 150 * 0.05
		goc -= 0.3;
	}
	setTimeout(() => {
		shell.burst(450, 300);
		soundManager.playSound('burst');
	}, time + 400);
}
function VietNamFlagOneShell(x, y, lifeStar) {
	const shell = new Shell({
		...shellTypes['Strobe'](2.5),
		strobeColor: COLOR.Red,
		pistilColor: COLOR.Red,
	})
	shell.color = COLOR.Red;
	shell.starLife *= lifeStar;
	shell.launch(x, y)
}
async function VietNamFlagFrame(left, right) {
	let count = (right - left) * 10;
	let spread = (right - left) / count;
	let position = left;
	let height = 0.7;
	while (position <= right) {
		VietNamFlagOneShell(position, height, 1.2);
		position += spread;
		console.log("ngang cao:")
		console.log(position)

	}
	while (height > -0.1) {
		VietNamFlagOneShell(right, height, 1.2);
		VietNamFlagOneShell(left, height, 1.2);
		height -= 0.2
	}
	position = left
	while (position <= right) {
		VietNamFlagOneShell(position, 0.4, 2.5);
		position += spread;
		console.log("ngang Thấp:")
		console.log(position)
	}

}
async function VietNamFlagShell(left, right, time, count) {
	let timen = time;
	let hehe = 0
	while (hehe < count) {
		await new Promise(resolve => setTimeout(resolve, timen));
		let random = 0.05 + Math.random() * 0.05;
		VietNamFlagFrame(left + random, right - random);
		hehe++;
		// timen += 900
	}
}
function seqRandomShellPosition(left, right) {
	const spread = (right - left) / 7;
	let x = left;

	while (x <= right) {
		let shell = new Shell(shellTypes['Crysanthemum'](4));
		let number = 0.2 + Math.random() * 0.1;
		shell.launch(x, 0.2 + number)
		x += spread;
		console.log(x)
	}
}
function seqRandomSparkPosition(left, right) {
	const spread = Math.abs(right - left) / 10;
	let x = left;
	let goc = -3
	while (x <= right) {
		let shell = new Shell(shellTypes['Crysanthemum'](4));
		let number = 0.2 + Math.random() * 0.1;
		shell.launchV2(x, -0.2 + number, goc)
		goc += 0.6,
		x += spread;
		console.log(x)
	}
}
async function seqRandomShellV2(left, right, time, count) {
	let timen = time;
	let hehe = 0
	while (hehe < count) {
		await new Promise(resolve => setTimeout(resolve, timen));
		let random = 0.1 + Math.random() * 0.1;
		seqRandomShellPosition(left + random, right - random);
		let shell = new Shell(shellTypes('Crysanthemum')(6))
		shell.launchV2(left + random, 0.8, -1)
		shell.launchV2(right - random, 0.8, 1)
		hehe++;
		timen += 30
	}
}
function VietNamFlagSmallStar(time) {
	time *= 0.05
	const shell = new Shell({
		...shellTypes['Strobe'](1),
		strobeColor: COLOR.Gold,
		pistil: false
	})
	shell.starLife *= 1.5
	let timeof = shell.starLife;
	shell.color = COLOR.Gold
	shell.launch(0.5, 0.6)
	setTimeout(() => {
		shell.starLife = timeof * 1.1
		shell.launch(0.35, 0.3)
		shell.launch(0.65, 0.3)
	}, time + 300);
	setTimeout(() => {
		shell.starLife = timeof * 1.3
		shell.launch(0.4, -0.4)
		shell.launch(0.6, -0.4)
	}, time + 900);
}
function VietNamFlagBigStar(time) {
	time *= 0.05
	const shell = new Shell({
		...shellTypes['Strobe'](1.5),
		strobeColor: COLOR.Gold,
		pistil: false
	})
	shell.starLife *= 1.5
	let timeof = shell.starLife;
	shell.color = COLOR.Gold
	shell.launch(0.5, 0.2)
	shell.launch(0.5, 0.2)
	setTimeout(() => {
		shell.starLife = timeof * 1.1
		shell.launch(0.43, 0)
		shell.launch(0.57, 0)
		shell.launch(0.43, 0)
		shell.launch(0.57, 0)
	}, time + 300);

	setTimeout(() => {
		shell.starLife = timeof * 1.3
		shell.launch(0.49, -0.2)
		shell.launch(0.51, -0.2)
		shell.launch(0.49, -0.2)
		shell.launch(0.51, -0.2)
	}, time + 900);
}
async function VietNamFlagStar(count) {
	let timen = 70;
	let hehe = 0
	while (hehe < count) {
		await new Promise(resolve => setTimeout(resolve, timen));
		let random = 0.05 + Math.random() * 0.05;
		VietNamFlagSmallStar(150);
		VietNamFlagBigStar(150);
		hehe++;
		timen += 900
	}
}
function VietNamFlag() {
	VietNamFlagShell(0.1, 0.9, 350, 5)
	setTimeout(() => {
		VietNamFlagStar(5)
	}, 750);
}
function seqShellVietNamFlag() {
	VietNamFlagShell(0.23, 0.77, 1250, 7)
	// setTimeout(() => {
	// 	VietNamFlagStar(5)
	// }, 750);
}
function testShell(x, y){
	let timen = 500;
	seqShellRandomForTime(10)
	;
	
}
async function seqShellRandomForTime(count=5,hight=0.4, shell,color){
	
	let i = 0;
	let time = 50;
	
	while(i<count){
		await new Promise(resolve => setTimeout(resolve, time));
		let vt = Math.random();
		shell = shell??getRandomShell()
		shell.color=color??getRandomColor()
		shell.launch(vt,hight*Math.random())
		i++
		
	}
}

function monodySeq(){

	playMusic("Music/monody_complete.mp3");
	setTimeout(()=>{
		seqPalmAndStrobeShell(0.5,0.5)
	}, 2000);
	setTimeout(()=>{
		seqPalmAndStrobeShell(0.5,0.5)
		setTimeout(() => {
			seqTripleV2(0.2,0.5)
		}, 2100);
		setTimeout(() => {
			seqTripleV2(0.8,0.5)
		}, 2300);
	}, 6000);
	setTimeout(()=>{
		seqTripleRingShell(0.5,0.5)	
	}, 9000);
	setTimeout(()=>{
		//trống
	}, 12000);
	setTimeout(()=>{
		seqSpackMidAll(0.5);
		setTimeout(() => {
			seqSparkLeft(0.5,1,-0.3);
			seqSparkRight(0,0.5,-0.7);
		}, 1000);
		setTimeout(() => {
			let shell =new Shell({...shellTypes['Crysanthemum'](3), pistil:true})
			shell.launch(0.3, 0.3);
			setTimeout(() => {
				let shell =new Shell({...shellTypes['Crysanthemum'](3), pistil:true})
				shell.launch(0.5, 0.4);
			}, 500);
			setTimeout(() => {
				let shell =new Shell({...shellTypes['Crysanthemum'](3), pistil:true})
				shell.launch(0.7, 0.6);
			}, 1000);
		}, 1700);	
		// let shell =new Shell({...shelltype['Crysanthemum'](3), pistil:true})
		setTimeout(()=>{	
			seqSpark(0,0.2,-0.3,undefined,20);	
			setTimeout(() => {
				seqSpark(0.4,0.6,-0.1,undefined,20);
			}, 500);
			setTimeout(() => {
				seqSpark(0.7,1,0,undefined,20);				
			}, 1000);
		},3000)
		setTimeout(() => {
			seqShellMidHeight(50);
		}, 3500);
	}, 17000);
	setTimeout(()=>{
		seqSparkHalfLeft(0.8,1,5,50);
		setTimeout(() => {
			seqSparkHalfLeft(0.5,1,5,50);
		}, 500);
		setTimeout(() => {
			seqSparkHalfLeft(0.2,1,5,50);
		}, 700);
		setTimeout(() => {
			seqSparkFull(0,1,3,300,30)
		}, 1300);
		setTimeout(() => {
			seqShellMidHeight(30)
			seqShellAllInOne(0.1,0.3,1)
			setTimeout(() => {
				seqShellAllInOne(0.7,0.9,1)
			}, 100);
			setTimeout(() => {
				seqShellAllInOne(0.45,0.55,2)
			}, 250);
		},1300);
	}, 22000);
	setTimeout(()=>{
		seqShellRandomForTime(10)
		seqSparkCount(0.1,0.3,4,0.2,0.5,20,150);
		let shell = new Shell({...shellTypes['Horse Tail'](2), strobe:true})
		shell.launch(0.1,0.2)
		setTimeout(() => {
			seqSparkCount(0.6,0.8,4,0.2,0.5,10,150);
			let shell = new Shell({...shellTypes['Horse Tail'](2), strobe:true})
			shell.launch(0.3,0.2)
		},300);
		setTimeout(() => {
			seqSparkCount(0.4,0.6,6,0.2,0.5,20,190);
			let shell = new Shell({...shellTypes['Horse Tail'](2), strobe:true})
			shell.launch(0.7,0.2)
		}, 600);
		setTimeout(() => {
			seqSparkCount(0,0.9,5,0.2,0.5,50,150);
			let shell = new Shell({...shellTypes['Horse Tail'](2), strobe:true})
			shell.launch(0.4,0.2)
			seqSparkCount(0,0.9,5,0.2,0.5,50,250);
			shell.launch(0.6, 0.2)
		}, 900);
		setTimeout(() => {
			seqSparkLeft(0.5,1,-0.3);
			seqSparkRight(0,0.5,-0.7);
		}, 1000);
		setTimeout(() => {
			let shell =new Shell({...shellTypes['Crysanthemum'](3), pistil:true})
			shell.launch(0.3, 0.3);
			setTimeout(() => {
				let shell =new Shell({...shellTypes['Crysanthemum'](3), pistil:true})
				shell.launch(0.5, 0.4);
			}, 500);
			setTimeout(() => {
				let shell =new Shell({...shellTypes['Crysanthemum'](3), pistil:true})
				shell.launch(0.7, 0.6);
			}, 1000);
		}, 1700);	
		// let shell =new Shell({...shelltype['Crysanthemum'](3), pistil:true})
		setTimeout(()=>{	
			seqSpark(0,0.2,-0.3,undefined,20);	
			setTimeout(() => {
				seqSpark(0.4,0.6,-0.1,undefined,20);
			}, 500);
			setTimeout(() => {
				seqSpark(0.7,1,0,undefined,20);				
			}, 1000);
		},3000)
		setTimeout(() => {
			seqShellMidHeight(50);
		}, 3500);
	}, 26000);
	setTimeout(()=>{
		seqTripleRingShell(0.5,0.5,5)
		seqSparkCount(0.2,1,7,-0.3,-5,30,350,3)
		seqRandomShellV2(0.25,0.5,250,6)
		setTimeout(() => {
			seqSparkCount(0.2,1,4,0.5,4,30,250,1)
			seqRandomShellV2(0.75,0.5,250,3)
		}, 300);
	}, 31000);
	//làm tiếp
	setTimeout(()=>{
		seqShellRandomForTime(5)
		seqSparkHalfLeft(0.2,0.6,10,10)
		seqSparkHalfRight(0.7,0.6,10,10)
		seqSparkHalfMid(0.5,0.6,5,50)
		setTimeout(() => {
			seqSparkFull(0,1,5,600,30)
		}, 200);
		setTimeout(() => {
			seqSparkFull(0,1,5,600,30)
			setTimeout(() => {
				let shell=new Shell({...shellTypes['Floral'](4), strobe:true, crackle:true});
				shell.launch(0.7,0.1);
				setTimeout(() => {
					shell.launch(0.5,0.3);
				}, 300);
				setTimeout(() => {
					shell.launch(0.3,0.5);
				}, 700);
			}, 200);

		}, 2500);
		setTimeout(() => {
			seqSparkHalfTrip(0.2,50)
			seqSparkHalfTrip(0.8,50)
		}, 3000);

		
	}, 36000);
	setTimeout(()=>{
		seqFiveShell(0.5,0.3);
		seqShellHeightLeftToRight(5,150);
		setTimeout(() => {
			seqShellHeightLeftToRight(6,150);
			seqShellHeightRightToLeft(6,150)
		}, 1500);
		setTimeout(() => {
			seqFiveShell(0.2, 0.1)
		setTimeout(() => {
			seqFiveShell(0.8, 0.3)
		}, 100);
		setTimeout(() => {
			seqFiveShell(0.5, 0.4)
		}, 300);
		}, 2500);
		setTimeout(() => {
			let shell = new Shell({...shellTypes['Floral'](3)})
			shell.launch(0.2,0.3);
		}, 3000);
		setTimeout(() => {
			let shell = new Shell({...shellTypes['Crackle'](3)})
			shell.launch(0.5,0.4);
		}, 3200);
		setTimeout(() => {
			let shell = new Shell({...shellTypes['Floral'](3)})
			shell.launch(0.8,0.3);
		}, 3500);
		
	}, 44000);
	setTimeout(()=>{
		seqPalmAndStrobeShell(0.5,0.5)

		setTimeout(() => {
			seqDoubleCrysanthemum(0.3,0.5)
		}, 300);
		setTimeout(() => {
			seqDoubleCrysanthemum(0.7,0.4)
		}, 1500);
		setTimeout(() => {
			seqDoubleCrysanthemum(0.35,0.5)
			seqDoubleCrysanthemum(0.75,0.5)
		}, 1900);
		setTimeout(() => {
			let shell = new Shell({...shellTypes['Crysanthemum'](6)
				,strobe:true, pistil:true,pistilColor:COLOR.Gold, color:COLOR.White
			})
			let shell2= new Shell({...shellTypes['Falling Leaves'](6), crackle:true});
			
			shell.launch(0.1,0.5)
			shell2.launch(0.9,0.5)	
			shell2.launch(0.1,0.5)
		}, 2100);
		setTimeout(() => {
			seqTripleRingShell(0.5,0.5,6)
		}, 2300);
	}, 53000);
}
const sequences = [
	seqRandomShell,//900+600*random+4600:0(fallingLeaves)
	seqTwoRandom,
	seqDoubleCrysanthemum,
	seqPyramid,
	seqSmallBarrage,
	seqTripleRingShell,//700
	seqTripleV2,//1250
	seqPalmAndStrobeShell,
	seqQuarRandomShell,
	vietNamV1Seq,

];

function playMusic(path) {
	// Lấy đối tượng audio
	const audio = new Audio(path); // Thay đổi 'ten_bai_nhac.mp3' bằng đường dẫn tới tệp nhạc của bạn
	// Phát nhạc
	audio.play();
}
let isFirstSeq = true;
const finaleCount = 32;
let currentFinaleCount = 0;
function startSequence() {
	if (isFirstSeq) {
		isFirstSeq = false;
		if (IS_HEADER) {
			return seqTwoRandom();
		}
		else {
			const shell = new Shell(crysanthemumShell(shellSizeSelector()));
			shell.launch(0.5, 0.5);
			return 2400;

		}
	}

	if (finaleSelector()) {
		seqRandomFastShell();
		if (currentFinaleCount < finaleCount) {
			currentFinaleCount++;
			return 170;
		}
		else {
			currentFinaleCount = 0;
			return 6000;
		}
	}

	const rand = Math.random();
	//chọn thể loại bắn
	if (rand < 0.08 && Date.now() - seqSmallBarrage.lastCalled > seqSmallBarrage.cooldown) {
		return seqSmallBarrage();//bắn theo hình càu vồng
	}

	if (rand < 0.1) {
		return seqPyramid();//bắn từ ngoài vào trong
	}

	if (rand < 0.6 && !IS_HEADER) {
		return seqRandomShell();//bắn 1 viên
	}
	else if (rand < 0.8) {
		return seqTwoRandom();//2 viên
	}
	else if (rand < 1) {
		return seqTriple();//3 viên
	}
}
function startSequence2() {
	if (isFirstSeq) {
		isFirstSeq = false;
		if (IS_HEADER) {
			return seqTwoRandom();
		}
		else {
			const shell = new Shell(shellTypes['Ghost'](shellSizeSelector()));
			shell.launch(0.5, 0.5);

			return 2400;
		}
	}

	if (finaleSelector()) {
		seqRandomFastShell();
		if (currentFinaleCount < finaleCount) {
			currentFinaleCount++;
			return 170;
		}
		else {
			currentFinaleCount = 0;
			return 6000;
		}
	}
	// chỗ bắn
	// vietNamV1Seq();
	//testShell(0.5, 0.5);
	// monodySeq();
	// seqDrone();
	// skyFallSeq();
	// testMusic();
	// creatFiveShell(0.3,0.5,'Cat')
	// setTimeout(() => {
	// 	// 
	// 	seqDroneFull()
	// 	setTimeout(() => {
	// 		seqDroneCountDownWithCircle()
	// 		seqDroneStrobe()
	// 	}, 20000);
	// 	setTimeout(() => {
	// 		seqDroneHappyNewYear()
	// 	}, 34000);
	 
	// // 
	// }, 4000);

}

let activePointerCount = 0;
let isUpdatingSpeed = false;

function handlePointerStart(event) {
	activePointerCount++;
	const btnSize = 50;

	if (event.y < btnSize) {
		if (event.x < btnSize) {
			togglePause();
			return;
		}
		if (event.x > mainStage.width / 2 - btnSize / 2 && event.x < mainStage.width / 2 + btnSize / 2) {
			toggleSound();
			return;
		}
		if (event.x > mainStage.width - btnSize) {
			toggleMenu();
			return;
		}
	}

	if (!isRunning()) return;

	if (updateSpeedFromEvent(event)) {
		isUpdatingSpeed = true;
	}
	else if (event.onCanvas) {
		launchShellFromConfig(event);
	}
}

function handlePointerEnd(event) {
	activePointerCount--;
	isUpdatingSpeed = false;
}

function handlePointerMove(event) {
	if (!isRunning()) return;

	if (isUpdatingSpeed) {
		updateSpeedFromEvent(event);
	}
}

function handleKeydown(event) {
	// P
	if (event.keyCode === 80) {
		togglePause();
	}
	// O
	else if (event.keyCode === 79) {
		toggleMenu();
	}
	// Esc
	else if (event.keyCode === 27) {
		toggleMenu(false);
	}
}

mainStage.addEventListener('pointerstart', handlePointerStart);
mainStage.addEventListener('pointerend', handlePointerEnd);
mainStage.addEventListener('pointermove', handlePointerMove);
window.addEventListener('keydown', handleKeydown);


// Account for window resize and custom scale changes.
function handleResize() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	// Try to adopt screen size, heeding maximum sizes specified
	const containerW = Math.min(w, MAX_WIDTH);
	// On small screens, use full device height
	const containerH = w <= 420 ? h : Math.min(h, MAX_HEIGHT);
	appNodes.stageContainer.style.width = containerW + 'px';
	appNodes.stageContainer.style.height = containerH + 'px';
	stages.forEach(stage => stage.resize(containerW, containerH));
	// Account for scale
	const scaleFactor = scaleFactorSelector();
	stageW = containerW / scaleFactor;
	stageH = containerH / scaleFactor;
}

// Compute initial dimensions
handleResize();

window.addEventListener('resize', handleResize);


// Dynamic globals
let currentFrame = 0;
let speedBarOpacity = 0;
let autoLaunchTime = 0;

function updateSpeedFromEvent(event) {
	if (isUpdatingSpeed || event.y >= mainStage.height - 44) {
		// On phones it's hard to hit the edge pixels in order to set speed at 0 or 1, so some padding is provided to make that easier.
		const edge = 16;
		const newSpeed = (event.x - edge) / (mainStage.width - edge * 2);
		simSpeed = Math.min(Math.max(newSpeed, 0), 1);
		// show speed bar after an update
		speedBarOpacity = 1;
		// If we updated the speed, return true
		return true;
	}
	// Return false if the speed wasn't updated
	return false;
}


// Extracted function to keep `update()` optimized
function updateGlobals(timeStep, lag) {
	currentFrame++;

	// Always try to fade out speed bar
	if (!isUpdatingSpeed) {
		speedBarOpacity -= lag / 30; // half a second
		if (speedBarOpacity < 0) {
			speedBarOpacity = 0;
		}
	}

	// auto launch shells
	if (store.state.config.autoLaunch) {
		autoLaunchTime -= timeStep;
		if (autoLaunchTime <= 0) {
			autoLaunchTime = startSequence2() * 1.25;
		}
	}
}


function update(frameTime, lag) {
	if (!isRunning()) return;
	
	const width = stageW;
	const height = stageH;
	const timeStep = frameTime * simSpeed;
	const speed = simSpeed * lag;
	
	updateGlobals(timeStep, lag);
	
	const starDrag = 1 - (1 - Star.airDrag) * speed;
	const starDragHeavy = 1 - (1 - Star.airDragHeavy) * speed;
	// const sparkDrag = 1- (1 - Spark.airDrag) * speed;

	const sparkDrag = 1- (1 - airDrag) * speed;//sửa
	
	const gAcc = timeStep / 1000 * GRAVITY;
	COLOR_CODES_W_INVIS.forEach(color => {
	// Stars
	const stars = Star.active[color];
	for (let i=stars.length-1; i>=0; i=i-1) {
		const star = stars[i];
		// Only update each star once per frame. Since color can change, it's possible a star could update twice without this, leading to a "jump".
		if (star.updateFrame === currentFrame) {
			continue;
		}
		star.updateFrame = currentFrame;
		
		star.life -= timeStep;
		if (star.life <= 0) {
			stars.splice(i, 1);
			Star.returnInstance(star);
		} else {
			const burnRate = Math.pow(star.life / star.fullLife, 0.5);
			const burnRateInverse = 1 - burnRate;

			star.prevX = star.x;
			star.prevY = star.y;
			star.x += star.speedX * speed;
			star.y += star.speedY * speed;
			// Apply air drag if star isn't "heavy". The heavy property is used for the shell comets.
			if (!star.heavy) {
				star.speedX *= starDrag;
				star.speedY *= starDrag;
			}
			else {
				star.speedX *= starDragHeavy;
				star.speedY *= starDragHeavy;
			}
			star.speedY += gAcc;
			
			if (star.spinRadius) {
				star.spinAngle += star.spinSpeed * speed;
				star.x += Math.sin(star.spinAngle) * star.spinRadius * speed;
				star.y += Math.cos(star.spinAngle) * star.spinRadius * speed;
			}
			
			if (star.sparkFreq) {
				star.sparkTimer -= timeStep;
				while (star.sparkTimer < 0) {
					star.sparkTimer += star.sparkFreq * 0.75 + star.sparkFreq * burnRateInverse * 4;
					Spark.add(
						star.x,
						star.y,
						star.sparkColor,
						Math.random() * PI_2,
						Math.random() * star.sparkSpeed * burnRate,
						star.sparkLife * 0.8 + Math.random() * star.sparkLifeVariation * star.sparkLife
					);
				}
			}
			
			// Handle star transitions
			if (star.life < star.transitionTime) {
				if (star.secondColor && !star.colorChanged) {
					star.colorChanged = true;
					star.color = star.secondColor;
					stars.splice(i, 1);
					Star.active[star.secondColor].push(star);
					if (star.secondColor === INVISIBLE) {
						star.sparkFreq = 0;
					}
				}
				
				if (star.strobe) {
					// Strobes in the following pattern: on:off:off:on:off:off in increments of `strobeFreq` ms.
					star.visible = Math.floor(star.life / star.strobeFreq) % 3 === 0;
				}
			}
		}
	}
											
		// Sparks
		const sparks = Spark.active[color];
		for (let i=sparks.length-1; i>=0; i=i-1) {
			const spark = sparks[i];
			spark.life -= timeStep;
			if (spark.life <= 0) {
				sparks.splice(i, 1);
				Spark.returnInstance(spark);
			} else {
				spark.prevX = spark.x;
				spark.prevY = spark.y;
				spark.x += spark.speedX * speed;
				spark.y += spark.speedY * speed;
				spark.speedX *= sparkDrag;
				spark.speedY *= sparkDrag;
				spark.speedY += gAcc;
			}
		}
	});
	

	// //Cập nhật drone
    for (let i = drones.length - 1; i >= 0; i--) {
        const drone = drones[i];
        drone.update(timeStep, speed, 0);
        // Hiệu ứng nếu drone chết
        if (!drone.isAlive()) {
            drones.splice(i,1)
        }
    }

    // if (Array.isArray(activeFormations) && activeFormations.length > 0) {
	// 	activeFormations.forEach(formation => formation.updateFormation(timeStep, speed, gAcc));
	// }
	render(speed);
}

function render(speed) {
	const { dpr } = mainStage;
	const width = stageW;
	const height = stageH;
	const trailsCtx = trailsStage.ctx;
	const mainCtx = mainStage.ctx;
	
	if (skyLightingSelector() !== SKY_LIGHT_NONE) {
		colorSky(speed);
	}
	
	// Account for high DPI screens, and custom scale factor.
	const scaleFactor = scaleFactorSelector();
	trailsCtx.scale(dpr * scaleFactor, dpr * scaleFactor);
	mainCtx.scale(dpr * scaleFactor, dpr * scaleFactor);
	
	trailsCtx.globalCompositeOperation = 'source-over';
	trailsCtx.fillStyle = `rgba(0, 0, 0, ${store.state.config.longExposure ? 0.0025 : 0.175 * speed})`;
	trailsCtx.fillRect(0, 0, width, height);
	
	mainCtx.clearRect(0, 0, width, height);
	
	// Draw queued burst flashes
	// These must also be drawn using source-over due to Safari. Seems rendering the gradients using lighten draws large black boxes instead.
	// Thankfully, these burst flashes look pretty much the same either way.
	while (BurstFlash.active.length) {
		const bf = BurstFlash.active.pop();
		
		const burstGradient = trailsCtx.createRadialGradient(bf.x, bf.y, 0, bf.x, bf.y, bf.radius);
		burstGradient.addColorStop(0.024, 'rgba(255, 255, 255, 1)');
		burstGradient.addColorStop(0.125, 'rgba(255, 160, 20, 0.2)');
		burstGradient.addColorStop(0.32, 'rgba(255, 140, 20, 0.11)');
		burstGradient.addColorStop(1, 'rgba(255, 120, 20, 0)');
		trailsCtx.fillStyle = burstGradient;
		trailsCtx.fillRect(bf.x - bf.radius, bf.y - bf.radius, bf.radius * 2, bf.radius * 2);
		
		BurstFlash.returnInstance(bf);
	}
	
	// Remaining drawing on trails canvas will use 'lighten' blend mode
	trailsCtx.globalCompositeOperation = 'lighten';
	
	// Draw stars
	trailsCtx.lineWidth = Star.drawWidth;
	trailsCtx.lineCap = isLowQuality ? 'square' : 'round';
	mainCtx.strokeStyle = '#fff';
	 mainCtx.lineWidth = 1;
		mainCtx.beginPath();
		COLOR_CODES.forEach(color => {
			const stars = Star.active[color];
			trailsCtx.strokeStyle = color;
			trailsCtx.beginPath();
			stars.forEach(star => {
				if (star.visible) {
					trailsCtx.moveTo(star.x, star.y);
					trailsCtx.lineTo(star.prevX, star.prevY);
					mainCtx.moveTo(star.x, star.y);
					mainCtx.lineTo(star.x - star.speedX * 1.6, star.y - star.speedY * 1.6);
				}
			});
			trailsCtx.stroke();
		});
		mainCtx.stroke();

	// Draw sparks
	trailsCtx.lineWidth = Spark.drawWidth;
	trailsCtx.lineCap = 'butt';
	COLOR_CODES.forEach(color => {
		const sparks = Spark.active[color];
		trailsCtx.strokeStyle = color;
		trailsCtx.beginPath();
		sparks.forEach(spark => {
			trailsCtx.moveTo(spark.x, spark.y);
			trailsCtx.lineTo(spark.prevX, spark.prevY);
		});
		trailsCtx.stroke();
	});

	
	
	 // --- Vẽ Drone ---
	 drones.forEach(drone => {
		// Tạo gradient radial cho hiệu ứng bóng bóng
		const gradient = mainCtx.createRadialGradient(drone.x, drone.y, drone.radius * 0.3, drone.x, drone.y, drone.radius);
		gradient.addColorStop(0, drone.pistilColor); // Màu sáng ở trung tâm

		gradient.addColorStop(0.4, drone.color); // Màu chính của drone
		gradient.addColorStop(0.8,'rgba(55, 52, 50, 0)' );
		// gradient.addColorStop(0.66,'rgba(163, 153, 145, 0)' ); // Màu tối ở viền ngoài
		// gradient.addColorStop(0.7,'rgba(169, 151, 138, 0)' );



		mainCtx.beginPath();
		mainCtx.arc(drone.x , drone.y, drone.radius, 0, Math.PI * 2);
		mainCtx.fillStyle = gradient;
		mainCtx.fill();
		mainCtx.strokeStyle = "rgba(0, 0, 0, 0.5)"; // Viền mờ
		mainCtx.stroke();
	 });
	//  // Vẽ đường đi của drone
	//  for (let i = 0; i < drones.length; i++) {
    //     const drone = drones[i];
    //     mainCtx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
    //     mainCtx.lineWidth = 2;

    //     mainCtx.beginPath();
    //     mainCtx.moveTo(drone.prevX, drone.prevY);
    //     mainCtx.lineTo(drone.x, drone.y);
    //     mainCtx.stroke();
    // }


	// Render speed bar if visible
	if (speedBarOpacity) {
		const speedBarHeight = 6;
		mainCtx.globalAlpha = speedBarOpacity;
		mainCtx.fillStyle = COLOR.Blue;
		mainCtx.fillRect(0, height - speedBarHeight, width * simSpeed, speedBarHeight);
		mainCtx.globalAlpha = 1;
	}


	trailsCtx.setTransform(1, 0, 0, 1, 0, 0);
	mainCtx.setTransform(1, 0, 0, 1, 0, 0);
}


// Draw colored overlay based on combined brightness of stars (light up the sky!)
// Note: this is applied to the canvas container's background-color, so it's behind the particles
const currentSkyColor = { r: 0, g: 0, b: 0 };
const targetSkyColor = { r: 0, g: 0, b: 0 };
function colorSky(speed) {
	// The maximum r, g, or b value that will be used (255 would represent no maximum)
	const maxSkySaturation = skyLightingSelector() * 15;
	// How many stars are required in total to reach maximum sky brightness
	const maxStarCount = 500;
	let totalStarCount = 0;
	// Initialize sky as black
	targetSkyColor.r = 0;
	targetSkyColor.g = 0;
	targetSkyColor.b = 0;
	// Add each known color to sky, multiplied by particle count of that color. This will put RGB values wildly out of bounds, but we'll scale them back later.
	// Also add up total star count.
	COLOR_CODES.forEach(color => {
		const tuple = COLOR_TUPLES[color];
		const count = Star.active[color].length;
		totalStarCount += count;
		targetSkyColor.r += tuple.r * count;
		targetSkyColor.g += tuple.g * count;
		targetSkyColor.b += tuple.b * count;
	});

	// Clamp intensity at 1.0, and map to a custom non-linear curve. This allows few stars to perceivably light up the sky, while more stars continue to increase the brightness but at a lesser rate. This is more inline with humans' non-linear brightness perception.
	const intensity = Math.pow(Math.min(1, totalStarCount / maxStarCount), 0.3);
	// Figure out which color component has the highest value, so we can scale them without affecting the ratios.
	// Prevent 0 from being used, so we don't divide by zero in the next step.
	const maxColorComponent = Math.max(1, targetSkyColor.r, targetSkyColor.g, targetSkyColor.b);
	// Scale all color components to a max of `maxSkySaturation`, and apply intensity.
	targetSkyColor.r = targetSkyColor.r / maxColorComponent * maxSkySaturation * intensity;
	targetSkyColor.g = targetSkyColor.g / maxColorComponent * maxSkySaturation * intensity;
	targetSkyColor.b = targetSkyColor.b / maxColorComponent * maxSkySaturation * intensity;

	// Animate changes to color to smooth out transitions.
	const colorChange = 10;
	currentSkyColor.r += (targetSkyColor.r - currentSkyColor.r) / colorChange * speed;
	currentSkyColor.g += (targetSkyColor.g - currentSkyColor.g) / colorChange * speed;
	currentSkyColor.b += (targetSkyColor.b - currentSkyColor.b) / colorChange * speed;

	appNodes.canvasContainer.style.backgroundColor = `rgb(${currentSkyColor.r | 0}, ${currentSkyColor.g | 0}, ${currentSkyColor.b | 0})`;
}

mainStage.addEventListener('ticker', update);


// Helper used to semi-randomly spread particles over an arc
// Values are flexible - `start` and `arcLength` can be negative, and `randomness` is simply a multiplier for random addition.
function createParticleArc(start, arcLength, count, randomness, particleFactory) {
	const angleDelta = arcLength / count;
	// Sometimes there is an extra particle at the end, too close to the start. Subtracting half the angleDelta ensures that is skipped.
	// Would be nice to fix this a better way.
	const end = start + arcLength - (angleDelta * 0.5);

	if (end > start) {
		// Optimization: `angle=angle+angleDelta` vs. angle+=angleDelta
		// V8 deoptimises with let compound assignment
		for (let angle = start; angle < end; angle = angle + angleDelta) {
			particleFactory(angle + Math.random() * angleDelta * randomness);
		}
	} else {
		for (let angle = start; angle > end; angle = angle + angleDelta) {
			particleFactory(angle + Math.random() * angleDelta * randomness);
		}
	}
}
//khung hạt hình chữ nhật
function createParticleRectangle(startX, startY, width, height, count, randomness, particleFactory) {
	const xDelta = width / count;
	const yDelta = height / count;

	for (let x = startX; x < startX + width; x += xDelta) {
		for (let y = startY; y < startY + height; y += yDelta) {
			const randomX = x + Math.random() * xDelta * randomness;
			const randomY = y + Math.random() * yDelta * randomness;
			particleFactory(randomX, randomY);
		}
	}
}

/**
 * Tạo hạt theo hình ngôi sao
 * @param {number} centerX Tọa độ tâm X
 * @param {number} centerY Tọa độ tâm Y
 * @param {number} R_outer Bán kính ngoài
 * @param {number} R_inner Bán kính trong
 * @param {number} points Số cánh của ngôi sao
 * @param {number} count Số hạt
 * @param {number} randomness Độ ngẫu nhiên (0 -> 1)
 * @param {function} particleFactory Hàm tạo hạt
 */
function createParticleStar(centerX, centerY, R_outer, R_inner, points, count, randomness, particleFactory) {
	// Tính góc giữa các điểm của ngôi sao
	const totalAngles = Math.PI * 2; // 360 độ
	const step = totalAngles / (points * 2); // Góc giữa các đỉnh
	const startAngle = -Math.PI / 2; // Đỉnh trên cùng nằm ở trục y âm

	// Tính toán tọa độ các đỉnh của ngôi sao
	const starPoints = [];
	for (let i = 0; i < points * 2; i++) {
		const radius = i % 2 === 0 ? R_outer : R_inner; // Xen kẽ giữa R_outer và R_inner
		const angle = startAngle + i * step;
		const x = centerX + radius * Math.cos(angle);
		const y = centerY + radius * Math.sin(angle);
		starPoints.push({ x, y });
	}

	// Phân bố hạt dọc theo các đoạn nối giữa các điểm
	for (let i = 0; i < starPoints.length; i++) {
		const start = starPoints[i];
		const end = starPoints[(i + 1) % starPoints.length]; // Điểm cuối, kết nối vòng

		// Chia đoạn thành các phần nhỏ dựa trên số hạt
		for (let j = 0; j < count; j++) {
			const t = j / count; // Tỷ lệ vị trí trên đoạn (0 -> 1)
			const x = start.x + t * (end.x - start.x);
			const y = start.y + t * (end.y - start.y);

			// Thêm sự ngẫu nhiên vào tọa độ
			const randomX = x + (Math.random() - 0.5) * randomness * (end.x - start.x);
			const randomY = y + (Math.random() - 0.5) * randomness * (end.y - start.y);

			// Gọi hàm tạo hạt
			particleFactory(randomX, randomY);
		}
	}
}
/**
 * Tạo hiệu ứng burst hạt theo hình ngôi sao
 * @param {number} centerX Tọa độ tâm X
 * @param {number} centerY Tọa độ tâm Y
 * @param {number} R_outer Bán kính ngoài của ngôi sao
 * @param {number} R_inner Bán kính trong của ngôi sao
 * @param {number} points Số cánh của ngôi sao
 * @param {number} count Số lượng hạt
 * @param {number} randomness Độ ngẫu nhiên (0 -> 1)
 * @param {function} particleFactory Hàm tạo hạt
 * @param {number} startAngle Góc bắt đầu của burst
 * @param {number} arcLength Độ dài cung góc
 */
function createStarBurst(centerX, centerY, R_outer, R_inner, points, count, randomness, particleFactory, startAngle = 0, arcLength = Math.PI * 2) {
	// Tính toán các đỉnh của ngôi sao
	const totalAngles = Math.PI * 2;
	const step = totalAngles / (points * 2);
	const startAngleOffset = -Math.PI / 2; // Đỉnh trên cùng

	const starPoints = [];
	for (let i = 0; i < points * 2; i++) {
		const radius = i % 2 === 0 ? R_outer : R_inner; // Đỉnh ngoài hoặc trong
		const angle = startAngleOffset + i * step;
		const x = centerX + radius * Math.cos(angle);
		const y = centerY + radius * Math.sin(angle);
		starPoints.push({ x, y });
	}

	// Tính toán bán kính của từng vòng cung (ring) dọc theo các đoạn nối
	for (let i = 0; i < starPoints.length; i++) {
		const start = starPoints[i];
		const end = starPoints[(i + 1) % starPoints.length];

		// Chia đoạn thành các phần nhỏ theo số lượng hạt cần tạo
		for (let j = 0; j < count; j++) {
			const t = j / count; // Tỷ lệ vị trí trên đoạn
			const x = start.x + t * (end.x - start.x);
			const y = start.y + t * (end.y - start.y);

			// Thêm sự ngẫu nhiên vào tọa độ
			const randomX = x + (Math.random() - 0.5) * randomness * (end.x - start.x);
			const randomY = y + (Math.random() - 0.5) * randomness * (end.y - start.y);

			// Tạo hạt dọc theo đoạn
			particleFactory(randomX, randomY);
		}
	}
}
// Helper used to create a spherical burst of particles
function createBurst(count, particleFactory, startAngle = 0, arcLength = PI_2) {
	// Assuming sphere with surface area of `count`, calculate various
	// properties of said sphere (unit is stars).
	// Radius
	const R = 0.5 * Math.sqrt(count / Math.PI);
	// Circumference
	const C = 2 * R * Math.PI;
	// Half Circumference
	const C_HALF = C / 2;

	// Make a series of rings, sizing them as if they were spaced evenly
	// along the curved surface of a sphere.
	for (let i = 0; i <= C_HALF; i++) {
		const ringAngle = i / C_HALF * PI_HALF;
		const ringSize = Math.cos(ringAngle);
		const partsPerFullRing = C * ringSize;
		const partsPerArc = partsPerFullRing * (arcLength / PI_2);

		const angleInc = PI_2 / partsPerFullRing;
		const angleOffset = Math.random() * angleInc + startAngle;
		// Each particle needs a bit of randomness to improve appearance.
		const maxRandomAngleOffset = angleInc * 0.33;

		for (let i = 0; i < partsPerArc; i++) {
			const randomAngleOffset = Math.random() * maxRandomAngleOffset;
			let angle = angleInc * i + angleOffset + randomAngleOffset;
			particleFactory(angle, ringSize);
		}
	}
}
//nổ chữ nhật từ tâm
function createBurstv2(count, particleFactory, startAngle = 0, width = 10, height = 5) {
	// Tính toán các thuộc tính của hình chữ nhật
	const halfWidth = width / 2;
	const halfHeight = height / 2;
	count = count / 6;
	// Tạo ra các hạt sao trên hình chữ nhật
	for (let x = -halfWidth; x < halfWidth; x += width / count) {
		for (let y = -halfHeight; y < halfHeight; y += height / count) {
			const angle = Math.atan2(y, x) + startAngle;
			particleFactory(angle, 1); // Kích thước của hạt sao, có thể điều chỉnh
		}
	}
}

function createHeartBurst(count, particleFactory, startAngle = 0, arcLength = Math.PI * 2) {
    // Tạo một góc ngẫu nhiên để xoay hình trái tim
    const randomRotation = Math.random() * Math.PI * 2; // Góc ngẫu nhiên từ 0 đến 2pi

    const positions = [];

    // Sinh các vị trí theo hình trái tim
    for (let i = 0; i < count; i++) {
        const t = Math.random() * Math.PI * 2;  // Tạo giá trị ngẫu nhiên cho góc

        // Phương trình hình trái tim
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

        // Xoay hình trái tim bằng cách xoay các tọa độ theo góc random
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        positions.push({ x: xRotated, y: yRotated });
    }

    // Tính toán và tạo các hạt từ các vị trí đã tính toán
    for (const { x, y } of positions) {
        // Tính toán góc và kích thước của hạt
        const angle = Math.atan2(y, x) + startAngle;
        const size = Math.sqrt(x * x + y * y) / 20; // Quy mô độ lớn của các hạt

        // Gọi hàm tạo hạt
        particleFactory(angle, size);
    }
}
/**
 * tạo hình lốc xoáy
 * @param {*} count 
 * @param {*} particleFactory 
 * @param {*} loops - số vòng
 * @param {*} startAngle 
 */
function createSpiralBurst(count, particleFactory, loops = 3, startAngle = 0) {
    const randomRotation = Math.random() * Math.PI * 2; // Góc xoay ngẫu nhiên
    const positions = [];

    for (let i = 0; i < count; i++) {
        const t = (i / count) * loops * Math.PI * 2; // Góc xoắn
        const r = 0.5 + 0.5 * (t / (Math.PI * 2 * loops)); // Tăng bán kính dần

        const x = r * Math.cos(t);
        const y = r * Math.sin(t);

        // Xoay lốc xoáy
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        positions.push({ x: xRotated, y: yRotated });
    }

    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x) + startAngle;
        const size = Math.sqrt(x * x + y * y);
        particleFactory(angle, size);
    }
}
/**
 * Tạo hình cánh hoa
 * @param {*} count 
 * @param {*} particleFactory 
 * @param {*} petals - số canhs
 * @param {*} startAngle 
 */
function createFlowerBurst(count, particleFactory, petals = 6, startAngle = 0) {
    const randomRotation = Math.random() * Math.PI * 2; // Góc xoay ngẫu nhiên
    const positions = [];
	petals =2 +Math.random()*petals
    for (let i = 0; i < count; i++) {
        const t = Math.random() * Math.PI * 2; // Góc ngẫu nhiên
        const r = Math.sin(petals * t); // Bán kính phụ thuộc vào số cánh

        const x = r * Math.cos(t);
        const y = r * Math.sin(t);

        // Xoay hình hoa
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        positions.push({ x: xRotated, y: yRotated });
    }

    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x) + startAngle;
        const size = Math.sqrt(x * x + y * y);
        particleFactory(angle, size);
    }
}
/**
 * Này đang lỗi
 * @param {*} count 
 * @param {*} particleFactory 
 * @param {*} spikes 
 * @param {*} innerRadius 
 * @param {*} outerRadius 
 * @param {*} startAngle 
 */
function createStarBurst(count, particleFactory, spikes = 5, innerRadius = 0.5, outerRadius = 1, startAngle = 0) {
    
	const randomRotation = Math.random() * Math.PI * 2; // Góc xoay ngẫu nhiên
    const positions = [];

    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2; // Góc cho từng điểm
        const radius = i % 2 === 0 ? outerRadius : innerRadius; // Xen kẽ bán kính

        const x = radius * Math.cos(t);
        const y = radius * Math.sin(t);

        // Xoay ngôi sao
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        positions.push({ x: xRotated, y: yRotated });
    }

    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x) + startAngle;
        const size = Math.sqrt(x * x + y * y);
        particleFactory(angle, size);
    }
}
function createWaveBurst(count, particleFactory, amplitude =1, frequency =2, startAngle = 0) {
    const randomRotation = Math.random() * Math.PI * 2; // Góc xoay ngẫu nhiên
    const positions = [];
	count = count*Math.random()
	amplitude += Math.random()*3
	frequency += Math.random()*3
    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2; // Góc cho từng điểm
        const x = t;
        const y = amplitude * Math.sin(frequency * t);

        // Xoay sóng
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        positions.push({ x: xRotated, y: yRotated });
    }

    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x) + startAngle;
        const size = Math.sqrt(x * x + y * y);
        particleFactory(angle, size/4.5);
    }
}
function createSmileyBurst(count, particleFactory, startAngle = 0) {
    const randomRotation = Math.random() * Math.PI * 2; // Góc xoay ngẫu nhiên
    const positions = [];

    // Tạo hạt cho khuôn mặt (hình tròn ngoài)
    for (let i = 0; i < count * 0.5; i++) {
        const t = (i / (count * 0.5)) * Math.PI * 2; // Góc cho từng điểm
        const radius = 10; // Bán kính khuôn mặt
        const x = radius * Math.cos(t);
        const y = radius * Math.sin(t);

        // Xoay ngẫu nhiên hình tròn
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        positions.push({ x: xRotated, y: yRotated });
    }

    // Tạo hạt cho mắt trái
    for (let i = 0; i < count * 0.1; i++) {
        const t = (i / (count * 0.1)) * Math.PI * 2; // Góc cho mắt
        const radius = 2; // Bán kính mắt
        const offsetX = -4; // Tọa độ mắt trái
        const offsetY = -4;
        const x = offsetX + radius * Math.cos(t);
        const y = offsetY + radius * Math.sin(t);

        // Xoay mắt trái
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        positions.push({ x: xRotated, y: yRotated });
    }

    // Tạo hạt cho mắt phải
    for (let i = 0; i < count * 0.1; i++) {
        const t = (i / (count * 0.1)) * Math.PI * 2;
        const radius = 2;
        const offsetX = 4; // Tọa độ mắt phải
        const offsetY = -4;
        const x = offsetX + radius * Math.cos(t);
        const y = offsetY + radius * Math.sin(t);

        // Xoay mắt phải
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        positions.push({ x: xRotated, y: yRotated });
    }

    // Tạo hạt cho miệng (hình cung)
    for (let i = 0; i < count * 0.3; i++) {
        const t = (i / (count * 0.3)) * Math.PI; // Góc từ 0 đến pi
        const radius = 6; // Bán kính miệng
        const offsetY = 3; // Vị trí miệng (hơi xuống dưới)
        const x = radius * Math.cos(t);
        const y = offsetY + radius * Math.sin(t);

        // Xoay miệng
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        positions.push({ x: xRotated, y: yRotated });
    }

    // Tạo các hạt từ các vị trí đã tính
    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x) + startAngle;
        const size = Math.sqrt(x * x + y * y) / 10; // Quy mô kích thước hạt
        particleFactory(angle, size);
    }
}
function createQuestionMarkBurst(count, particleFactory, scale = 10, randomness = 0.1) {
    const positions = [];

    // Vẽ phần cong của dấu hỏi
    for (let i = 0; i < count * 0.8; i++) {
        const t = (i / (count * 0.8)) * Math.PI; // Tính góc từ 0 đến π (nửa đường tròn)
        const x = scale * Math.sin(t) + scale * 0.5; // Dịch phải một chút
        const y = scale * Math.cos(t);

        // Thêm độ ngẫu nhiên
        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x: randomX, y: randomY });
    }

    // Vẽ phần dấu chấm
    for (let i = 0; i < count * 0.2; i++) {
        const x = scale * 0.5; // Cố định vị trí x
        const y = -scale * 1.5; // Dịch xuống dưới một khoảng

        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x: randomX, y: randomY });
    }

    // Chuyển đổi thành hạt
    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x);
        const size = Math.sqrt(x * x + y * y) / scale;
        particleFactory(angle, size);
    }
}
function createSnowflakeBurst(count, particleFactory, arms = 10, randomness = 0.7) {
    const positions = [];
	arms *=Math.random()
	randomness*=Math.random()
    const angleStep = (Math.PI * 2) / arms;

    for (let i = 0; i < count; i++) {
        const armIndex = i % arms; // Xác định tay nào của bông tuyết
        const armAngle = armIndex * angleStep; // Góc của tay bông tuyết
        const distance = Math.random() + 0.5; // Khoảng cách từ tâm (có ngẫu nhiên)
        const randomOffset = (Math.random() - 0.5) * randomness;

        // Tính tọa độ của hạt
        const x = distance * Math.cos(armAngle + randomOffset);
        const y = distance * Math.sin(armAngle + randomOffset);

        positions.push({ x, y });
    }

    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x);
        const size = Math.sqrt(x * x + y * y);
        particleFactory(angle, size);
    }
}

function createFishBurst(count, particleFactory, scale =20, randomness = 0.7) {
	const randomRotation = Math.random() * Math.PI * 2; // Góc xoay ngẫu nhiên
	scale*=Math.random()
	randomness*=Math.random()
    // Tạo thân cá (hình ellipse)
    for (let i = 0; i < count * 0.6; i++) {
        const t = (i / (count * 0.6)) * Math.PI * 2; // Góc từ 0 đến 2π
        const x = scale * Math.cos(t); // Tọa độ x (thân dài)
        const y = scale * 0.5 * Math.sin(t); // Tọa độ y (thân ngắn)

        // Thêm độ ngẫu nhiên vào tọa độ
        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        // Xoay thân cá
        const xRotated = randomX * Math.cos(randomRotation) - randomY * Math.sin(randomRotation);
        const yRotated = randomX * Math.sin(randomRotation) + randomY * Math.cos(randomRotation);

        // Tạo hạt
        const angle = Math.atan2(yRotated, xRotated);
        const size = Math.sqrt(xRotated * xRotated + yRotated * yRotated) / scale;
        particleFactory(angle, size);
    }

    // Tạo đuôi cá (hình tam giác)
    for (let i = 0; i < count * 0.4; i++) {
        const t = Math.random(); // Giá trị ngẫu nhiên để tạo hình tam giác
        const x = -scale - t * scale * 0.5; // Đuôi nằm bên trái thân
        const y = (Math.random() - 0.5) * scale; // Phân bố chiều cao đuôi

        // Thêm độ ngẫu nhiên vào tọa độ
        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        // Xoay đuôi cá
        const xRotated = randomX * Math.cos(randomRotation) - randomY * Math.sin(randomRotation);
        const yRotated = randomX * Math.sin(randomRotation) + randomY * Math.cos(randomRotation);

        // Tạo hạt
        const angle = Math.atan2(yRotated, xRotated);
        const size = Math.sqrt(xRotated * xRotated + yRotated * yRotated) / scale;
        particleFactory(angle, size);
    }
}
function createCatBurst(count, particleFactory, scale = 10, randomness = 0.1) {
    const randomRotation = Math.random() * Math.PI * 2; // Xoay toàn bộ mèo ngẫu nhiên
    const positions = [];

    // Tạo phần đầu mèo (hình tròn)
    for (let i = 0; i < count * 0.6; i++) {
        const t = (i / (count * 0.6)) * Math.PI * 2; // Góc từ 0 đến 2π
        const x = scale * Math.cos(t); // Tọa độ x
        const y = scale * Math.sin(t); // Tọa độ y

        // Thêm độ ngẫu nhiên
        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x: randomX, y: randomY });
    }

    // Tạo hai tai mèo (hai tam giác trên đầu)
    for (let i = 0; i < count * 0.2; i++) {
        const t = Math.random(); // Giá trị ngẫu nhiên để tạo độ rộng tam giác
        const x = -scale * 0.8 + t * scale * 0.5; // Tai trái
        const y = -scale - t * scale * 0.8;

        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x: randomX, y: randomY });
    }

    for (let i = 0; i < count * 0.2; i++) {
        const t = Math.random(); // Giá trị ngẫu nhiên để tạo độ rộng tam giác
        const x = scale * 0.8 - t * scale * 0.5; // Tai phải
        const y = -scale - t * scale * 0.8;

        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x: randomX, y: randomY });
    }

    // Tạo hai mắt mèo (hai hình elip nhỏ)
    for (let i = 0; i < count * 0.1; i++) {
        const x = -scale * 0.3 + (Math.random() - 0.5) * randomness * scale; // Mắt trái
        const y = scale * 0.2 + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x, y });
    }

    for (let i = 0; i < count * 0.1; i++) {
        const x = scale * 0.3 + (Math.random() - 0.5) * randomness * scale; // Mắt phải
        const y = scale * 0.2 + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x, y });
    }

    // Chuyển đổi vị trí thành hạt và xoay mèo
    for (const { x, y } of positions) {
        // Xoay tọa độ
        const xRotated = x * Math.cos(randomRotation) - y * Math.sin(randomRotation);
        const yRotated = x * Math.sin(randomRotation) + y * Math.cos(randomRotation);

        // Tạo hạt
        const angle = Math.atan2(yRotated, xRotated);
        const size = Math.sqrt(xRotated * xRotated + yRotated * yRotated) / scale;
        particleFactory(angle, size);
    }
}

function createStarBurst(count,particleFactory, arms = 5) {
    const outerRadius = 1.0;
    const innerRadius = 0.5;
    const totalPoints = arms * 2; // mỗi cánh có 2 điểm: đỉnh ngoài và trong
    const angleStep = (Math.PI * 2) / totalPoints;

    for (let i = 0; i < totalPoints; i++) {
        const angle = i * angleStep;
        const isOuter = i % 2 === 0;
        const radius = isOuter ? outerRadius : innerRadius;

        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        particleFactory(x, y, 0);
    }
}

	
	
function createBurstRectangle(count, particleFactory, width = 10, height = 5, startAngle = 0, arcLength = PI_2) {
	// Calculate the number of particles per row
	// Create an array to store random positions
	const positions = [];

	// Generate random positions within the rectangle
	for (let i = 0; i < count; i++) {
		const x = Math.random() * width - width / 2;
		const y = Math.random() * height - height / 2;
		positions.push({ x, y });
	}

	// Make a series of particles based on the random positions
	for (const { x, y } of positions) {
		// Calculate angle and size
		const angle = Math.atan2(y, x) + startAngle;
		const size = Math.sqrt(x * x + y * y) / Math.sqrt(width * width + height * height);

		// Call the particle factory with calculated angle and size
		particleFactory(angle, size);
	}
}
function createBirdBurst(count, particleFactory, scale = 5, randomness = 0.3) {
    const positions = [];
	randomness*=Math.random()
	scale*=Math.random()
    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI; // Góc từ 0 đến π
        const x = scale * Math.sin(t); // Tạo cánh chim
        const y = scale * Math.sin(t) * Math.sin(t); // Độ cong của cánh

        // Thêm độ ngẫu nhiên
        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x: randomX, y: randomY });
    }

    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x);
        const size = Math.sqrt(x * x + y * y) / scale;
        particleFactory(angle, size);
    }
}
function createLotusBurst(count, particleFactory, scale = 5, petalCount = 7, randomness = 0.1) {
    const positions = [];
	
    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2; // Góc từ 0 đến 2π
        const r = scale * Math.abs(Math.sin(petalCount * t / 2)); // Bán kính dao động theo số cánh hoa
        const x = r * Math.cos(t);
        const y = r * Math.sin(t);

        // Thêm độ ngẫu nhiên
        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x: randomX, y: randomY });
    }

    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x);
        const size = Math.sqrt(x * x + y * y) / scale;
        particleFactory(angle, size);
    }
}
function createButterflyBurst(count, particleFactory, scale =5, randomness = 0.1) {
    const positions = [];

    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2; // Góc từ 0 đến 2π
        const x = scale * Math.sin(t) * Math.sin(t); // Tạo cánh bướm đối xứng
        const y = scale * Math.sin(t) * Math.cos(t);

        // Thêm độ ngẫu nhiên
        const randomX = x + (Math.random() - 0.5) * randomness * scale;
        const randomY = y + (Math.random() - 0.5) * randomness * scale;

        positions.push({ x: randomX, y: randomY });
    }

    for (const { x, y } of positions) {
        const angle = Math.atan2(y, x);
        const size = Math.sqrt(x * x + y * y) / scale;
        particleFactory(angle, size);
    }
}

function createBurstRectangleV2(count, particleFactory, width = 10, height = 5, startAngle = 0, arcLength = PI_2) {
	// Calculate the number of particles per row
	// Create an array to store random positions
	const positions = [];

	// Generate random positions within the rectangle
	for (let i = 0; i < count; i++) {
		const x = Math.random() * width - width / 2;
		const y = Math.random() * height - height / 2;
		positions.push({ x, y });
	}

	// Make a series of particles based on the random positions
	for (const { x, y } of positions) {
		// Calculate angle and size
		const angle = Math.atan2(y, x) + startAngle;
		const size = Math.sqrt(x * x + y * y) / Math.sqrt(width * width + height * height) * 50;

		// Call the particle factory with calculated angle and size
		particleFactory(angle, size);
	}
}



// Various star effects.
// These are designed to be attached to a star's `onDeath` event.

// Crossette breaks star into four same-color pieces which branch in a cross-like shape.
function crossetteEffect(star) {
	const startAngle = Math.random() * PI_HALF;
	createParticleArc(startAngle, PI_2, 4, 0.5, (angle) => {
		Star.add(
			star.x,
			star.y,
			star.color,
			angle,
			Math.random() * 0.6 + 0.75,
			600
		);
	});
}
//tạo hinh tròn bo
function floralEffectV2(star) {
	const count = 12 + 6 * quality;
	createBurstv2(count, (angle, speedMult) => {
		Star.add(
			star.x,
			star.y,
			star.color,
			angle,
			speedMult * 2.4,
			1000 + Math.random() * 300,
			star.speedX,
			star.speedY
		);
	});
	// Queue burst flash render
	BurstFlash.add(star.x, star.y, 46);
	soundManager.playSound('burstSmall');
}
function floralEffectV3(star) {
	const count = 12 + 6 * quality;
	createBurstRectangleV2(count, (angle, speedMult) => {
		Star.add(
			star.x,
			star.y,
			star.color,
			angle,
			speedMult * 2.4,
			1000 + Math.random() * 300,
			star.speedX,
			star.speedY
		);
	});
	// Queue burst flash render
	BurstFlash.add(star.x, star.y, 46);
	soundManager.playSound('burstSmall');
}
// Flower is like a mini shell
function floralEffect(star) {
	const count = 12 + 6 * quality;
	createBurst(count, (angle, speedMult) => {
		Star.add(
			star.x,
			star.y,
			star.color,
			angle,
			speedMult * 2.4,
			1000 + Math.random() * 300,
			star.speedX,
			star.speedY
		);
	});
	// Queue burst flash render
	BurstFlash.add(star.x, star.y, 46);
	soundManager.playSound('burstSmall');
}

// Floral burst with willow stars
function fallingLeavesEffect(star) {
	airDrag = 1//sửa
	createBurst(7, (angle, speedMult) => {
		const newStar = Star.add(
			star.x,
			star.y,
			INVISIBLE,
			angle,
			speedMult * 2.4,
			2400 + Math.random() * 600,
			star.speedX,
			star.speedY
		);

		newStar.sparkColor = Math.random()< 0.7 ? COLOR.Gold:COLOR.White;
		newStar.sparkFreq = 144 / quality;
		newStar.sparkSpeed = 0.28;
		newStar.sparkLife = 750;
		newStar.sparkLifeVariation = 3.2;
		newStar.strobe = true
		
	});
	
	// Queue burst flash render
	BurstFlash.add(star.x, star.y, 46);
	soundManager.playSound('burstSmall');
}

// Crackle pops into a small cloud of golden sparks.
function crackleEffect(star) {
	const count = isHighQuality ? 32 : 16;
	createParticleArc(0, PI_2, count, 1.8, (angle) => {
		Spark.add(
			star.x,
			star.y,
			COLOR.Gold,
			angle,
			// apply near cubic falloff to speed (places more particles towards outside)
			Math.pow(Math.random(), 0.45) * 2.4,
			300 + Math.random() * 200
		);
	});
	soundManager.playSound('burstSmall');
	soundManager.playSound('burstSmall');
}


/**
 * Shell can be constructed with options:
 *
 * spreadSize:      Size of the burst.
 * starCount: Number of stars to create. This is optional, and will be set to a reasonable quantity for size if omitted.
 * starLife:
 * starLifeVariation:
 * color:
 * glitterColor:
 * glitter: One of: 'light', 'medium', 'heavy', 'streamer', 'willow'
 * pistil:
 * pistilColor:
 * streamers:
 * crossette:
 * floral:
 * crackle:
 */
class Shell {
	constructor(options) {
		Object.assign(this, options);
		this.starLifeVariation = options.starLifeVariation || 0.125;
		this.color = options.color || randomColor();
		this.glitterColor = options.glitterColor || this.color;

		// Set default starCount if needed, will be based on shell size and scale exponentially, like a sphere's surface area.
		if (!this.starCount) {
			const density = options.starDensity || 1;
			const scaledSize = this.spreadSize / 54;
			this.starCount = Math.max(6, scaledSize * scaledSize * density);
		}
	}

	launch(position, launchHeight, thisNgieng = 0 ) {
		const width = stageW;
		const height = stageH;
		// Distance from sides of screen to keep shells.
		const hpad = 60;
		// Distance from top of screen to keep shell bursts.
		const vpad = 50;
		// Minimum burst height, as a percentage of stage height
		const minHeightPercent = 0.45;
		// Minimum burst height in px
		const minHeight = height - height * minHeightPercent;

		const launchX = position * (width - hpad * 2) + hpad;
		const launchY = height;
		const burstY = minHeight - (launchHeight * (minHeight - vpad));
		// const launchDistance = launchY - burstY;
		const rand = Math.random()
		const positionX =thisNgieng *(rand < 0.5 ? -0.7 * rand : 0.7 * rand) 
		// console.log(positionX)
		const launchDistance = launchY - burstY ;
		// Using a custom power curve to approximate Vi needed to reach launchDistance under gravity and air drag.
		// Magic numbers came from testing.
		const launchVelocity = Math.pow(launchDistance * 0.04, 0.64);

		const comet = this.comet = Star.addV2(
			launchX,
			launchY,
			typeof this.color === 'string' && this.color !== 'random' ? this.color : COLOR.White,
			Math.PI,
			launchVelocity * (this.horsetail ? 1.2 : 1),
			// Hang time is derived linearly from Vi; exact number came from testing
			launchVelocity * (this.horsetail ? 100 : 400),
			positionX,
		);

		// making comet "heavy" limits air drag
		comet.heavy = true;
		// comet spark trail
		comet.spinRadius = MyMath.random(0.32, 0.85);
		comet.sparkFreq = 32 / quality;
		if (isHighQuality) comet.sparkFreq = 8;
		comet.sparkLife = 320;
		comet.sparkLifeVariation = 3;
		if (this.glitter === 'willow' || this.fallingLeaves) {
			comet.sparkFreq = 20 / quality;
			comet.sparkSpeed = 0.5;
			comet.sparkLife = 500;
		}
		if (this.color === INVISIBLE) {
			comet.sparkColor = COLOR.Gold;
		}

		// Randomly make comet "burn out" a bit early.
		// This is disabled for horsetail shells, due to their very short airtime.
		if (Math.random() > 0.4 && !this.horsetail) {
			comet.secondColor = INVISIBLE;
			comet.transitionTime = Math.pow(Math.random(), 1.5) * 700 + 500;
		}

		comet.onDeath = comet => this.burst(comet.x, comet.y);
		if(this.fallingLeaves){
			
			airDrag = 1
			
		}else if(this.floral){
			setTimeout(() => {
				airDrag = 0.8
			}, 7000);
		}
		soundManager.playSound('lift')
	}
	launchV2(position, launchHeight, positionX = 0.5) {
		const width = stageW;
		const height = stageH + 50;
		// Distance from sides of screen to keep shells.
		const hpad = 60;
		// Distance from top of screen to keep shell bursts.
		const vpad = 50;
		// Minimum burst height, as a percentage of stage height
		const minHeightPercent = 0.45;
		// Minimum burst height in px
		const minHeight = height - height * minHeightPercent;

		const launchX = position * (width - hpad * 2) + hpad;
		const launchY = height;
		const burstY = minHeight - (launchHeight * (minHeight - vpad));
		const launchDistance = launchY - burstY + 250 * (positionX > 0 ? -position : position);
		// Using a custom power curve to approximate Vi needed to reach launchDistance under gravity and air drag.
		// Magic numbers came from testing.
		const launchVelocity = Math.pow(launchDistance * 0.04, 0.64);

		const comet = this.comet = Star.addV2(
			launchX,
			launchY,
			typeof this.color === 'string' && this.color !== 'random' ? this.color : COLOR.White,
			Math.PI,
			launchVelocity * (this.horsetail ? 1.2 : 1),
			// Hang time is derived linearly from Vi; exact number came from testing
			launchVelocity * (this.horsetail ? 100 : 400),
			positionX,
		);

		// making comet "heavy" limits air drag
		comet.heavy = true;
		// comet spark trail
		comet.spinRadius = MyMath.random(0.32, 0.85);
		comet.sparkFreq = 32 / quality;
		if (isHighQuality) comet.sparkFreq = 8;
		comet.sparkLife = 320;
		comet.sparkLifeVariation = 3;
		if (this.glitter === 'willow' || this.fallingLeaves) {
			comet.sparkFreq = 20 / quality;
			comet.sparkSpeed = 0.5;
			comet.sparkLife = 500;
		}
		if (this.color === INVISIBLE) {
			comet.sparkColor = COLOR.Gold;
		}

		// Randomly make comet "burn out" a bit early.
		// This is disabled for horsetail shells, due to their very short airtime.
		// if (Math.random() > 0.4 && !this.horsetail) {
		// 	comet.secondColor = INVISIBLE;
		// 	comet.transitionTime = Math.pow(Math.random(), 1.5) * 700 + 500;
		// }
		
		// soundManager.playSound('lift')
	}
	//rơi
	launchV3(startX, startY, launchHeight, speedMultiplier = 1, isFalling = true) {
		const width = stageW;
		const height = stageH;
		// Distance from sides of screen to keep shells.
		const hpad = 60;
		// Distance from top of screen to keep shell bursts.
		const vpad = 50;
		// Minimum burst height, as a percentage of stage height
		const minHeightPercent = 0.45;
		// Minimum burst height in px
		const minHeight = height - height * minHeightPercent;
		
		// Initial launch position
		const launchX = startX;
		const launchY = startY;
	
		// Calculate `burstY` based on whether the comet is falling or rising
		const burstY = isFalling 
			? startY + (launchHeight * (height - vpad - startY)) // Rơi xuống
			: startY - (launchHeight * (startY - (minHeight - vpad))); // Bắn lên
	
		// Adjust launch distance based on `isFalling` and `direction`
		const launchDistance = isFalling 
			? burstY - launchY // Rơi xuống
			: launchY - burstY; // Bắn lên
	
		// Compute launch velocity
		const launchVelocity = Math.pow(Math.abs(launchDistance) * 0.04, 0.64) * speedMultiplier;
	
		// Add the comet (firework projectile)
		const comet = this.comet = Star.add(
			launchX,
			launchY,
			typeof this.color === 'string' && this.color !== 'random' ? this.color : COLOR.White,
			isFalling ? 0 : Math.PI, // Adjusted direction
			launchVelocity * (this.horsetail ? 1.2 : 1),
			launchVelocity * (this.horsetail ? 100 : 400)
		);
	
		// Adjust properties for air drag and visual effects
		comet.heavy = true;
		comet.spinRadius = MyMath.random(0.32, 0.85);
		comet.sparkFreq = 32 / quality;
		if (isHighQuality) comet.sparkFreq = 8;
		comet.sparkLife = 320*5;
		comet.sparkLifeVariation = 3;
		if (this.glitter === 'willow' || this.fallingLeaves) {
			comet.sparkFreq = 20 / quality;
			comet.sparkSpeed = 0.5;
			comet.sparkLife = 500;
		}
		if (this.color === INVISIBLE) {
			comet.sparkColor = COLOR.Gold;
		}
	
		// // Randomly make comet burn out early
		// if (Math.random() > 0.4 && !this.horsetail) {
		// 	comet.secondColor = INVISIBLE;
		// 	comet.transitionTime = Math.pow(Math.random(), 1.5) * 700 + 500;
		// }
	
		// // Handle burst at the end of the comet's life
		// comet.onDeath = comet => this.burst(comet.x, comet.y);
	
		// soundManager.playSound('lift');
	}
	launchV4(position, launchHeight, positionX = 0) {
		const width = stageW;
		const height = stageH + 50;
		// Distance from sides of screen to keep shells.
		const hpad = 60;
		// Distance from top of screen to keep shell bursts.
		const vpad = 50;
		// Minimum burst height, as a percentage of stage height
		const minHeightPercent = 0.45;
		// Minimum burst height in px
		const minHeight = height - height * minHeightPercent;
	
		const launchX = position * (width - hpad * 2) + hpad;
		const launchY = height;
		const burstY = minHeight - (launchHeight * (minHeight - vpad));
		const launchDistance = launchY - burstY + 250 * (positionX > 0 ? -position : position);
	
		// Using a custom power curve to approximate Vi needed to reach launchDistance under gravity and air drag.
		const launchVelocity = Math.pow(launchDistance * 0.04, 0.64);
	
		const comet = this.comet = Star.addV2(
			launchX,
			launchY,
			typeof this.color === 'string' && this.color !== 'random' ? this.color : COLOR.White,
			Math.PI, // Góc bắn lên (hoặc thay đổi theo yêu cầu nếu nghiêng Y nhiều)
			launchVelocity * (this.horsetail ? 1.2 : 1),
			launchVelocity * (this.horsetail ? 100 : 400),
			positionX * 2, // Độ nghiêng theo X (giá trị từ -1 đến 1)
			positionX * -1 // Tăng/giảm độ cao nếu nghiêng
		);
	
		// Making comet "heavy" limits air drag
		comet.heavy = true;
		comet.spinRadius = MyMath.random(0.32, 0.85);
		comet.sparkFreq = 32 / quality;
		if (isHighQuality) comet.sparkFreq = 8;
		comet.sparkLife = 320;
		comet.sparkLifeVariation = 3;
		if (this.glitter === 'willow' || this.fallingLeaves) {
			comet.sparkFreq = 20 / quality;
			comet.sparkSpeed = 0.5;
			comet.sparkLife = 500;
		}
		if (this.color === INVISIBLE) {
			comet.sparkColor = COLOR.Gold;
		}
	
		// // Randomly make comet "burn out" a bit early.
		// if (Math.random() > 0.4 && !this.horsetail) {
		// 	comet.secondColor = INVISIBLE;
		// 	comet.transitionTime = Math.pow(Math.random(), 1.5) * 700 + 500;
		// }
	}
	
	burst(x, y) {
		// Set burst speed so overall burst grows to set size. This specific formula was derived from testing, and is affected by simulated air drag.
		const speed = this.spreadSize / 96;

		let color, onDeath, sparkFreq, sparkSpeed, sparkLife;
		let sparkLifeVariation = 0.25;
		// Some death effects, like crackle, play a sound, but should only be played once.
		let playedDeathSound = true;

		if (this.crossette) onDeath = (star) => {
			if (!playedDeathSound) {
				soundManager.playSound('crackleSmall');
				playedDeathSound = false;
			}
			crossetteEffect(star);
		}
		if (this.crackle) onDeath = (star) => {
			if (!playedDeathSound) {
				soundManager.playSound('crackle');
				playedDeathSound = true;
			}
			crackleEffect(star);
		}
		const number = Math.random();
		if (this.floral) onDeath = floralEffect;
		if (this.fallingLeaves) {
			
			onDeath = fallingLeavesEffect;

		}
		if (this.glitter === 'light') {
			sparkFreq = 400;
			sparkSpeed = 0.3;
			sparkLife = 300;
			sparkLifeVariation = 2;
		}
		else if (this.glitter === 'medium') {
			sparkFreq = 200;
			sparkSpeed = 0.44;
			sparkLife = 700;
			sparkLifeVariation = 2;
		}
		else if (this.glitter === 'heavy') {
			sparkFreq = 80;
			sparkSpeed = 0.8;
			sparkLife = 1400;
			sparkLifeVariation = 2;
		}
		else if (this.glitter === 'thick') {
			sparkFreq = 16;
			sparkSpeed = isHighQuality ? 1.65 : 1.5;
			sparkLife = 1400;
			sparkLifeVariation = 3;
		}
		else if (this.glitter === 'streamer') {
			sparkFreq = 32;
			sparkSpeed = 1.05;
			sparkLife = 620;
			sparkLifeVariation = 2;
		}
		else if (this.glitter === 'willow') {
			sparkFreq = 120;
			sparkSpeed = 0.34;
			sparkLife = 1400;
			sparkLifeVariation = 3.8;
		}

		// Apply quality to spark count
		sparkFreq = sparkFreq / quality;

		// Star factory for primary burst, pistils, and streamers.
		let firstStar = true;
		const starFactory = (angle, speedMult) => {
			// For non-horsetail shells, compute an initial vertical speed to add to star burst.
			// The magic number comes from testing what looks best. The ideal is that all shell
			// bursts appear visually centered for the majority of the star life (excl. willows etc.)
			const standardInitialSpeed = this.spreadSize / 1800;

			const star = Star.add(
				x,
				y,
				color || randomColor(),
				angle,
				speedMult * speed,
				// add minor variation to star life
				this.starLife + Math.random() * this.starLife * this.starLifeVariation,
				this.horsetail ? this.comet && this.comet.speedX : 0,
				this.horsetail ? this.comet && this.comet.speedY : -standardInitialSpeed
			);

			if (this.secondColor) {
				star.transitionTime = this.starLife * (Math.random() * 0.05 + 0.32);
				star.secondColor = this.secondColor;
			}

			if (this.strobe) {
				star.transitionTime = this.starLife * (Math.random() * 0.08 + 0.46);
				star.strobe = true;
				// How many milliseconds between switch of strobe state "tick". Note that the strobe pattern
				// is on:off:off, so this is the "on" duration, while the "off" duration is twice as long.
				star.strobeFreq = Math.random() * 20 + 40;
				if (this.strobeColor) {
					star.secondColor = this.strobeColor;
				}
			}

			star.onDeath = onDeath;

			if (this.glitter) {
				star.sparkFreq = sparkFreq;
				star.sparkSpeed = sparkSpeed;
				star.sparkLife = sparkLife;
				star.sparkLifeVariation = sparkLifeVariation;
				star.sparkColor = this.glitterColor;
				star.sparkTimer = Math.random() * star.sparkFreq;
			}
		};


		if (typeof this.color === 'string') {
			if (this.color === 'random') {
				color = null; // falsey value creates random color in starFactory
			} else {
				color = this.color;
			}

			// Rings have positional randomness, but are rotated randomly
			if (this.ring) {
				const ringStartAngle = Math.random() * Math.PI;
				const ringSquash = Math.pow(Math.random(), 2) * 0.85 + 0.15;;
				createParticleArc(0, PI_2, this.starCount, 0, angle => {
					// Create a ring, squashed horizontally
					const initSpeedX = Math.sin(angle) * speed * ringSquash;
					const initSpeedY = Math.cos(angle) * speed;
					// Rotate ring
					const newSpeed = MyMath.pointDist(0, 0, initSpeedX, initSpeedY);
					const newAngle = MyMath.pointAngle(0, 0, initSpeedX, initSpeedY) + ringStartAngle;
					const star = Star.add(
						x,
						y,
						color,
						newAngle,
						// apply near cubic falloff to speed (places more particles towards outside)
						newSpeed,//speed,
						// add minor variation to star life
						this.starLife + Math.random() * this.starLife * this.starLifeVariation
					);

					if (this.glitter) {
						star.sparkFreq = sparkFreq;
						star.sparkSpeed = sparkSpeed;
						star.sparkLife = sparkLife;
						star.sparkLifeVariation = sparkLifeVariation;
						star.sparkColor = this.glitterColor;
						star.sparkTimer = Math.random() * star.sparkFreq;
					}
				});
			}
			let check = 1;
			if(this.hearth){
				createHeartBurst(this.starCount, starFactory)
				check =0;
			}
			if(this.flower){
				createFlowerBurst(this.starCount, starFactory);
				check =0;
			}
			if(this.spiral){
				createSpiralBurst(this.starCount, starFactory)
				check =0;
			}
			if(this.wave){
				createWaveBurst(this.starCount, starFactory)
				check =0;
			}
			if(this.smiley){
				createSmileyBurst(this.starCount, starFactory)
				check =0;
			}
			
			if(this.snow){
				createSnowflakeBurst(this.starCount, starFactory)
				check =0;
			}
			if(this.star){
				createStarBurst(this.starCount, starFactory)
				check =0;
			}
			if(this.fish){
				createFishBurst(this.starCount, starFactory)
				check =0;
			}
			if(this.cat){
				createCatBurst(this.starCount, starFactory)
				check =0;
			}
			if(this.butterfly){
				createButterflyBurst(this.starCount, starFactory)
				check =0;

			}
			if(this.lotus){
				createLotusBurst(this.starCount, starFactory)
				check =0;

			}
			if(this.bird){
				createBirdBurst(this.starCount, starFactory)
				check =0;
			}
			else{
				if(check == 1){
					createBurst(this.starCount, starFactory)
				}
				// createQuestionMarkBurst(this.starCount, starFactory)
				
			}
		}
		else if (Array.isArray(this.color)) {
			if (Math.random() < 0.5) {
				const start = Math.random() * Math.PI;
				const start2 = start + Math.PI;
				const arc = Math.PI;
				color = this.color[0];
				// Not creating a full arc automatically reduces star count.
				createBurst(this.starCount, starFactory, start, arc);
				color = this.color[1];
				createBurst(this.starCount, starFactory, start2, arc);
			} else {
				color = this.color[0];
				createBurst(this.starCount / 2, starFactory);
				color = this.color[1];
				createBurst(this.starCount / 2, starFactory);
			}
		}
		else {
			throw new Error('Invalid shell color. Expected string or array of strings, but got: ' + this.color);
		}

		if (this.pistil) {
			const innerShell = new Shell({
				spreadSize: this.spreadSize * 0.5,
				starLife: this.starLife * 0.6,
				starLifeVariation: this.starLifeVariation,
				starDensity: 1.4,
				color: this.pistilColor,
				glitter: 'light',
				glitterColor: this.pistilColor === COLOR.Gold ? COLOR.Gold : COLOR.White
			});
			innerShell.burst(x, y);
		}

		if (this.streamers) {
			const innerShell = new Shell({
				spreadSize: this.spreadSize * 0.9,
				starLife: this.starLife * 0.8,
				starLifeVariation: this.starLifeVariation,
				starCount: Math.floor(Math.max(6, this.spreadSize / 45)),
				color: COLOR.White,
				glitter: 'streamer'
			});
			innerShell.burst(x, y);
		}

		// Queue burst flash render
		BurstFlash.add(x, y, this.spreadSize / 4);

		// Play sound, but only for "original" shell, the one that was launched.
		// We don't want multiple sounds from pistil or streamer "sub-shells".
		// This can be detected by the presence of a comet.
		if (this.comet) {
			// Scale explosion sound based on current shell size and selected (max) shell size.
			// Shooting selected shell size will always sound the same no matter the selected size,
			// but when smaller shells are auto-fired, they will sound smaller. It doesn't sound great
			// when a value too small is given though, so instead of basing it on proportions, we just
			// look at the difference in size and map it to a range known to sound good.
			const maxDiff = 2;
			const sizeDifferenceFromMaxSize = Math.min(maxDiff, shellSizeSelector() - this.shellSize);
			const soundScale = (1 - sizeDifferenceFromMaxSize / maxDiff) * 0.3 + 0.7;
			soundManager.playSound('burst', soundScale);
		}
	}
	
}



const BurstFlash = {
	active: [],
	_pool: [],

	_new() {
		return {}
	},

	add(x, y, radius) {
		const instance = this._pool.pop() || this._new();

		instance.x = x;
		instance.y = y;
		instance.radius = radius;

		this.active.push(instance);
		return instance;
	},

	returnInstance(instance) {
		this._pool.push(instance);
	}
};



// Helper to generate objects for storing active particles.
// Particles are stored in arrays keyed by color (code, not name) for improved rendering performance.
function createParticleCollection() {
	const collection = {};
	COLOR_CODES_W_INVIS.forEach(color => {
		collection[color] = [];
	});
	return collection;
}


// Star properties (WIP)
// -----------------------
// transitionTime - how close to end of life that star transition happens

const Star = {
	// Visual properties
	drawWidth: 3,
	airDrag:0.98,
	airDragHeavy: 0.992,
	
	// Star particles will be keyed by color
	active: createParticleCollection(),// hình như tạo ra các star
	_pool: [],

	_new() {
		return {};
	},

	add(x, y, color, angle, speed, life, speedOffX, speedOffY) {
		const instance = this._pool.pop() || this._new();
		instance.visible = true;
		instance.heavy = false;
		instance.x = x;
		instance.y = y;
		instance.prevX = x;
		instance.prevY = y;
		instance.color = color;
		instance.speedX = Math.sin(angle) * speed + (speedOffX || 0);;
		instance.speedY = Math.cos(angle) * speed + (speedOffY || 0);//góc bay theo chiều y
		instance.life = life;
		instance.fullLife = life;
		instance.spinAngle = Math.random() * PI_2;
		instance.spinSpeed = 0.8;
		instance.spinRadius = 0;
		instance.sparkFreq = 0; // ms between spark emissions
		instance.sparkSpeed = 1;
		instance.sparkTimer = 0;
		instance.sparkColor = color;
		instance.sparkLife = 750;
		instance.sparkLifeVariation = 0.25;
		instance.strobe = false;

		this.active[color].push(instance);
		return instance;
	},
	addV2(x, y, color, angle, speed, life, speedOffX, speedOffY) {
		const instance = this._pool.pop() || this._new();
		instance.visible = true;
		instance.heavy = false;
		instance.x = x;
		instance.y = y;
		instance.prevX = x;
		instance.prevY = y;
		instance.color = color;
		 instance.speedX = (speedOffX || 0) ;//góc bay theo chiều x
		console.log(speedOffX);
		instance.speedY = Math.cos(angle) * speed + (speedOffY || 0);//góc bay theo chiều y
		instance.life = life;
		instance.fullLife = life;
		instance.spinAngle = Math.random() * PI_2;
		instance.spinSpeed = 0.8;
		instance.spinRadius = 0;
		instance.sparkFreq = 0; // ms between spark emissions
		instance.sparkSpeed = 1;
		instance.sparkTimer = 0;
		instance.sparkColor = color;
		instance.sparkLife = 750;
		instance.sparkLifeVariation = 0.25;
		instance.strobe = false;

		this.active[color].push(instance);
		return instance;
	},

	// Public method for cleaning up and returning an instance back to the pool.
	returnInstance(instance) {
		// Call onDeath handler if available (and pass it current star instance)
		instance.onDeath && instance.onDeath(instance);
		// Clean up
		instance.onDeath = null;
		instance.secondColor = null;
		instance.transitionTime = 0;
		instance.colorChanged = false;
		// Add back to the pool.
		this._pool.push(instance);
	}
};


const Spark = {
	// Visual properties
	drawWidth: 0, // set in `configDidUpdate()`
	airDrag: airDrag,
	
	
	// Star particles will be keyed by color
	active: createParticleCollection(),
	_pool: [],

	_new() {
		return {};
	},

	add(x, y, color, angle, speed, life) {
		const instance = this._pool.pop() || this._new();

		instance.x = x;
		instance.y = y;
		instance.prevX = x;
		instance.prevY = y;
		instance.color = color;
		instance.speedX = Math.sin(angle) * speed;
		instance.speedY = Math.cos(angle) * speed;
		instance.life = life;
		this.active[color].push(instance);
		return instance;
	},

	// Public method for cleaning up and returning an instance back to the pool.
	returnInstance(instance) {
		// Add back to the pool.
		this._pool.push(instance);
	}
};




const soundManager = {
	baseURL: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/',


	ctx: new (window.AudioContext || window.webkitAudioContext),

	sources: {
		lift: {
			volume: Math.random()+0.5,
			playbackRateMin: 0.85,
			playbackRateMax: 0.95,
			fileNames: [
				'lift1.mp3',
				'lift2.mp3',
				'lift3.mp3'
				// 'lift4.mp3'
	
			]
		},
		burst: {
			volume: Math.random()+0.5,
			playbackRateMin: 0.8,
			playbackRateMax: 0.9,
			fileNames: [
				'burst1.mp3',
				'burst2.mp3'
				
			]
		},
		burstSmall: {
			volume: 0.25,
			playbackRateMin: 0.8,
			playbackRateMax: 1,
			fileNames: [
				'burst-sm-1.mp3',
				'burst-sm-2.mp3'
			]
		},
		crackle: {
			volume: 0.2,
			playbackRateMin: 1,
			playbackRateMax: 1,
			fileNames: ['crackle1.mp3']
		},
		crackleSmall: {
			volume: 0.3,
			playbackRateMin: 1,
			playbackRateMax: 1,
			fileNames: ['crackle-sm-1.mp3']
		}
	},

	preload() {
		const allFilePromises = [];

		function checkStatus(response) {
			if (response.status >= 200 && response.status < 300) {
				return response;
			}
			const customError = new Error(response.statusText);
			customError.response = response;
			throw customError;
		}

		const types = Object.keys(this.sources);
		types.forEach(type => {
			const source = this.sources[type];
			const { fileNames } = source;
			const filePromises = [];
			fileNames.forEach(fileName => {
				const fileURL = this.baseURL + fileName;
				// Promise will resolve with decoded audio buffer.
				const promise = fetch(fileURL)
					.then(checkStatus)
					.then(response => response.arrayBuffer())
					.then(data => new Promise(resolve => {
						this.ctx.decodeAudioData(data, resolve);
					}));

				filePromises.push(promise);
				allFilePromises.push(promise);
			});

			Promise.all(filePromises)
				.then(buffers => {
					source.buffers = buffers;
				});
		});

		return Promise.all(allFilePromises);
	},

	pauseAll() {
		this.ctx.suspend();
	},

	resumeAll() {
		// Play a sound with no volume for iOS. This 'unlocks' the audio context when the user first enables sound.
		this.playSound('lift', 0);
		// Chrome mobile requires interaction before starting audio context.
		// The sound toggle button is triggered on 'touchstart', which doesn't seem to count as a full
		// interaction to Chrome. I guess it needs a click? At any rate if the first thing the user does
		// is enable audio, it doesn't work. Using a setTimeout allows the first interaction to be registered.
		// Perhaps a better solution is to track whether the user has interacted, and if not but they try enabling
		// sound, show a tooltip that they should tap again to enable sound.
		setTimeout(() => {
			this.ctx.resume();
		}, 250);
	},

	// Private property used to throttle small burst sounds.
	_lastSmallBurstTime: 0,

	/**
	 * Play a sound of `type`. Will randomly pick a file associated with type, and play it at the specified volume
	 * and play speed, with a bit of random variance in play speed. This is all based on `sources` config.
	 *
	 * @param  {string} type - The type of sound to play.
	 * @param  {?number} scale=1 - Value between 0 and 1 (values outside range will be clamped). Scales less than one
	 *                             descrease volume and increase playback speed. This is because large explosions are
	 *                             louder, deeper, and reverberate longer than small explosions.
	 *                             Note that a scale of 0 will mute the sound.
	 */
	playSound(type, scale = 1) {
		// Ensure `scale` is within valid range.
		scale = MyMath.clamp(scale, 0, 1);

		// Disallow starting new sounds if sound is disabled, app is running in slow motion, or paused.
		// Slow motion check has some wiggle room in case user doesn't finish dragging the speed bar
		// *all* the way back.
		if (!canPlaySoundSelector() || simSpeed < 0.95) {
			return;
		}

		// Throttle small bursts, since floral/falling leaves shells have a lot of them.
		if (type === 'burstSmall') {
			const now = Date.now();
			if (now - this._lastSmallBurstTime < 20) {
				return;
			}
			this._lastSmallBurstTime = now;
		}

		const source = this.sources[type];

		if (!source) {
			throw new Error(`Sound of type "${type}" doesn't exist.`);
		}

		const initialVolume = source.volume;
		const initialPlaybackRate = MyMath.random(
			source.playbackRateMin,
			source.playbackRateMax
		);

		// Volume descreases with scale.
		const scaledVolume = initialVolume * scale;
		// Playback rate increases with scale. For this, we map the scale of 0-1 to a scale of 2-1.
		// So at a scale of 1, sound plays normally, but as scale approaches 0 speed approaches double.
		const scaledPlaybackRate = initialPlaybackRate * (2 - scale);

		const gainNode = this.ctx.createGain();
		gainNode.gain.value = scaledVolume;

		const buffer = MyMath.randomChoice(source.buffers);
		const bufferSource = this.ctx.createBufferSource();
		bufferSource.playbackRate.value = scaledPlaybackRate;
		bufferSource.buffer = buffer;
		bufferSource.connect(gainNode);
		gainNode.connect(this.ctx.destination);
		bufferSource.start(0);
	}
};


// Kick things off.

function setLoadingStatus(status) {
	document.querySelector('.loading-init__status').textContent = status;
}

// CodePen profile header doesn't need audio, just initialize.
if (IS_HEADER) {
	init();
} else {
	// Allow status to render, then preload assets and start app.
	setLoadingStatus('Lighting Fuses');
	setTimeout(() => {
		soundManager.preload()
			.then(
				init,
				reason => {
					// Codepen preview doesn't like to load the audio, so just init to fix the preview for now.
					init();
					// setLoadingStatus('Error Loading Audio');
					return Promise.reject(reason);
				}
			);
	}, 0);
}



		
/**
 * Tạo đội hình quả cầu và 2 vòng tròn xung quanh
 * @param {*} k 
 * @param {*} centerX 
 * @param {*} centerY 
 * @param {*} radius2 
 * @param {*} formationLifetime 
 * @param {*} color 
 * @param {*} pistilColor 
 * @param {*} tiltAngleX 
 * @param {*} tiltAngleY 
 * @param {*} speed 
 * @returns 
 */
function seqDroneBom(centerX, centerY, radius2,formationLifetime=10000,{color=COLOR.Blue,size=3, pistilColor=COLOR.White, tiltAngleX =Math.PI/2, tiltAngleY =Math.PI/3, speed = Math.PI / 900}={}){
	let mmm = drones.length
	let k =0;
	let soluong = 480*radius2/125;
	for(let i=0;i<soluong;i++){
		drones.push(new Drone(-1,-1,size,0,0,COLOR.Blue,formationLifetime))
	}
	let formation = new Formation();
	let formation3 = new Formation();
	let formation4 = new Formation();
	let formation2 = new Formation();
	
	for(let i = 0;i<soluong; i++){
		if(i<soluong/8){
			formation2.addDrone(drones[i+k+mmm]);
		}else if (i<soluong/4){
			formation3.addDrone(drones[i+k+mmm]);
		}else if (i<soluong*3/4){	
			formation4.addDrone(drones[i+k+mmm]);
		}else {
			formation.addDrone(drones[i+k+mmm]);
		}		
	}
	formation.setFormation(centerX, centerY,formationLifetime,radius2/1.67);
	formation2.setFormation(centerX, centerY,formationLifetime,radius2);
	formation3.setFormation(centerX, centerY,formationLifetime,radius2);
	formation4.setFormation(centerX, centerY,formationLifetime,radius2/1.97);




	formation.setRadiusDrone(1.5)
	formation4.setRadiusDrone(1.5)

	formation2.setReduceSize(-1);
	formation3.setReduceSize(-1);
	formation.setRandomColorV2(formationLifetime,COLOR.White,undefined,0.9)
	formation4.setRandomColorV2(formationLifetime,COLOR.White,undefined,0.9)


	formation2.setCircleFormationV3({ tiltAngleX:tiltAngleX ,tiltAngleY: tiltAngleY, speed : Math.PI / 900});
	formation3.setCircleFormationV3({ tiltAngleX:-tiltAngleX,tiltAngleY: -tiltAngleY, speed : Math.PI / 900});
	
	formation4.setSphereFormation();
	formation.setSphereFormation();
	setTimeout(() => {
		formation.setRandomColorV2()
		formation2.setRandomColorV2()
		formation3.setRandomColorV2()
		formation4.setRandomColorV2()
		
	}, formationLifetime-2000);
	
	return 
}
/**
 * Tạo ufo xay tròn ngang 
 * @param {*} k - vị trí index cuối cùng của drone
 * @param {*} x - vị trí tâm x
 * @param {*} y - vị trí tâm y
 * @param {*} radius - bán kính vòng tròn
 * @param {*} color - màu của đội hình
 * @param {*} formationLifetime - thời gian tồn tại của đội hình
 */
function seqDroneUFO(formationLifetime=10000,x=maxW/2, y=maxH/2-350,{agn=1, radius = 300, color=COLOR.Blue,speed=Math.PI/900,mer,merColor,size=3,laplanh=false}={}){
	let mmm = drones.length
	let k=0
	for(let i=0;i<380;i++){
		drones.push(new Drone(-1, -1, size, 0, 0,COLOR.Blue,formationLifetime));
	}
	let formation1 =new Formation();
	let formation2 =new Formation();
	let formation3 =new Formation();
	let formation4 =new Formation();
	let formation5 =new Formation();

	let soluong =  380 ;
	for(let i = 0;i<soluong; i++){
		if(i<soluong*3/19){
			formation1.addDrone(drones[i+k+mmm]);
		}
		else if(i<soluong*3*2/19){
			formation5.addDrone(drones[i+k+mmm]);
		}
		else if(i<soluong*10/19){
			formation4.addDrone(drones[i+k+mmm]);
		}
		else if(i<soluong*14/19){
			formation2.addDrone(drones[i+k+mmm]);
		}
		else{
			formation3.addDrone(drones[i+k+mmm]);
		}

	}

	formation1.setColor(color);
	formation2.setColor(color);
	formation3.setColor(color);
	formation4.setColor(color);
	formation5.setColor(color);


	
	formation1.setFormation(x, y-30,formationLifetime, radius)
	formation2.setFormation(x, y-15,formationLifetime, radius+25)
	formation3.setFormation(x, y,formationLifetime, radius+50)
	formation4.setFormation(x, y+15,formationLifetime, radius+25)
	formation5.setFormation(x, y+30,formationLifetime, radius)
	
	formation1.setCircleFormationV2(agn,undefined,speed);
	formation2.setCircleFormationV2(agn,undefined,speed);
	formation3.setCircleFormationV2(agn,undefined,speed);
	formation4.setCircleFormationV2(agn,1,speed);
	formation5.setCircleFormationV2(agn,1,speed);
	if(mer){
		seqDroneColorMer(formation1,merColor,formationLifetime)
		seqDroneColorMer(formation2,merColor,formationLifetime)
		seqDroneColorMer(formation3,merColor,formationLifetime)
		seqDroneColorMer(formation4,merColor,formationLifetime)
		seqDroneColorMer(formation5,merColor,formationLifetime)
	}
	if(laplanh){
		formation1.setRandomColorV2(formationLifetime,undefined,undefined,0.95)
		formation2.setRandomColorV2(formationLifetime,undefined,undefined,0.95)
		formation3.setRandomColorV2(formationLifetime,undefined,undefined,0.95)
		formation4.setRandomColorV2(formationLifetime,undefined,undefined,0.95)
		formation5.setRandomColorV2(formationLifetime,undefined,undefined,0.95)
	}
	setTimeout(() => {
		formation1.setRandomColorV2()
		formation2.setRandomColorV2()
		formation3.setRandomColorV2()
		formation4.setRandomColorV2()
		formation5.setRandomColorV2()
	}, formationLifetime-2000);


}
/**
 * Reset lại drone tới vị trí x
 * @param {*} x 
 * @returns 
 */
function resetDrones(x){
	for(let i = 0;i< x;i++){
		drones[i]=new Drone(0, 0, 5, 0, 0,COLOR.Red,200000000);
	}
	return 0;
}
function resetFormation(formation){
	formation.drones.forEach(drone => {
		drone = new Drone(0, 0, 5, 0, 0,COLOR.Red,200000000);
	})
}
/**
 * Khiến cho 1 formation di chuyển theo hình tròn
 * @param {*} formation - formation muốn di chuyển
 * @param {*} centerX - tọa độ x của tâm vòng tròn
 * @param {*} centerY - tọa độ y của tâm vòng tròn
 * @param {*} radius - bán kính vòng tròn
 * @param {*} formationLifetime - thời gian di chuyển 
 * @param {*} tiltAngleX - góc nghiêng theo trục X
 * @param {*} tiltAngleY - góc nghiêng theo trục Y
 * @param {*} speed - tốc độ di chuyển
 */
function seqFormationMove(formation,centerX, centerY, radius, formationLifetime=100000, tiltAngleX = Math.PI / 2, tiltAngleY = Math.PI / 2, speed = Math.PI / 900) {
	let time = 0; // Biến thời gian để tính góc xoay
	const angleStep = Math.PI/180; // Khoảng cách giữa các drone trên vòng tròn
	const cosTiltX = Math.cos(tiltAngleX); // Tính cos của góc nghiêng X
	const sinTiltX = Math.sin(tiltAngleX); // Tính sin của góc nghiêng X
	const cosTiltY = Math.cos(tiltAngleY); // Tính cos của góc nghiêng Y
	const sinTiltY = Math.sin(tiltAngleY); // Tính sin của góc nghiêng Y
	const startTime = Date.now(); // Thời điểm bắt đầu

	
	// Hàm cập nhật đội hình theo thời gian
	const update = () => {
		const currentTime = Date.now(); // Lấy thời gian hiện tại
		const elapsedTime = currentTime - startTime; // Tính thời gian đã trôi qua

		// Kiểm tra nếu đã hết thời gian tồn tại đội hình
		if (elapsedTime >= formationLifetime) {
			formation.reset();
			return; // Dừng quy trình
		}

		time += speed; // Tăng thời gian để thay đổi góc quay
		const rotationAngle = time; // Góc quay hiện tại
		
		// Cập nhật vị trí di chuyển của đội hình
		const angle = angleStep + rotationAngle; // Góc quay cho mỗi drone
		const x = radius * Math.cos(angle); // Tọa độ X trên vòng tròn
		const y = radius * Math.sin(angle); // Tọa độ Y trên vòng tròn

		// Biến đổi 3D với góc nghiêng trên cả hai trục
		const transformedX = x * cosTiltY - y * sinTiltX; // Trục X biến đổi theo nghiêng Y và X
		const transformedY = y * cosTiltX - x * sinTiltY; // Trục Y biến đổi theo nghiêng X và Y
		

		// Đặt lại vị trí drone cộng thêm offset
		let mx = centerX + transformedX ;
		let my = centerY + transformedY ;

		formation.setCenter(mx, my);
		// Gọi lại hàm cập nhật liên tục
		requestAnimationFrame(update);
	};

	// Bắt đầu cập nhật đội hình
	update();
}
function seqFormationCircle(formation,centerX, centerY,radius,formationLifetime,speed = Math.PI / 600,agn=0,check=1, tiltAngle = -Math.PI / 2.05) {
	let time = 0; // Biến thời gian để tính góc xoay
	// let formationLifetime = this.formationLifetime; // Thời gian tồn tại đội hình
	const angleStep =  Math.PI ; // Khoảng cách giữa các drone trên vòng tròn
	const cosTilt = Math.cos(tiltAngle); // Tính cos của góc nghiêng
	const sinTilt = Math.sin(tiltAngle); // Tính sin của góc nghiêng
	// const color = this.drones[0].color; // Màu sắc mặc định của drone
	let elapsedTime = 0; // Biến để theo dõi thời gian đã trôi qua
	const startTime = Date.now(); // Thời điểm bắt đầu
	// Hàm cập nhật đội hình theo thời gian
	const update = () => {
		//tạo hiệu ứng mở rộng
		radius = radius + agn*Math.sin(time);
		centerY = centerY + agn* Math.cos(time)/10;
		// Kiểm tra nếu đã hết thời gian tồn tại đội hình
		const currentTime = Date.now(); // Lấy thời gian hiện tại
		const elapsedTime = currentTime - startTime; // Tính thời gian đã trôi qua

		// Kiểm tra nếu đã hết thời gian tồn tại đội hình
		if (elapsedTime >= formationLifetime) {
			//trả về vị trí ban đầu
			return; // Dừng quy trình
		}
		
		time += speed; // Tăng thời gian để thay đổi góc quay
		const rotationAngle = time; // Góc quay hiện tại

	
			 // Màu sắc mặc định
		const angle = angleStep+ rotationAngle*check; // Góc quay cho mỗi drone
		const x = radius * Math.cos(angle); // Tọa độ X trên vòng tròn
		const y = radius * Math.sin(angle); // Tọa độ Y trên vòng tròn

		// Biến đổi 3D với góc nghiêng tiltAngle
		const transformedX = x; // Trục X giữ nguyên
		const transformedY = y * cosTilt; // Trục Y bị thu nhỏ theo cos(tiltAngle)
		const depth = y * sinTilt; // Chiều sâu để tạo hiệu ứng 3D

		// Tính phối cảnh dựa trên độ sâu
        const perspective = 1 / (1 + depth / 600); // Thay đổi độ phối cảnh (300 là độ sâu giả định)
        const adjustedX = transformedX * perspective; // Điều chỉnh theo phối cảnh
        const adjustedY = transformedY * perspective; // Điều chỉnh theo phối cảnh
        const sizeFactor = perspective; // Kích thước thay đổi theo phối cảnh
		
		// Đặt lại vị trí drone
		let size = (2*sizeFactor)<0?-2*sizeFactor:2*sizeFactor
		// formation.setCenter(centerX + transformedX,centerY + transformedY)
		formation.setCenter(centerX + adjustedX, centerY + adjustedY);
		formation.setRadiusDrone(size*1.2)
        formation.radius=sizeFactor*50
		// const colorIntensity = Math.floor((1 - perspective) * 255);
        // formation.setColor(`rgb(${colorIntensity}, ${255 - colorIntensity}, 200)`);


		// Gọi lại hàm cập nhật liên tục
		requestAnimationFrame(update);
	};

	// Bắt đầu cập nhật đội hình
	update();
}


function seqDroneGalaxy(x,time =100000,centerX=maxW/2, centerY=maxH/2){
	
	let mattroi = new Formation()
	let thuy = new Formation()
	let kim = new Formation()
	let traidat = new Formation()
	let hoa = new Formation()
	let moc = new Formation()
	let tho = new Formation()
	
	
	let kk =200;
	let i = 0;
	for(let i = 0;i<200;i++){
		mattroi.addDrone(drones[i])
	}
	for(let i = 0 ; i< 100;i++){
		traidat.addDrone(drones[i+200])
	}
	for(let i = 0 ; i<30;i++){
		thuy.addDrone(drones[i+100+200])
	}
	for(let i = 0 ; i<60;i++){
		kim.addDrone(drones[i+100+30+200])
	}
	for(let i = 0 ; i<200;i++){
		hoa.addDrone(drones[i+100+30+60+200+200])
	}
	for(let i = 0 ; i<200;i++){
		moc.addDrone(drones[i+100+30+60+200+200+200])
	}
	for(let i = 0 ; i<200;i++){
		tho.addDrone(drones[i+100+30+60+200+200+200])
	}
	
	

	// for(let i = 0; i<300)
	let radius= 50
	
	// Sao Thủy
	thuy.setFormation(centerX+170, centerY, time, radius * 0.2);
	// Sao Kim
	kim.setFormation(centerX+230, centerY, time, radius * 0.4);
	// Trái Đất
	traidat.setFormation(centerX+270, centerY, time,radius * 1);
	hoa.setFormation(centerX+400, centerY, time,radius * 1.2);
	moc.setFormation(centerX+450, centerY, time,radius * 1.9);
	tho.setFormation(centerX+500, centerY, time,radius * 2);
	mattroi.setFormation(centerX,centerY,time,radius*1)
	

	// Thiết lập màu trực tiếp
	mattroi.setColor(COLOR.Red); // Mặt Trời: Cam rực rỡ
	thuy.setColor("#B0B0B0"); // Sao Thủy: Xám bạc
	kim.setColor("#D9C68E"); // Sao Kim: Vàng nhạt
	traidat.setColor("#2C75FF"); // Trái Đất: Xanh đại dương
	hoa.setColor("#FF4500"); // Sao Hỏa: Đỏ cam
	moc.setColor("#D2B48C"); // Sao Mộc: Nâu nhạt
	tho.setColor("#F5DEB3"); // Sao Thổ: Vàng nhạt
	// thienvuong.setColor("#AFDBF5"); // Sao Thiên Vương: Xanh lục nhạt
	// hai.setColor("#2E6EFF");

	mattroi.setSphereFormation(0,0.02)
	thuy.setSphereFormation(0.03)
	kim.setSphereFormation(0.02)
	traidat.setSphereFormation(0.01)
	hoa.setSphereFormation(0.005)
	tho.setSphereFormation(0.005)
	// thienvuong.setSphereFormation()
	// hai.setSphereFormation()
	let nn=100
	seqFormationCircle(thuy,centerX,centerY-160,270+nn,time,Math.PI/200)
	seqFormationCircle(kim,centerX,centerY-160,270+nn,time,Math.PI/300)
	seqFormationCircle(traidat,centerX,centerY-160,270+nn,time,Math.PI/400)
	seqFormationCircle(hoa,centerX,centerY-160,270+nn,time,Math.PI/500)
	seqFormationCircle(tho,centerX,centerY-160,270+nn,time,Math.PI/600)

	return  x +1000

}
/**
 * làm cờ việt nam nma đang bí đoạn tạo ngôi sao(hoãn)
 * @param {*} x 
 * @param {*} startX 
 * @param {*} startY 
 * @param {*} width 
 * @param {*} height 
 * @param {*} time 
 */
function seqDroneFlagVN(x, startX=100, startY=100, width=100, height=100, time=200000){
	let form = new Formation()
	let star1 = new Formation()
	let star2 = new Formation()
	let star3 = new Formation()
	for(let i = 0 ; i < 50	; i++){
		form.addDrone(drones[i])
	}
	for(let i = 0 ; i < 100; i++){
		star1.addDrone(drones[i+135])
	}
	// for(let i = 0 ; i < 10; i++){
	// 	star2.addDrone(drones[i+120+10])
	// }
	// for(let i = 0 ; i < 10; i++){
	// 	star3.addDrone(drones[i+120+20])
	// }


	star1.formationLifetime= time
	star2.formationLifetime= time
	star3.formationLifetime= time

	form.setRadiusDrone(5)
	star1.setRadiusDrone(5)
	star2.setRadiusDrone(5)
	star3.setRadiusDrone(5)

	form.setFormation(100,100,time,100)

	form.setColor('red')
	star1.setColor(COLOR.Gold)
	star2.setColor(COLOR.Gold)
	star3.setColor(COLOR.Gold)

	seqDroneColorMer(form,100000)
	form.setRectangleFormation(startX,startY,width,height)
	form.setCircleFormationV3()
	// star1.setStarFormationV2(maxW/2,maxH/2-170,100,100)
	// star2.setStarFormation(maxW/2,maxH/2-170,60,30)
	// star3.setStarFormation(maxW/2,maxH/2-170,50,20)
	star1.setStarFormation(maxW/2,maxH/2-170, 50, 25);
	
	
}

/**
 * Đổi màu lần lượt liên tục cho 1 formation
 * @param {*} formation 
 * @param {*} time 
 * @param {*} hz 
 */
async function seqDroneColorMer(formation,color, time=10000, hz=100){
	let elapsedTime = 0; // Thời gian đã  qua
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	let cou = formation.lenght;
	while (elapsedTime < time) {
		// Thay đổi màu sắc đội hình tuần tự
		await formation.setColorV2(color,hz);

		// Chờ trước khi thực hiện lần tiếp theo
		await delay(hz);

		// Tăng thời gian đã trôi qua
		elapsedTime += hz;
	}
	setTimeout(() => {
		return
	}, time);
}




function skyFallSeq(){
	
	
	// 
	let shell=new Shell({...shellTypes['Falling Leaves'](5)})
	let floral = new Shell({...shellTypes['Floral'](1)})
	let falling = new Shell({...shellTypes['Falling Leaves'](1)})
	seqDroneTextSkyFall(8000)
	setTimeout(() => {
		let formartion = droneCreateFormation(70,2000,2)
		formartion.setRandomColorV2(3000,COLOR.White)
	}, 8001);
	playMusic('Music/skyfall.mp3');
	setTimeout(() => {
		floral.launch(0.5,0.5)
		seqTripleRingShell(0.5,0.5,3)
	}, 8000);
	setTimeout(() => {
		seqDoubleCrysanthemum(0.3,0.5)
		setTimeout(() => {
			seqDoubleCrysanthemum(0.7,0.5)
		}, 1000);
	}, 13000);
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Wave'](4),streamers:true})
		seqDoubleShell(0.35,0.5,shell)
	}, 20000);
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Hearth'](3),strobe:true})
		seqDoubleShell(0.2,0.5,shell)
	}, 24000);
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Fish'](3),glitter:true})
		seqDoubleShell(0.35,0.5,shell)
	}, 25000);
	setTimeout(() => {
		seqTripleRingShell(0.5,0.5)
		setTimeout(() => {
			let shell1 = new Shell({...shellTypes['Crysanthemum'](5),strobe:true})
			let shell2 = new Shell({...shellTypes['Hearth'](3),strobe:true})
			seqTripleShell(0.1,0.3,shell2,shell1,{strobe:true,crackle:true})
		}, 3000);
	}, 28000);
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Snow'](3),strobe:true})
		seqTripleShell(0.1,0.3,shell)
	}, 33000);
	setTimeout(() => {
		seqTripleShell(0.1,0.3,new Shell({...shellTypes['Strobe'](3),crackle:true}))
	}, 38000);
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Lotus'](5),strobe:true})
		seqTripleShell(0.15,0.3,undefined,shell,{crackle:true})
	}, 41000);
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Crysanthemum'](5),strobe:true})
		let shell2=new Shell({...shellTypes['Horse Tail'](2),strobe:true})
		seqTripleShell(0.2,0.3,shell2,shell)
		setTimeout(() => {
			seqTripleShell(0.25,0.3,undefined,undefined,{strobe:true})
		}, 4000);
		setTimeout(() => {
			seqTripleShell(0.3,0.3,undefined,undefined,{floral:true})
		}, 8000);
	}, 44000);
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Snow'](5),strobe:true,crackle:true})
		seqTripleShell(0.35,0.3,new Shell({...shellTypes['Horse Tail'](2),strobe:true}),shell)
	}, 51000);
	setTimeout(() => {
		seqQuarShell(0.1,0.5)
	}, 55000);
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Crysanthemum'](5),strobe:true,crackle:true})
		let shell2=new Shell({...shellTypes['Floral'](2),strobe:true})
		seqTripleShell(0.1,0.2,shell2,shell)
	}, 60000);
	let i = 1;
	setTimeout(() => {
		seqTripleRingShell(0.5,0.5,3)
		setTimeout(() => {
			let shell = new Shell({...shellTypes['Fish'](2),strobe:true,crackle:true})
			seqQuarShell(0.1,0,shell)
		}, 3000);
		setTimeout(() => {
			seqQuarShell(0.2,0)
		},7000);
		setTimeout(() => {
			let shell = new Shell({...shellTypes['Wave'](4),strobe:true,crackle:true})
			seqQuarShell(0.3,0,shell)
		}, 10000);
		setTimeout(() => {
			let shell = new Shell({...shellTypes['Crysanthemum'](0.43),strobe:true,crackle:true})
			seqTripleShell(0.3,0,shell)
		}, 15000);
	}, 60000+4000);
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Smiley'](5),strobe:true,crackle:true})
		let shell2=new Shell({...shellTypes['Snow'](2),crackle:true})
		seqTripleShell(0.1,0.2,shell2,shell)
		setTimeout(() => {
			seqQuarShell(0.2,-0.3)
		},2000);
	}, 60000+16000);
	//skyfalll nhipj1 spark
	setTimeout(() => {
		let shell = new Shell({...shellTypes['Falling Leaves'](2)})
		shell.launch(0.5,-0.5)
		
	}, 60000+22000);
	setTimeout(() => {
		seqSparkLeft(0,0.6,-0.3,20)
		setTimeout(() => {
			seqSparkRight(0.4,1,-0.7,20)
		}, 2000);
		setTimeout(() => {
			seqSparkFull(0,1,15,0)
		}, 5000);
	}, 60000+25000);
	setTimeout(() => {
		seqTripleRingShell(0.5,0.3,2)
		setTimeout(() => {
			let shell = new Shell({...shellTypes['Floral'](4)})
			seqTripleShell(0.2,0.4,shell)
		}, 1000);
		floral.launch(-1,0.5)
	}, 60000+27000);
	setTimeout(() => {
		let shell2 = new Shell({...shellTypes['Falling Leaves'](2)})
		shell2.launch(0.5,-0.5)
		let shell = new Shell({...shellTypes['Horse Tail'](2)})
		seqTripleShell(0.25,0.4,shell)
		setTimeout(() => {
			seqDoubleCrysanthemum(0.7,0.5)
		}, 1000);
		setTimeout(() => {
			seqSparkRight(0,0.5,-0.7,20)
			seqSparkLeft(0.5,1,-0.3,20)
		}, 2000);
		floral.launch(-1,0.5)
	}, 60000+30000);
	setTimeout(() => {
		seqDoubleCrysanthemum(0.3,0.5)
		setTimeout(() => {
			seqDoubleCrysanthemum(0.7,0.5)
		}, 1000);
		setTimeout(() => {
		}, 2000);
		seqSparkRight(0.4,1,-0.7,20)
		setTimeout(() => {
			seqSparkLeft(0,0.6,-0.3,20)
		}, 2000);
		setTimeout(() => {
			seqSparkFull(0,1,10,0)
		}, 5000);
	}, 60000+35000);
	setTimeout(() => {
		new Shell({...shellTypes['Falling Leaves'](4)}).launch(0.3,-0.5)
		
	}, 60000+36000);
	setTimeout(() => {
		setTimeout(() => {
			for(let i =0;i<5;i++){
				seqSpark(0.1,0.9,-0.3,undefined,20,0)
				seqSpark(0.1,0.9,-0.2,undefined,20,1)		
			}
		}, 3000);
		shell.launch(0.5,0.5)
		floral.launch(0.5,0.1)
		setTimeout(() => {
			let shell = new Shell({...shellTypes['Ring'](4),strobe:true})
			seqDoubleShell(0.3,-0.2,shell)

		}, 5000);
		setTimeout(() => {
			shell = new Shell({...shellTypes['Bird'](4),strobe:true,color:COLOR.Blue})
			seqQuarShell(0.2,-0.2,shell,new Shell({...shellTypes['Crysanthemum'](5),crackle:true,pistil:true}))
		}, 7000);
	}, 60000+41000);
	setTimeout(() => {
		seqTripleRingShell(0.5,0.5,3)
		setTimeout(() => {
			seqDoubleShell(0.3,0.4,new Shell({...shellTypes['Hearth'](3),crossette:true}))
		}, 3000);
		setTimeout(() => {
			seqTripleShell(0.2,0.1,new Shell({...shellTypes['Smiley'](3),crossette:true}))
		}, 5000);
		setTimeout(() => {
			seqDoubleShell(0.2,0.1)
		}, 7000);
	}, 60000+49000);
	//hết cao nhịp 1
	i =2;
	setTimeout(() => {
		seqDoubleShell(0.25,0.4,undefined,{strobe:true})
		setTimeout(() => {
			seqDoubleShell(0.1,0.1)
		}, 2000);
	}, 60000*2+2000);
	setTimeout(() => {
		seqDoubleShell(0.25,0.4,undefined,{strobe:true})

	}, 60000*2+6000);
	
	setTimeout(() => {
		falling.launch(0.5,0.1)
		seqSparkLeft(0,0.9,-0.2,20)
		setTimeout(() => {
			seqSparkRight(0.1,1,-0.7,20)
		}, 1800);
		setTimeout(() => {
			seqTripleShell(0.25,-0.1,new Shell({...shellTypes['Floral'](3)}),new Shell({...shellTypes['Smiley'](4),strobe:true}))
		}, 3000);
	}, 60000*2+11000);
	setTimeout(() => {
		seqDoubleShell(0.25,0.4,undefined,{strobe:true,crackle:true})
		setTimeout(() => {
			seqQuarShell(0.3,-0.3,new Shell({...shellTypes['Snow'](2)}),new Shell({...shellTypes['Crackle'](2)}))
		}, 3000);
		floral.launch(-1,0.1)
	}, 60000*2+17000);
	
	
	setTimeout(() => {
		seqTripleRingShell(0.5,0.5,3)
		setTimeout(() => {
			seqShellAllInOne(0.3,0.7,new Shell({...shellTypes['Crysanthemum'](2)}),undefined,1,600,-0.3)
			setTimeout(() => {
				seqShellAllInOne(0.25,0.75,new Shell({...shellTypes['Crysanthemum'](3)}),undefined,1,600,-0.2)
			}, 600);
			setTimeout(() => {
				seqShellAllInOne(0.2,0.8,new Shell({...shellTypes['Crysanthemum'](4)}),undefined,1,600,-0.1)
			}, 1200);
			setTimeout(() => {
				seqShellAllInOne(0.15,0.85,new Shell({...shellTypes['Crysanthemum'](5)}),undefined,1,600,0)
			}, 1800);
		}, 2800);
		setTimeout(() => {
			seqTripleV2(0.1,0.5)
			seqTripleV2(0.9,0.5)
		}, 3000);
	}, 60000*2+20000);
	setTimeout(() => {
		shell = new Shell({...shellTypes['Falling Leaves'](6)})
		shell.launch(0.5,-0.5)
	}, 60000*2+24000);

	//skyfall nhịp 2 drone cir v3c5
	setTimeout(() => {
		seqShellRandomForTime(4,-0.3)
		setTimeout(() => {
		}, 3000);
	}, 60000*2 +27000);
	setTimeout(() => {
		shell = new Shell({...shellTypes['Falling Leaves'](2)})
		shell.launch(0.5,-0.3)
		seqShellHeightLeftToRight(10,10)
		seqSparkLeft(0,0.5,-0.3,20)
		setTimeout(() => {
			setTimeout(() => {
				seqShellHeightRightToLeft(10,10)
			}, 1000);
			seqSparkRight(0.5,1,-0.7,20)
		}, 3000);
		floral.launch(-1,0.1)
	}, 60000*2 +28500);
	
	setTimeout(() => {
		seqShellAllInOne(0.3,0.7,undefined,undefined,3,1000)
		shell = new Shell({...shellTypes['Falling Leaves'](1)})
		shell.launch(0.5,-0.2)
	}, 60000*2+33000);
	setTimeout(() => {
		setTimeout(() => {
			seqShellMidHeight(100,10)
			setTimeout(() => {
				seqShellMidHeight(100,10)
			}, 6000);
		}, 35000);
		setTimeout(() => {
			shell = new Shell({...shellTypes['Falling Leaves'](4)})
			shell.launch(0.5,-0.2)
			seqSparkFullTime(0.1,0.9,-0.3,-0.3,20,10)
			setTimeout(() => {
				seqSparkFullTime(0.1,0.9,0.4,-0.7,20,10)
				
				floral.launch(-1,0.5)
			}, 500);
			setTimeout(() => {
				seqSparkFullTime(0.1,0.9,0,0.2,20,10)
			}, 1000);
		}, 39000);
		setTimeout(() => {
			seqShellAllInOne(0,1,undefined,undefined,3,1000)
		}, 40000);
		setTimeout(() => {
			seqDoubleCrysanthemum(0.3,0)
			setTimeout(() => {
				seqDoubleCrysanthemum(0.7,0)
			}, 1000);
			setTimeout(() => {
				seqShellMidHeight(10,10)
			}, 3000);
		}, 42000);
		//skyfall nhpj2
		setTimeout(() => {
			for(let i = 0 ;i <6;i++){
				seqSpackMidShortToHeight(0.5)
			}
			setTimeout(() => {
				for(let i = 0 ;i <6;i++){
					seqSpackMidShortToHeight(0.5)
				}
			}, 1000);
			
			setTimeout(() => {
				falling.launch(-1,0)
				seqSparkHalfLeft(0.2,0.6,5,200)
				setTimeout(() => {
					seqSparkHalfLeft(0.8,1.3,5,200)
					
				}, 400);
				setTimeout(() => {
					seqSparkHalfRight(0.8,0.5,5,200)
				},800);
				setTimeout(() => {
					seqSparkHalfRight(0.2,0.4,5,200)
				},800);
				floral.launch(-1,0.5)
			}, 2000);
			
			setTimeout(() => {
				seqShellRandomForTime(20,0)
			}, 4000);
		}, 45000);
		setTimeout(() => {
			setTimeout(() => {
				for(let i =0;i<4;i++){
					seqSparkHalfTrip(0.2,1000)
					seqSparkHalfTrip(0.8,1000)	
				}
			}, 1000);
			setTimeout(() => {
				seqSparkFullTime(0.1,0.9,0,0.2,20,7)
			}, 3000);
			setTimeout(() => {
				seqShellRandomForTime(10,-0.2,new Shell({...shellTypes['Hearth'](2),strobe:true}))
			}, 3000);
		}, 51000);
		setTimeout(() => {
			seqShellRandomForTime(10,-0.3,new Shell({...shellTypes['Crossette'](3),color:COLOR.Gold}))
		}, 55000);//nghỉ
	}, 60000*2);
	setTimeout(() => {
		setTimeout(() => {
			falling.launch(-1,-0.4)
			seqSparkFullTime(0.1,0.9,0,0.2,20,7)
			setTimeout(() => {
				seqDoubleShell(0.3,-0.1,new Shell({...shellTypes['Crysanthemum'](3),crackle:true}))
				seqSparkFullTime(0,0.5,-0.3,0,30,10)
			}, 3000);
			setTimeout(() => {
				seqSparkFullTime(0.5,1,-0.3,0,30,10)
			}, 3700);
		}, 1000);
		setTimeout(() => {
			seqSparkFullTime(0,1,-0.3,0,30,10)
			seqDoubleShell(0.3,-0.1,new Shell({...shellTypes['Snow'](3),crossette:true}))
		}, 7000);
		setTimeout(() => {
			seqSparkFullTime(0,1,-0.3,0,30,10)
			seqQuarShell(0.2,-0.1)
			setTimeout(() => {
				seqTripleShell(0.2,0,new Shell({...shellTypes['Crackle'](3)}),new Shell({...shellTypes['Ring'](3), bird:true}))
				seqDoubleShell(0.3,-0.1,new Shell({...shellTypes['Snow'](3),crossette:true}))
			}, 3000);
			floral.launch(-1,0)
		}, 8000);
		setTimeout(() => {
			seqSparkFullTime(0,1,-0.3,0,30,5)
			seqSparkFullTime(0,1,-0.7,-0.35,15,10)
			seqSparkFullTime(0,1,-0.3,0.34,15,10)
		}, 14000);
		setTimeout(() => {
			seqTripleShell(0.2,0,new Shell({...shellTypes['Floral'](3)}),undefined,{floral:true})
		}, 17000);
		setTimeout(() => {
			seqDoubleShell(0.3,0.1,new Shell({...shellTypes['Fish'](3)}),{strobe:true})
		}, 20000);
		setTimeout(() => {
			seqTripleShell(0.350,0.2,new Shell({...shellTypes['Smiley'](3)}),{strobe:true})
		}, 23000);
		setTimeout(() => {
			seqQuarShell(0.32,0.3,new Shell({...shellTypes['Flower'](3)}),{strobe:true})
		}, 25000);
		setTimeout(() => {
			seqTripleShell(0.31,0.2,new Shell({...shellTypes['Strobe'](3)}),{strobe:true})
		}, 27000);
		setTimeout(() => {
			seqQuarShell(0.35,0.1,new Shell({...shellTypes['Crysanthemum'](3)}),new Shell({...shellTypes['Strobe'](3)}))
			setTimeout(() => {
				seqShellMidHeight(10,10)
			}, 3000);
			setTimeout(() => {
				seqShellMidShort(10,10)
			}, 6000);
			setTimeout(() => {
				seqShellMidHeight(10)
			}, 9000);
		}, 31000);
		setTimeout(() => {
			seqQuarShell(0.37,-0.1,undefined,undefined,{strobe:true})
		}, 41000);//tăng nhịp
		setTimeout(() => {
			falling.launch(-1,-0.5)
			for(let i=0;i<10;i++){
				seqSparkFull(0,1,40)	
			}
			seqDoubleShell(0.25,0.3,undefined,{strobe:true})
			setTimeout(() => {
				seqTripleShell(0.15,0,undefined,undefined,{strobe:true})
			}, 500);
			
			floral.launch(0.5,-0.2)
			seqShellHeightLeftToRight(10)
			setTimeout(() => {
				seqShellHeightRightToLeft(10)
			}, 600);
			setTimeout(() => {
				seqShellHeightLeftToRight(5)
			}, 1200);
			setTimeout(() => {
				seqShellHeightRightToLeft(5)
			}, 1500);
			
		}, 43000);
		setTimeout(() => {
			falling.launch(-0.5,0)
			seqShellAll(0.1,0.9,-0.4,1,10,1300)
		
		}, 44000);
		setTimeout(() => {
		seqDroneUFO(36000,maxW/2,maxH/2-370,{size:5,mer:true,agn:0.5,radius:400})
			floral.launch(0.2,0)
			floral.launch(0.8,0)
		}, 46000);
		setTimeout(() => {
			
			setTimeout(() => {
				seqTripleShell(0.31,0.2,new Shell({...shellTypes['Strobe'](3)}),{strobe:true})
			}, 2000);
			seqDoubleShell(0.25,0.3,undefined,{strobe:true})
			setTimeout(() => {
				seqTripleShell(0.15,0,undefined,undefined,{strobe:true})
			}, 500);
			setTimeout(() => {
				seqQuarShell(0.31,0.2,new Shell({...shellTypes['Crysanthemum'](4)}),{strobe:true})
			}, 5000);
		}, 48000);
		setTimeout(() => {
			seqDoubleShell(0.25,0.3,undefined,{strobe:true})
			setTimeout(() => {
				seqTripleShell(0.15,0,undefined,undefined,{strobe:true})
			}, 500);
		seqSparkDown(maxW/2-200,maxW/2+200,maxH/2-370,20,1000)	
			creatFiveShellV2(0.2,maxH/2-370,new Shell({...shellTypes['Bird'](0.6),pistil:false}))
		}, 52000);
		//skyfall
		setTimeout(() => {
			seqSparkMidLeftWithRight(count=1)
			seqSparkFullTime(0,1,-0.3,0,30,4)
			seqSparkFullTime(0,1,-0.7,-0.35,15,4)
			seqSparkFullTime(0,1,-0.3,0.34,15,5)
		}, 55000);
		//trống 14s
		setTimeout(() => {	
			seqSparkMidLeftWithRight(count=1)
			creatFiveShellV2(0.3,maxH/2-370,new Shell({...shellTypes['Bird'](0.6),pistil:false}))
			seqDoubleShell(0.25,0.3,undefined,{strobe:true})
			setTimeout(() => {
				seqTripleShell(0.15,0,undefined,undefined,{strobe:true})
			}, 500);
			seqDoubleShell(0.3,0,new Shell({...shellTypes['Cat'](0.5)}))
			setTimeout(() => {
				seqDoubleShell(0.2,0,new Shell({...shellTypes['Floral'](4)}))
			}, 3000);
			setTimeout(() => {
				seqTripleShell(0.1,0,new Shell({...shellTypes['Snow'](3),strobe:true}))
			}, 6000);
			setTimeout(() => {
				seqQuarShell(0.2,0,new Shell({...shellTypes['Lotus'](1)}))
			}, 9000);
			setTimeout(() => {
				seqDoubleShell(0.3,0,new Shell({...shellTypes['Crossette'](3)}))
			}, 12000);
		}, 58000);//skyfall
	}, 60000*3);
	setTimeout(() => {
		setTimeout(() => {
			seqDoubleShell(0.25,0.3,undefined,{strobe:true})
			setTimeout(() => {
				seqTripleShell(0.15,0,undefined,undefined,{strobe:true})
			}, 500);
			seqShellRandomForTime(5,-0.4,new Shell({...shellTypes['Crossette'](0.5)}),COLOR.Gold)	
			seqShellAllInOne(0.0,1,new Shell({...shellTypes['Crysanthemum'](2)}),undefined,2,200);
		}, 2000);
		setTimeout(() => {
			
			seqSparkMidLeftWithRight(count=1)
			setTimeout(() => {
				seqTripleShell(0.31,0.2,new Shell({...shellTypes['Strobe'](3)}),{strobe:true})
				seqShellAllInOne(0.4,1,new Shell({...shellTypes['Crysanthemum'](2)}),undefined,2,200);
			}, 2000);
			setTimeout(() => {
				seqQuarShell(0.31,0.2,new Shell({...shellTypes['Wave'](4),streamers:true}),{strobe:true})
				seqShellAllInOne(0,0.6,new Shell({...shellTypes['Crysanthemum'](2)}),undefined,2,200);
			}, 5000);
			seqShellRandomForTime(5,-0.4,new Shell({...shellTypes['Strobe'](0.5)}),COLOR.Gold)	
		}, 6000);
		setTimeout(() => {
			seqDoubleShell(0.25,0.3,undefined,{strobe:true})
			setTimeout(() => {
				seqTripleShell(0.15,0,undefined,undefined,{strobe:true})
			}, 500);
			seqShellAllInOne(0,1,new Shell({...shellTypes['Crysanthemum'](2)}),undefined,2,200);
			seqSparkFullTime(0,1,-0.3,0,30,3)
			seqSparkFullTime(0,1,-0.7,-0.35,15,4)
			seqSparkFullTime(0,1,-0.3,0.34,15,5)
			setTimeout(() => {
				for(let i=0;i<4;i++){
					seqSparkHalfMid(0.2,0.7,7,3)
					seqSparkHalfMid(0.8,0.7,7,3)
				}
			}, 2000);
			setTimeout(() => {
				seqSparkMidLeftWithRight(count=1)
				seqShellAllInOne(0.4,1,new Shell({...shellTypes['Wave'](2),strobe:true}),undefined,2,200);
				seqTripleShell(0.31,0.2,new Shell({...shellTypes['Birth'](3)}),{strobe:true})
			}, 2000);
			setTimeout(() => {
				seqDoubleShell(0.25,0.3,undefined,{strobe:true})
			setTimeout(() => {
				seqTripleShell(0.15,0,undefined,undefined,{strobe:true})
			}, 500);
				seqQuarShell(0.31,0.2,new Shell({...shellTypes['Hearh'](4)}),{strobe:true})
				seqShellAllInOne(0,0.6,new Shell({...shellTypes['Bỉth'](2)}),undefined,2,200);
			}, 5000);
		}, 7000);
		setTimeout(() => {
			seqShellRandomForTime(10,-0.2,new Shell({...shellTypes['Butterfly'](1)}),COLOR.Gold)	
		}, 10000);//dạo nền
		setTimeout(() => {
			setTimeout(() => {
				seqTripleShell(0.31,0.2,new Shell({...shellTypes['Strobe'](3)}),{strobe:true})
			}, 2000);
	
			setTimeout(() => {
				seqShellAllInOne(0.35,0.65,new Shell({...shellTypes['Smiley'](2)}),undefined,2,600,-0.2)
				seqQuarShell(0.31,0.2,new Shell({...shellTypes['Crysanthemum'](4)}),{strobe:true})
			}, 5000);
			seqShellRandomForTime(10,-0.3,new Shell({...shellTypes['Smiley'](3),strobe:true}),COLOR.Gold)	
			seqShellRandomForTime(10,-0.5,new Shell({...shellTypes['Butterfly'](1)}),COLOR.Gold)	
		}, 14000);
		setTimeout(() => {
			seqSparkMidLeftWithRight(count=1)
			seqDoubleShell(0.25,0.3,undefined,{strobe:true})
			seqShellAllInOne(0.35,0.65,new Shell({...shellTypes['Floral'](2)}),undefined,2,600,-0.2)
			setTimeout(() => {
				seqTripleShell(0.15,0,undefined,undefined,{strobe:true})
			}, 500);
			seqShellRandomForTime(10,-0.1,new Shell({...shellTypes['Hearth'](2),strobe:true}))	
			seqShellRandomForTime(20,-0.3,new Shell({...shellTypes['Butterfly'](1)}),COLOR.Gold)	
			setTimeout(() => {
				for(let i=0;i<4;i++){
					seqSparkHalfMid(0.2,0.7,7,3)
					seqSparkHalfMid(0.8,0.7,7,3)
					seqSparkHalfMid(0.5,0.7,7,3)
					setTimeout(() => {
						seqShellAllInOne(0.35,0.65,new Shell({...shellTypes['Crysanthemum'](2)}),undefined,2,600,-0.2)
					}, 1000);
				}
			}, 2000);
		}, 18000);
		setTimeout(() => {
			seqSparkFull(0,1,2)
			setTimeout(() => {
				seqShellHeightLeftToRight(20)
			}, 2000);
			setTimeout(() => {
				seqShellHeightRightToLeft(20)
			}, 3000);
			setTimeout(() => {
				seqShellHeightLeftToRight(15)
				seqShellAllInOne(0.2,1,new Shell({...shellTypes['Hearth'](1)}),undefined,2,200);
			}, 4000);
			setTimeout(() => {
				seqShellHeightRightToLeft(15)
			}, 5000);
			setTimeout(() => {
				seqShellHeightLeftToRight(10)
				
			}, 6000);
			setTimeout(() => {
				seqShellHeightRightToLeft(10)
			}, 7000);
			setTimeout(() => {
				seqShellMidHeight(10,10)
			}, 8000);
		}, 23000);//dạo nền tổng
		setTimeout(() => {
			falling.launch(-1,0)
			seqShellAllInOne(0.4,1,new Shell({...shellTypes['Birth'](2)}),undefined,2,200);
			seqShellRandomForTime(10,0.2)
			for(let i = 0;i<6;i++){
				seqSparkFull(0,1,3)
			}
		}, 27000);
		setTimeout(() => {
			
			seqSparkFull(0,1,2)
			seqShellRandomForTime(10,0.2)
			seqShellAllInOne(0.4,1,new Shell({...shellTypes['Wave'](2)}),undefined,2,200);
		}, 29000);
		setTimeout(() => {
			for(let i = 0;i<6;i++){
				seqSparkFull(0,1,2)
				seqShellRandomForTime(10,0.2)
				seqShellAllInOne(0.4,1,new Shell({...shellTypes['Birth'](2)}),undefined,2,200);
			}
		}, 31000);
		setTimeout(() => {
			seqDroneText('Thanks',7000,200,150,{mer:true,merColor:COLOR.Blue})
			seqDroneText('For',7000,650,260,{mer:true,merColor:COLOR.Red})
			seqDroneText('Watching',7000,800,450,{mer:true,mercolor:COLOR.Blue})
			seqShellAllInOne(0.4,1,new Shell({...shellTypes['Hearth'](2)}),undefined,2,200);
			seqSparkFull(0,1,2)
			let for1 = droneCreateFormation(50,7000)
			for1.setFormation(1,1,7000,100)

			for1.setRandomColorV2(7000,undefined,undefined,	0)
			for1.setHeartFormation(300,350,5)
			let for2 = droneCreateFormation(50,7000)
			

			for2.setRandomColorV2(7000,undefined,undefined,	0)
			for2.setHeartFormation(maxW/2+300,300,5)
			seqShellRandomForTime(10,0.2)
		}, 36000);//hết
	}, 60000*4);


	
}


/**
 * Tạo formation 
 * @param {*} soluong -số lượng drone cần
 * @param {*} life - thời gian sống
 * @param {*} size - kích cỡ drone
 * @returns 1 formation
 */
function droneCreateFormation(soluong,life=10000, size=3){
	let mmm = drones.length
	for(let i=0;i<soluong;i++){
		drones.push(new Drone(-1,-1,size,0,0,COLOR.Yellow,life))
	}
	let form = new Formation()
	for(let i =0; i<soluong;i++){
		form.addDrone(drones[i+mmm])
	}
	return form
}

/**
 * Đếm người 10-9
 * @param {*} x 
 * @param {*} startX 
 * @param {*} startY 
 * @param {*} space 
 * @returns 
 */
function seqDroneCountDown(startX, startY, space){
	
	let format= droneCreateFormation(60,10000,3.5)

	format.setFormation(500,500,10000,10)
	let i=0;
	format.setColorV2(colors[i])
	i++
	format.drawDigit(9,startX, startY, space)
	
	setTimeout(() => {
		format.reset()
		
	}, 900);
	setTimeout(() => {
		format.setColorV2(colors[i])
		i++;
		format.drawDigit(8,startX, startY, space)
		setTimeout(() => {
			format.reset()
		}, 900);
		
	}, 1000);
	setTimeout(() => {
		format.setColorV2(colors[i])
		i++;
		format.drawDigit(7,startX, startY, space)
		setTimeout(() => {
			format.reset()
		}, 900);
	}, 2000);
	setTimeout(() => {
		format.setColorV2(colors[i])
		i++;
		format.drawDigit(6,startX, startY, space)
		setTimeout(() => {
			format.reset()
		}, 900);
	}, 3000);
	setTimeout(() => {
		format.setColorV2(colors[i])
		i++;
		format.drawDigit(5,startX, startY, space)
		setTimeout(() => {
			format.reset()
		}, 900);
	}, 4000);
	setTimeout(() => {
		format.setColorV2(colors[i])
		i++;
		format.drawDigit(4,startX, startY, space)
		setTimeout(() => {
			format.reset()
		}, 900);
	}, 5000);
	setTimeout(() => {
		format.setColorV2(colors[i])
		i++;
		format.drawDigit(3,startX, startY, space)
		setTimeout(() => {
			format.reset()
		}, 900);
	}, 6000);
	setTimeout(() => {
		format.setColorV2(colors[i])
		i++;
		format.drawDigit(2,startX, startY, space)
		setTimeout(() => {
			format.reset()
		}, 900);
	}, 7000);
	setTimeout(() => {
		format.setColorV2(colors[i])
		i++;
		format.drawDigit(1,startX, startY, space)
		setTimeout(() => {
			format.reset()
		}, 900);
	}, 8000);
	setTimeout(() => {
		format.setColorV2(colors[i])
		i++;
		format.drawDigit(0,startX, startY, space)
		setTimeout(() => {
			format.reset()
		}, 900);
	}, 9000);
	
	return 
}
function seqDroneTextSkyFall(time=55000){
	for(let i=0;i<800;i++){
		drones.push(new Drone(-1, -1, 3.5, 0, 0,COLOR.Blue,time));
	}
	let formations = Array(15).fill().map(() => new Formation());

	let i = 0;
	while(i<12){
		for(let  j = 0;j<60;j++){
			formations[i].addDrone(drones[j + i * 60])
		}
		i++;
	}
	
	for(let i = 0;i<5;i++){
		formations[12].addDrone(drones[i+720])
	}
	
	formations.forEach(formartion=>{
		
		formartion.setFormation(0,0,50000,10000)
	})
	let x=maxW/2-320
	let y=0
	formations[0].drawLetter('s',100+x,100+y,10)
	formations[1].drawLetter('k',170+x,100+y,10)
	formations[2].drawLetter('y',240+x,100+y,10)
	formations[12].setLineFormation(303+x,130+y,5)
	formations[3].drawLetter('f',340+x,100+y,10)
	formations[4].drawLetter('a',410+x,100+y,10)
	formations[5].drawLetter('l',480+x,100+y,10)
	formations[6].drawLetter('l',550+x,100+y,10)

	formations[7].drawLetter('a',800+x-maxH/2,210+y,10)
	formations[8].drawLetter('d',870+x-maxH/2,210+y,10)
	formations[9].drawLetter('e',940+x-maxH/2,210+y,10)
	formations[10].drawLetter('l',1010+x-maxH/2,210+y,10)
	formations[11].drawLetter('a',1080+x-maxH/2,210+y,10)
	formations.forEach(formartion=>{
		seqDroneColorMer(formartion,COLOR.Blue,time-3000)
	})
	setTimeout(() => {
		formations.forEach(formation=>{
			formation.setRandomColorV2(3000,COLOR.White,undefined,0.9)
		})
	}, time-2000);

}
function seqDroneDrawYear(text, time=50000, startX=100, startY=100,{space=10,color=COLOR.Red, mer,merColor}={}){
	let mmm = drones.length
	let len = text.length;
	for(let i=0;i<len*60;i++){
		drones.push(new Drone(-1, -1, 3.5, 0, 0,'#000033',time));
	}
	let formations = Array(len).fill().map(() => new Formation());
	let i = 0;
	while(i<len){
		for(let  j = 0;j<60;j++){
			formations[i].addDrone(drones[j + i * 60+mmm])
		}
		i++;
	}
	formations.forEach(formartion=>{
		formartion.setFormation(0,0,50000,10000)
	})
	formations.forEach((formation,index)=>{
		formation.setFormation(-1,-1,time,undefined)
		formation.setColorV2(color,7)
		formation.drawDigit(text[index],startX+100*index,startY,space)
	})
	if(mer){
		formations.forEach((formation)=>{
			seqDroneColorMer(formation,merColor)
		})
	}
}
function seqDroneText(text, time=50000, startX=100, startY=100,{space=10,color=COLOR.Red, mer,merColor}={}){
	let mmm = drones.length
	let len = text.length;
	for(let i=0;i<len*45;i++){
		drones.push(new Drone(-1, -1, 3.5, 0, 0,'#003300',time));
	}
	
	let formations = Array(len).fill().map(() => new Formation());
	let i = 0;
	while(i<len){
		for(let  j = 0;j<45;j++){
			formations[i].addDrone(drones[j + i * 45+mmm])
		}
		i++;
	}
	formations.forEach(formartion=>{
		
		formartion.setFormation(0,0,50000,10000)
	})
	formations.forEach((formation,index)=>{
		formation.setFormation(-1,-1,time,undefined)
		formation.setColorV2(color,7)
		formation.drawLetter(text[index],startX+70*index,startY,space)
	})
	if(mer){
		formations.forEach((formation)=>{
			seqDroneColorMer(formation,merColor)
		})
	}
}
// setTimeout(() => {
// 	seqTripleShell(0.2,0.1)
// }, 700);

// seqSparkLeft(0,0.6,-0.3,20)
// setTimeout(() => {
// 	seqSparkRight(0.4,1,-0.7,20)
// }, 2000);


// seqShellMidHeight(10,10)



function seqSparkFullTime(x1,x2, y,nghieng=0,countShell=7,count=4){
	let mm = Math.abs(x1-x2)/countShell;
	while(x1<x2){
		let shell  = getRandomShell()
		for(let i=0;i<count;i++){
			shell.launchV2(x1,y,nghieng)
		}
		x1+=mm
	}
		
}
// function seqSparkFullTimeV2(x1,x2, y,nghieng=0,color="Red",countShell=7,count=4){
// 	let mm = Math.abs(x1-x2)/countShell;
// 	while(x1<x2){
// 		let shell  = 
// 		for(let i=0;i<count;i++){
// 			shell.launchV2(x1,y,nghieng)
// 		}
// 		x1+=mm
// 	}
		
// }


async function seqShellAll(x, y,hight,size,count,wait=1000){
	let i= 0;
	while(i<count){
		await new Promise(resolve => setTimeout(resolve, wait));
		let shell =getRandomShell()
		shell.size = size
		shell.crackle=false
		seqShellAllInOne(x,y,shell)
		seqShellRandomForTime(3+Math.random()*4,hight,shell)
		i++;
	}
}
/**
 * Tạo nổ tại vị trí x, y
 * @param {*} x 
 * @param {*} y 
 * @param {*} shell 
 * @param {*} cout 
 * @param {*} color 
 */
function creatFiveShellV2(x,y,shell,cout=10,color) {
	let maxx = Math.abs(1-x);
	let spread = Math.abs(maxx - x) / cout;
	
	while (x <= maxx) {
		let number = 10 + Math.random() * 10
		shell=shell??getRandomShell()
		shell.color=color??getRandomColor();
		shell.burst(x*maxW + number, y)
		x += spread;
	}
}

// seqSparkDown(0,maxW,maxH,20,1000,false)
// seqShellAllInOne(0.4,1,new Shell({...shellTypes['Crysanthemum'](2)}),undefined,2,200);
// seqShellAllInOne(0.35,0.65,new Shell({...shellTypes['Smiley'](2)}),undefined,2,600,-0.2)


function seqSparkMidLeftWithRight(count=1){
	let position = 0.5
	for(let i =0 ;i<count;i++){
		seqSparkLeft(position+0.05,1,-0.3)
		seqSparkRight(0.,position-0.05,-0.86)
	}
	
}
// seqDroneTextSkyFall(5000)

function seqDroneCountDownWithCircle(x=maxW/2-20,y=maxH/2){

	let soluong = 40
	seqDroneCountDown(x,y,7)
	let formCircle = Array(4).fill()
	soluong =30
	formCircle = formCircle.map(() => {
		const form = droneCreateFormation(soluong, 10000, 5);
		soluong += 10;
		return form; // Trả về giá trị để gán vào mảng mới
	});
	let radius = 90
	formCircle.forEach(form=>{
		form.setFormation(x+20,y+40,11000,radius)
		radius+=30	
	})

	// form.setRectangleFormation(200,100,80,40)
	// form.setHeartFormation(100,200,5)
	// form.setRandomColorV2(100000,COLOR.White,undefined,0.5)
	formCircle[2].setFormation(x+20,y+40,11000,170)
	formCircle[1].setCircleFormationV3({tiltAngleX:Math.PI/2,tiltAngleY:Math.PI/2,speed:1/3000,check:-1})
	formCircle[2].setCircleFormationV3({tiltAngleX:Math.PI/2,tiltAngleY:Math.PI/2,speed:1/3000})
	let hz = 1000/45
	formCircle[2].setColor('#003333')
	let i = 0; // Bắt đầu từ index được cung cấp
// Sử dụng hàm
	const iterations = 10; // Số lần lặp
	const delay = 1000; // Độ trễ giữa các lần thay đổi màu (ms)

	
    for (let step = 0; step < iterations; step++) {
        setTimeout(() => {
            // Thay đổi màu sắc cho formCircle[1] và formCircle[2]
            formCircle[1].setColorV3(colors[i % colors.length], hz); // Đảm bảo không vượt quá mảng `colors`
            formCircle[2].setColorV2('#003333', 20);
            i++; // Tăng index màu
        }, step * delay); // Thời gian chờ tăng dần
    }
	
		
}
function seqDroneStrobe(x=maxW/2-20,y=maxH/2-50,time=10500){
	let soluong= 100
	let formStrobe = Array(4).fill().map(()=>droneCreateFormation(soluong+=50,time,2))
	formStrobe[0].setRectangleFormation(x-100,y-200,200,190)
	formStrobe[1].setRectangleFormation(x-200,y-300,400,190)
	formStrobe[2].setRectangleFormation(x-300,y-300,700,190)
	formStrobe[3].setRectangleFormation(x-650,y-300,maxW-200,190)
	formStrobe.forEach(form=>{
		form.setRandomColorV2(time,undefined,undefined,1)
	})
	formStrobe[0].setRandomColorV2(undefined,undefined,undefined,0.99)
	setTimeout(() => {
		formStrobe[1].setRandomColorV2(undefined,undefined,undefined,0.96)
	}, 2000);
	setTimeout(() => {
		formStrobe[2].setRandomColorV2(undefined,undefined,undefined,0.97)
	}, 4000);
	setTimeout(() => {
		formStrobe[3].setRandomColorV2(undefined,undefined,undefined,0.9)
	}, 7000);
}
function seqShellFullAllRand(time=50000){
	
	playMusic('Music/lift6.mp3')
	seqShellAllInOne(0,1,undefined,undefined,10,500)
	seqShellRandomForTime(10,undefined,undefined,undefined)
	let delay = 1500;
	for(let i= 0;i<50;i++){
		setTimeout(() => {
			seqShellAllInOne(0,1,undefined,undefined,5,500,-0.4+Math.random()*0.2)
			seqShellRandomForTime(5,-0.4+Math.random()*0.2,undefined,undefined)
		}, delay*i);
	}
	for(let i =1;i<50;i++){
		setTimeout(() => {
			seqDoubleShell(0.2+Math.random()*0.2,0.2+Math.random()*0.3)
		}, 1000*i);
	}
	for(let i = 0;i<33;i++){
		setTimeout(() => {
			seqTripleShell(0.1+Math.random()*0.3,0.2+Math.random()*0.3)
			Math.random<0.5?playMusic('Music/lift6.mp3'):playMusic('Music/lift4.mp3')
		}, 1500*i);
	}
	for(let i= 0 ;i<5;i++){
		setTimeout(() => {
			seqSparkLeft(0,0.6,-0.3,20)
		setTimeout(() => {
			seqSparkRight(0.4,1,-0.7,20)
		}, 2000);
		setTimeout(() => {
			seqSparkFull(0,1,1,0)
		}, 5000);
		}, 10000*i);
	}
	for(let i=0;i<50;i++){
		setTimeout(() => {
			seqTripleRingShell(0.15+Math.random()*0.3,0,2)
		}, i*1000);
	}
}
function seqDroneFull(){
	let form1 = Array(7).fill().map(()=>droneCreateFormation(60,10000,3))
	let radius=100
	form1.forEach(form=>{
		form.setFormation(maxW/2,maxH/2,5000,radius+=16)
		form.setCircleFormationV3()
		seqDroneColorMer(form,COLOR.Blue,1000,100)
	})
	let form = droneCreateFormation(100,5000,2)
	form.setFormation(maxW/2,maxH/2,8000,70)
	form.setSphereFormation()
	seqDroneBom(maxW/2-400,maxH/2+200,70,5000)
	seqDroneBom(maxW/2+400,maxH/2-200,70,5000)
	setTimeout(() => {
		form1.forEach(form=>{
			form.setRandomColorV2()
		})
	}, 2000);
	setTimeout(() => {
		seqDroneUFO(10000,undefined,undefined,{mer:1})
	}, 7000);
	setTimeout(() => {
		seqSparkDown(maxW/2-300,maxW/2+300,maxH/2-300,16,500)

	}, 7000);
	
}
function seqDroneHappyNewYear(){
	let time1 = 45000
	let x =200
	
	
	seqDroneText('happy',time1,100+x,100,{space:10,color:COLOR.Red})
	seqDroneText('new',time1,500+x,100,{space:10,color:COLOR.Red})
	seqDroneText('year',time1,750+x,100,{space:10,color:COLOR.Red})
	seqDroneDrawYear('2025',time1,maxW/2-170,maxH/2-170,{color:COLOR.Red})
	let formCircle = Array(4).fill().map(()=>droneCreateFormation(60,time1,2))	
	formCircle[0].setFormation(maxW/2,maxH/2-150,time1,300)
	formCircle[0].setCircleFormationV3c5({tiltAngleX:Math.PI/2,tiltAngleY:Math.PI/8,speed:0.001})
	formCircle[1].setFormation(maxW/2,maxH/2-150,time1,300)
	formCircle[1].setCircleFormationV3c5({tiltAngleX:Math.PI/2,tiltAngleY:-Math.PI/8,speed:0.001})	
	seqDroneBom(maxW/2+550,maxH/2-350,25,time1)
	seqDroneBom(maxW/2-550,maxH/2-300,25,time1)

	;
	
	setTimeout(() => {
		seqShellFullAllRand()
	}, 500);	
}

// // seqDroneHappyNewYear()

// function seqSparkRedRectangle(x, y, width,height,count){
	
// }
// let shell1= new Shell({...shellTypes['Crysanthemum'](3),star:true})
// shell1.launch(0.5,0,1)
// // seqSparkFullTime(0.3,0.7,0,0)
// // seqShellVietNamFlag()

// skyFallSeq()

let formation1 = new FormationV2()
formation1.addDrones(60)
// formation1.setFormation(500,500,10000,10)
formation1.drawDigit(8,500,500,10)
formation1.setColor(COLOR.Red)
formation1.setRandomColorV2()
console.log("hello"+formation1.drones.length)




