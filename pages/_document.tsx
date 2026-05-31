import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#0F172A" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" sizes="32x32" href="/Favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/Favicon/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/Favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/Favicon/site.webmanifest" />
        </Head>
        <body className="next-dark-theme">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
