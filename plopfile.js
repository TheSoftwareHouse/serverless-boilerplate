module.exports = function (plop) {
    // create your generators here
    plop.setGenerator('Lambda', {
        description: 'Create lambda',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Lambda name'
            }
        ], // array of inquirer prompts
        actions: [
            {
                type: 'add',
                path: 'lambdas/{{name}}/handler.ts',
                templateFile: 'plop-templates/handler.ts'
            },
            {
                type: 'add',
                path: 'lambdas/{{name}}/test/{{kebabCase name}}.spec.ts',
                templateFile: 'plop-templates/handler.spec.ts'
            },
            {
                type: 'add',
                path: 'lambdas/{{name}}/schema-validation.ts',
                templateFile: 'plop-templates/schema-validation.ts'
            },
            {
                type: 'modify',
                path: 'serverless.yml',
                pattern: /(\# PLOP_ADD_LAMBDA)/,
                templateFile: 'plop-templates/function.yml'
            }
        ]
    });
};

//   `{{name}}:
//     handler: lambdas/{{name}}/handler.handle
//     environment:
//       APP_NAME: \${env:APP_NAME} 
//     events:
//       - http:
//           path: /
//           method: GET
//   $1`,