//
//  NavigationBar.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//

import SwiftUI

struct NavigationBar: View {
    
    @State private var isAnimated: Bool = false
    
    private var title: String
    
    init(title: String) {
        self.title = title
    }
    
    var body: some View {
        HStack {
            Icon(logo: "globe")
            Spacer()
            Text(self.title)
                .font(.title3)
                .bold()
                .foregroundStyle(.white)
                .opacity(isAnimated ? 1 : 0)
                .onAppear(perform: {
                    withAnimation(.easeInOut(duration: 0.5)) {
                        isAnimated.toggle()
                    }
                })
            Spacer()
            Icon(logo: "globe")
        }
    }
}

#Preview {
    NavigationBar(title: "Navigation Bar").background(.black)
}
