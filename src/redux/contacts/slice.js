import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts, patchContact } from "./operations";
import { apiLogout } from "../auth/operations";


const initialState = {
    contacts: [],
    loading: false,
    error: null,
};

const handlePending = (state) => { state.loading = true; };
const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.contacts.push(action.payload);
            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.contacts = state.contacts.filter(
                    contact => contact.id !== action.payload.id
                );
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(patchContact.pending, handlePending)
            .addCase(patchContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const updatedContact = action.payload;
                state.contacts = state.contacts.map(contact =>
                    contact.id === updatedContact.id ? updatedContact : contact
                );
            })
            .addCase(patchContact.rejected, handleRejected)
            .addCase(apiLogout.fulfilled, (state) => {
                state.contacts = [];
                state.error = null;
                state.loading = false;
            });        
    }
});

export const contactsReducer = contactsSlice.reducer;