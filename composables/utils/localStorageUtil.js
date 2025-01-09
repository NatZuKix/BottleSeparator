// ฟังก์ชันสำหรับบันทึกข้อมูลพร้อมเวลา Timeout
function setWithExpiry(key, value, timeout) {
    const now = new Date();
  
    // สร้างข้อมูลที่เก็บเวลา Timeout
    const item = {
      value: value,
      expiry: now.getTime() + timeout * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  // ฟังก์ชันสำหรับดึงข้อมูลจาก localStorage พร้อมตรวจสอบเวลา
  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
  
    // ถ้าไม่มีข้อมูลใน localStorage
    if (!itemStr) {
      return null;
    }
  
    const item = JSON.parse(itemStr);
    const now = new Date();
  
    // ตรวจสอบว่า Timeout หมดอายุหรือยัง
    if (now.getTime() > item.expiry) {
        if(key =='Token'){
            localStorage.removeItem("FullName");
            localStorage.removeItem("UserID");
            localStorage.removeItem("UserRole");
        }
      // ถ้าหมดอายุ ให้ลบข้อมูลออก
      localStorage.removeItem(key);
      return null;
    }

   
  
    return item.value;
  }
  
export {getWithExpiry,setWithExpiry}
  