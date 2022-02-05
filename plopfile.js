const path = require("path");
const promptDirectory = require("inquirer-directory");

const databaseConfigLocation = path.join(__dirname, "shared/config/db.config.ts");

const isNotEmptyFor = (name) => {
  return (value) => {
    if (!value.trim()) return name + " is required";
    return true;
  };
};

const textPrompt = (name) => ({
  type: "input",
  name: "name",
  message: `What is your ${name} name?`,
  validate: isNotEmptyFor("name"),
});

const createModel = {
  type: "add",
  path: `shared/models/{{kebabCase name}}.model.ts`,
  templateFile: "plop-templates/model.ts",
};

const workflowResourceTemplate = `
    {{properCase name}}StateMachine:
      Description: Example workflow state machine Arn
      Value:
        Ref: {{properCase name}}Workflow\${self:service}\${opt:stage, 'dev'}
    $1
`;

const workFlowStepTemplate = `  {{camelCase name}}Step:
    Type: Task
    Resource: !GetAtt {{name}}-lambda.Arn
    TimeoutSeconds: 28
    End: true
  $1
`;

const updateTypeORMModels = [
  {
    type: "modify",
    path: databaseConfigLocation,
    pattern: /(\/\/ MODELS_IMPORT)/,
    template: 'import { {{pascalCase name}}Model } from "../models/{{kebabCase name}}.model";\n$1',
  },
  {
    type: "modify",
    path: databaseConfigLocation,
    pattern: /(\/\/ MODELS_SETUP)/,
    template: "{{pascalCase name}}Model,\n    $1",
  },
];

module.exports = function (plop) {
  plop.setPrompt("directory", promptDirectory);
  plop.setGenerator("model", {
    description: "Create model",
    prompts: [textPrompt("model")],
    actions: [createModel, ...updateTypeORMModels],
  });
  plop.setGenerator("lambda", {
    description: "Create lambda",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "functions/{{name}}/handler.ts",
        templateFile: "plop-templates/function/handler.ts",
      },
      {
        type: "add",
        path: "functions/{{name}}/event.schema.ts",
        templateFile: "plop-templates/function/event.schema.ts",
      },
      {
        type: "add",
        path: "functions/{{name}}/config/index.ts",
        templateFile: "plop-templates/function/config/index.ts",
      },
      {
        type: "add",
        path: "functions/{{name}}/function.yml",
        templateFile: "plop-templates/function/function.yml",
      },
      {
        type: "modify",
        path: "serverless.yml",
        pattern: / +(\# PLOP_ADD_LAMBDA)/,
        template: "  - ${file(functions/{{name}}/function.yml)}\n  $1",
      },
    ],
  });
  plop.setGenerator("workflow", {
    description: "Create workflow",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Workflow name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "workflows/{{name}}/workflow.yml",
        templateFile: "plop-templates/workflow/workflow.yml",
      },
      {
        type: "add",
        path: "workflows/{{name}}/workflow.asl.yml",
        templateFile: "plop-templates/workflow/workflow.asl.yml",
      },
      {
        type: "modify",
        path: "serverless.yml",
        pattern: / +(\# PLOP_ADD_WORKFLOW_STATE_MACHINE)/,
        template: "    {{properCase name}}: ${file(workflows/{{name}}/workflow.yml)}\n  $1",
      },
      {
        type: "modify",
        path: "serverless.yml",
        pattern: / +(\# PLOP_ADD_WORKFLOW_RESOURCE)/,
        template: workflowResourceTemplate,
      },
    ],
  });
  plop.setGenerator("workflow-step", {
    description: "Create workflow step",
    prompts: [
      { type: "directory", name: "workflow", message: "Select workflow", basePath: "./workflows" },
      {
        type: "input",
        name: "name",
        message: "Step name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "workflows/{{workflow}}/{{name}}/function.yml",
        templateFile: "plop-templates/workflow/step/function.yml",
      },
      {
        type: "add",
        path: "workflows/{{workflow}}/{{name}}/handler.ts",
        templateFile: "plop-templates/workflow/step/handler.ts",
      },
      {
        type: "modify",
        path: "serverless.yml",
        pattern: / +(\# PLOP_ADD_LAMBDA)/,
        template: "  - ${file(workflows/{{workflow}}/{{name}}/function.yml)}\n  $1",
      },
      {
        type: "modify",
        path: "workflows/{{workflow}}/workflow.asl.yml",
        pattern: / +(\# PLOP_ADD_WORKFLOW_STEP)/,
        template: workFlowStepTemplate,
      },
      {
        type: "modify",
        path: "serverless.yml",
        pattern: / +(\# PLOP_ADD_WORKFLOW_STEP_LOCAL_STEP)/,
        template:
          "      {{camelCase name}}Step: arn:aws:lambda:us-east-1:101010101010:function:${env:APP_NAME, 'tshExampleApp'}-${opt:stage, 'dev'}-{{name}}-lambda\n      $1",
      },
    ],
  });
};
