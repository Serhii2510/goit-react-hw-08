import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://66d456155b34bcb9ab3e4e26.mockapi.io';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkApi) => {
        try {
            const { data } = await axios.get('/contacts');            
            return data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contact, thunkApi) => {
        try {
            const { data } = await axios.post('/contacts', contact);            
            return data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, thunkApi) => {
        try {
            const { data } = await axios.delete(`/contacts/${id}`);            
            return data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);