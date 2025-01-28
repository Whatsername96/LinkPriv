import { Fragment, ReactNode } from "react";
import { View } from "react-native";

import { LabelSectionTitle } from "../../Label/SectionTitle";
import { Header } from "../../Header";
import { styles } from "./styles";

type HeaderFlatListProps = {
  textSection: string;
  extraContent?: ReactNode | undefined;
}

export function FlatlistOperationHeader({ textSection, extraContent = undefined }: HeaderFlatListProps) {
  return (
    <Fragment>
      <Header hasConfigs={false} />
      <View style={styles.content}>
        {extraContent &&
          <View style={styles.extra_content}>
            {extraContent}
          </View>
        }
        <LabelSectionTitle text={textSection} />
      </View>
    </Fragment>
  );
}
