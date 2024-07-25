import React from "react";
import NTechFrom from "../../../components/form/NTechFrom";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import NTechSelect from "../../../components/form/NTechSelect";
import { nameOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../shemas/academicManagement.schema";
import { toast } from "sonner";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester: React.FC = () => {
  const [addAcademicSemester] = useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const name = nameOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <NTechFrom
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <NTechSelect label="name" name="name" options={nameOptions} />
          <NTechSelect label="Year" name="year" options={yearOptions} />
          <NTechSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <NTechSelect
            label="End Month"
            name="endMonth"
            options={monthOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </NTechFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
