import { Injectable } from "@nestjs/common";
import { ListInput } from "./dto/list.dto";

@Injectable()
export class ListService {

    async gets() {
        const list = [
            { id: 1, name: "Siam Ahnaf", created_at: new Date() },
            { id: 2, name: "Siddik Rahman", created_at: new Date() },
            { id: 3, name: "Jibon Rahman", created_at: new Date() },
            { id: 4, name: "John Doe", created_at: new Date() },
            { id: 5, name: "Khas na ken", created_at: new Date() },
        ]
        return list;
    }

    async create(listInput: ListInput) {
        return {
            success: true,
            message: "List added successfully!"
        }
    }
}