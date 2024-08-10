//
//  DemoMapper.swift
//  Memo
//
//  Created by Duangcharoen on 10/8/2567 BE.
//
struct DemoMapper {
    static func toEntity(from content: DemoModel.Response) -> DemoEntity {
        return DemoEntity(title: content.title, description: content.description)
    }
    
    static func toResponse(from content: DemoEntity) -> DemoModel.Response {
        return DemoModel.Response(title: content.title, description: content.description)
    }
}
