import React, { useState } from "react";
import NTechFrom from "../../../components/form/NTechFrom";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import NTechInput from "../../../components/form/NTechInput";
import {
  useCreateOfferCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  TAcademicFaculty,
  TCourse,
  TFaculty,
  TOfferedCourse,
  TResponse,
  TSemesterRegistration,
} from "../../../types";
import { toast } from "sonner";
import NTechSelect from "../../../components/form/NTechSelect";
import NTechTimePicker from "../../../components/form/NTechTimePicker";
import { daysOptions } from "../../../constants/global";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import NTechSelectWithWatch from "../../../components/form/NTechSelectWithWatch";

const OfferCourse: React.FC = () => {
  const [selectedAcademicFaculty, setSelectedAcademicFaculty] = useState("");
  const [selectedAcademicDepartment, setSelectedAcademicDepartment] =
    useState("");

  const [createOfferedCourse] = useCreateOfferCourseMutation();

  const { data: courses } = useGetAllCoursesQuery(undefined);
  const { data: academicFaculties } = useGetAllAcademicFacultyQuery(undefined);
  const { data: registeredSemester } =
    useGetAllRegisteredSemesterQuery(undefined);
  const { data: academicDepartments } = useGetAllAcademicDepartmentQuery([
    {
      name: "academicFaculty",
      value: selectedAcademicFaculty,
    },
  ]);
  const { data: faculties } = useGetAllFacultiesQuery([
    {
      name: "academicDepartment",
      value: selectedAcademicDepartment,
    },
  ]);

  // Options for DropDown
  const academicFacultiesOptions = academicFaculties?.data?.map(
    (item: TAcademicFaculty) => ({
      label: item.name,
      value: item._id,
    })
  );

  const academicDepartmentOptions = academicDepartments?.data?.map(
    (item: TAcademicFaculty) => ({
      label: item.name,
      value: item._id,
    })
  );

  const facultiesOptions = faculties?.data?.map((item: TFaculty) => ({
    label: item.fullName,
    value: item._id,
  }));

  const coursesOptions = courses?.data?.map((item: TCourse) => ({
    label: item.title,
    value: item._id,
  }));

  const registeredSemesterOptions = registeredSemester?.data?.map(
    (item: TSemesterRegistration) => ({
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
      value: item._id,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const offeredCourseData = {
      ...data,

      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
      startTime: data.startTime.format("HH:mm"),
      endTime: data.endTime.format("HH:mm"),
    };
    console.log(offeredCourseData);
    try {
      const res = (await createOfferedCourse(
        offeredCourseData
      )) as TResponse<TOfferedCourse>;

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
        Offer a Course
      </h1>

      <Flex justify="center" align="center">
        <Col span={6}>
          <NTechFrom onSubmit={onSubmit}>
            <NTechSelectWithWatch
              onValueChange={setSelectedAcademicFaculty}
              label="Academic Faculty"
              name="academicFaculty"
              options={academicFacultiesOptions}
            />
            <NTechSelectWithWatch
              onValueChange={setSelectedAcademicDepartment}
              disabled={!selectedAcademicFaculty}
              label="Academic Department"
              name="academicDepartment"
              options={academicDepartmentOptions}
            />
            <NTechSelect
              disabled={!selectedAcademicDepartment}
              label="Faculty"
              name="faculty"
              options={facultiesOptions}
            />
            <NTechSelect
              label="Course"
              name="course"
              options={coursesOptions}
            />
            <NTechSelect
              label="Registered Semester"
              name="semesterRegistration"
              options={registeredSemesterOptions}
            />
            <NTechInput name="section" label="Section" type="text" />
            <NTechInput name="maxCapacity" label="Max Capacity" type="text" />
            <NTechSelect
              label="Days"
              name="days"
              options={daysOptions}
              mode="multiple"
            />
            <NTechTimePicker name="startTime" label="Start Time" />
            <NTechTimePicker name="endTime" label="End Time" />
            <Button htmlType="submit">Submit</Button>
          </NTechFrom>
        </Col>
      </Flex>
    </div>
  );
};

export default OfferCourse;
