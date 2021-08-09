const next = require("next");

const dev = process.env.NODE_ENV !== "production"; // 환경변수 :  production , dev

/*
 --- SSL 인증 ---
 - HTTPS, HTTP SSL 인증 필요
 - https, http 서버 생성
 - 인증키, 인증 cert 파일 읽기 필요
 - 실행 포트
 - 추후 가비아로 사용 예정
 */
const { createServer: https } = require("https");
const { createServer: http } = require("http");

const { parse } = require("url");
const { readFileSync } = require("fs");
const sslPort = 3443;

/* 
const httpsOptions = {
  key: readFileSync("SSL인증받은 도메인 key"),
  cert: readFileSync("SSL인증받은 도메인 cert"),
};
const sslPort = 443; // aws에서 받은 포트
*/

//임시용
const express = require("express"); //express 서버
const path = require("path");
const httpsOptions = {
  key: readFileSync(path.resolve("./public/private.key")),
  cert: readFileSync(path.resolve("./public/mycommoncrt.crt")),
};

const app = next({ dev }); // next 모듈 사용
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    /*express로 임시용
    const server = express();
    server.get("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, (error) => {
      if (error) throw error;
      console.log(`mode : ${process.env.NODE_ENV}`);
    });
    */

    // dev=true : dev 환경
    // dev=false : production 환경
    if (dev) {
      http((req, res) => {
        const parseUrl = parse(req.url, true);
        handle(req, res, parseUrl);
      }).listen(3000, (err) => {
        if (err) throw err;
        console.log(" > Ready on http://localhost:3000");
      });
    } else {
      https(httpsOptions, (req, res) => {
        const parseUrl = parse(req.url, true);
        handle(req, res, parseUrl);
      }).listen(sslPort, (err) => {
        if (err) throw err;
        console.log(`> Ready on https: ${sslPort}`);
        console.log(
          `server Date : ${new Date()}, mode : ${process.env.NODE_ENV}`
        );
      });
    }
  })
  .catch((e) => {
    console.error(e);
  });
