import { ImageAssets } from "@/assets/images/image-assets";
import { MemoContent } from "@/components/ui/kits/container/memo-content";

export const mockTeacherContents: MemoContent[] = [
    {
      id: "1",
      name: "แข่งเพชรยอดมงกุฎ",
      src: ImageAssets.diamond,
      open: true,
      sections: {
        reward: "จิตอาสา 5 แต้ม, กล้าแสดงออก 3 แต้ม",
        date: "วันที่ 01/09/67 12:00 PM ถึง 02/09/67 11:59 PM",
        organizer: "คุณครูนงเยาว ใจดี",
      },
      tags: [{ id: "จิตอาสา", variant: "primary" }, { id: "กล้าแสดงออก", variant: "secondary" }]
    },
    {
      id: "2",
      name: "แข่งเพชรยอดมงกุฎ",
      src: ImageAssets.diamond,
      open: true,
      sections: {
        reward: "จิตอาสา 5 แต้ม, กล้าแสดงออก 3 แต้ม",
        date: "วันที่ 01/09/67 12:00 PM ถึง 02/09/67 11:59 PM",
        organizer: "คุณครูนงเยาว ใจดี",
      },
      tags: [{ id: "จิตอาสา", variant: "primary" }, { id: "กล้าแสดงออก", variant: "secondary" }]
    },
    {
      id: "3",
      name: "แข่งเพชรยอดมงกุฎ",
      src: ImageAssets.diamond,
      open: false,
      sections: {
        reward: "จิตอาสา 5 แต้ม, กล้าแสดงออก 3 แต้ม",
        date: "วันที่ 01/09/67 12:00 PM ถึง 02/09/67 11:59 PM",
        organizer: "คุณครูนงเยาว ใจดี",
      },
      tags: [{ id: "จิตอาสา", variant: "primary" }, { id: "กล้าแสดงออก", variant: "secondary" }]
    },
    {
      id: "4",
      name: "แข่งเพชรยอดมงกุฎ",
      open: false,
      sections: {
        reward: "จิตอาสา 5 แต้ม, กล้าแสดงออก 3 แต้ม",
        date: "วันที่ 01/09/67 12:00 PM ถึง 02/09/67 11:59 PM",
        organizer: "คุณครูนงเยาว ใจดี",
      },
      tags: [{ id: "จิตอาสา", variant: "primary" }, { id: "กล้าแสดงออก", variant: "secondary" }]
    },
    {
      id: "5",
      name: "แข่งเพชรยอดมงกุฎ",
      open: false,
      sections: {
        reward: "จิตอาสา 5 แต้ม, กล้าแสดงออก 3 แต้ม",
        date: "วันที่ 01/09/67 12:00 PM ถึง 02/09/67 11:59 PM",
        organizer: "คุณครูนงเยาว ใจดี",
      },
      tags: [{ id: "จิตอาสา", variant: "primary" }, { id: "กล้าแสดงออก", variant: "secondary" }]
    }
  ]