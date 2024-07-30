import { Button, Col, Flex } from "antd";
import React from "react";
import NTechFrom from "../../../components/form/NTechFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../shemas/academicManagement.schema";
import NTechInput from "../../../components/form/NTechInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty, TResponse } from "../../../types";

const CreateAcademicFaculty: React.FC = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("loading...");
    try {
      const res = (await createAcademicFaculty(
        data
      ).unwrap()) as TResponse<TAcademicFaculty>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a new Academic Faculty
      </h1>
      <Flex justify="center" align="center">
        <Col span={6}>
          <NTechFrom
            onSubmit={onSubmit}
            resolver={zodResolver(academicFacultySchema)}
          >
            <NTechInput name="name" label="Faculty Name" type="text" />
            <Button htmlType="submit">Submit</Button>
          </NTechFrom>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicFaculty;
