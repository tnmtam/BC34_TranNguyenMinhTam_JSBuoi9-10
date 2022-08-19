/**
 * Khai báo lớp dsnv
 */

 function NhanVien(
    tknv,
    tenNV,
    email,
    password,
    datepicker,
    luongCB,
    chucVu,
    gioLam
  ) {
    this.tknv = tknv;
    this.tenNV = tenNV;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.total = 0;
    this.xepLoai = "";

    //Tính tổng lương
    var formart = new Intl.NumberFormat("vn-VN");
    this.tinhTotal = function () {
      if (this.chucVu == "Sếp") {
      this.total = formart.format((parseFloat(this.luongCB)) * 3);
      }else if(this.chucVu == "Trưởng phòng") {
      this.total = formart.format((parseFloat(this.luongCB)) * 2);
      }else{
        this.total = formart.format((parseFloat(this.luongCB)));
      }
    };

    //Xét xếp loại
    this.danhGia = function () {
      if((parseFloat(this.gioLam)) >= 160 && (parseFloat(this.gioLam)) < 176) {
        this.xepLoai = "Nhân Viên Khá";
      }else if((parseFloat(this.gioLam)) >= 176 && (parseFloat(this.gioLam)) < 192) {
        this.xepLoai = "Nhân Viên Giỏi";
      }else if((parseFloat(this.gioLam)) >= 192) {
        this.xepLoai = "Nhân Viên Xuất Sắc";
      }else {
        this.xepLoai = "Nhân Viên Trung Bình";
      }
    };
}
