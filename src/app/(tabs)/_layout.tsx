import { Tabs } from "expo-router";

import { Icon, TabBar } from "@/components";

import { spaces } from "@/constants/styles";
import { tabs } from "@/constants/tabs";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none",

      }}
      tabBar={(props) => <TabBar {...props}
      />
      }>
      {tabs.map(tab => {
        return (
          <Tabs.Screen
            key={tab.link}
            name={tab.link}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: (props) =>
                <Icon
                  {...props}
                  name={tab.icon}
                  size={spaces.item_space_simple_med}
                  weight={"light"}
                />,
            }}
          />
        )
      })}
    </Tabs>
  );
}
