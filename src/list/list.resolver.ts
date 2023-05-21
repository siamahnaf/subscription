import { Resolver, Mutation, Subscription, Query, Args } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";

import { ListService } from "./list.service";
import { List } from "./entity/list.entity";
import { SuccessInfo } from "./entity/success.entity";
import { ListInput } from "./dto/list.dto";

const pubsub = new PubSub();

@Resolver()
export class ListResolver {
    constructor(
        private readonly listService: ListService
    ) { }

    @Query(() => [List], { name: "getLists" })
    gets() {
        return this.listService.gets();
    }

    @Mutation(() => SuccessInfo, { name: "addList" })
    add(
        @Args("listInput") listInput: ListInput
    ) {
        const result = this.listService.create(listInput);
        pubsub.publish("notification", { getSubscribe: "A new item added in list!" });
        return result;
    }

    @Subscription(() => String, { name: "getSubscribe" })
    subscribe() {
        return pubsub.asyncIterator("notification");
    }
}