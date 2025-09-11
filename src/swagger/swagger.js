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
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid", example: "uuid-1234" },
            name: { type: "string", example: "홍길동" },
            email: {
              type: "string",
              format: "email",
              example: "test@example.com",
            },
            password: { type: "string", example: "hashed_password" },
            gender: { $ref: "#/components/schemas/Gender" },
            birth: {
              type: "string",
              format: "date-time",
              example: "1995-05-01T00:00:00Z",
            },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
            isDeleted: { type: "boolean", default: false },
          },
        },
        Gender: {
          type: "string",
          enum: ["M", "F", "N"],
          description: "M=남자, F=여자, N=선택안함",
        },
        Corp: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            corp_name: { type: "string" },
            corp_tag: { type: "string" },
            corp_profile: { type: "string" },
            corp_image: { type: "string" },
            total_investment: { type: "integer", format: "int64", default: 0 },
            corp_sales: { type: "integer", format: "int64", default: 0 },
            employee: { type: "integer" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Option_count: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            corpId: { type: "string", format: "uuid" },
            my_compare_corp: { type: "integer", default: 0 },
            compare_corp: { type: "integer", default: 0 },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Compare_corp: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            corpId: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
            isDeleted: { type: "boolean", default: false },
          },
        },
        My_compare_corp: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            corpId: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
            isDeleted: { type: "boolean", default: false },
          },
        },
        Investment: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            accountId: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid", nullable: true },
            corpId: { type: "string", format: "uuid", nullable: true },
            name: { type: "string" },
            password: { type: "string" },
            amount: { type: "integer" },
            amount_comment: { type: "string" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
            isDeleted: { type: "boolean", default: false },
          },
        },
        Account: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            corpId: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
