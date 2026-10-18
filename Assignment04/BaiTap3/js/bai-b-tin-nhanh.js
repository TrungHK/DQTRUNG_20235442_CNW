// Chặn việc gửi form tìm kiếm khi nhấn Enter
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

const oTimKiem = document.getElementById("o-tim-kiem");
const list = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1, F2, F3: Lọc tin và cập nhật bộ đếm, thông báo không tìm thấy
function locTin() {
	const tuKhoa = oTimKiem.value;
	const tuKhoaThuong = tuKhoa.toLowerCase();
	const cacMuc = Array.from(list.querySelectorAll("li"));

	cacMuc.forEach(muc => {
		const h3 = muc.querySelector("h3");
		const p = muc.querySelector("p");
		const noiDung = ((h3 ? h3.textContent : "") + " " + (p ? p.textContent : "")).toLowerCase();

		if (tuKhoa === "" || noiDung.includes(tuKhoaThuong)) {
			muc.classList.remove("an");
		} else {
			muc.classList.add("an");
		}
	});

	const soHien = cacMuc.filter(muc => !muc.classList.contains("an")).length;
	if (soHien === 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
	} else {
		khongThay.classList.add("an");
	}

	boDem.textContent = `Đang hiển thị ${soHien}/${cacMuc.length} tin`;
}

oTimKiem.addEventListener("keyup", locTin);

// F4: Thu gọn / mở rộng nội dung (Event delegation trên #list)
list.addEventListener("click", (e) => {
	const nut = e.target.closest(".more");
	if (!nut || !list.contains(nut)) {
		return;
	}

	const muc = nut.closest("li");
	if (!muc) {
		return;
	}

	const doan = muc.querySelector("p");
	if (!doan) {
		return;
	}

	if (doan.classList.contains("day-du")) {
		doan.classList.remove("day-du");
		nut.textContent = "Read more >>";
	} else {
		doan.classList.add("day-du");
		nut.textContent = "Thu gọn <<";
	}
});

// F5: Đăng tin nhanh
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value.trim();
	const noiDung = oNoiDung.value.trim();

	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const liMoi = document.createElement("li");

	const spanNgay = document.createElement("span");
	spanNgay.className = "time";
	spanNgay.textContent = homNay();

	const h3 = document.createElement("h3");
	h3.textContent = oTieuDe.value;

	const p = document.createElement("p");
	p.textContent = oNoiDung.value;

	const nutMore = document.createElement("button");
	nutMore.type = "button";
	nutMore.className = "more";
	nutMore.textContent = "Read more >>";

	liMoi.append(spanNgay, h3, p, nutMore);
	list.prepend(liMoi);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";

	locTin();
});

// Khởi tạo bộ đếm khi tải trang
locTin();
