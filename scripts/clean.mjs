// Removes build output so deleted modules never linger in dist/ or the npm tarball.
import { rm } from "node:fs/promises";
await rm(new URL("../dist", import.meta.url), { recursive: true, force: true });
