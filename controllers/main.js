
//Khởi tạo đối tượng dsnv từ lớp đối tượng dsnv
var dsnv = new DanhSachNhanVien();
var validation = new Validation();


//lấy data từ LocalStorage
getLocalStorage();

//Khởi tạo getElementById
function getEle(id) {
  return document.getElementById(id);
}

function thongTinNV(isAdd) {
  //input 
  var tknv = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var datepicker = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucVu").value;
  var gioLam = getEle("gioLam").value;

//isValid la true => form hop le
var isValid = true;
//TKSV
if (isAdd) {
  isValid &=
    validation.kiemTraRong(
      tknv,
      "tbTKNV",
      "(*)  Vui lòng nhập Tài khoản"
    ) &&
    validation.kiemTraDoDaiKiTu(
      tknv,
      "tbTKNV",
      "(*)  Vui lòng nhập kí số 4 - 6",
      4,
      6
    ) &&
    validation.checkMaNVTonTai(
      tknv,
      "tbTKNV",
      "(*) Tài khoản đã tồn tại!",
      dsnv.arr
    );
}
//TenNV
isValid &=
  validation.kiemTraRong(tenNV, "tbTen", "(*)  Vui lòng nhập Tên!") &&
  validation.kiemTraKiTuChuoi(
    tenNV,
    "tbTen",
    "(*)  Vui lòng nhập chuỗi kí tự!"
  );

//Email
isValid &=
  validation.kiemTraRong(email, "tbEmail", "(*)  Vui lòng nhập email !") &&
  validation.checkEmail(
    email,
    "tbEmail",
    "(*)  Vui lòng nhập email đúng định dạng !"
  );

//Mat khau
isValid &=
  validation.checkPassWord(
    password,
    "tbMatKhau",
    "(*)  Mật khẩu 6 - 10 (chứa ít nhất 1 ký tự số , 1 ký tự in hoa , 1 ký tự đặt biệt)"
  ) &&
  validation.kiemTraDoDaiKiTu(
    password,
    "tbMatKhau",
    "(*)  Vui lòng nhập mật khẩu 6 - 10 (chứa ít nhất 1 ký tự số , 1 ký tự in hoa , 1 ký tự đặt biệt) ",
    6,
    10
  );
//Ngay lam
isValid &= validation.checkDate(
  datepicker,
  "tbNgay",
  "(*)  Kiểm tra lại ngày làm !"
);
//LuongCB
isValid &= validation.checkLuongCB(
  luongCB,
  "tbLuongCB",
  "(*)  Vui lòng nhập lương cơ bản từ 1.000.000 - 20.000.000 !"
);
//Chuc Vu
isValid &= validation.checkChucVu(
  "chucVu",
  "tbChucVu",
  "(*) Vui long chọn chức vụ !"
);

//Gio lam
isValid &= validation.checkGioLam(
  gioLam,
  "tbGiolam",
  "(*) Giờ làm từ 80 - 200 "
);

if (!isValid) return null;

  //Tạo đối tượng nhân viên từ lớp đối tượng Nhanvien
  var nhanVien = new NhanVien(
    tknv,
    tenNV,
    email,
    password,
    datepicker,
    luongCB,
    chucVu,
    gioLam,
  );

  //Tính tổng lương & xếp loại
  nhanVien.tinhTotal(); 
  nhanVien.danhGia();
  return nhanVien;

}

/**
 * Add Nhân viên
 */
 getEle("btnThem").onclick = function () {
  getEle("btnThemNV").style.display = "block";
  document.getElementById("tknv").disabled = false;
  getEle("btnCapNhat").style.display = "none";
  resetForm();
  
};
function resetForm() {
  getEle("tknv").value = "";
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("datepicker").value = "";
  getEle("luongCB").value = "";
  getEle("gioLam").value = "";
}

getEle("btnDong").addEventListener("click", function(){
  getEle("tbTKNV").style.display = "none";
  getEle("tbTen").style.display = "none";
  getEle("tbEmail").style.display = "none";
  getEle("tbMatKhau").style.display = "none";
  getEle("tbNgay").style.display = "none";
  getEle("tbLuongCB").style.display = "none";
  getEle("tbChucVu").style.display = "none";
  getEle("tbGiolam").style.display = "none";
})


 getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = thongTinNV(true);

  if(nhanVien) {
    //Thêm nv vào mảng arr
  dsnv.themNV(nhanVien);
  getEle("btnDong").click();

  //gọi hàm setLocalStorage để lưu data
  setLocalStorage();

  renderTable(dsnv.arr);
  resetForm();
  };
})

function renderTable(data) {
  var content = "";

  data.forEach(function (nv) {
    content += `
            <tr>
                <td>${nv.tknv}</td>
                <td>${nv.tenNV}</td>
                <td>${nv.email}</td>
                <td>${nv.datepicker}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.total}</td>
                <td>${nv.xepLoai}</td>
                <td>
                    <button class="btn btn-info"
                    data-toggle="modal" 
                    data-target="#myModal"  
                    onclick="suaNV('${nv.tknv}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaNV('${nv.tknv}')">Xoá</button>
                </td>
            </tr>
        `;
  });

  getEle("tableDanhSach").innerHTML = content;
}


/**
 * Xoa NV
 */
 function xoaNV(tknv) {
  dsnv.xoaNV(tknv);
  renderTable(dsnv.arr);
  setLocalStorage();
}

/**
 * Sua NV
 */
 function suaNV(tknv) {
  var nv = dsnv.thongTinNV(tknv);
  if(nv) {
    //Dom tới các input
    getEle("tknv").disabled = true;
    getEle("btnThemNV").style.display = "none";
    getEle("btnCapNhat").style.display = "block";
    getEle("tknv").value =nv.tknv;
    getEle("name").value = nv.tenNV;
    getEle("email").value = nv.email;
    getEle("password").value = nv.password;
    getEle("datepicker").value = nv.datepicker;
    getEle("luongCB").value = nv.luongCB;
    getEle("chucVu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }
}

/**
 * Cập nhật NV
 */
 getEle("btnCapNhat").addEventListener("click", function() {
  //lấy value từ các thẻ input
  var nhanVien = thongTinNV(false);
  
  dsnv.capNhatNV(nhanVien);
  getEle("btnDong").click();
  renderTable(dsnv.arr);
  setLocalStorage();
});

/**
 * Tim kiem nhan vien
 */
 getEle("searchName").addEventListener("keyup", function () {
  //dom lấy value input#txtKeyword
  var keyword = getEle("searchName").value;

  var mangTimKiem = dsnv.timKiemNV(keyword);
  renderTable(mangTimKiem);
});


function setLocalStorage() {
  //Convert JSON => string
  var dataString = JSON.stringify(dsnv.arr);
  //Luu xuong localStorage
  localStorage.setItem("DanhSachNhanVien", dataString);
}

function getLocalStorage() {
  if (localStorage.getItem("DanhSachNhanVien")) {
    var dataString = localStorage.getItem("DanhSachNhanVien");
    //Convet string => JSON
    var dataJson = JSON.parse(dataString);
    //backup lại dự liệu cho dsnv.arr từ dataJson
    dsnv.arr = dataJson;
    //hiển thị dsnv ra ngoài table
    renderTable(dataJson);
  }
}

