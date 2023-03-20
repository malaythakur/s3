import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3 } from "aws-sdk";


const s3 = new S3();

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const uuid = event.pathParameters!["uuid"];


  if (!uuid){
    return {
      statusCode: 400,
      body: JSON.stringify({error:"missing UUID"}),
    };

  }
  try{
  await s3.headObject({
    Bucket: "malay-s3-bucket",
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

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e.message
      }),
    }

  }
  


};
