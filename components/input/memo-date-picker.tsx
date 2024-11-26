import { getMemoBorderWidth } from '@/constants/theme/border-width'
import { Color } from '@/constants/theme/color'
import { getMemoLayoutSize } from '@/constants/theme/layout-size'
import { InputStateColors } from '@/shared/themes/input-variants'
import { MemoInputStates } from '@/shared/types/input-state-type'
import { CalendarDots } from 'phosphor-react-native'
import { useState } from 'react'
import { Pressable, Text } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'
import { Input, Portal, XStack } from 'tamagui'

export interface MemoDatePickerProps {
    value?: Date
    state?: keyof MemoInputStates
    placeholder?: string
    onConfirm?: (date: Date) => void
}

export default function MemoDatePicker({ value, state = "default", placeholder, onConfirm }: Readonly<MemoDatePickerProps>) {
    const [show, setShow] = useState(false)
    const [focus, setFocus] = useState(false)

    function hideDatePicker() {
        setShow(false)
        setFocus(false)
    }

    function handleConfirm(date: any)  {
        onConfirm?.(date.date)
        hideDatePicker()
    }
    const { bgColor, placeholderColor, borderColor, textColor } = focus ? InputStateColors.focus : InputStateColors[state]

    return (
        <Pressable onPress={() => setShow(true)} className="flex">
            <XStack alignItems={'center'} justifyContent='flex-end'>
                <Input
                    pointerEvents="none"
                    editable={false}
                    flexGrow={1}
                    height={getMemoLayoutSize("5xl")}
                    borderWidth={getMemoBorderWidth("xsm")}
                    borderColor={borderColor}
                    backgroundColor={bgColor}
                >
                    <Text 
                        style={{ color: value ? textColor: placeholderColor }} 
                        className={`font-kanit-medium `}
                    >
                        {value?.toLocaleDateString() ?? placeholder}
                    </Text>
                </Input>
                <XStack paddingRight={10} position='absolute'>
                    <CalendarDots color={textColor} />
                </XStack>
            </XStack>
            <Portal>
                <DatePicker
                    isVisible={show}
                    mode={"single"}
                    onCancel={hideDatePicker}
                    onConfirm={handleConfirm}
                    colorOptions={{
                        headerColor: Color["system-white"],
                        backgroundColor: Color["system-white"],
                        selectedDateTextColor: Color["system-white"],
                        headerTextColor: Color["title-1"],
                        dateTextColor: Color["title-1"],
                        changeYearModalColor: Color["primary-2"],
                        weekDaysColor: Color["primary-2"],
                        selectedDateBackgroundColor: Color["primary-2"],
                        confirmButtonColor: Color["primary-2"]
                    }}
                />
            </Portal>
        </Pressable>
    )
}
