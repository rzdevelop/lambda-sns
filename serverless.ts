import type { AWS } from "@serverless/typescript";

import incoming from "@functions/incoming";

const serverlessConfiguration: AWS = {
  service: "lambda-sns",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    baseName: "${self:service}-${self:provider.stage}",
    topicName: "${self:custom.baseName}-monthly-statement-queue",
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    stage: "${opt:stage, 'default'}",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["sns:Publish"],
        Resource: [
          {
            "Fn::Join": [
              "",
              [
                {
                  "Fn::Join": [
                    ":",
                    [
                      "arn:aws:sns",
                      {
                        Ref: "AWS::Region",
                      },
                      {
                        Ref: "AWS::AccountId",
                      },
                      ":${self:custom.topicName}",
                    ],
                  ],
                },
              ],
            ],
          },
        ],
      },
    ],
  },
  // import the function via paths
  functions: { incoming },
  resources: {
    Resources: {
      snstopic: {
        Type: "AWS::SNS::Topic",
        Properties: { TopicName: "${self:custom.topicName}" },
      },
    },
  },
};

module.exports = serverlessConfiguration;
