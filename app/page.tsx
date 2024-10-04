"use client"
import BrandingBackground from "@/app/components/background/branding-background";
import Image from "next/image";

export default function Home() {
  return (
    <BrandingBackground color="secondary">
      <div className="flex justify-center items-end w-screen h-screen p-8 pb-10">
          <div className="flex relative flex-col items-center justify-between bg-system-white p-4 z-20 w-full h-[38rem] rounded-[30px]">
              <div className="flex h-[3rem]">
                <Image className="absolute top-14 left-4 w-[130px] h-auto" src="/images/mascot/boy/look.svg" alt="Boy mascot is looking" width={130} height={150} />
                <Image className="absolute top-14 right-8 w-[100px] h-auto" src="/images/mascot/girl/happy.svg" alt="Girl mascot is happy" width={100} height={150} />
              </div>
              <div className="flex flex-col space-y-[20px]">
                <div className="flex flex-col items-center space-y-[10px]">
                  <div className="text-title font-bold text-title-2">ลงชื่อเข้าใช้ระบบ นักเรียน</div>
                  <div className="text-body text-title-3 font-regular">กรุณาใส่รหัสนักเรียน</div>
                </div>
                <input 
                    className="w-[17.5rem] px-4 h-[52px] bg-system-light-gray placeholder-title-3 font-regular text-body rounded-[10px]" 
                    placeholder="รหัสคุณครู"
                />
              </div>
              <button className="w-full h-[60px] p-2 rounded-[15px] bg-primary-2 text-system-white text-[20px] font-medium">เข้าสู่ระบบ</button>
          </div>
      </div>
    </BrandingBackground>
  )
}
