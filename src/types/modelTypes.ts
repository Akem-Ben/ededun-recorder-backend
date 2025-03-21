//================= USER ================/


export interface UserAttributes {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Roles;
    refreshToken: string;
    gender: Gender;
    ageGroup: AgeGroup;
}


export interface PhraseAttributes {
    id: string;
    english_text: string;
    yoruba_text: string;
}

export interface RecordingAttributes {
    id: string;
    user_id: string;
    phrase_id: string;
    recording_url: string;
    status: string;
}

export enum Roles {
    User = "User",
    Admin = "Admin",
    SuperAdmin = "SuperAdmin",
}

export enum Gender {
    Male = "male",
    Female = "female",
}

export enum AgeGroup {
    Child = "child",
    Teenager = "teenager",
    Adult = "adult"
}

