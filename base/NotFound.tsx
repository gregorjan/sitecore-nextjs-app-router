import Head from 'next/head'

export const NotFound = (): JSX.Element => (
	<>
		<Head>
			<title>404: NotFound</title>
		</Head>
		<div style={{ padding: 10 }}>
			<h1>Page not found</h1>
			<p>This page does not exist.</p>
			<a href="/">Go to the Home page</a>
		</div>
	</>
)

