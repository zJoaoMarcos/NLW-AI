import { Wand2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { VideoInputForm } from "./Forms/VideoInputForm";
import { PromptSelect } from "./Forms/PromptSelect";

interface SideBarProps {
  onVideoUploaded: (id: string) => void;
  onPromptSelected: (template: string) => void;
  temperature: number;
  onTemperatureSelected: (temperature: number) => void;
  onFormSubmited: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function SideBar(props: SideBarProps) {
  return (
    <aside className="w-80 space-y-6">
      <VideoInputForm onVideoUploaded={props.onVideoUploaded} />

      <Separator />

      <form onSubmit={props.onFormSubmited} className="space-y-6">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <PromptSelect onPromptSelected={props.onPromptSelected} />
        </div>

        <div className="space-y-2">
          <Label>Modelo</Label>

          <Select disabled defaultValue="gpt3.5">
            <SelectTrigger>
              <SelectValue></SelectValue>

              <SelectContent>
                <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
              </SelectContent>
            </SelectTrigger>
          </Select>
          <span className="block text-xs text-muted-foreground italic">
            você poderá customizar esta opção em breve
          </span>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label>Temperatura</Label>
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={[props.temperature]}
            onValueChange={(value) => props.onTemperatureSelected(value[0])}
          />

          <span className="block text-xs text-muted-foreground italic">
            valores mais altos tendem deixar o resultado mais criativo e com
            possiveis erros.
          </span>
        </div>

        <Separator />

        <Button disabled={props.isLoading} type="submit" className="w-full">
          Executar <Wand2 className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </aside>
  );
}
