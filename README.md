<html>
<head>
<body>
<h1 align="center">How to fetch and update S3 files</h1>
<h2>Terminologies</h2>
<p><em><strong>Serverless</strong></em>: Serverless is a cloud computing model where the cloud provider manages the infrastructure and automatically allocates resources as needed to run and scale applications. In a serverless architecture, the developer does not have to manage servers, operating systems, or application runtimes. Instead, they can focus solely on writing and deploying code that performs specific tasks or functions.<br>

The name "serverless" does not mean that servers are not involved, but rather that the developer does not need to worry about managing them. In a serverless architecture, the cloud provider is responsible for managing the infrastructure, handling server maintenance, and scaling the application automatically based on usage. <br>

One of the primary benefits of serverless computing is that it can help reduce operational costs and increase efficiency by enabling developers to write code that only runs when triggered by an event, such as a user uploading a file or making a request to an API. This allows for more efficient use of resources and can lead to cost savings compared to traditional server-based architectures.
</p>

<p><em><strong>Serverless Framework</strong></em>: The Serverless Framework is an open-source development framework for building and deploying serverless applications. It provides a simple, yet powerful way to develop, deploy and manage serverless applications on cloud platforms such as AWS Lambda, Azure Functions, and Google Cloud Functions.<br>

With the Serverless Framework, developers can easily create serverless applications in a variety of programming languages, including Node.js, Python, and Java. They can also take advantage of a large ecosystem of plugins and integrations to extend the functionality of their applications, such as integrating with third-party services like Twilio, Slack, or Stripe. <br>

Overall, the Serverless Framework provides a streamlined way for developers to build and deploy serverless applications, reducing the complexity and time required to manage infrastructure and enabling faster time to market. <br>
</p>

<p><em><strong>AWS S3</strong></em>: Amazon S3 (Simple Storage Service) is a cloud storage service provided by Amazon Web Services (AWS). It provides object storage through a web service interface that allows developers to store and retrieve any amount of data, at any time, from anywhere on the web.</p>

<p><em><strong>AWS API Gateway</strong></em>: AWS API Gateway is a fully managed service provided by Amazon Web Services that allows developers to create, deploy, and manage APIs (Application Programming Interfaces) for their web and mobile applications. It provides a scalable, reliable, and secure platform for building APIs that can be used to access data, services, or applications hosted on AWS or on-premises.</p>

<p><em><strong>TypeScript</strong></em>: TypeScript is an open-source programming language developed by Microsoft. It is a superset of JavaScript, which means that any valid JavaScript code is also valid TypeScript code. TypeScript adds optional static typing, class-based object-oriented programming, and other features to JavaScript, making it easier to write and maintain large-scale web applications.<p>

<h2>Prerequisites</h2>
<ul>
<li>AWS Admin user</li>
<li>AWS CLI installed and configured with Admin IAM credentials</li>
<li>Latest Node.js</li>

<li>Serverless Framework installed on your machine</li>
</ul>

<h2>Step 1. Creating S3 bucket</h2>

To create an S3 bucket run the following command in your terminal:

<pre>aws s3api create-bucket --bucket bucket-name --region your_region --create-bucket-configuration LocationConstraint=your_region</pre>

where:
<ul>
<li><bold>bucket-name</bold> should be replaced with a unique name of the bucket</li>
<li><bold>your_region</bold> should be replaced with the region of your choice (default one is us-east-1)</li>
</ul>

This is how look like for me

<pre>aws s3api create-bucket --bucket juet-bucket --region eu-west-1 --create-bucket-configuration LocationConstraint=eu-west-1</pre>
<img src ="https://user-images.githubusercontent.com/100518568/224864046-38768a9c-8f78-4155-9c17-1ccebbfb1600.png">

To ensure that your bucket exists, run the following commands
<pre>aws s3 ls</pre>
<img src ="https://user-images.githubusercontent.com/100518568/224864568-76f3d3fc-b008-4c5a-9772-5c4a7d7f59b9.png">

