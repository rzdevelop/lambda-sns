// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";
import { LambdaFunction } from "@libs/types";

const lambda: LambdaFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "",
        // request: {
        //   schema: {
        //     "application/json": schema,
        //   },
        // },
      },
    },
  ],
  environment: {
    topicName: "${self:custom.topicName}",
  },
};

export default lambda;
