import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config";
import { addMyInfo, addProjectInfo } from "./slice";

export const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api`,
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            return headers;
        },
    }),
    keepUnusedDataFor: 60 * 60 * 24 * 7,
    tagTypes: ["Projects", "Me","Transcripts"],
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: "/user/signup",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Me"],
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Me"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Force refresh all queries after login
                    dispatch(serviceApi.util.resetApiState());
                } catch {}
            },
        }),
        myInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            invalidatesTags: ["Me"],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addMyInfo(data));
                } catch (error) {
                    // Handle error silently in production
                    if (process.env.NODE_ENV !== 'production') {
                        console.error('MyInfo Error:', error);
                    }
                }
            },
        }),
        logoutMe: builder.mutation({
            query: () => ({
                url: "/user/logout",
                method: "POST",
            }),
            invalidatesTags: ["Me", "Projects", "Transcripts"],
        }),
        updateProfilePic: builder.mutation({
            query: (data) => ({
                url: "/user/update-pic",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Me"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedProfile } = await queryFulfilled;
                    // Update profile immediately
                    dispatch(
                        serviceApi.util.updateQueryData('myInfo', undefined, (draft) => {
                            if (draft?.me) {
                                draft.me.profilePic = updatedProfile.profilePic;
                            }
                        })
                    );
                } catch {}
            }
        }),
        updateInfo: builder.mutation({
            query: (data) => ({
                url: "/user/update-info",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Me"],
        }),
        createProject: builder.mutation({
            query: (data) => ({
                url: "/project/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Projects"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Optimistically update projects list
                    dispatch(
                        serviceApi.util.updateQueryData('getProjects', undefined, (draft) => {
                            if (draft?.data) {
                                draft.data.push(data.doc);
                            }
                        })
                    );
                } catch {}
            }
        }),
        getProjects: builder.query({
            query: () => ({
                url: "/project",
                method: "GET",
            }),
            invalidatesTags: ["Projects"],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addProjectInfo(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        getProjectById: builder.query({
            query: (projectId) => ({
                url: `/project/${projectId}`,
                method: "GET"
            }),
            providesTags: ["Projects"]
        }),
        createTranscript: builder.mutation({
            query: ({projectId,data}) => ({
                url: `/project/transcript/${projectId}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Transcripts"],
            async onQueryStarted({projectId}, { dispatch, queryFulfilled }) {
                try {
                    const { data: newTranscript } = await queryFulfilled;
                    // Update transcripts list immediately
                    dispatch(
                        serviceApi.util.updateQueryData('getTranscripts', projectId, (draft) => {
                            if (draft?.data) {
                                draft.data.push(newTranscript.doc);
                            }
                        })
                    );
                } catch {}
            }
        }),
        getTranscripts: builder.query({
            query: (projectId) => ({
                url: `/project/transcripts/${projectId}`,
                method: "GET"
            }),
            invalidatesTags: ["Transcripts"]
        }),
        getTranscriptById: builder.query({
            query: ({ projectId, transcriptId }) => ({
                url: `/project/${projectId}/transcript/${transcriptId}`,
                method: "GET"
            })
        }),
        editTranscript: builder.mutation({
            query: ({ projectId, transcriptId, data }) => ({
                url: `/project/${projectId}/transcript/${transcriptId}/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Transcripts'],
            async onQueryStarted({ projectId, transcriptId, data }, { dispatch, queryFulfilled }) {
                // Optimistic update
                const patchResult = dispatch(
                    serviceApi.util.updateQueryData('getTranscriptById', { projectId, transcriptId }, (draft) => {
                        if (draft?.data) {
                            draft.data.fileDescription = data.fileDescription;
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            }
        }),
    
        deleteTranscript: builder.mutation({
            query: ({ projectId, transcriptId }) => ({
                url: `/project/${projectId}/transcript/${transcriptId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Transcripts', 'Projects'],
            async onQueryStarted({ projectId, transcriptId }, { dispatch, queryFulfilled }) {
                // Optimistic delete
                const patchResult = dispatch(
                    serviceApi.util.updateQueryData('getTranscripts', projectId, (draft) => {
                        if (draft?.data) {
                            draft.data = draft.data.filter(t => t._id !== transcriptId);
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    // If error occurs, revert the optimistic delete
                    patchResult.undo();
                }
            }
        })
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useMyInfoQuery,
    useLogoutMeMutation,
    useUpdateProfilePicMutation,
    useUpdateInfoMutation,
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetProjectByIdQuery,
    useCreateTranscriptMutation,
    useGetTranscriptsQuery,
    useGetTranscriptByIdQuery,
    useEditTranscriptMutation,
    useDeleteTranscriptMutation
} = serviceApi;
