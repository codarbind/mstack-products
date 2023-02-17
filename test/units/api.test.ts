import request from "supertest";
const baseURL = "http://localhost:3030";

describe("GET /Products", () => {
  const newProduct = {
    name: "tested",
    description: "testing this",
    price: 349,
  };
  beforeAll(async () => {
    // set up the Product
    await request(baseURL).post("/product/add").send(newProduct);
  });
  afterAll(async () => {
    //await request(baseURL).delete(`/Product/${newProduct.id}`);
  });
  it("should return 200", async () => {
    const response = await request(baseURL).get("/Products");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
  });
  it("should return Products", async () => {
    const response = await request(baseURL).get("/Products");
    expect(response.body.data.length >= 1).toBe(true);
  });
});
