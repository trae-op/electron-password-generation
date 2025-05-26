import { useState } from "react";
import { Form as FormResourceUpdate } from "@features/UpdateResource";
import { Context as ContextUpdateResource } from "@features/UpdateResource/context";
import { Form as FormGenerateCharacters } from "@widgets/GenerateCharacters";

export const ResourceUpdate = () => {
  const [generateCharacters, setGenerateCharacters] = useState("");
  const watchToGenerate = (value: string) => {
    setGenerateCharacters((prevValue) => (prevValue ? prevValue : value));
  };

  return (
    <ContextUpdateResource.Provider value={{ generateCharacters }}>
      <FormResourceUpdate
        renderGenerateCharacters={
          <FormGenerateCharacters watchToGenerate={watchToGenerate} />
        }
      />
    </ContextUpdateResource.Provider>
  );
};
