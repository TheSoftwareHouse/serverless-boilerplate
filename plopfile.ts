import { NodePlopAPI } from 'plop';

module.exports = function (plop: NodePlopAPI) {
    plop.setGenerator('lambda', {
        description: 'Create lambda',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Name'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'lambdas/{{name}}/handler.ts',
                templateFile: 'plop-templates/handler.ts'
            },
            {
                type: 'add',
                path: 'lambdas/{{name}}/schema-validation.ts',
                templateFile: 'plop-templates/schema-validation.ts'
            },
            {
                type: 'modify',
                path: 'serverless.yml',
                pattern: / +(\# PLOP_ADD_LAMBDA)/,
                templateFile: 'plop-templates/function.yml'
            }
        ]
    });
};