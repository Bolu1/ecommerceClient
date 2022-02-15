import { Html, Head, Main, NextScript } from "next/document";
import Document from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <script src="./TW-ELEMENTS-PATH/dist/js/index.min.js"></script>
        </body>
      </Html>
    );
  }
}
