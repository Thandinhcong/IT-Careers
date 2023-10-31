import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CLOUD_NAME = 'dvnh1bdqj';
const PRESET_NAME = 'demo_upload';
const FOLDER_NAME = 'ECMA';

const api = createApi({
    reducerPath: 'cloudinaryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}` }),
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (file) => ({
                url: '/image/upload',
                method: 'POST',
                body: {
                    upload_preset: PRESET_NAME,
                    folder: FOLDER_NAME,
                    file: file,
                },
            }),
        }),
    }),
});

export const { useUploadImageMutation } = api;
