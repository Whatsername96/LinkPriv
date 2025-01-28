import { Text, View } from 'react-native';
import { Skeleton } from 'moti/skeleton';

import { COLORS_SKELETON, spaces } from '@/constants/styles';
import { styles } from './styles';

type LoadingFooterProps = {
  type: "withdraw" | "transaction";
}

export function LoadingFooter({ type }: LoadingFooterProps) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.date_container}>
        <Skeleton
          show={true}
          colorMode={'light'}
          colors={COLORS_SKELETON}
          width={spaces.item_space_big_min}
          height={spaces.item_space_min_big}
        />
      </View> */}
      <View style={styles.info_container}>
        <Skeleton
          show={true}
          colorMode={'light'}
          colors={COLORS_SKELETON}
          width={spaces.item_space_plus_med}
          height={spaces.item_space_plus_med}
        />
        <View style={styles.container_title_desc}>
          <Skeleton show={true}
            colorMode={'light'}
            colors={COLORS_SKELETON}
            height={spaces.item_space_simple}
            width={'100%'}
          />
          <Skeleton show={true}
            colorMode={'light'}
            colors={COLORS_SKELETON}
            width={'50%'}
            height={spaces.item_space_min}
          />
        </View>
        <View style={styles.container_price}>
          <Skeleton show={true}
            colorMode={'light'}
            colors={COLORS_SKELETON}
            width={spaces.item_space_big_min}
            height={spaces.item_space_simple}
          />
          {
            type === "transaction" || true &&
            <Skeleton show={true}
              colorMode={'light'}
              colors={COLORS_SKELETON}
              width={spaces.item_space_big_min}
              height={spaces.item_space_min}
            />
          }
        </View>
      </View>
    </View>
  );
}
