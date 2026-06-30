const navigations = {
    "ecliptica.main": "/ecliptica",
    "ecliptica.info": "/ecliptica/info/:id",
    "ecliptica.calendar": "/ecliptica/calendar",
} as const;

const config = {
    "ecliptica.api": "/api",
    "ecliptica.backend":
        import.meta.env.VITE_BACKEND_URL ?? "/api/ecliptica",
} as const;

type NavigationKey = keyof typeof navigations;
type ConfigKey = keyof typeof config;

export function getNavigationsValue(key: NavigationKey | string): string {
    return navigations[key as NavigationKey] ?? key;
}

export function getConfigValue(key: ConfigKey | string): string {
    return config[key as ConfigKey] ?? "";
}
