import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "ViewMyStartup API",
      version: "1.0.0",
      description: "ViewMyStartup 백엔드 API 문서",
    },
    servers: [{ url: "http://localhost:5555", description: "Local" }],
    components: {
      schemas: {
        Investment: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            virtual: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Comment: {
          type: "object",
          properties: {
            id: { type: "string" },
            content: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Corp: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            industry: { type: "string" },
          },
        },
        Compare: {
          type: "object",
          properties: {
            id: { type: "string" },
            corpId: { type: "string" },
            selectedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
