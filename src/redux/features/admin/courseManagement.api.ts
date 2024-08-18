import {
  TQueryParam,
  TResponseRedux,
  TSemesterRegistration,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const CourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semesterRegistration"],
      transformResponse: (
        response: TResponseRedux<TSemesterRegistration[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semesterRegistration"],
    }),
    updateSemesterRegistration: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semesterRegistration"],
    }),
  }),
});
export const {
  useCreateSemesterRegistrationMutation,
  useGetAllRegisteredSemesterQuery,
  useUpdateSemesterRegistrationMutation,
} = CourseManagementApi;
