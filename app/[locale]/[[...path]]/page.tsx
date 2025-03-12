"use server";

import type { NextPageProps } from "@/lib/types";
import { NormalPage } from "@/base/NormalPage";

export default async function Page(props: NextPageProps) {
	return <NormalPage {...props}/>
}
