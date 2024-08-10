//
//  DemoUsecase.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//
protocol DemoUsecase {
    func execute() async throws -> Result<[DemoEntity], Error>
}

struct DemoUsecaseImpl: DemoUsecase {
    
    let repository: DemoRepositoryProtocol = DemoRepositoryImpl()
    
    func execute() async throws -> Result<[DemoEntity], Error> {
        do {
            let demos = try await repository.getDemos()
            return .success(demos)
        } catch {
            return .failure(error)
        }
    }
}
