import { ProductData } from "@/typings";
import { NextResponse } from "next/server";

type Props = {
	params: {
		id: string;
	};
};

export async function GET(request: Request, { params: { id } }: Props) {
	if (!id) {
		return NextResponse.json(
			{ message: "Missing product ID" },
			{ status: 400 }
		);
	}

	const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
		method: "post",
		body: JSON.stringify({
			source: "google_shopping_product",
			domain: "com",
			query: id,
			parse: true,
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization:
				"Basic " +
				Buffer.from(
					`${process.env.OXYLABS_USERNAME}:${process.env.OXYLABS_PASSWORD}`
				).toString("base64"),
		},
		cache: "no-store",
	});

	const data = await response.json();
	console.log(data);

	if (data.results.length === 0) {
		return new Response("No product found", {
			status: 404,
		});
	}

	const productData: ProductData = data.results[0];

	return NextResponse.json(productData, { status: 200 });
}