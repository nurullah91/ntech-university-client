import React from "react";
import NTechFrom from "../../../components/form/NTechFrom";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import NTechSelect from "../../../components/form/NTechSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import NTechDatePicker from "../../../components/form/NTechDatePicker";
import NTechInput from "../../../components/form/NTechInput";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";
import { toast } from "sonner";

const CreateSemesterRegistration: React.FC = () => {
  const [createSemesterRegistration] = useCreateSemesterRegistrationMutation();

  const { data: academicSemester } = useGetAllAcademicSemestersQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    label: `${item.name} ${item.year}`,
    value: item._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const semesterRegistration = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.minCredit),
    };
    try {
      const res = (await createSemesterRegistration(
        semesterRegistration
      )) as TResponse<any>;

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
        Create a new Semester Registration
      </h1>

      <Flex justify="center" align="center">
        <Col span={6}>
          <NTechFrom onSubmit={onSubmit}>
            <NTechSelect
              label="Academic Semester"
              name="academicSemester"
              options={academicSemesterOptions}
            />
            <NTechSelect
              label="Status"
              name="status"
              options={semesterStatusOptions}
            />

            <NTechDatePicker name="startDate" label="Start Date" />
            <NTechDatePicker name="endDate" label="End Date" />
            <NTechInput name="minCredit" label="Min Credit" type="text" />
            <NTechInput name="maxCredit" label="Max Credit" type="text" />

            <Button htmlType="submit">Submit</Button>
          </NTechFrom>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateSemesterRegistration;
