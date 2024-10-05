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
                         <View>
                            <SurpriseStudent className="flex items-center"/>
                            <View className="flex items-center mb-[20px]">
                                <Text className="font-kanit-bold text-title text-title-2 mb-[10px]">ลงชื่อเข้าใช้ระบบ นักเรียน</Text>
                                <Text className="font-kanit-regular text-body text-title-3">กรุณาใส่รหัสนักเรียน</Text>
                            </View>
                            <MemoTextInput state="default" placeholder="รหัสนักเรียน"/>
                        </View>
                        <View>
                            <View className="flex-row justify-between mb-[10px]">
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
