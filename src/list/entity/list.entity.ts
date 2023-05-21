import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class List {
    @Field(() => String)
    id: string;
    @Field(() => String)
    name: string;
    @Field(() => String)
    created_at: Date;
}