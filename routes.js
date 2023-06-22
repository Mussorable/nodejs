const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;

  if (url === "/") {
    res.setHeader("Context-Type", "html/text");
    res.write("<h1>Some greeting text</h1>");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="input"><button type="submit">Send</button>'
    );
    return res.end();
  }

  if (url === "/users") {
    res.write("<ul><li>User 1</li></ul>");
  }

  if (url === "/create-user" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", (error) => {
      const parsedBuffer = Buffer.concat(body).toString();
      const message = parsedBuffer.split("=")[1];
      fs.writeFile("data.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};
``;

module.exports = requestHandler;
