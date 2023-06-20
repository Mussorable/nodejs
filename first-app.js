const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res
      .setHeader("Content-Type", "text/html")
      .write(
        '<form action="/message" method="POST"><input name="message-text" type="text"><button type="submit"></button</form>'
      );
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedArray = Buffer.concat(body).toString();
      const message = parsedArray.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
});

server.listen(3000);
