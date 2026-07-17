import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { ToastProvider } from "./context/ToastContext";
import { ContactModalProvider } from "./context/ContactModalContext";
import { EventModalProvider } from "./context/EventModalContext";
import ContactModal from "./components/ContactModal";
import EventModal from "./components/event/EventModal";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <DataProvider>
      <ToastProvider>
        <ContactModalProvider>
          <EventModalProvider>
            <ContactModal />
            <EventModal />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </EventModalProvider>
        </ContactModalProvider>
      </ToastProvider>
    </DataProvider>
  );
}
