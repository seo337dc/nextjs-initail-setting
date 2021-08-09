import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
       html, body {
            height: 100%;
            max-width:  1440px;
            font-weight: bold;
          }
`;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet(); //서버사이드 렌더링 할 수 있게함.

    // 스타일들을 모아서 페이지를 그려준다.
    const page = ctx.renderPage(
      (App) => (props) =>
        sheet.collectStyles(
          <>
            {/* 글로벌 스타일 적용하기 */}
            <GlobalStyles />

            {/* 실제 페이지들 */}
            <App {...props} />
          </>
        )
    );

    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head> {this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
