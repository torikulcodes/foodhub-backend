export const normalizeName = (name, forSlug = false) => {
    let normalized = name.trim().toLowerCase();
    if (forSlug) {
        normalized = normalized.replace(/\s+/g, "-").replace(/-+/g, "-");
    }
    return normalized;
};
//# sourceMappingURL=normalize.js.map