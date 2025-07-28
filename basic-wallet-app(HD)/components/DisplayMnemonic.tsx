const DosplayMnemonic = ({ mnemonic }: { mnemonic: string }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      {mnemonic.split(" ").map((word, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-center"
        >
          {word}
        </div>
      ))}
    </div>
  );
};
