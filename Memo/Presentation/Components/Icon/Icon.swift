//
//  Icon.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//
import SwiftUI

struct Icon: View {
    private var textLeft: String?
    private var textLeftColor: Color
    private var textRight: String?
    private var textRightColor: Color
    private var logo: String
    
    init(
        textLeft: String? = nil,
        textLeftColor: Color = .black,
        textRight: String? = nil,
        textRightColor: Color = .black,
        logo: String
    ) {
        self.textLeft = textLeft
        self.textLeftColor = textLeftColor
        self.textRight = textRight
        self.textRightColor = textRightColor
        self.logo = logo
    }
    
    var body: some View {
        HStack(spacing: 8) {
            // MARK: - Left Text
            if let textLeft = self.textLeft {
                Text(textLeft)
                    .foregroundColor(self.textLeftColor)
            }
            
            // MARK: - Logo Image
            Image(systemName: self.logo)
                .resizable()
                .scaledToFit()
                .foregroundColor(.teal)
                .frame(width: 30, height: 30, alignment: .center)
            
            // MARK: - Right Text
            if let textRight = self.textRight {
                Text(textRight)
                    .foregroundColor(self.textRightColor)
            }
        }
    }
}

#Preview {
    Icon(
        textLeft: "Left", 
        textLeftColor: .blue,
        textRight: "Right",
        textRightColor: .blue,
        logo: "globe"
    )
}
