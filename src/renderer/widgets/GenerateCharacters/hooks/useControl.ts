import { useRef, useState, useCallback, useEffect, ChangeEvent } from "react";
import type { THookControl, TParamControl } from "./types";
import { gotGenerate } from "../libs";
import { useDestroyComponent } from "./useDestroyComponent";

const options = {
  amount: 10,
  isNumbers: false,
  isSpecial: false,
  isUppercase: false,
};

export const useControl = <CS extends ChangeEvent<HTMLInputElement>>(
  watchToGenerate: TParamControl
): THookControl<CS> => {
  const isStartToWatchToGenerate = useRef(true);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(
    gotGenerate({
      amount: 10,
      isNumbers: false,
      isSpecial: false,
      isUppercase: false,
    })
  );
  const checkedChange = useCallback(
    (variant: number) => {
      return (isChecked: CS) => {
        if (isChecked && variant === 1) {
          options.isNumbers = true;
        }
        if (isChecked && variant === 2) {
          options.isUppercase = true;
        }
        if (isChecked && variant === 3) {
          options.isSpecial = true;
        }

        if (!isChecked && variant === 1) {
          options.isNumbers = false;
        }
        if (!isChecked && variant === 2) {
          options.isUppercase = false;
        }
        if (!isChecked && variant === 3) {
          options.isSpecial = false;
        }

        const readyResult = gotGenerate(options);
        setResult(readyResult);
        watchToGenerate(readyResult);
      };
    },
    [watchToGenerate, setResult]
  );

  const handleChangeRange = useCallback(
    (_: Event, newValue: number | number[]) => {
      options.amount = Number(
        typeof newValue === "number" ? newValue : newValue[0]
      );
      setAmount(options.amount);
      const readyResult = gotGenerate(options);
      setResult(readyResult);
      watchToGenerate(readyResult);
    },
    [setAmount, setResult, watchToGenerate]
  );

  useEffect(() => {
    if (isStartToWatchToGenerate.current) {
      isStartToWatchToGenerate.current = false;
      watchToGenerate(result);
    }
  }, [watchToGenerate, result]);

  useDestroyComponent(() => {
    options.amount = 10;
    options.isNumbers = false;
    options.isSpecial = false;
    options.isUppercase = false;
  });

  return {
    amount,
    result,
    checkedChange,
    handleChangeRange,
  };
};
