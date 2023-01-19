import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DonationsModule } from './donations/donations.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLDateTime } from 'graphql-iso-date';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    typePaths: ['./**/*.graphql'],
    resolvers: { DateTime: GraphQLDateTime },
    //subscriptions package added to support subscriptions
    subscriptions: {
      'graphql-ws': true,
      //this second one is only for testing in sandbox
      'subscriptions-transport-ws': true,
    },
  }), 
  DonationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
