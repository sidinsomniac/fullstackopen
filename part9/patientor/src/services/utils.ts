import { Entry, Gender, NewPatientEntry } from "../types";

type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
    entries: unknown;
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

const parseEntries = (entries: unknown): Entry[] => {
    if (!isEntry(entries) || !entries.length) {
        throw new Error("Incorrect or missing entries:" + entries);
    }
    return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isEntry = (entries: unknown): entries is Entry[] => {
    return Array.isArray(entries);
};


export default toNewPatientEntry;