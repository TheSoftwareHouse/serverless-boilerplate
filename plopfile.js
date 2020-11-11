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
    pattern: /(\/\/ MODELS_IMPORTS)/,
    template: 'import { {{pascalCase name}}Model } from "../models/{{kebabCase name}}.model";\n$1',
  },
  {
    type: "modify",
    path: databaseConfigLocation,
    pattern: /(\/\/ MODELS_SETUP)/,
    template: "{{pascalCase name}}Model)),\n    $1",
  },
];

module.exports = function (plop) {
  plop.setGenerator("model", {
    prompts: [moduleListPrompt, textPrompt("model")],
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
        path: "lambdas/{{name}}/schema-validation.ts",
        templateFile: "plop-templates/schema-validation.ts",
      },
      {
        type: "modify",
        path: "serverless.yml",
        pattern: / +(\# PLOP_ADD_LAMBDA)/,
        templateFile: "plop-templates/function.yml",
      },
    ],
  });
};
