//
//  ChatBox.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//

import SwiftUI

struct ChatBox: View {
    
    private var name: String
    private var description: String
    
    init(name: String, description: String) {
        self.name = name
        self.description = description
    }
    
    var body: some View {
        Button(action: onTapped) {
            HStack {
                ZStack(alignment: .bottomTrailing) {
                    Image(systemName: "globe")
                        .resizable()
                        .frame(width: 64, height: 64)
                        .padding(.leading, 8)
                    BadgeDot(color: .green, stroke: .black)
                        .frame(
                            width: 64,
                            height: 64,
                            alignment: .bottomTrailing
                        )
                }
                VStack(alignment: .leading) {
                    Text(self.name)
                        .foregroundStyle(.white)
                        .bold()
                    Text(self.description)
                        .foregroundStyle(.gray)
                }
                .padding(.vertical, 16)
                .padding(.leading, 8)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
    
    func onTapped() {
        print(self.name)
    }
}

#Preview {
    ChatBox(name: "Test", description: "Description").background(.black)
}
