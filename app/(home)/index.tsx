import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import CardContainer from '@/components/container/card-container';
import HelperError from '@/components/helper/helper-error';
import MemoTextInput from '@/components/input/memo-text-input';
import SurpriseStudent from '@/components/ui/kit/surprise-student';
import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView 
                keyboardShouldPersistTaps="never" 
                keyboardDismissMode="interactive" 
                scrollEnabled={false} 
                contentContainerClassName="h-full w-screen"
        >
            <BrandingBackground color="secondary" className="flex justify-end items-center">
                <SafeAreaView className="z-20 w-full">
                    <CardContainer>
                         <View className="flex gap-y-lg">
                            <SurpriseStudent className="flex items-center"/>
                            <View className="flex items-center gap-y-md">
                                <Text className="font-kanit-bold space text-title text-body-1">ลงชื่อเข้าใช้ระบบ นักเรียน</Text>
                                <Text className="font-kanit-regular text-body text-body-2">กรุณาใส่รหัสนักเรียน</Text>
                            </View>
                            <MemoTextInput state="default" placeholder="รหัสนักเรียน"/>
                        </View>
                        <View className="flex gap-y-md">
                            <View className="flex-row justify-between">
                                <HelperError error="รหัสผ่านไม่ถูกต้อง"/>
                                <Text className="font-kanit-regular text-title-1">ลืมรหัสนักเรียน?</Text>
                            </View>
                            <MemoButton name="เข้าสู่ระบบ" variant="primary"/>
                        </View>
                    </CardContainer>
                </SafeAreaView>
            </BrandingBackground>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

