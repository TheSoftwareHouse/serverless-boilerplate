README
======
Step Functions local allows you to run a start an execution on any machine. The local
version of Step Functions can invoke Lambda functions, both in AWS and running locally.
You can also coordinate other supported AWS services.

Release Notes
-------------
Version: 1.0.0 - The initial release of Step Functions local.
Version: 1.0.1 - Fixed an issue with loading the configuration.
Version: 1.0.2 - Replaced generic exception with a specific unsupported exception for an unsupported request.
Version: 1.0.3 - Adding restriction to the length of activity name, state machine name, and execution name (Length should be between 1 and 80).
Version: 1.1.0 - Adding service integrations for Lambda and callback task support for SQS, SNS, Lambda, and ECS.
Version: 1.1.1 - Fixed an issue of GetActivityTask getting suspended due to race condition.
Version: 1.1.2 - Adding support for JSON type for parameters of SQS and SNS.
Version: 1.2.0 - Adding support for resource tagging operations. This release adds the TagResource, UntagResource, and ListTagsForResource APIs and implements tag-on-create functionality for CreateStateMachine and CreateActivity.
Version: 1.2.1 - Fixed retry to respect retry order.
Version: 1.2.2 - Added support to multiple Lambda function name patterns.
Version: 1.3.0 - Adding support to start new workflow execution by calling StartExecution as an integrated service API.
Version: 1.3.1 - Fixed an issue of Lambda connector timing out after 3 minutes.
Version: 1.4.0 - Adding support for dynamic parallelism within a workflow.
Version: 1.5.0 - Adding support for Express Workflow.
Version: 1.5.1 - Fixed an issue of validator throwing error on encountering JSONPath in place of non-string value.
Version: 1.5.2 - Added support for configuring a custom port.
Version: 1.5.3 - Added payload/error/cause size validation for `[Start|Stop]Execution`, `SendTask[Success|Failure]` APIs and fixed inconsistency in `States.DataLimit` error detail text for lambda connectors.
Version: 1.6.0 - Added Large State Payloads (256KB) support and `Parameters` property size validation against payload limit
Version: 1.6.1 - Added support for Sagemaker processing job.
Version: 1.7.0 - Added support for new ASL Choice state comparators, and ResultSelector field in Task, Map and Parallel state
Version: 1.7.1 - Fixed results from sync service integration returning key value for null values. Add support for Sagemaker CreateModel, CreateEndpoint and CreateEndpointConfig.
Version: 1.7.2 - Added support for IntrinsicFunctions, Dynamic Timeouts in Task State and Context Object access globally.
Version: 1.7.3 - Added support for Athena Start Query Execution job, Stop Query Execution job, Get Query Execution job, and Get Query Results job.
Version: 1.7.4 - Added support for DataBrew Start Job Run, and API Gateway Invoke.
Version: 1.7.5 - Added support for ARM platform for Docker image
Version: 1.7.6 - Added support for latest tag for multi-architecture Docker images
Version: 1.7.7 - Fixed an issue where the SendTaskSuccess API fails with an Invalid Token exception intermittently when the token provided by the GetActivity API is supplied as input.
Version: 1.7.8 - Added support for EventBridge PutEvents.
Version: 1.7.9 - Added support for EMR-Containers CreateVirtualCluster, DeleteVirtualCluster, and StartJobRun.

Running Step Functions Local
-----------------------------

1) Test the download and view version information.

    java -jar StepFunctionsLocal.jar -v

    Step Function Local
    Version: 1.0.0
    Build: 2019-01-21

2) (Optional) View a listing of available commands:

  $ java -jar StepFunctionsLocal.jar -v

3) To start Step Functions on your computer, open a command prompt window, navigate
   to the directory where you extracted StepFunctionsLocal.jar and type the following
   command:

    java -jar StepFunctionsLocal.jar

4) To access Step Functions running locally, use the --endpoint-url parameter. For
   example, using the AWS Command Line Interface, you would specify Step Functions
   commands as:

    aws stepfunctions --endpoint http://localhost:8083 *command*

Note

By default Step Functions local uses a fake account and credentials, and the region is set
to US East (N. Virginia). To use Step Functions local with AWS Lambda or other supported
services, you must configure your credentials and region.

Documentation
-------------
For an overview of Step Functions local and configuration information, see:
   https://docs.aws.amazon.com/step-functions/latest/dg/sfn-local.html
