import React from "react";
import NTechFrom from "../../../components/form/NTechFrom";
import NTechInput from "../../../components/form/NTechInput";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CreateAcademicSemester: React.FC = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <NTechFrom onSubmit={onSubmit}>
      <NTechInput type="text" name="name" />
      <Button htmlType="submit">Submit</Button>
    </NTechFrom>
  );
};

export default CreateAcademicSemester;
