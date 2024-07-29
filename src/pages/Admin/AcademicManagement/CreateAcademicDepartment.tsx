import { Button, Col, Flex } from "antd";
import React from "react";
import NTechFrom from "../../../components/form/NTechFrom";
import NTechInput from "../../../components/form/NTechInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../shemas/academicManagement.schema";

const CreateAcademicDepartment: React.FC = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <NTechFrom
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <NTechInput name="name" label="Name" type="text" />
          <Button htmlType="submit">Submit</Button>
        </NTechFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
