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
</body>
</head>

</html>
