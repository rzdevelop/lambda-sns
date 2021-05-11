import "source-map-support/register";

import type { ApiGatewayEventHandler } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

// import schema from "./schema";

const incoming: ApiGatewayEventHandler<any /*typeof schema*/> = async (
  event
) => {
  try {
    console.log("event", event);
    console.log("event stringify", JSON.stringify(event));
  } catch (e) {}
  try {
    console.log("event body", event.body);
    const { body } = event;
    console.log("event parsed", JSON.parse(body || JSON.stringify({})));
  } catch (e) {}
  return formatJSONResponse({
    success: true,
  });
};

export const main = middyfy(incoming);
