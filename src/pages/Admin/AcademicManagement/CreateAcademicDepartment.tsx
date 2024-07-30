import { Button, Col, Flex } from "antd";
import React from "react";
import NTechFrom from "../../../components/form/NTechFrom";
import NTechInput from "../../../components/form/NTechInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../shemas/academicManagement.schema";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import NTechSelect from "../../../components/form/NTechSelect";
import { toast } from "sonner";

const CreateAcademicDepartment: React.FC = () => {
  const { data: academicFaculty, isLoading } =
    useGetAllAcademicFacultyQuery(undefined);
  const [addAcademicDepartment, { data: academicDepartment, error }] =
    useCreateAcademicDepartmentMutation();
  const facultyOptions = academicFaculty?.data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      await addAcademicDepartment(data);
      if (error) {
        console.log(error);
        toast.error("Something went wrong", { id: toastId });
      } else {
        console.log(academicDepartment);
        toast.success(academicDepartment.message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a new Academic Department
      </h1>
      <Flex justify="center" align="center">
        <Col span={6}>
          <NTechFrom
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <NTechInput name="name" label="Name" type="text" />
            <NTechSelect
              label="Academic Faculty"
              name="academicFaculty"
              disabled={isLoading}
              options={facultyOptions}
            />
            <Button htmlType="submit">Submit</Button>
          </NTechFrom>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicDepartment;
