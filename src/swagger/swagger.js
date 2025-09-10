import { define } from "superstruct";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "ViewMyStartup API",
      version: "1.0.0",
      description: "ViewMyStartup 백엔드 API 문서",
    },
    servers: [
      {
        url: "https://eight-viewmystartup-4-be.onrender.com",
        description: "Local",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
