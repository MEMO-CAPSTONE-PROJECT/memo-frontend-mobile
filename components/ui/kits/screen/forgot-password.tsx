import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface ForgotPasswordUIKitProps {    
    icon: React.ReactNode
    steps: string[]
}

export default function ForgotPasswordUIKit({ steps, icon }: Readonly<ForgotPasswordUIKitProps>) {
    return (
        <BrandingBackground className="justify-end">
            <MemoCard className="justify-between">
                <View className="items-center gap-y-md">
                    {icon}
                    <Text className="font-kanit-bold text-body-1 text-title">กรุณาทำตามขั้นตอนดังนี้</Text>
                    <View>
                        {steps.map((step, index) => 
                            <Text key={step} className="font-kanit-regular text-body-1 text-body">{index+1}. {step}</Text>
                        )}
                    </View>
                </View>
                <Link href=".." asChild>
                    <MemoButton variant="primary" name="ย้อนกลับ" />
                </Link> 
            </MemoCard>
        </BrandingBackground>
    )
}