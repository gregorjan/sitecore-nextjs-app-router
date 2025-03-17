import { Inter } from "next/font/google";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	params: Promise<{ locale: string }>;
	children: React.ReactNode;
}>) {
	const { locale } = await params;
	return (
		<html lang={locale || "en"}>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
