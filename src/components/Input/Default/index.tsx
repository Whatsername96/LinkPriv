import { useCallback, useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { TextInput, TextInputProps, View } from "react-native";

import { Placeholder } from "../Placeholder";
import { LabelValidationError } from "../../Label/ValidationError";

import { colors } from "@/constants/styles";
import { styles } from "./styles";

type InputProps = TextInputProps & {
  paddingRight?: number;
  placeholder: string;
  value: string;
  errorMessage: string;
};

export const InputDefault = forwardRef<TextInput, InputProps>(
  ({ paddingRight, placeholder, value, errorMessage, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [showError, setShowError] = useState(false);

    const inputRef = useRef<TextInput>(null);

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
      setIsFilled(!!value);
      setShowError(!value);
    }, [value]);

    useEffect(() => {
      setIsFilled(!!value);
    }, [value]);

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    return (
      <View style={styles.container_input}>
        <Placeholder
          isFilled={isFilled}
          isFocused={isFocused}
          placeholder={placeholder}
          handleClickInPlaceholder={() => inputRef.current?.focus()}
        />
        <TextInput
          ref={inputRef}
          value={value}
          style={[
            styles.input,
            isFocused ? { borderColor: colors.pink_2_100 } : { borderColor: colors.gray_3_100 },
            typeof paddingRight === "number" && { paddingRight },
          ]}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
        {showError && <LabelValidationError message={errorMessage} />}
      </View>
    );
  }
);
