import React from "react";
import NTechFrom from "../../../components/form/NTechFrom";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import NTechInput from "../../../components/form/NTechInput";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse, TResponse } from "../../../types";
import { toast } from "sonner";
import NTechSelect from "../../../components/form/NTechSelect";

const CreateCourse: React.FC = () => {
  const [createCourse] = useCreateCourseMutation();

  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item: TCourse) => ({
    label: item.title,
    value: item._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses
        ? data.preRequisiteCourses.map((courseId: string) => ({
            course: courseId,
            isDeleted: false,
          }))
        : [],
    };
    try {
      const res = (await createCourse(courseData)) as TResponse<TCourse>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a new Course
      </h1>

      <Flex justify="center" align="center">
        <Col span={6}>
          <NTechFrom onSubmit={onSubmit}>
            <NTechInput name="title" label="title" type="text" />
            <NTechInput name="prefix" label="Prefix" type="text" />
            <NTechInput name="code" label="Code" type="text" />
            <NTechInput name="credits" label="Credits" type="text" />
            <NTechSelect
              label="Pre requisite courses"
              name="preRequisiteCourses"
              options={preRequisiteCoursesOptions}
              mode="multiple"
            />
            <Button htmlType="submit">Submit</Button>
          </NTechFrom>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateCourse;
