//Node.js + Express 기반 API 서버의 진입점(index.js 또는 app.js)

// 데이터베이스 테이블을 초기화(sync) 하던 코드인데, 현재는 주석 처리됨.
// 보통 Sequelize ORM을 쓸 때 sequelize.sync() 같은 걸 여기에 둬.
require("./models/sync")();
require("dotenv").config(); //.env 파일의 환경변수 불러오기

const express = require("express"); //웹서버 프레임워크
const morgan = require("morgan"); //요청 로그 출력 미들웨어
const port = process.env.PORT || 3000;
const app = express();

//라우터들 (회원, 매출, 이미지, 인증 등)
const memberRouter = require("./routers/memberRouter");
const saleRouter = require("./routers/saleRouter");
const imageRouter = require("./routers/imageRouter");
const authorization = require("./routers/authorization");
const errorHandler = require("./routers/errorHandler"); //에러처리 미들웨어
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/sales", authorization);
app.use("/sales", saleRouter);
app.use("/members", memberRouter);
app.use("/members", errorHandler);

// app.use('/images', imageRouter);
app.use((_, res) => {
  res.status(404).json({
    message: "존재하지 않은 API입니다. path와 method를 확인하십시오.",
  });
});

//서버 실행
app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
