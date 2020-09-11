// require supertest
//go to index.js and export the app (module.exports.app = app)
// when running suoerTest ensure to always set condition for app.listen (require.main == module)
const supertTest = require("supertest");
const app = require("../index");
const cookieSession = require("cookie-session"); // requires cookieSession mock
const request = supertTest(app);
const db = require("../db");
jest.mock("../db");

describe("GET /", () => {
    test("it redirects to petition", () => {
        db.getSignature.mockResolvedValue({ rows: [] });
        return request.get("/").then((res) => {
            expect(res.statusCode).toBe(302);
            expect(res.headers["location"]).toEqual("/petition");
        });
    });
});

describe("GET /petition", () => {
    it("redirects to registration page when not logged in", () => {
        db.getSignature.mockResolvedValue({ rows: [] });

        return request.get("/petition").then((res) => {
            expect(res.statusCode).toBe(302);
            expect(res.headers["location"]).toEqual("/registration");
        });
    });

    //note you can either retun entire request block or use done and return done() in request bloc
    // details see https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

    it("renders petition page", (done) => {
        cookieSession.mockSessionOnce({
            userId: 1,
            user: { id: 1 },
        });
        db.getSignature.mockResolvedValue({ rows: [] });

        request.get("/petition").then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.text).toContain("<h2>Make Education Free for All</h2>");
            return done();
        });
    });

    test("users that have signed are redirected to thank you page", () => {
        cookieSession.mockSessionOnce({
            userId: 1,
            user: { id: 1 },
        });
        db.getSignature.mockResolvedValue({ rows: [{ id: 1 }] });

        return request.get("/petition").then((res) => {
            expect(res.statusCode).toBe(302);
            expect(res.headers["location"]).toEqual("/thanks");
        });
    });
});

describe("GET /registration", () => {
    it("redirects to petition page when logged in", () => {
        cookieSession.mockSessionOnce({
            userId: 1,
            user: { id: 1 },
        });
        db.getSignature.mockResolvedValue({ rows: [] });

        return request.get("/registration").then((res) => {
            expect(res.statusCode).toBe(302);
            expect(res.headers["location"]).toEqual("/petition");
        });
    });

    it("renders registration", (done) => {
        db.getSignature.mockResolvedValue({ rows: [] });

        request.get("/registration").then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.text).toContain("Join our campaign team today!");
            return done();
        });
    });
});

describe("GET /thanks", () => {
    it("users who are logged in and have not signed the petition", () => {
        cookieSession.mockSessionOnce({
            userId: 1,
            user: { id: 1 },
        });
        db.getSignature.mockResolvedValue({ rows: [] });

        return request.get("/thanks").then((res) => {
            expect(res.statusCode).toBe(302);
            expect(res.headers["location"]).toEqual("/petition");
        });
    });
});

describe("GET /signers", () => {
    it("users who are logged in and have not signed the petition", (done) => {
        cookieSession.mockSessionOnce({
            userId: 1,
            user: { id: 1 },
        });
        db.getSigners.mockResolvedValue({ rows: [] });

        request.get("/signers").then((res) => {
            expect(res.statusCode).toBe(302);
            expect(res.headers["location"]).toEqual("/petition");
            return done();
        });
    });
});
