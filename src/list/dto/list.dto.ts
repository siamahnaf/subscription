import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ListInput {
    @Field(() => String)
    name: string;
}