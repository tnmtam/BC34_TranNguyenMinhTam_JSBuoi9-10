function DanhSachNhanVien() {
    this.arr = [];
  
    this.themNV = function (nv) {
      this.arr.push(nv);
    };
  
    this.timViTriNV = function (tknv) {
      var index = -1;
  
      this.arr.forEach(function (nv, i) {
        if (nv.tknv === tknv) {
          index = i;
        }
      });
  
      return index;
    };
  /**
   * Xóa nhân viên
   */
    this.xoaNV = function (tknv) {
      var index = this.timViTriNV(tknv);
  
      if (index !== -1) {
        this.arr.splice(index, 1);
      }
    };

  /**
    * Thông tin nhân viên
    */
    this.thongTinNV = function (tknv) {
      var nv = null;
      //Tìm vị trí nhân viên
      var index = this.timViTriNV(tknv);
  
      if(index !== -1) {
        nv = this.arr[index];
      }
  
      return nv;
    };

    /**
     * Cập nhật nhân viên
     */
    this.capNhatNV = function (nv) {
      var index = this.timViTriNV(nv.tknv);
  
      if(index !== -1) {
        this.arr[index] = nv;
      }
    };
  
    /**
     * Tìm kiếm nhân viên
     */
  this.timKiemNV = function (keyword) {
    var mangTimKiem = [];

    this.arr.forEach(function (nv) {
      var nameLowerCase = nv.xepLoai.toLowerCase();
      var keywordLowerCase = keyword.toLowerCase();
      if (nameLowerCase.indexOf(keywordLowerCase) !== -1) {
        mangTimKiem.push(nv);
      }
    });

    return mangTimKiem;
  };
}