import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/app";

export default function MyComponent() {
    return <App />;
}

let root: ReactDOM.Root | null = null;

export const mount = (
    Component: React.ComponentType,
    element: HTMLElement | null = document.getElementById("app"),
) => {
    if (!element) {
        return;
    }

    root = ReactDOM.createRoot(element);
    root.render(<Component />);
};

export const unmount = () => {
    root?.unmount();
    root = null;
};

mount(App);
