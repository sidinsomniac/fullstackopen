/* eslint-disable @typescript-eslint/no-explicit-any */
import { HealthCheckEntry, EntryType, Gender, NewPatientEntry, HealthCheckRating } from "../types";

type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
    entries: unknown;
};

type EntryField = {
    description: unknown;
    date: unknown;
    specialist: unknown;
    type: unknown;
    healthCheckRating: unknown;
    diagnosisCodes?: unknown;
};

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {
    const newPatientEntry = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: parseEntries(entries)
    };
    return newPatientEntry;
};

export const toNewEntry = ({ description, date, specialist, type, healthCheckRating, diagnosisCodes }: EntryField): Omit<HealthCheckEntry, "id"> => {
    const newEntry = {
        description: parseString(description),
        date: parseDate(date),
        specialist: parseString(specialist),
        type: parseEntryType(type),
        healthCheckRating: parseRating(healthCheckRating),
        diagnosisCodes: parseCodes(diagnosisCodes)
    };

    return newEntry;
};

const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
        throw new Error("Incorrect or missing type");
    }
    return string;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender:" + gender);
    }
    return gender;
};

const parseEntries = (entries: unknown): HealthCheckEntry[] => {
    if (!isEntry(entries)) {
        throw new Error("Incorrect or missing entries:" + entries);
    }
    return entries;
};

const parseEntryType = (entryType: unknown): EntryType.HEALTHCHECK => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error("Incorrect or missing entryType:" + entryType);
    }
    return entryType;
};

const parseRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isRating(rating)) {
        throw new Error("Incorrect or missing rating:" + rating);
    }
    return rating;
};

const parseCodes = (codes: unknown): string[] => {
    if (!codes || !isArrayOfCode(codes)) {
        throw new Error("Incorrect or missing diagnosis codes:" + codes);
    }
    return codes;
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isEntryType = (type: any): type is EntryType.HEALTHCHECK => {
    return type === "HealthCheck";
};

const isRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const isArrayOfCode = (codes: unknown): codes is string[] => {
    return Array.isArray(codes) && codes.every(code => typeof code === "string");
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isEntry = (entries: unknown): entries is HealthCheckEntry[] => {
    if (!Array.isArray(entries)) return false;
    const entryLength = entries.length;
    const filteredEntryLength = entries.filter(entry => ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(entry.type)).length;
    return entryLength === filteredEntryLength;
};


export default { toNewPatientEntry, toNewEntry };