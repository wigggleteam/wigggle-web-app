/* eslint-disable react/jsx-filename-extension */
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocuments extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    // Retrieve styles from components in the page
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
    // Extract the styles as <style> tags. Output the styles in the <Head>
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="" />
          <meta charSet="utf-8" />
          <meta name="robots" content="" />
          <link rel="icon" href="/web.png" />
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          <link rel="stylesheet" href="/css/basic.css" />
          <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/css/cropper.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-datepicker.css" />
          <link rel="stylesheet" type="text/css" href="/css/rc-slider.css" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocuments;
