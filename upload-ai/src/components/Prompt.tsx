import { ChangeEvent } from "react";
import { Textarea } from "./ui/textarea";

interface PromptProps {
  input: string;
  onInputUpdated: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  completion: string;
}

export function Prompt(props: PromptProps) {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Inclua o prompt para IA..."
          value={props.input}
          onChange={props.onInputUpdated}
        />
        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Resultado gerado pela IA"
          value={props.completion}
          readOnly
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Lembre-se: você pode utilizar a variável{" "}
        <code className="text-destructive">{"{transcription}"}</code> no seu
        prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
      </p>
    </div>
  );
}
