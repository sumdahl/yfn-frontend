// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import NotFound from "./modules/404/index.tsx";
import { MinuteUpload } from "./modules/forms/components/minute-upload.tsx";
import Forms from "./modules/forms/index.tsx";
import LoginForm from "./modules/login/index.tsx";
import ProfileCard from "./modules/profile/index.tsx";
import FormSuccess from "./modules/succcess/index.tsx";
import { ProtectedRoute } from "./routes/protected-routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/forms"
          element={
            // <ProtectedRoute>
            <Forms />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/minute"
          element={
            <ProtectedRoute>
              <MinuteUpload />
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={<FormSuccess />} />
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
