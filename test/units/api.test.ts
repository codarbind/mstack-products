import { Request } from "express";
let request = require("supertest");
const baseURL = "http://localhost:3030";

describe("GET /product/all", () => {
  let testProd: Request;
  const newProduct = {
    name: "tested",
    description: "testing this",
    price: 349,
  };
  beforeAll(async () => {
    // set up the Product
    testProd = await request(baseURL).post("/product/add").send(newProduct);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/product/?${testProd.body.data["_id"]}`);
  });

  it("should return 200", async () => {
    const response = await request(baseURL).get("/product/all");
    expect(response.statusCode).toBe(200);
  });
  it("should return Products", async () => {
    const response = await request(baseURL).get("/product/all");
    expect(response.body.data.length >= 1).toBe(true);
  });
});

describe("GET /product/?id=**", () => {
  let testProd: Request;
  const newProduct = {
    name: "testGEt",
    description: "testgeting dihs",
    price: 349,
  };
  beforeAll(async () => {
    // set up the Product
    testProd = await request(baseURL).post("/product/add").send(newProduct);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/product/${testProd.body.data["_id"]}`);
  });

  it("should return 200", async () => {
    const response = await request(baseURL).get(
      `/product/?id=${testProd.body.data["_id"]}`
    );
    expect(response.statusCode).toBe(200);
  });
  it("should return a single product", async () => {
    const response = await request(baseURL).get(
      `/product/?id=${testProd.body.data["_id"]}`
    );
    console.log({ respObj: response.body.data });
    expect(response.body.data).toHaveProperty("_id", testProd.body.data["_id"]);
    expect(response.body.data).toHaveProperty("name", "testGEt");
    expect(response.body.data).toHaveProperty("description", "testgeting dihs");
    expect(response.body.data).toHaveProperty("price", 349);
    expect(response.body.data).toHaveProperty("deleted", false);
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("__v", 0);
  });
});

describe("PATCH /product", () => {
  let testProd: Request;
  const newProduct = {
    name: "testGEtach",
    description: "testgeting dihshirt",
    price: 349,
  };

  beforeAll(async () => {
    // set up the Product
    testProd = await request(baseURL).post("/product/add").send(newProduct);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/product/?id=${testProd.body.data["_id"]}`);
  });

  it("should return 200", async () => {
    let response = await request(baseURL)
      .patch(`product/${testProd.body.data["_id"]}`)
      .send({
        name: "updated-name",
        description: "should be extensively described",
        price: 23457,
      });
    expect(response.statusCode).toBe(200);
  });

  it("should update the product", async () => {
    let response = await request(baseURL)
      .patch(`product/${testProd.body.data["_id"]}`)
      .send({
        name: "updated-name",
        description: "should be extensively described",
        price: 23457,
      });
    console.log({ respObj: response });
    expect(response.body.data).toHaveProperty("_id", testProd.body.data["_id"]);
    expect(response.body.data).toHaveProperty("name", "updated-name");
    expect(response.body.data).toHaveProperty(
      "description",
      "should be extensively described"
    );
    expect(response.body.data).toHaveProperty("price", 23457);
    expect(response.body.data).toHaveProperty("deleted", false);
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("__v", 0);
  });
});
