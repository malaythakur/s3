import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3 } from "aws-sdk";
import { v4 } from "uuid";

const s3 = new S3();
const bucketName = "malay-s3-bucket";

class HTTPError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number){
    super(message);
    this.statusCode= statusCode;
  }
}

interface User extends Object {
  uuid: string;
}

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  try{
    const uuid = getUUID(event);
    await validateUserExists(uuid);
    await s3.headObject({
    Bucket: "bucketName",
    Key: `${uuid}.json`,
  }).promise();

  const output = s3.getObject({
      Bucket: "bucketName",
      Key: `${uuid}.json`,
    }).promise();

    return{
      statusCode:200,
      body: (await output).Body?.toString() || "",
    };
  }catch (e) {
    if(e.code === "NotFound" || e.code === "NoSuchKey"){
      
      return{
        statusCode: 404,
        body: JSON.stringify({error:"user not found"}),
      };
    }

    return getErrorResult(e);

  }
};

const getUUID = (event: APIGatewayProxyEvent) =>{
  const uuid = event.pathParameters!["uuid"];
  
  if(!uuid){
    throw new HTTPError("missing UUID", 400)
  }
  return uuid;
};

const getErrorResult = (e:Error): APIGatewayProxyResult => {
  if (e instanceof HTTPError){
    return {
      statusCode: e.statusCode,
      body: JSON.stringify({
        errror: e.message
      }),
    }
  }

  return {
    statusCode: 500,
    body: JSON.stringify(e),
  };
};



export const postUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
 
  const uuid = v4();

  try{
    
  return {
    statusCode: 201,
    body: JSON.stringify(await upsertUser(uuid, event.body)),
  };
  }
  catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: e.message})
    };
  }
};

const validateUserExists = async (uuid: string): Promise<void> => {
  try {
  await s3
  .headObject({
    Bucket: bucketName,
    Key: `${uuid}.json`
  })
  .promise();
  } catch(e) {
    if (e.code === "NotFound" || e.code === "NoSuchKey"){
      throw new HTTPError("User not found",404)
    }
    throw e; 
  }
};

const upsertUser = async(uuid: string, body: string | null): Promise<User>=>{
  const user ={
    ...JSON.parse(body || "{}"),
    uuid,
  };
  
  await s3
  .putObject({
    Bucket: bucketName,
    Key: `${uuid}.json`,
    Body: JSON.stringify(user),
  })
    .promise();

  return user;
};
export const putUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  try {
    const uuid = getUUID(event);

    await validateUserExists(uuid);

    const user = await upsertUser(uuid, event.body);

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  }
    catch(e) {
  

    return getErrorResult(e);
  }
};