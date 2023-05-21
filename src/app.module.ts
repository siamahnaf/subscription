import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { Context } from "graphql-ws";
import { GraphQLError } from "graphql";

//Using Apollo Studio
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ListModule } from "./list/list.module";

//Path
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        subscriptions: {
          "graphql-ws": {
            onConnect: (context: Context<any, any>) => {
              const { extra } = context;
              const cookies = extra.request.headers.cookie;
              console.log(cookies);
              if (!cookies) {
                throw new GraphQLError('You are not authorized to perform this action.', {
                  extensions: {
                    code: 'FORBIDDEN',
                  },
                });
              }
            }
          }
        },
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        installSubscriptionHandlers: false,
        playground: false,
        path: "graphql",
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      })
    }),
    ListModule
  ]
})
export class AppModule { }
