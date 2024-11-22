import BrandingBackground from "@/components/background/branding-background";
import MemoSearchBar from "@/components/bar/memo-searchbar";
import MemoSelectionButton from "@/components/button/memo-selection-button";
import MemoCard from "@/components/container/memo-card";
import MemoIconBox from "@/components/container/memo-icon-box";
import MemoPill from "@/components/pill/memo-pill";
import ScrollableView from "@/components/scrollable/scrollable-view";
import { CalendarDots, GraduationCap, Medal } from "phosphor-react-native";
import { Text, View } from "react-native";

interface MemoContent {
  name: string;
  reward: string;
  date: string;
  organizer: string;
}

interface Section {
  id: keyof MemoContent;
  name: string;
  icon: React.FC;
  secondary: boolean;
}

const MemoContentCard: React.FC<{ content: MemoContent; sections: Section[] }> = ({
  content,
  sections,
}) => (
  <View className="gap-y-lg px-[1.5rem] pb-xl border-b-sm border-system-light-gray">
    <View className="gap-y-sm">
      <Text className="font-kanit-bold text-title">{content.name}</Text>
      <View className="flex-row gap-x-md">
        <MemoPill name="จิตอาสา" variant="primary" />
        <MemoPill name="กล้าแสดงออก" variant="secondary" />
      </View>
    </View>
    {sections.map(({ id, name, icon, secondary }) => (
      <View key={id} className="flex-row gap-x-lg items-center">
        <MemoIconBox icon={icon} variant={secondary ? "secondary" : "primary"} />
        <View>
          <Text className="font-kanit-regular text-body">{name}</Text>
          <Text className="font-kanit-regular text-caption-2">{content[id]}</Text>
        </View>
      </View>
    ))}
    <Text className="font-kanit-regular text-system-blue">รายละเอียดเพิ่มเติม &gt;</Text>
  </View>
);


export default function StudentHomeScreen() {
  const buttons = [
    { name: "เป้าหมายที่ปิดรับ", active: false, onPress: () => console.log("เป้าหมายที่ปิดรับ") },
    { name: "เป้าหมายที่เปิดรับ", active: true, onPress: () => console.log("เป้าหมายที่เปิดรับ") }
  ]
  const sections: Section[] = [
    { id: "reward", name: "รางวัล", icon: Medal, secondary: true },
    { id: "date", name: "วันที่ปิดรับ", icon: CalendarDots, secondary: false },
    { id: "organizer", name: "คุณครูผู้ดูแล", icon: GraduationCap, secondary: false }
  ]
  const contents: MemoContent[] = [
    {
      name: "แข่งเพชรยอดมงกุฎ",
      reward: "วันที่ 01/09/67 12:00 PM ถึง 02/09/67 11:59 PM",
      date: "จิตอาสา 5 แต้ม, กล้าแสดงออก 3 แต้ม",
      organizer: "คุณครูนงเยาว ใจดี"
    },
    {
      name: "แข่งเพชรยอดมงกุฎ",
      reward: "วันที่ 01/09/67 12:00 PM ถึง 02/09/67 11:59 PM",
      date: "จิตอาสา 5 แต้ม, กล้าแสดงออก 3 แต้ม",
      organizer: "คุณครูนงเยาว ใจดี"
    },
    {
      name: "แข่งเพชรยอดมงกุฎ",
      reward: "วันที่ 01/09/67 12:00 PM ถึง 02/09/67 11:59 PM",
      date: "จิตอาสา 5 แต้ม, กล้าแสดงออก 3 แต้ม",
      organizer: "คุณครูนงเยาว ใจดี"
    }
  ]
  return (
    <BrandingBackground variant="secondary" appbar>
      <MemoCard size="full" className="gap-y-xl p-0">
        <View className="gap-y-xl px-[1.5rem]">
          <MemoSearchBar placeholder="ค้นหา" />
          <MemoSelectionButton buttons={buttons} />
        </View>
        <ScrollableView border={false} gap={false} className="gap-y-xl">
          {contents.map((content, index) => (
            <MemoContentCard
              key={index}
              content={content}
              sections={sections}
            />
          ))}
        </ScrollableView>
      </MemoCard>
    </BrandingBackground>
  )
}