NOTE: AWS provide naming standard when naming a bucket. <a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-s3-bucket-naming-requirements.html">visit</a>
  
  <h2>Step 2. Create TypeScript serverless project from the template</h2>
  <ol>
    <li>Change the directory to the one where you would like your new serverless project to be created, for example:</li>
    <pre> cd ~/Desktop/Projects </pre>
    <br>
    <li>To create a new serverless project from <a href="https://github.com/ttarnowski">ttarnowski</a> zero-config TypeScript template run:
    <pre> serverless create --template-url https://github.com/devpeak/serverless-aws-nodejs-typescript/tree/main --path my-s3-lambda-function </pre>
    <br>
    </li>
    <img src ="https://user-images.githubusercontent.com/100518568/224893958-b574a17a-f2af-4d15-b3a1-8688188b0baa.png"><br>
    <p>  where <em><strong>my-s3-lambda-function</strong></em> is the name of the folder where your project is going to be created.</p>
    <br>
    <li>Now to install all dependencies for a project</li>
     <pre> $ yarn install </pre>
  
  </ol>
  
  <h2>Step 3. Infrastructure configuration</h2>
  <h3>Region</h3>
  
  In AWS (Amazon Web Services), a region refers to a physical location around the world where AWS has established a data center or a cluster of data centers.
  It determines the physical location of a server where your lambda code will be deployed to and executed.
  
  <br>
  To change the region of your lambda find the following section in the serverless.yml file then uncomment the following line and change the value to the region code of your choice:
  <br>
  <pre>provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: 20201221
  region: eu-west-1
  </pre>
  
  <h2>Functions</h2>
  
  In AWS API Gateway, a <em>.yaml</em> file is used to define the configuration of an API in YAML format. The file contains a number of functions that can be used to configure various aspects of the API, including the resources, methods, integrations, and other settings.
  <br><br>
  Here are some of the functions commonly used in an AWS API Gateway .yaml file: <br><br>
  <ul>
    <li>
  <strong>Resources</strong>: This function is used to define the top-level resources for the API, such as the /users or /products endpoints. <br><br>
    </li>
    <li>
   <strong>Methods</strong>: This function is used to define the HTTP methods (GET, POST, PUT, DELETE, etc.) that are supported by each resource.</li><br>
    </li>
    <li>
    <strong>Integration</strong>: This function is used to specify how the API Gateway should integrate with other AWS services or external HTTP endpoints.<br><br>
    </li>
    <li>
      <strong>Cors</strong>: This function is used to configure Cross-Origin Resource Sharing (CORS) settings for the API, which allows web pages from other domains                                to make requests to the API.<br><br>
    </li>
    <li>
  <strong>Authorizer</strong>: This function is used to specify an authentication mechanism for the API, such as AWS Lambda authorizers, Cognito User Pools, or                                   custom authentication mechanisms.<br><br>
    </li>
    <li>
  <strong>Deployment</strong>: This function is used to specify the deployment stage for the API, which determines the base URL for the API and the settings for                                    the stage (such as caching and logging).<br><br>
    </li>
  </ul>

  we need to modify this section of serverless.yml
  <pre>
  functions:
    hello:
      handler: src/handlers.hello
  </pre>
  
  Change it to 
  
  <pre>
  functions:
  getUser:
    handler: src/handlers.getUser
    events:
      - http:
          path: /user/{uuid}
          method: get
  postUser:
    handler: src/handlers.postUser
    events:
      - http:
          path: /user
          method: post
  putUser:
    handler: src/handlers.putUser
    events:
      - http:
          path: /user/{uuid}
          method: put

  </pre>
  
  Here we've created 3 API Gateway HTTP endpoints:
  <ol>
    <li>GET /user/{uuid}</li>
    <li>PUT /user/{uuid}</li>
    <li>POST /user</li>
  </ol><br>
  In HTTP, GET, PUT, and POST are three commonly used methods for requesting and modifying resources on a web server. Here's a brief overview of each method:
  <ol>
    <li>
      GET: The GET method is used to retrieve a resource from a server. When a client sends a GET request to a server, the server responds with the requested resource (such as a web page or image). GET requests should not modify the server's state, and should only retrieve data.
    </li>
    <li>PUT: The PUT method is used to update a resource on a server. When a client sends a PUT request to a server, the server replaces the resource specified in the request with the new data provided by the client.
    </li>
    <li>
      POST: The POST method is used to submit data to a server to create a new resource or update an existing one. When a client sends a POST request to a server, the server processes the data in the request and creates or updates the specified resource
    </li>
  </ol><br><br>
  UUID stands for Universally Unique Identifier. It is a 128-bit value.UUIDs are typically represented as a string of hexadecimal digits, separated by hyphens, such as 550e8400-e29b-41d4-a716-446655440000. It is useful for a variety of applications, such as generating unique IDs for database records or tracking individual sessions in web applications.
  </body>
</head>

</html>
