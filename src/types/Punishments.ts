export interface Warning {
    userID: string;
    modID: string;
    reason: string;
    punishedAt: string;
}

export interface Mute {
    type: "TEMP" | "PERM";
    userID: string;
    modID: string;
    reason: string;
    time?: string;
    punishedAt: string;
}

export interface Unmute {
    userID: string;
    modID: string;
    reason: string;
    time?: string;
    punishedAt: string;
}

export interface Kick {
    userID: string;
    modID: string;
    reason: string;
    punishedAt: string;
}

export interface Ban {
    type: "TEMP" | "SOFT" | "HACK" | "PERM";
    userID: string;
    modID: string;
    reason: string;
    time?: string;
    punishedAt: string;
}

export interface Unban {
    userID: string;
    modID: string;
    reason: string;
    time?: string;
    punishedAt: string;
}