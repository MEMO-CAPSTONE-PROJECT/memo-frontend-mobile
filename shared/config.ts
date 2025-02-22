import { LocaleConfig } from "react-native-calendars";

export const MemoConfig = {
    isMock: false
}

export const initializeCalendarConfig = () => {
    LocaleConfig.locales['th'] = {
        monthNames: [
          'มกราคม',
          'กุมภาพันธ์',
          'มีนาคม',
          'เมษายน',
          'พฤษภาคม',
          'มิถุนายน',
          'กรกฎาคม',
          'สิงหาคม',
          'กันยายน',
          'ตุลาคม',
          'พฤศจิกายน',
          'ธันวาคม'
        ],
        monthNamesShort: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
        dayNames: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
        dayNamesShort: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
        today: "วันนี้",
      };
      
      LocaleConfig.defaultLocale = 'th';
}