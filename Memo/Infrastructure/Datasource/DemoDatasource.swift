//
//  DemoDatasource.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//
protocol DemoDatasourceProtocol {
    func getDemos() async throws -> [DemoModel.Response]
}

struct DemoDatasource {
    
    static let shared: DemoDatasource = DemoDatasource()
}

extension DemoDatasource: DemoDatasourceProtocol {

    func getDemos() async throws -> [DemoModel.Response] {
        return [
            DemoModel.Response(title: "Title1", description: "Description1"),
            DemoModel.Response(title: "Title2", description: "Description2"),
            DemoModel.Response(title: "Title3", description: "Description3"),
            DemoModel.Response(title: "Title4", description: "Description4")
        ]
    }
}
