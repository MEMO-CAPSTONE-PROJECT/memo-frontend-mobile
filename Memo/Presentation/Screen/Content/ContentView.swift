//
//  ContentView.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        ZStack {
            VStack(spacing: 0) {
                NavigationBar(title: "แชท")
                    .padding(.horizontal, 15)
                    .padding(.bottom)
                HomeView()
                Spacer()
            }
        }.background(.black)
    }
}

#Preview {
    ContentView()
}
