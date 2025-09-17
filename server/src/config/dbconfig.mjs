// server/src/config/dbconfig.mjs
import dynamoose from "dynamoose";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

async function waitForDynamo(endpoint, attempts = 20, delayMs = 500) {
  const client = new DynamoDBClient({
    endpoint,
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID || "local",
      secretAccessKey: process.env.SECRET_ACCESS_KEY_ID || "local",
    },
  });

  for (let i = 1; i <= attempts; i++) {
    try {
      await client.send(new ListTablesCommand({}));
      return; // radi!
    } catch (e) {
      if (i === attempts) throw e;
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
}

if (process.env.LOCAL) {
  const endpoint = process.env.DYNAMO_ENDPOINT || "http://recepti-db:8000";

  // ⏳ sačekaj da port zaista sluša
  await waitForDynamo(endpoint, 30, 500);

  const ddb = new dynamoose.aws.ddb.DynamoDB({
    endpoint,
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID || "local",
      secretAccessKey: process.env.SECRET_ACCESS_KEY_ID || "local",
    },
  });

  dynamoose.aws.ddb.set(ddb);
}

export default dynamoose;