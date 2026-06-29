import { createHashRouter } from 'react-router';
import { RootLayout } from '@/app/RootLayout';
import HomePage from '@/pages/HomePage';
import WindowsTraining from '@/pages/WindowsTraining';
import ChromeTraining from '@/pages/ChromeTraining';
import GeneralTraining from '@/pages/GeneralTraining';
import VsCodeTraining from '@/pages/VsCodeTraining';
import NotFoundPage from '@/pages/NotFoundPage';
import ProgressPageRoute from "@/pages/ProgressPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "general", Component: GeneralTraining },
      { path: "vscode", Component: VsCodeTraining },
      { path: "chrome", Component: ChromeTraining },
      { path: "windows", Component: WindowsTraining },
      { path: "progress", Component: ProgressPageRoute },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
