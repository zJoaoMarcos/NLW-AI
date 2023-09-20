import { useState } from "react";
import { Header } from "./components/Header";
import { Prompt } from "./components/Prompt";
import { SideBar } from "./components/SideBar";
import { useCompletion } from "ai/react";

export function App() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-type": "application/json",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 flex gap-6">
        <Prompt
          input={input}
          onInputUpdated={handleInputChange}
          completion={completion}
        />

        <SideBar
          temperature={temperature}
          onPromptSelected={setInput}
          onVideoUploaded={setVideoId}
          onTemperatureSelected={setTemperature}
          onFormSubmited={handleSubmit}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
