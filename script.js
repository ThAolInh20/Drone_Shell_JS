'use strict';
console.clear();

// This is a prime example of what starts out as a simple project
// and snowballs way beyond its intended size. It's a little clunky
// reading/working on this single file, but here it is anyways :)

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
	Green: '#14fc56',
	Blue: '#1e7fff',
	Purple: '#e60aff',
	Gold: '#ffbf36',
	White: '#ffffff'

	// Pink:'#FFC0CB'

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
	update(timeStep, speed, gAcc = 0, targetX = null, targetY = null) {
		// Nếu có vị trí mục tiêu, tính hướng di chuyển
		if (targetX !== null && targetY !== null) {
			const dx = targetX - this.x; // Khoảng cách đến mục tiêu theo X
			const dy = targetY - this.y; // Khoảng cách đến mục tiêu theo Y
			const distance = Math.sqrt(dx * dx + dy * dy); // Khoảng cách tổng
	
			if (distance > 1) { // Chỉ di chuyển nếu còn xa hơn 1 pixel
				this.speedX = (dx / distance) * speed; // Tính tốc độ theo hướng X
				this.speedY = (dy / distance) * speed; // Tính tốc độ theo hướng Y
			} else {
				this.speedX = 0; // Đến nơi thì dừng lại
				this.speedY = 0;
			}
		}
	
		// Thêm hiệu ứng lắc lư theo gió
		let kk = Math.random() < 0.51 ? -1 : 1;
		let hh = Math.random() * kk / 7;
		this.x += this.speedX * timeStep + hh; // Cập nhật vị trí X
		this.y += this.speedY * timeStep + hh; // Cập nhật vị trí Y
	
		// Ảnh hưởng bởi trọng lực
		this.speedY += gAcc;
	
		// Giảm thời gian tồn tại (nếu cần)
		this.life -= timeStep;
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
	
    isAlive() {
        return this.life>0;
    }
}
class Formation {
	
