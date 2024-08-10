//
//  ContentView.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//

import SwiftUI

struct HomeView: View {
    var body: some View {
        VStack(spacing: 0) {
            ChatBox(
                name: "Ppiin Nntch",
                description: "Ppiin ได้ส่งรูปภาพ - ศ."
            )
            ChatBox(
                name: "Patcharapol Plaenak",
                description: "สวัสดีครับ คุณริว - ศ."
            )
            ChatBox(
                name: "Jesada Phornsakunphaisan",
                description: "คุณ: มีเรียนนะครับ - ศ."
            )
            ChatBox(
                name: "Ppiin Nntch",
                description: "ตูดใหญ่มากค่ะ - ศ."
            )
        }
        
    }
}

#Preview {
    HomeView().background(.black)
}
