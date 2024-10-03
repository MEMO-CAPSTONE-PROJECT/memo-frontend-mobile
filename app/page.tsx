
export default function Home() {
  return (
    <div>
      <div className="absolute -top-[10rem] -left-[25rem] z-10 border-[140px] border-secondary-2 border-opacity-20 w-[588px] h-[588px] rounded-[50%]"/>
      <div className="absolute -top-80 -right-[22rem] z-10 border-[100px] border-secondary-2 border-opacity-20 w-[538px] h-[538px] rounded-[50%]"/>
      <div className="absolute top-60 -right-44 z-10 border-[80px] border-secondary-2 border-opacity-20 w-[288px] h-[288px] rounded-[50%]"/>

      <div className="bg-secondary-1 flex justify-center items-end w-screen h-screen p-8 pb-10">
          <div className="flex flex-col items-center justify-between bg-system-white p-4 z-20 w-full h-[36rem] rounded-[30px]">
              <div className="flex flex-col space-y-[20px]">
                <div className="flex flex-col items-center space-y-[10px]">
                  <div className="text-[20px] font-bold text-title-2">ลงชื่อเข้าใช้ระบบ นักเรียน</div>
                  <div className="text-[16px] text-title-3 font-regular">กรุณาใส่รหัสนักเรียน</div>
                </div>
                <input 
                    className="w-[17.5rem] px-4 h-[52px] bg-system-light-gray placeholder-title-3 font-regular text-[16px] rounded-[10px]" 
                    placeholder="รหัสคุณครู"
                />
              </div>
              <button className="w-full h-[60px] p-2 rounded-[15px] bg-primary-2 text-system-white text-[20px] font-medium">เข้าสู่ระบบ</button>
          </div>
      </div>
    </div>
  )
}
