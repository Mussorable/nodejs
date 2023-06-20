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
    fs.writeFileSync("message.txt", "txt file is here");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
});

server.listen(3000);
