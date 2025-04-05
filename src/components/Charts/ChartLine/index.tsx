import { ReactElement, useEffect, useState } from "react";
import { LineChart, CurveType } from "react-native-gifted-charts";
import { Dimensions, View } from "react-native";

import { LabelComponent } from "./LabelComponent";
import { PointerComponent } from "./PointerComponent";
import { PointerLabelComponent } from "./PointerLabelComponent";

import { DataChart } from "@/types/backend";
import { dateFormatToChart } from "@/utils";
import { border_radius, colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

type ChartLineProps = {
  list: DataChart[];
}

export function ChartLine({ list }: ChartLineProps) {

  type ChartList = {
    labelComponent: () => ReactElement;
    label: string;
    value: number;
  };

  const screenWidth = Dimensions.get("window").width;
  const MIN_SPACING_LABEL = 100;
  const maxLabelLength = Math.max(...list.map(item => dateFormatToChart(item.date).length));
  const labelWidth = maxLabelLength;
  const spacing = list.length > 0 ? Math.max(
    MIN_SPACING_LABEL,
    screenWidth / list.length - labelWidth
  ) : MIN_SPACING_LABEL;
  const [listChart, setListChart] = useState<ChartList[]>([]);

  useEffect(() => {
    setListChart(formatDataToChart(list));
  }, [list]);

  function formatDataToChart(array: DataChart[]) {
    let arrayFormated: ChartList[] = [];
    array.map((item) => {
      arrayFormated.push({
        label: dateFormatToChart(item.date),
        labelComponent: () => { return <LabelComponent text={dateFormatToChart(item.date)} /> },
        value: item.amount * item.count,
      });
    });
    return arrayFormated;
  }

  return (
    <View
      style={styles.container}>
      <LineChart
        key={JSON.stringify(listChart)}
        isAnimated={true}
        curved={true}
        labelsExtraHeight={10}
        curveType={CurveType.CUBIC}
        thickness={2}
        color={colors.pink_2_100}
        noOfSections={5}
        areaChart={true}
        data={listChart}
        maxValue={Math.max(...listChart.map((item) => item.value)) * 1.5}
        yAxisThickness={0}
        xAxisThickness={0}
        startFillColor1={colors.pink_2_100}
        startFillColor2={colors.pink_1_100}
        endFillColor={colors.white_100}
        startOpacity={0.4}
        endOpacity={0.1}
        spacing={spacing}
        backgroundColor={colors.white_100}
        initialSpacing={spaces.item_space_plus_big}
        endSpacing={0}
        hideRules={true}
        hideDataPoints={true}
        overflowTop={100}
        overflowBottom={0}
        hideYAxisText={true}
        xAxisColor={colors.pink_2_100}
        pointerConfig={{
          pointerStripUptoDataPoint: false,
          pointerStripColor: colors.pink_2_100,
          pointerStripWidth: spaces.item_space_tiny_med,
          pointerColor: colors.pink_2_100,
          radius: border_radius.border_medium,
          resetPointerOnDataChange: true,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: true,
          pointerComponent: () => {
            return (
              <PointerComponent />
            );
          },
          pointerLabelComponent: (items: ChartList[]) => {
            return (
              <PointerLabelComponent
                isAllValuesZero={listChart.every(i => i.value === 0)}
                value={items[0].value}
              />
            )
          }
        }}
        showVerticalLines={true}
        verticalLinesUptoDataPoint={true}
        verticalLinesStrokeDashArray={[2]}
        verticalLinesColor={colors.lilac_100}
      />
    </View>
  )
}
