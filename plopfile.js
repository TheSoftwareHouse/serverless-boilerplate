const path = require("path");

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
        path: "lambdas/{{name}}/handler.ts",
        templateFile: "plop-templates/handler.ts",
      },
      {
        type: "add",
        path: "lambdas/{{name}}/event.schema.ts",
        templateFile: "plop-templates/event.schema.ts",
      },
      {
        type: "add",
        path: "lambdas/{{name}}/config/index.ts",
        templateFile: "plop-templates/config/index.ts",
      },
      {
        type: "add",
        path: "lambdas/{{name}}/function.yml",
        templateFile: "plop-templates/function.yml",
      },
      {
        type: "modify",
        path: "serverless.yml",
        pattern: / +(\# PLOP_ADD_LAMBDA)/,
        template: "  - ${file(lambdas/{{name}}/function.yml)}\n  $1",
      },
    ],
  });
};
