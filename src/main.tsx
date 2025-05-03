// index.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import NotFound from "./modules/404/index.tsx";
import Forms from "./modules/forms/index.tsx";
import LoginForm from "./modules/login/index.tsx";

import { ProtectedRoute } from "./routes/protected-routes.tsx";
import Dashboard from "./modules/dashboard/index.tsx";
import FormUploadSuccess from "./modules/forms/components/form-sucess.tsx";
import FormLayout from "./modules/forms/layout.tsx";
import { MinuteUpload } from "./modules/forms/components/minute-upload.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route
        path="/forms"
        element={
          <ProtectedRoute>
            <FormLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Forms />} />
      </Route>

      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <FormUploadSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/minute"
        element={
          // <ProtectedRoute>
          <MinuteUpload />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>

    <Toaster />
  </BrowserRouter>
);
