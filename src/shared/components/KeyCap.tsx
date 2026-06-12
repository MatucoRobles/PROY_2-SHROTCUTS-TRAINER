interface KeyCapProps {
  char: string;
}

export function KeyCap({ char }: KeyCapProps) {
  return (
    <kbd className="min-w-[3rem] h-12 px-4 inline-flex items-center justify-center text-xl font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-[0_4px_0_rgb(209,213,219)] uppercase">
      {char}
    </kbd>
  );
}