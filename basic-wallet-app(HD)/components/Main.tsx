"use client";
import { useState } from "react";
import * as bip39 from "bip39";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const Main = () => {
  const [step, setStep] = useState<"intro" | "choose" | "generate" | "import">(
    "intro"
  );
  const [history, setHistory] = useState<string[]>([]);
  const [mnemonic, setMnemonic] = useState("");
  const [importInput, setImportInput] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const goToStep = (newStep: typeof step) => {
    setHistory((prev) => [...prev, step]);
    setStep(newStep);
  };

  const handleBack = () => {
    setHistory((prev) => {
      const updated = [...prev];
      const last = updated.pop();
      if (last) setStep(last as typeof step);
      return updated;
    });
  };

  const handleGenerate = async () => {
    const generated = bip39.generateMnemonic();
    setMnemonic(generated);
    goToStep("generate");
  };

  const handleImport = () => {
    if (bip39.validateMnemonic(importInput.trim())) {
      setMnemonic(importInput.trim());
      goToStep("import");
    } else {
      alert("Invalid mnemonic");
    }
  };

  const handleCopy = () => {
    if (mnemonic) {
      navigator.clipboard.writeText(mnemonic);
      alert("Mnemonic copied to clipboard");
    }
  };

  return (
    <div className="flex items-center justify-center overflow-x-hidden">
      <div className="flex flex-col items-center text-center px-10">
        {step !== "intro" && (
          <button
            onClick={handleBack}
            className="self-start flex items-center gap-1 text-[#5D43E7] cursor-pointer mb-2"
          >
            <ArrowLeft className="size-5" />{" "}
            <span className="text-sm">Back</span>
          </button>
        )}
        {step === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter">
              Welcome to the Privy Wallet
            </h1>
            <p className="text-lg sm:text-xl text-[#454545] dark:text-[#CACACA]">
              Privy supports multiple blockchains
            </p>
            <button
              onClick={() => goToStep("choose")}
              className="mt-4 bg-black px-4 py-2 text-white rounded-md hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black transition-colors cursor-pointer"
            >
              Connect Wallet
            </button>
          </motion.div>
        )}
        {step !== "intro" && (
          <div className="w-[90vw] sm:w-96 h-[450px] px-6 py-15 bg-white dark:bg-[#00000034] border-[0.2px] border-[#CECEEA] dark:border-gray-700 rounded-xl shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {step === "choose" && (
                  <div className="flex flex-col items-center size-full justify-between">
                    <div className="mb-20">
                      <h2 className="text-3xl tracking-tight font-semibold">
                        Choose an Option
                      </h2>
                      <p className="text-sm text-[#454545] dark:text-[#CACACA]">
                        To get started, create new wallet or import an existing
                        one.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={handleGenerate}
                        className="w-full bg-[#5D43E7] px-4 py-2 rounded-xl text-white hover:bg-[#4C35C7] cursor-pointer"
                      >
                        Create a new wallet
                      </button>
                      <button
                        onClick={() => goToStep("import")}
                        className="w-full justify-end bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-500 cursor-pointer"
                      >
                        I already have a wallet
                      </button>
                    </div>
                  </div>
                )}

                {step === "generate" && (
                  <>
                    <h2 className="text-3xl font-semibold tracking-tight">
                      Recovery Phrase
                    </h2>
                    <p className="text-sm text-[#fe6a6a] leading-4 mt-1">
                      This phrase is the ONLY way to recover your wallet. Do NOT
                      share it with anyone.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-5">
                      {mnemonic.split(" ").map((word, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          onClick={handleCopy}
                          title="Click to copy"
                        >
                          {index + 1}. {word}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col items-center gap-2">
                      <div>
                        <input
                          type="checkbox"
                          id="confirm"
                          checked={isConfirmed}
                          onChange={(e) => setIsConfirmed(e.target.checked)}
                        />
                        <label htmlFor="confirm" className="ml-2">
                          I have saved my recovery phrase
                        </label>
                      </div>
                      <button
                        className="bg-green-600 text-white px-14 py-2 rounded hover:bg-green-500"
                        onClick={
                          isConfirmed
                            ? () =>
                                alert("Proceed to dashboard logic goes here")
                            : () =>
                                alert(
                                  "Please confirm you have saved your recovery phrase"
                                )
                        }
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}

                {step === "import" && !mnemonic && (
                  <>
                    <h2 className="text-2xl font-semibold">
                      Paste Your Mnemonic
                    </h2>
                    <textarea
                      value={importInput}
                      onChange={(e) => setImportInput(e.target.value)}
                      className="w-full max-w-md p-2 border border-gray-300 rounded"
                      rows={3}
                    />
                    <button
                      onClick={handleImport}
                      className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                    >
                      Import
                    </button>
                  </>
                )}

                {step === "import" && mnemonic && (
                  <>
                    <h2 className="text-2xl font-semibold">Wallet Imported</h2>
                    <p className="bg-gray-100 p-4 rounded">{mnemonic}</p>
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                      onClick={() =>
                        alert("Proceed to dashboard logic goes here")
                      }
                    >
                      Continue
                    </button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
