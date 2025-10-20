export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Simple E-commerce API",
    version: "1.0.0",
    description: "CRUD API for products with filtering and sorting",
  },
  servers: [{ url: "http://localhost:5000" }],
  paths: {
    "/api/products": {
      get: {
        summary: "Get all products",
        description: "Supports filtering by name, category, brand and sorting by createdAt",
        parameters: [
          { name: "name", in: "query", description: "Filter products by name (partial match)", schema: { type: "string" } },
          { name: "category", in: "query", description: "Filter products by category", schema: { type: "string" } },
          { name: "brand", in: "query", description: "Filter products by brand", schema: { type: "string" } },
          { name: "page", in: "query", description: "Page number", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", description: "Items per page", schema: { type: "integer", default: 10 } },
          { name: "sort", in: "query", description: "Sort field (default createdAt)", schema: { type: "string", default: "createdAt" } },
          { name: "order", in: "query", description: "Sort order: asc or desc", schema: { type: "string", default: "desc" } },
        ],
        responses: { "200": { description: "List of products" } },
      },
      post: {
        summary: "Create a product",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  category: { type: "string" },
                  brand: { type: "string" },
                  description: { type: "string" },
                  rating: { type: "number" },
                  variants: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        sku: { type: "string" },
                        color: { type: "string" },
                        size: { type: "string" },
                        price: { type: "number" },
                        stock: { type: "number" },
                      },
                      required: ["sku", "color", "size", "price", "stock"],
                    },
                  },
                },
                required: ["name"],
              },
            },
          },
        },
        responses: { "201": { description: "Product created" } },
      },
    },
    "/api/products/{id}": {
      get: {
        summary: "Get product by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "Product ID" },
        ],
        responses: { "200": { description: "Product object" }, "404": { description: "Not found" } },
      },
      put: {
        summary: "Update product by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "Product ID" },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  category: { type: "string" },
                  brand: { type: "string" },
                  description: { type: "string" },
                  rating: { type: "number" },
                  variants: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        sku: { type: "string" },
                        color: { type: "string" },
                        size: { type: "string" },
                        price: { type: "number" },
                        stock: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: { "200": { description: "Updated product" }, "404": { description: "Not found" } },
      },
      delete: {
        summary: "Delete product by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "Product ID" },
        ],
        responses: { "200": { description: "Deleted" }, "404": { description: "Not found" } },
      },
    },
  },
};
