// require supertest
//go to index.js and export the app (module.exports.app = app)
// when running suoerTest ensure to always set condition for app.listen (require.main == module)
const supertTest = require("supertest");
const { app } = require("app");
const cookieSession = require("cookie-session"); // requires cookieSession mock

test("GET/ welcome sends a 200 status code as response", () => {
    return supertTest(app)
        .get("/welcome")
        .then((res) => {
            console.log(res);
            expect(res.statusCode).toBe(200);
        });
});

test("POST/ welcome redirect", () => {
    return supertTest(app)
        .post("/welcome")
        .then((res) => {
            //console.log(res);
            //we can check the ffg
            //statusCode, response headers
            expect(res.statusCode).toBe(302);
        });
});

//more complicated test - if a users does not have a cookie
//how to work with cookie in our test (remember cookieSession)
//problem using cookieSession - the test only work only if cookieSession works
//so we mock cookiSession

test("GET/ home sends 200 if there is a cookie", () => {
    cookieSession.mockSessionOnce({
        submitted: true,
    });
    return supertTest(app)
        .get("/home")
        .then((res) => {
            //console.log(res);
            //we can check the ffg
            //statusCode, response headers
            expect(res.text).toContain("home");
        });
});

//correct cookie is set

test("POST/ welcome sets submitted cookie set to true", () => {
    const cookie = {};
    cookieSession.mockSessionOnce(cookie);
    return supertTest(app)
        .post("/welcome")
        .then(() => {
            console.log(cookie);
            expect(cookies.submitted).toBe(true);
        });
});
