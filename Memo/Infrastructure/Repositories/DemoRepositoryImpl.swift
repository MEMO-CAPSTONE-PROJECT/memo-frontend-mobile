//
//  DemoRepositoryImpl.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//
struct DemoRepositoryImpl {
    
    fileprivate let datasource: DemoDatasource = DemoDatasource.shared
    static let shared = DemoRepositoryImpl()
    
}

extension DemoRepositoryImpl: DemoRepositoryProtocol {
    
    func getDemos() async throws -> [DemoEntity] {
        do {
            let data = try await datasource.getDemos()
            return data.map({ DemoMapper.toEntity(from: $0) })
        } catch {
            throw error
        }
    }
}
