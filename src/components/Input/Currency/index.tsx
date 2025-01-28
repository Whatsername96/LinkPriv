import { useCallback, useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { View } from "react-native";
import CurrencyInput, { CurrencyInputProps } from "react-native-currency-input";

import { Placeholder } from "../Placeholder";

import { colors } from "@/constants/styles";
import { styles } from "./styles";

type InputCurrencyProps = CurrencyInputProps & {
  paddingRight?: number;
  placeholder: string;
  value: number | null;
  minValue?: number;
  maxValue: number;
};

export const InputCurrency = forwardRef<CurrencyInput, InputCurrencyProps>(
  ({ paddingRight, placeholder, value, minValue = 0, maxValue, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const inputRef = useRef<CurrencyInput>(null);

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
      setIsFilled(value !== null && value.toString().length > 0);
    }, [value]);

    useEffect(() => {
      setIsFilled(value !== null && value.toString().length > 0);
    }, [value]);

    useImperativeHandle(ref, () => inputRef.current as CurrencyInput);

    return (
      <View style={styles.container_input}>
        <Placeholder
          isFilled={isFilled}
          isFocused={isFocused}
          placeholder={placeholder}
          handleClickInPlaceholder={() => inputRef.current?.focus()}
        />
        <CurrencyInput
          ref={inputRef}
          style={[
            styles.input,
            isFocused ? { borderColor: colors.pink_2_100 } : { borderColor: colors.gray_3_100 },
            typeof paddingRight === "number" && { paddingRight },
          ]}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={minValue}
          maxValue={maxValue}
          value={value}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
      </View>
    );
  }
);
