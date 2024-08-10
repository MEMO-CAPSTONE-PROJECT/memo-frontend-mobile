//
//  DemoRepository.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//
protocol DemoRepositoryProtocol {
    func getDemos() async throws -> [DemoEntity]
}
