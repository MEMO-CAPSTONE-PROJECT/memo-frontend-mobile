//
//  DemoView.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//

import SwiftUI

struct DemoView: View {
    
    @StateObject var viewModel: DemoViewModel = .init()

    
    var body: some View {
        VStack {
            LazyVGrid(
                columns: [
                    GridItem(.adaptive(minimum: 150)),
                    GridItem(.adaptive(minimum: 150))
                ], spacing: 16
            ){
                ForEach(viewModel.demos, id:\.title) { demo in
                    Text(demo.title)
                    Text(demo.description)
                }
            }
        }.task {
            do {
                try await viewModel.getDemos()
            } catch {
                print(error)
            }
        }.background(.blue)
    }
}

#Preview {
    DemoView()
}
