import type { PageState } from "@/lib/types";

export const DevError: React.FC<{
	pageState: PageState;
	children: React.ReactNode;
}> = ({ children, pageState }) => {
	if (
		process.env.NODE_ENV === "development" ||
		!pageState ||
		pageState !== "normal"
	) {
		return (
			<div className="max-w-[500px] bg-orange-500 p-2.5 text-base-white outline-6 outline-orange-400">
				<p>{children}</p>
			</div>
		);
	}
	return null;
};
