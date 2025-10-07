import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Next.js API Docs",
            version: "1.0.0",
            description: "API documentation",
        },
    },
    apis: ["./src/app/api/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
