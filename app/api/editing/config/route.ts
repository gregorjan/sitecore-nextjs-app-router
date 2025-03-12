"use server";

import { components as builderComponents } from "@/components/builder";
import { serverConfig } from "@/lib/config.server";
import { enforceCors } from "@/lib/utils/enforce-cors";
import { EditMode } from "@sitecore-jss/sitecore-jss-nextjs";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const origin = request.headers.get("origin") as string;

	if (!enforceCors(origin)) {
		return new NextResponse(JSON.stringify({ message: "Invalid origin" }), {
			status: 401,
		});
	}
	const secret = url.searchParams.get('secret');

	if (secret !== serverConfig.jssEditingSecret) {
		return new NextResponse(
			JSON.stringify({ message: "Missing or invalid editing secret" }),
			{
				status: 401,
			},
		);
	}

	const components = Array.isArray(builderComponents)
		? builderComponents
		: Array.from(builderComponents.keys());

	const data = {
		components,
		packages: {},
		editMode: EditMode.Metadata,
	};

	return new NextResponse(JSON.stringify(data), {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": origin,
		},
	});
}

export async function OPTIONS(request: Request) {
	const origin = request.headers.get("origin") as string;

	if (!enforceCors(origin)) {
		return new NextResponse(JSON.stringify({ message: "Invalid origin" }), {
			status: 401,
		});
	}

	return new NextResponse(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Origin": origin,
		}
	});
}
