import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    contact: {},
    groups: [],
    contacts: [],
    filteredContacts: [],
    setLoading: () => { } /* bcz setLoading is a Function*/,
    setContact: () => { },
    setContacts: () => { },
    deleteContact: () => { },
    createContact: () => { },
    updateContact: () => { },
    contactSearch: () => { },
    onContactChange: () => { },
    setFilteredContacts: () => { },
});