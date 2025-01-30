import { getMemoBorderWidth } from '@/constants/theme/border-width'
import { Color } from '@/constants/theme/color'
import { getMemoLayoutSize } from '@/constants/theme/layout-size'
import { InputStateColors } from '@/shared/themes/input-variants'
import { MemoInputStates } from '@/shared/types/input-state-type'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { CalendarDots } from 'phosphor-react-native'
import { Fragment, useState } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import { Input, XStack } from 'tamagui'

export interface MemoDatePickerProps {
    value?: Date
    state?: keyof MemoInputStates
    placeholder?: string
    onConfirm?: (date?: Date) => void
}

export default function MemoDatePicker({ value, state = "default", placeholder, onConfirm }: Readonly<MemoDatePickerProps>) {
    const [show, setShow] = useState(false)
    const [focus, setFocus] = useState(false)

    function hideDatePicker() {
        setShow(false)
        setFocus(false)
    }

    function handleConfirm(event: DateTimePickerEvent, date?: Date)  {  
        onConfirm?.(date)
        hideDatePicker()
    }
    const { bgColor, placeholderColor, borderColor, textColor } = focus ? InputStateColors.focus : InputStateColors[state]

    return (
        <Fragment>
            <Pressable onPress={() => setShow(true)}>
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
                            style={{ color: value ? textColor : placeholderColor }}
                            className={`font-kanit-medium `}
                        >
                            {value?.toLocaleDateString() ?? placeholder}
                        </Text>
                    </Input>
                    <XStack paddingRight={10} position='absolute'>
                        <CalendarDots color={textColor} />
                    </XStack>
                </XStack>
            </Pressable>
            
            <Modal
                visible={show}
                animationType="slide"
                onRequestClose={hideDatePicker}
                transparent={true}
            >
                <View className="flex-1 bg-system-white text-title-1">
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={value ?? new Date()}
                        locale="th-TH"
                        onChange={handleConfirm}
                        mode={"date"}
                        display="inline"
                        textColor={Color["title-1"]}
                        accentColor={Color["primary-2"]}
                        style={{ flex: 1 }}
                        themeVariant="light"
                    />
                </View>
            </Modal>
        </Fragment>
    )
}
