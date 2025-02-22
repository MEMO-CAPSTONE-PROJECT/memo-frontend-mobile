import MemoButton from "@/components/button/memo-button"
import MemoInputButton from "@/components/button/memo-input-button"
import MemoErrorMessage from "@/components/helper/memo-error-message"
import MemoDatePickerHelper from "@/components/input/helper/memo-date-picker-helper"
import MemoTextAreaInputHelper from "@/components/input/helper/memo-text-area-input-helper"
import MemoTextInputHelper from "@/components/input/helper/memo-text-input-helper"
import MemoAptitudePicker from "@/components/ui/kits/form/memo-aptitude-picker"
import { UpsertAchievementForm } from "@/hooks/achievement/useUpsertAchievement"
import { PickerResult } from "@baronha/react-native-multiple-image-picker"
import { PlusCircle } from "phosphor-react-native"
import { View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { ZodFormattedError } from "zod"

interface MemoAchievementFormButton {
    label: string
    onPress: () => void
}

interface MemoAchievementFormProps {
    initialImages?: PickerResult[]
    isLoading?: boolean
    form: UpsertAchievementForm
    errors?: ZodFormattedError<UpsertAchievementForm, string>
    error?: string
    minTypes?: number
    maxTypes: number
    update: (key: any, value: any) => void
    onAddType: () => void
    onRemoveType: (index: number) => void
    primaryButton: MemoAchievementFormButton
    secondaryButton?: MemoAchievementFormButton
    children?: React.ReactNode
}

export default function MemoAchievementForm({
    initialImages,
    form,
    errors,
    error,
    minTypes = 1,
    maxTypes,
    isLoading,
    update,
    onAddType,
    onRemoveType,
    primaryButton,
    secondaryButton,
    children
}: Readonly<MemoAchievementFormProps>) {
    return (
        <KeyboardAwareScrollView>
            <View className="gap-y-lg px-[1.5rem] pb-[1.5rem]">
                <View className="gap-y-lg">
                    <View className="flex-row gap-x-lg">
                        <MemoDatePickerHelper
                            id="start-date"
                            label="วันที่เปิด"
                            placeholder="วันที่เปิด"
                            value={form.startDate}
                            error={errors?.startDate?._errors[0]}
                            onConfirm={(date) => date && update("startDate", date)}
                        />
                        <MemoDatePickerHelper
                            id="end-date"
                            label="วันที่ปิด"
                            placeholder="วันที่ปิด"
                            value={form.endDate}
                            error={errors?.endDate?._errors[0]}
                            onConfirm={(date) => date && update("endDate", date)}
                        />
                    </View>
                    <MemoTextInputHelper
                        label="ชื่อเป้าหมาย"
                        placeholder="ชื่อเป้าหมาย"
                        value={form.name}
                        error={errors?.name?._errors[0]}
                        onChangeText={(text) => update("name", text)}
                    />
                    <MemoTextInputHelper
                        label="จำนวนที่เข้าร่วมได้"
                        placeholder="จำนวนที่เข้าร่วมได้"
                        keyboardType="number-pad"
                        value={form.amount}
                        error={errors?.amount?._errors[0]}
                        onChangeText={(text) => update("amount", text)}
                    />
                    {form.points.map((point, index) => (
                        <MemoAptitudePicker
                            key={point.id || index}
                            remove={minTypes-1 !== index}
                            onRemove={() => onRemoveType(index)}
                            data={{
                                id: {
                                    value: point.id,
                                    error: errors?.points?.[index]?.id?._errors[0],
                                    onChange: (text) => update(`points.${index}.id`, text),
                                },
                                normal: {
                                    value: point.normal,
                                    error: errors?.points?.[index]?.normal?._errors[0],
                                    onChange: (text) => update(`points.${index}.normal`, text),
                                },
                                excellent: {
                                    value: point.excellent,
                                    error: errors?.points?.[index]?.excellent?._errors[0],
                                    onChange: (text) => update(`points.${index}.excellent`, text),
                                },
                            }}
                        />
                    ))}
                    {form.points.length < maxTypes && (
                        <MemoInputButton
                            icon={PlusCircle}
                            iconVariant="success"
                            name="เพิ่มกลุ่มความถนัด"
                            onPress={onAddType}
                        />
                    )}
                    <MemoTextAreaInputHelper
                        label="รายละเอียด"
                        placeholder="รายละเอียด"
                        value={form.description}
                        error={errors?.description?._errors[0]}
                        onChangeText={(text) => update("description", text)}
                    />
                    {children}
                </View>
                <MemoErrorMessage error={error} />
                <MemoButton
                    isLoading={isLoading}
                    name={primaryButton.label}
                    variant="primary"
                    onPress={primaryButton.onPress}
                />
                {secondaryButton && (
                    <MemoButton
                        name={secondaryButton.label}
                        variant="error"
                        onPress={secondaryButton.onPress}
                    />
                )}
            </View>
        </KeyboardAwareScrollView>
    )
}