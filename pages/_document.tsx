import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";
// import Script from "next/script";
// import { Inter } from '@next/font/google';

// const inter = Inter({subsets: ['latin']});
class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render(): JSX.Element {
		return (
			<Html lang="ru">
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
					{/* <Script src='' strategy="beforeInteractive" /> */}
				</Head>
				{/* <body className={inter.className}> */}
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;