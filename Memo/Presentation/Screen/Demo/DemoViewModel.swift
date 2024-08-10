//
//  DemoView.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//

import SwiftUI

class DemoView: ObservableObject {
    
    let usecase: DemoUsecase
    
    @Published var demos: [DemoEntity] = []
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?
    
    init(usecase: DemoUsecase) {
        self.usecase = usecase
    }
    
    func getDemos() async throws {
        isLoading = true
        let result = try await usecase.execute()
        switch result {
            case .success(let demos):
                self.demos = demos
                self.isLoading = false
            case .failure(let failure):
                self.isLoading = false
                self.errorMessage = failure.localizedDescription
        }
    }
}
