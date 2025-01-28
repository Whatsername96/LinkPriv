import * as IconPhosphor from "phosphor-react-native";

type IconName = keyof typeof IconPhosphor;

export const tabs: {
	link: string;
	icon: IconName;
}[] = [
	{
		link: "index",
		icon: "HouseLine",
	},
	{
		link: "(withdrawals)",
		icon: "TipJar",
	},
	{
		link: "transactions",
		icon: "ChartLineUp",
	},
	{
		link: "definitions",
		icon: "User",
	},
	{
		link: "notifications",
		icon: "Bell",
	},
];