    constructor() {
        this.drones = []; // Mảng lưu danh sách các drone
    }
    addDrone(drone) {
        this.drones.push(drone);
    }
	setColor(color){
		this.drones.forEach(drone=>{
			drone.color=color
			
		})
	}
	/**
	 * tạo size 3d 
	 * @param {*} check - =1 thì lớn giảm dần
	 * @returns 
	 */
	setReduceSize(check= 1) {
		if(this.drones.length<0) return

		let maxRadius = this.drones[1].radius*1.2;
		let minRadius = 0.4;
		let total = (maxRadius-minRadius)/this.drones.length
		
		if(check == 1){
			let i = 0;
			while(maxRadius>minRadius){
				
					this.drones[i].radius = maxRadius
					i++;
					maxRadius-=total
				
			}
			while(i<drones.length){
				this.drones[i].radius = 0.4
				i++
			}
		}else{ 
			let i = this.drones.length-1;
			while(maxRadius>minRadius){
				
					this.drones[i].radius = maxRadius
					i--;
					maxRadius-=total
				
			}
			while(i>=0){
				this.drones[i].radius = 0.4
				i--
			}
		}
		
	}
	/**
	 * Đổi màu liên tucj
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
    // setCircleFormation(centerX, centerY, radius) {
    //     const angleStep = (2 * Math.PI) / this.drones.length;
    //     this.drones.forEach((drone, index) => {
    //         const angle = angleStep * index;
    //         drone.x = centerX + radius * Math.cos(angle);
    //         drone.y = centerY + radius * Math.sin(angle);
    //     });
    // }
	// setCircleFormationV2(centerX, centerY, radius, angularSpeed = Math.PI / 120) {
	// 	let rotationAngle = 0; // Góc bắt đầu

	// 	// Hàm cập nhật vị trí các drone theo đội hình hình tròn
	// 	const updateFormation = () => {
	// 		const angleStep = (2 * Math.PI) / this.drones.length;
	// 		this.drones.forEach((drone, index) => {
	// 			const angle = angleStep * index + rotationAngle; // Thêm góc xoay
	// 			drone.x = centerX 	+ radius * Math.cos(angle);
	// 			drone.y = centerY + radius * Math.sin(angle);
	// 		});

	// 		rotationAngle += angularSpeed; // Cập nhật góc xoay
	// 	};

	// 	// Gọi định kỳ để cập nhật đội hình
	// 	setInterval(updateFormation, 16); // 16ms ~ 60 FPS
		
	// }
	
	/**
	 * Xoay vòng tròn ngang
	 * @param {*} centerX 
	 * @param {*} centerY 
	 * @param {*} radius 
	 * @param {*} check -- if =1 thì quay cùng chiều, -1 thì ngược chiều
	 * @param {*} tiltAngle 
	 * @param {*} speed 
	 */
	setCircleFormationV2(centerX, centerY, radius,check=1, tiltAngle = Math.PI / 2.15, speed = Math.PI / 600, formationLifetime = 2000) {
		let time = 0; // Biến thời gian để tính góc xoay
		const angleStep = (2 * Math.PI) / this.drones.length; // Khoảng cách giữa các drone trên vòng tròn
		const cosTilt = Math.cos(tiltAngle); // Tính cos của góc nghiêng
		const sinTilt = Math.sin(tiltAngle); // Tính sin của góc nghiêng
	
		let elapsedTime = 0; // Biến để theo dõi thời gian đã trôi qua
		const startTime = Date.now(); // Thời điểm bắt đầu
	
		// Hàm cập nhật đội hình theo thời gian
		const update = () => {
			// const currentTime = Date.now();
			// elapsedTime = currentTime - startTime;
			// if (elapsedTime >= formationLifetime) {
			// 	//  // Chia drone thành 2 nhóm: 50% thành màu đen, 50% thành màu ngẫu nhiên
			// 	//  const blackCount = Math.floor(this.drones.length * 0.5); // Số lượng drone thành màu đen
			// 	//  const shuffledDrones = [...this.drones].sort(() => Math.random() - 0.5); // Trộn ngẫu nhiên mảng drones
	 
			// 	//  // Đổi màu
			// 	//  shuffledDrones.forEach((drone, index) => {
			// 	// 	 if (index < blackCount) {
			// 	// 		 drone.color = "black";
			// 	// 		 drone.pistilColor="black" // Màu đen
			// 	// 	 } else {
			// 	// 		 drone.color = getRandomColor(); // Màu ngẫu nhiên
			// 	// 	 }
				
			// 	// })
			// }
	
			// Kiểm tra nếu đã hết thời gian tồn tại đội hình
			
	
			time += speed; // Tăng thời gian để thay đổi góc quay
			const rotationAngle = time; // Góc quay hiện tại
	
			this.drones.forEach((drone, index) => {
				const angle = angleStep * index + rotationAngle*check; // Góc quay cho mỗi drone
				const x = radius * Math.cos(angle); // Tọa độ X trên vòng tròn
				const y = radius * Math.sin(angle); // Tọa độ Y trên vòng tròn
	
				// Biến đổi 3D với góc nghiêng tiltAngle
				const transformedX = x; // Trục X giữ nguyên
				const transformedY = y * cosTilt; // Trục Y bị thu nhỏ theo cos(tiltAngle)
				const depth = y * sinTilt; // Chiều sâu để tạo hiệu ứng 3D
	
				// Đặt lại vị trí drone
				drone.x = centerX + transformedX;
				drone.y = centerY + transformedY;
	
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
	 * Xoay vòng tròn với khả năng điều chỉnh độ nghiêng theo cả 2 trục (X và Y)
	 * @param {*} centerX - Tọa độ tâm X
	 * @param {*} centerY - Tọa độ tâm Y
	 * @param {*} radius - Bán kính vòng tròn
	 * @param {*} tiltAngleX - Độ nghiêng theo trục X  math.pi/1->vv
	 * @param {*} tiltAngleY - Độ nghiêng theo trục Y math.pi/1->vv
	 * @param {*} speed - Tốc độ xoay math.pi/600 
	 */
	setCircleFormationV3(centerX, centerY, radius, tiltAngleX =Math.PI/2, tiltAngleY =Math.PI/2, speed = Math.PI / 900) {
		let time = 0; // Biến thời gian để tính góc xoay
		const angleStep = (2 * Math.PI) / this.drones.length; // Khoảng cách giữa các drone trên vòng tròn
		const cosTiltX = Math.cos(tiltAngleX); // Tính cos của góc nghiêng X
		const sinTiltX = Math.sin(tiltAngleX); // Tính sin của góc nghiêng X
		const cosTiltY = Math.cos(tiltAngleY); // Tính cos của góc nghiêng Y
		const sinTiltY = Math.sin(tiltAngleY); // Tính sin của góc nghiêng Y

		// Hàm cập nhật đội hình theo thời gian
		const update = () => {
			time += speed; // Tăng thời gian để thay đổi góc quay
			const rotationAngle = time; // Góc quay hiện tại

			this.drones.forEach((drone, index) => {
				const angle = angleStep * index + rotationAngle; // Góc quay cho mỗi drone
				const x = radius * Math.cos(angle); // Tọa độ X trên vòng tròn
				const y = radius * Math.sin(angle); // Tọa độ Y trên vòng tròn

				// Biến đổi 3D với góc nghiêng trên cả hai trục
				const transformedX = x * cosTiltY - y * sinTiltX; // Trục X biến đổi theo nghiêng Y và X
				const transformedY = y * cosTiltX - x * sinTiltY; // Trục Y biến đổi theo nghiêng X và Y
				const depth = x * sinTiltX + y * sinTiltY; // Chiều sâu để tạo hiệu ứng 3D

				// Đặt lại vị trí drone
				drone.x = centerX + transformedX;
				drone.y = centerY + transformedY;

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
	 * Tạo đội hình drone theo hình cầu 3D có thể xoay
	 * @param {*} centerX - Tọa độ trung tâm X
	 * @param {*} centerY - Tọa độ trung tâm Y
	 * @param {*} centerZ - Tọa độ trung tâm Z
	 * @param {*} color - Màu sắc của drone
	 * @param {*} radius - Bán kính của hình cầu
	 * @param {*} rotationAngleX - Góc xoay quanh trục X
	 * @param {*} rotationAngleY - Góc xoay quanh trục Y
	 * @param {*} rotationAngleZ - Góc xoay quanh trục Z
	 */
	setSphereFormation(centerX, centerY, centerZ, color, radius, rotationAngleX = 0, rotationAngleY = 0, rotationAngleZ = 0) {
		const totalDrones = this.drones.length;
		const angleStepPhi = Math.PI / Math.sqrt(totalDrones); // Chia góc φ (từ 0 đến π) đều
		const angleStepTheta = (2 * Math.PI) / Math.sqrt(totalDrones); // Chia góc θ (từ 0 đến 2π) đều

		this.drones.forEach((drone, index) => {
			// // Tính toán góc φ (từ 0 đến π) và θ (từ 0 đến 2π)
			const phi = (index % Math.sqrt(totalDrones)) * angleStepPhi; // Từ trên xuống dưới
			const theta = Math.floor(index / Math.sqrt(totalDrones)) * angleStepTheta; // Vòng quanh trục Z

			// const phi = Math.acos(2 * Math.random() - 1); // Góc phi (0 đến π)
        	// const theta = Math.random() * 2 * Math.PI;   // Góc theta (0 đến 2π)

			// Chuyển đổi tọa độ cầu (r, θ, φ) sang Descarte (x, y, z)
			let x = radius * Math.sin(phi) * Math.cos(theta); // X trên mặt cầu
			let y = radius * Math.sin(phi) * Math.sin(theta); // Y trên mặt cầu
			let z = radius * Math.cos(phi); // Z trên mặt cầu (độ cao)

			// Biến đổi tọa độ dựa trên góc xoay (rotationAngleX, rotationAngleY, rotationAngleZ)
			// Xoay quanh trục X
			let tempY = y * Math.cos(rotationAngleX) - z * Math.sin(rotationAngleX);
			let tempZ = y * Math.sin(rotationAngleX) + z * Math.cos(rotationAngleX);
			y = tempY;
			z = tempZ;

			// Xoay quanh trục Y
			let tempX = x * Math.cos(rotationAngleY) + z * Math.sin(rotationAngleY);
			tempZ = -x * Math.sin(rotationAngleY) + z * Math.cos(rotationAngleY);
			x = tempX;
			z = tempZ;

			// Xoay quanh trục Z
			tempX = x * Math.cos(rotationAngleZ) - y * Math.sin(rotationAngleZ);
			tempY = x * Math.sin(rotationAngleZ) + y * Math.cos(rotationAngleZ);
			x = tempX;
			y = tempY;

			// Đặt lại vị trí drone với tâm hình cầu (centerX, centerY, centerZ)
			drone.x = centerX + x;
			drone.y = centerY + y;
			drone.z = centerZ + z;

			// Tạo hiệu ứng "độ sâu" (như kích thước hoặc độ sáng thay đổi dựa trên tọa độ z)
			// drone.size = Math.max(1, 3 + z / radius * 2); // Kích thước thay đổi dựa trên độ sâu
			drone.color = z > 0 ? color : `rgba(26, 26, 47, 0.8)`; // Màu thay đổi theo chiều sâu
		});
	}

	// /**
	//  * Chuyển đổi mượt mà giữa các đội hình
	//  * @param {*} newFormation - Hàm để tính toán đội hình mới (callback)
	//  * @param {*} duration - Thời gian chuyển đổi (ms)
	//  */
	// transitionToFormation(newFormation, duration = 2000) {
	// 	const startTime = Date.now();
	// 	const initialPositions = this.drones.map(drone => ({ x: drone.x, y: drone.y })); // Lưu trạng thái ban đầu

	// 	const update = () => {
	// 		const currentTime = Date.now();
	// 		const elapsedTime = currentTime - startTime;
	// 		const t = Math.min(elapsedTime / duration, 1); // Tính tỷ lệ thời gian (0 -> 1)

	// 		// Lấy đội hình mới từ hàm callback
	// 		const targetPositions = newFormation();

	// 		// Cập nhật vị trí drone với nội suy tuyến tính
	// 		this.drones.forEach((drone, index) => {
	// 			const start = initialPositions[index];
	// 			const target = targetPositions[index];

	// 			drone.x = start.x + (target.x - start.x) * t;
	// 			drone.y = start.y + (target.y - start.y) * t;
	// 		});

	// 		// Nếu chưa hoàn thành, tiếp tục cập nhật
	// 		if (t < 1) {
	// 			requestAnimationFrame(update);
	// 		} else {
	// 			console.log("Hoàn thành chuyển đổi đội hình!");
	// 		}
	// 	};

	// 	// Bắt đầu cập nhật
	// 	update();
	// }
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

    updateFormation(timeStep, speed, gAcc) {
        this.drones.forEach(drone => drone.update(timeStep, speed, gAcc));
    }
}
// class ShowController {
//     constructor() {
//         this.drones = []; // Mảng lưu các drone
//         this.activeFormations = []; // Các đội hình hiện tại
//         this.time = 0; // Thời gian điều phối
//     }

//     addDrone(drone) {
//         this.drones.push(drone);
//     }

//     addFormation(formation) {
//         this.activeFormations.push(formation);
//     }

//     startShow() {
//         console.log("Bắt đầu màn trình diễn drone!");
//     }

//     updateAll(timeStep, speed, gAcc) {
//         // Cập nhật tất cả các drone
//         this.drones.forEach((drone, index) => {
//             drone.update(timeStep, speed, gAcc);
//             if (!drone.isAlive()) this.drones.splice(index, 1);
//         });

//         // Cập nhật tất cả các đội hình
//         this.activeFormations.forEach(formation => {
//             formation.updateFormation(timeStep, speed, gAcc);
//         });

//         this.time += timeStep;
//     }

//     endShow() {
//         console.log("Kết thúc màn trình diễn drone!");
//     }
// }
// class Path {
//     constructor(points) {
//         this.points = points; // Mảng các điểm (x, y) trên lộ trình
//         this.currentIndex = 0;
//     }

//     getNextPoint() {
//         if (this.currentIndex < this.points.length) {
//             return this.points[this.currentIndex++];
//         } else {
//             return null; // Hết lộ trình
//         }
//     }
// }
// class PathFollowerDrone extends Drone {
//     constructor(x, y, radius, speedX, speedY, color, life, path) {
//         super(x, y, radius, speedX, speedY, color, life);
//         this.path = path; // Lộ trình
//     }

//     update(timeStep, speed, gAcc) {
//         const nextPoint = this.path.getNextPoint();
//         if (nextPoint) {
//             this.x += (nextPoint.x - this.x) * speed * timeStep;
//             this.y += (nextPoint.y - this.y) * speed * timeStep;
//         }
//         super.update(timeStep, speed, gAcc);
//     }
// }
let maxW = window.innerWidth - 2;
let maxH = window.innerHeight;

// Khởi tạo các drone
const drones = [];


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
		streamers: Math.random() < 0.3
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


const shellTypes = {
	'Random': randomShell,
	'Crackle': crackleShell,
	'Crossette': crossetteShell,
	'Crysanthemum': crysanthemumShell,
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
		const lastShell = new Shell(shellTypes['ring'](size.size * 1.7));
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
		const lastShell = new Shell(shellTypes['ring'](size.size * 1.7));
		lastShell.launch(0.5, 0.5)
	}, timen - 15);
}

function seqShellMidHeight(time) {
	seqShellHeightRightToLeft(5, 0.66, time)
	seqShellHeightLeftToRight(5, 1 - 0.64, time)
	setTimeout(() => {
		const size = getRandomShellSize()
		seqTripleRingShell(0.5, 0.5, size.size * 1.7)
	}, time);
}
function seqShellMidShort(time) {
	setTimeout(() => {
		const size = getRandomShellSize()
		size.size = 5;
		seqTripleRingShell(0.5, 0.5, size.size * 1.3)
	}, time);
	seqShellShortRightToLeft(5, 0.66, time * 0.05)
	seqShellShortLeftToRight(5, 1 - 0.64, time * 0.05)

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
	let spread = (right - left) / count_shell;
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


	let shell = new Shell({...shellTypes['Floral'],color:getRandomColor(),streamers:true})
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
		...shellTypes['Crysanthemum'](6),
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
function creatFiveShell(left, right) {
	let spread = (right - left) / 5;
	while (left <= right) {
		let number = 0.01 + Math.random() * 0.01
		let shell = new Shell(shellTypes['Crysanthemum'](0.7))
		shell.launch(left + number, -0.3 + number)
		left += spread;
	}
}
async function seqShellAllInOne(left, right, count=3) {
	let i = 0;
	let time = 0;
	while (i < count) {
		await new Promise(resolve => setTimeout(resolve, time));
		creatFiveShell(left, right)
		time += 300
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
		console.log(height, ", ", positionLast);
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
		shell.launch(position, 0.3)
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
		VietNamFlagOneShell(position, -0.6, 2.5);
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
		timen += 900
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
	const spread = (right - left) / 10;
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
		let shell = new Shell({...shellTypes('Crysanthemum')(6)})
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
function testShell(x, y){
	let timen = 500;
	seqShellRandomForTime(10)
	
	
	
	
	;
	
}
async function seqShellRandomForTime(count=5){
	
	let i = 0;
	let time = 50;
	while(i<count){
		await new Promise(resolve => setTimeout(resolve, time));
		let vt = Math.random();
		let shell = new Shell({...shellTypes['Strobe'](4), strobe:true, })		
		shell.launch(vt,0.4)
		i++
		time+=100;
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
	// vietNamV1Seq();
	 testShell(0.5, 0.5);
	// monodySeq();
	// seqDrone();
	

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
	const sparkDrag = 1 - (1 - Spark.airDrag) * speed;
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

		newStar.sparkColor = COLOR.Gold;
		newStar.sparkFreq = 144 / quality;
		newStar.sparkSpeed = 0.28;
		newStar.sparkLife = 750;
		newStar.sparkLifeVariation = 3.2;
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

	launch(position, launchHeight) {
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
		const launchDistance = launchY - burstY;
		// Using a custom power curve to approximate Vi needed to reach launchDistance under gravity and air drag.
		// Magic numbers came from testing.
		const launchVelocity = Math.pow(launchDistance * 0.04, 0.64);

		const comet = this.comet = Star.add(
			launchX,
			launchY,
			typeof this.color === 'string' && this.color !== 'random' ? this.color : COLOR.White,
			Math.PI,
			launchVelocity * (this.horsetail ? 1.2 : 1),
			// Hang time is derived linearly from Vi; exact number came from testing
			launchVelocity * (this.horsetail ? 100 : 400)
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

		soundManager.playSound('lift');
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
		if (Math.random() > 0.4 && !this.horsetail) {
			comet.secondColor = INVISIBLE;
			comet.transitionTime = Math.pow(Math.random(), 1.5) * 700 + 500;
		}
		// soundManager.playSound('lift');
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
		if (this.fallingLeaves) onDeath = fallingLeavesEffect;
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
			else {
				createBurst(this.starCount, starFactory);
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
	airDrag: 0.98,
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
		instance.speedX = speedOffX || 0;//góc bay theo chiều x
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
	airDrag: 0.8,

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

// const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// const soundManager = {
//     baseURL: 'file:///C:/path/to/Music/',  // Đường dẫn tuyệt đối tới thư mục Music trên máy của bạn

//     sources: {
//         lift: {
//             volume: Math.random() + 0.5,
//             playbackRateMin: 0.85,
//             playbackRateMax: 0.95,
//             fileNames: [
//                 'lift1.mp3',
//                 'lift2.mp3',
//                 'lift3.mp3',
//                 'lift4.mp3'
//             ]
//         },
//         burst: {
//             volume: Math.random() + 0.5,
//             playbackRateMin: 0.8,
//             playbackRateMax: 0.9,
//             fileNames: [
//                 'burst1.mp3',
//                 'burst2.mp3'
//             ]
//         },
//         burstSmall: {
//             volume: 0.25,
//             playbackRateMin: 0.8,
//             playbackRateMax: 1,
//             fileNames: [
//                 'burst-sm-1.mp3',
//                 'burst-sm-2.mp3'
//             ]
//         },
//         crackle: {
//             volume: 0.2,
//             playbackRateMin: 1,
//             playbackRateMax: 1,
//             fileNames: ['crackle1.mp3']
//         },
//         crackleSmall: {
//             volume: 0.3,
//             playbackRateMin: 1,
//             playbackRateMax: 1,
//             fileNames: ['crackle-sm-1.mp3']
//         }
//     },

//     _lastSmallBurstTime: 0,

//     async loadBuffer(fileName) {
//         // Sử dụng đường dẫn từ thư mục Music với file MP3
//         const response = await fetch(this.baseURL + fileName);
//         const arrayBuffer = await response.arrayBuffer();
//         return audioContext.decodeAudioData(arrayBuffer);
//     },

//     async loadSounds() {
//         // Tải tất cả các âm thanh vào bộ đệm
//         for (let sourceType in this.sources) {
//             const source = this.sources[sourceType];
//             source.buffers = await Promise.all(
//                 source.fileNames.map(fileName => this.loadBuffer(fileName))
//             );
//         }
//     },

//     async playSound(type, scale = 1) {
//         scale = Math.min(Math.max(scale, 0), 1);

//         // Throttle small bursts
//         if (type === 'burstSmall') {
//             const now = Date.now();
//             if (now - this._lastSmallBurstTime < 20) {
//                 return;
//             }
//             this._lastSmallBurstTime = now;
//         }

//         const source = this.sources[type];
//         if (!source) {
//             throw new Error(`Sound of type "${type}" doesn't exist.`);
//         }

//         // Chọn một bộ đệm ngẫu nhiên từ danh sách file đã tải
//         const buffer = MyMath.randomChoice(source.buffers);
//         const bufferSource = audioContext.createBufferSource();

//         const initialVolume = source.volume;
//         const initialPlaybackRate = MyMath.random(source.playbackRateMin, source.playbackRateMax);

//         const scaledVolume = initialVolume * scale;
//         const scaledPlaybackRate = initialPlaybackRate * (2 - scale);

//         const gainNode = audioContext.createGain();
//         gainNode.gain.value = scaledVolume;

//         bufferSource.buffer = buffer;
//         bufferSource.playbackRate.value = scaledPlaybackRate;
//         bufferSource.connect(gainNode);
//         gainNode.connect(audioContext.destination);

//         bufferSource.start(0);
//     }
// };

// // Tải tất cả âm thanh khi bắt đầu
// soundManager.loadSounds().then(() => {
//     console.log('All sounds are loaded');
// });



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
class ShellV2 extends Shell{
	constructor(options, starlife){
		super(options);
		Object.assign(this, options);
		this.starLifeVariation = options.starLifeVariation || 0.125+starlife/1000;
		this.color = options.color || randomColor();
		this.glitterColor = options.glitterColor || this.color;
		
		// Set default starCount if needed, will be based on shell size and scale exponentially, like a sphere's surface area.
		if (!this.starCount) {
			const density = options.starDensity || 1;
			const scaledSize = this.spreadSize / 54;
			this.starCount = Math.max(6, scaledSize * scaledSize * density);
		}
		
	}
	burstV2(x, y) {
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
		if (this.fallingLeaves) onDeath = fallingLeavesEffect;
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
			else {
				createBurst(this.starCount, starFactory);
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

// function seqDrone(){
// 	for(let i=0;i<20;i++){
// 		drones.push(new Drone(0.5+i/100, 0.5, 3, 0, 0, COLOR.Gold, 3000000));
// 	}
// 	const formation = new Formation();
// 	drones.forEach(drone => formation.addDrone(drone));
// 	formation.setCircleFormationV2(300, 300, 100);
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
function seqDrone() {
    
}
/**
 * Hàm sinh ra vòng tròn
 * @param {Time} timeLife 
 * @param {Color} color 
 * @param {speed} speed 0,001->0,01 
 */
function seqDroneSquare(timeLife = 5000,speed = 0.002,color=COLOR.Blue){
	for (let i = 0; i < 120; i++) {
        drones.push(new Drone(0.5 + i / 100, 0.5, 6, 0, 0, color, timeLife));
    }
	let time = 0; // Biến thời gian
	// Tạo 3 đội hình khác nhau
	const formation1 = new Formation();
	const formation2 = new Formation();
	const formation3 = new Formation();

	// Phân chia drone vào từng đội hình
	drones.forEach((drone, index) => {
		if (index < 40) {
			formation1.addDrone(drone); // Đội hình 1: Drone đầu tiên
		} else if (index < 80) {
			formation2.addDrone(drone); // Đội hình 2: Drone tiếp theo
		} else {
			formation3.addDrone(drone); // Đội hình 3: Drone còn lại
		}
	});
		// Thiết lập đội hình cho mỗi nhóm
	// formation1.setCircleFormation(300, 200, 100); // Đội hình 1: Hình tròn
	// formation2.setLineFormation(100, 300, 20);   // Đội hình 2: Đường thẳng ngang
	// formation3.setCircleFormationV2(500, 400, 150, Math.PI / 4); // Đội hình 3: Hình tròn xoay

	// Tạo điều phối viên
	const showController = new ShowController();
	drones.forEach(drone => showController.addDrone(drone));

	// // Thêm từng đội hình vào điều phối viên
	// showController.addFormation(formation1);
	// showController.addFormation(formation2);
	// showController.addFormation(formation3);

    // // Thêm vòng lặp để xoay đội hình
    // let rotationAngle = 0;
    // const angularSpeed = Math.PI / 120; // 1 vòng trong 2 giây

    // function updateFormation() {
    //     rotationAngle += angularSpeed;
    //     formation.setCircleFormationV2(300, 300, 100, rotationAngle);
    // }
	// function updateFormation() {
	// 	time += 1; // Cập nhật thời gian (bạn có thể tăng nhanh hơn nếu muốn quay nhanh)
	// 	const rotationAngle = time * 0.05; // Tốc độ xoay của đội hình
	// 	formation.setCircleFormationV3(300, 300, 100, rotationAngle, 150, 0.02, time);
	// }
	// Hàm cập nhật để xoay vòng tròn
	 // Hàm cập nhật để xoay đội hình 3D
	 function updateFormation3D() {
        time += speed; // Tăng thời gian để thay đổi góc quay
        const rotationAngle = time; // Góc quay thay đổi liên tục
        // Cập nhật đội hình xoay 3D cho các đội hình
		let cao = 10
		let pp = 2.15
        formation1.setCircleFormationV3(maxW/2, 150,color, 100*5, rotationAngle, Math.PI/ pp); // Đội hình 1: Xoay với góc nghiêng 30 độ
        formation2.setCircleFormationV3(maxW/2, 165+cao,color, 115*5, -rotationAngle, Math.PI/ pp); // Đội hình 2: Đường thẳng không thay đổi
        formation3.setCircleFormationV3(maxW/2,	180+cao*2,color, 100*5, rotationAngle, Math.PI/ pp); // Đội hình 3: Xoay với góc nghiêng 45 độ
    }
	
		setInterval(updateFormation3D, 16);
	
    // Gọi hàm cập nhật mỗi 16ms (60 FPS)
    

	// Gọi hàm mỗi 16ms (60 FPS)
	

    // setInterval(updateFormation, 16); // Cập nhật mỗi 16ms
}
function seqDroneSphere(time=5000){
	for (let i = 0; i < 600; i++) {
        drones.push(new Drone(0.5, 0.5, 3, 0, 0, COLOR.Gold, time));
    }

    const formation = new Formation();
    drones.forEach(drone => formation.addDrone(drone));

    let rotationAngleX = 0;
    let rotationAngleY = 0;
    let rotationAngleZ = 0;

    function updateFormation3D() {
        rotationAngleX += 0.001; // Tăng góc xoay X
        rotationAngleY += 0.001; // Tăng góc xoay Y
        rotationAngleZ += 0.001; // Tăng góc xoay Z

        formation.setSphereFormation(maxW/2, maxH/2, 120, COLOR.Gold, 200, rotationAngleX, rotationAngleY, rotationAngleZ);
    }

    setInterval(updateFormation3D, 16);
}

	
function testSeqDrone(){

	for (let i = 0; i < 90; i++) {
        drones.push(new Drone(0.5 + i / 100, 0.5, 5, 0, 0,COLOR.Red,20000000));
    }
	let d_count = drones.length;
	
	let formation = new Formation();
	let formation2 =new Formation();
	let formation3 =new Formation();
	drones.forEach((drone, index) => {
		if (index < 30) {
			formation.addDrone(drone); // Đội hình 1: Drone đầu tiên
		} else if (index < 60) {
			formation2.addDrone(drone); // Đội hình 2: Drone tiếp theo
		} else {
			formation3.addDrone(drone); // Đội hình 3: Drone còn lại
		}
	});
	formation.setCircleFormationV2(maxW/2, 150, 100); // Đội hình 1: Xoay với góc nghiêng 30 độ
    formation2.setCircleFormationV2(maxW/2, 165, 115); // Đội hình 2: Đường thẳng không thay đổi
    formation3.setCircleFormationV2(maxW/2,	180, 100); // Đội hình 3: Xoay với góc nghiêng 45 độ
	
		formation2.setRandomColor()
	
	formation.setReduceSize()
	
	
	
	
	setTimeout(() => {
		formation.setCircleFormationV2(300, 150, 100);
	}, 5000);
	
}	





testSeqDrone()










