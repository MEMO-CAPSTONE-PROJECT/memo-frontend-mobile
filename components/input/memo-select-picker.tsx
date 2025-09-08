import { getMemoBorderWidth } from "@/constants/theme/border-width"
import { Color } from "@/constants/theme/color"
import { getMemoLayoutSize } from "@/constants/theme/layout-size"
import { InputStateColors } from "@/shared/themes/input-variants"
import { MemoInputStates } from "@/shared/types/input-state-type"
import { ArrowDown, ArrowUp, CaretDown, Check } from "phosphor-react-native"
import { Text } from "react-native"
import { Adapt, Select, SelectProps, Sheet } from "tamagui"

export interface MemoSelectPickerProps extends SelectProps {
  placeholder?: string
  state?: keyof MemoInputStates
  items: MemoSelectPickerItem[]
}

interface MemoSelectPickerItem {
  name: string
  value: string
}

export default function MemoSelectPicker({ placeholder, state = "default", items, ...props }: Readonly<MemoSelectPickerProps>) {
  const RightIcon = <CaretDown size={16} weight="bold" color={Color["title-1"]}/>
  const { bgColor, placeholderColor, borderColor, textColor } = InputStateColors[state]
  return (
    <Select disablePreventBodyScroll {...props}>
      <Select.Trigger iconAfter={RightIcon} 
        height={getMemoLayoutSize("5xl")} 
        borderWidth={getMemoBorderWidth("xsm")}
        paddingHorizontal={getMemoLayoutSize("lg")}
        borderColor={borderColor}
        backgroundColor={bgColor}
      >
        <Text 
          style={{ color: props?.value ? textColor : placeholderColor }} 
          className={`font-kanit-medium`}
        >
          {(items.find(item => item.value === props?.value)?.name ?? "") || placeholder}
        </Text>
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        {/* or <Select.Sheet> */}
        <Sheet 
          native={!!props.native} 
          modal 
          dismissOnSnapToBottom 
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay 
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Select.Content>
        <Select.ScrollUpButton 
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
            <ArrowUp size={20}/>
        </Select.ScrollUpButton>
        <Select.Viewport>
          <Select.Group>
            {placeholder && (
              <Select.Label>
                <Text className="font-kanit-bold">{placeholder}</Text>
              </Select.Label>
            )}
            {items.map((item, index) => (
              <Select.Item 
                index={index} 
                key={index + "_" + item.name} 
                value={item.value}
                borderBottomWidth={1}
              >
                <Text className="font-kanit-medium">{item.name}</Text>
                <Select.ItemIndicator marginLeft="auto">
                  <Check size={16} weight="bold"/>
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <ArrowDown size={20}/>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}