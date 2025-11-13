import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

// === 🧩 Tambahan untuk fitur 5.1 (Trix, SweetAlert2, dan ApexCharts) ===
import "trix/dist/trix.css";
import "trix";
import "sweetalert2/dist/sweetalert2.min.css";
// ApexCharts tidak perlu import global karena dipanggil langsung di component Index.jsx
// ===============================================================

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
        return pages[`./pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
