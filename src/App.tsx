import { INITIAL_SHORTCUTS } from './features/training/constants';
import { KeyCap } from './shared/components/KeyCap';
import './App.css';

function App() {
  // Para el D1, simplemente mostramos el primer atajo como objetivo base
  const targetShortcut = INITIAL_SHORTCUTS[0];

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 gap-12">
      <header className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-blue-400">
          Entrenador de Atajos
        </h1>
        <p className="text-gray-400 text-lg">Presiona la combinación correcta</p>
      </header>

      <section className="flex flex-col items-center gap-8 bg-gray-800 p-10 rounded-2xl border border-gray-700 shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-200">
          {targetShortcut.description} <span className="text-sm text-gray-500 ml-2">({targetShortcut.tool})</span>
        </h2>
        <div className="flex gap-4">
          {targetShortcut.expectedCombo.map((key, index) => (
            <KeyCap key={index} char={key} />
          ))}
        </div>
      </section>
    </main>
  );
}
