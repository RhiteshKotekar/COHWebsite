import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Greetings, I'm Chat bhatta!" },
  ]);
  const [input, setInput] = useState("");

  // Negative responses
  const negativeResponses = [
    "That doesn't compute… try a different approach.",
    "I could answer… but then the satellites might get suspicious.",
    "Signal strength good. Content usefulness: questionable.",
    "Cipher mismatch. Recalibrate your input and try again.",
    "Nice try, cadet — but that's not the right code phrase.",
    "Hmm… my threat analysis rates that input as 0% relevant.",
    "That line won't open any doors.",
    "Interesting… but irrelevant to my mission.",
    "The radar shows movement… just not the right kind.",
    "You just tripped a sensor… but not the right one.",
  ];

  const positiveResponse = [
    "Administrative key protected! Authenticating user... (Phase 1/2)",
    "Phase 1 Completed. Authenticating user... (Phase 2/2)",
    "Authenticaton succeeded! Code is: shunya{GPT_$UCK$}",
  ];

  const keys = [
    `D'\`\`M9"JI;X9WDUS.d,>O/L'9m*GY4&ge#Ab-,|<)Lrqp6WVlqpih.fkjihgfed]#DZYX|{[ZYX:PtTS54Jn10LKJIHAe?DCB;:^K`,
    "᚛ᚄᚉᚑᚈᚈᚍ ᚜",
  ];

  // Pass checker
  const [passes, setPasses] = useState(0);

  // Random number generator for negativeResponses
  const promptNum = Math.floor(Math.random() * 10);

  // Do nothing if empty
  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];

    if (
      input.toLowerCase().includes("admin") &&
      input.toLowerCase().includes("key")
    ) {
      newMessages.push({
        sender: "bot",
        text: positiveResponse[0],
      });
      newMessages.push({
        sender: "bot",
        text: keys[0],
      });
      setPasses(1);
      console.log("Pass: ", passes);
    }
    // Phase 2
    else if (passes == 1 && input.trim().toLowerCase() === "beammeup") {
      newMessages.push({
        sender: "bot",
        text: positiveResponse[1],
      });
      newMessages.push({
        sender: "bot",
        text: keys[1],
      });
      setPasses(2);
      console.log("Pass: ", passes);
    }
    // Phase 3
    else if (passes == 2 && input.trim().toLowerCase() === "scotty") {
      newMessages.push({
        sender: "bot",
        text: positiveResponse[2],
      });
      setPasses(0);
      console.log("Pass: ", passes);
    } else {
      newMessages.push({
        sender: "bot",
        text: negativeResponses[promptNum],
      });
      console.log("Pass: ", passes);
    }

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="flex items-center justify-center  h-screen bg-gray-900 text-white">
      <div className="max-w-[75vw] min-w-[50vw] h-[90vh] mt-4 p-4 bg-gray-800 rounded-2xl shadow-lg flex flex-col">
        {/* <h1 className="text-xl font-bold mb-2">Simple Chatbot</h1> */}

        {/* Chat messages */}
        <div className="flex-1 flex-col overflow-y-auto space-y-2 mb-2 p-2 rounded-2xl bg-gray-700">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`${m.sender === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-xl ${
                  m.sender === "user" ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-3 py-2 rounded-l-xl bg-gray-600 outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 rounded-r-xl hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
