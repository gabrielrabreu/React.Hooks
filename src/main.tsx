import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import LifecycleApp from "./components/Lifecycle/Lifecycle.tsx";
import MemoizeApp from "./components/Memoize/Memoize.tsx";
import AuthApp from "./components/Auth/Auth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthApp />
  </StrictMode>
);
