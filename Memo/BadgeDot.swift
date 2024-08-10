//
//  BadgeDot.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//

import SwiftUI

struct BadgeDot: View {
    
    private var color: Color
    private var stroke: Color
    
    init(color: Color, stroke: Color = .clear) {
        self.color = color
        self.stroke = stroke
    }
    
    var body: some View {
        Circle()
            .fill(self.color)
            .stroke(self.stroke, lineWidth: 3)
            .frame(width: 16, height: 16)
    }
    
}

#Preview {
    BadgeDot(color: .orange)
}
