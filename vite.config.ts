import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const mockPlants = {
    results: [
        {
            id: 1,
            alias: "Rose",
            image_url:
                "https://ervanarium.com.br/wp-content/uploads/2019/03/cactus-3142589_1920.jpg",
        },
        {
            id: 2,
            alias: "Sunflower",
            image_url:
                "https://avatars.mds.yandex.net/i?id=31da587c9aabc83ad3615023f91d7284781be06c-10701700-images-thumbs&n=13",
        },
    ],
};

export default defineConfig({
    plugins: [
        react(),
        {
            name: "api-stub",
            configureServer(server) {
                server.middlewares.use(
                    "/api/ecliptica/plants/list",
                    (_req, res) => {
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify(mockPlants));
                    },
                );
            },
        },
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    server: {
        port: 8099,
        open: true,
    },
    build: {
        outDir: "dist",
    },
});
