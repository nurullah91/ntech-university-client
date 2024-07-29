import { FieldValues, SubmitHandler } from "react-hook-form";
import NTechFrom from "../../../components/form/NTechFrom";
import NTechInput from "../../../components/form/NTechInput";
import { Button } from "antd";

const CreateStudent: React.FC = () => {
  const studentDummyData = {
    password: "student123",
    student: {
      name: {
        firstName: "I am ",
        middleName: "Student",
        lastName: "Number 1",
      },
      gender: "male",
      dateOfBirth: "1990-01-01",
      email: "student2@gmail.com",
      contactNo: "1235678",
      emergencyContactNo: "987-654-3210",
      bloogGroup: "A+",
      presentAddress: "123 Main St, Cityville",
      permanentAddress: "456 Oak St, Townsville",
      guardian: {
        fatherName: "James Doe",
        fatherOccupation: "Engineer",
        fatherContactNo: "111-222-3333",
        motherName: "Mary Doe",
        motherOccupation: "Teacher",
        motherContactNo: "444-555-6666",
      },
      localGuardian: {
        name: "Alice Johnson",
        occupation: "Doctor",
        contactNo: "777-888-9999",
        address: "789 Pine St, Villageton",
      },
      admissionSemester: "65b0104110b74fcbd7a25d92",
      academicDepartment: "65b00fb010b74fcbd7a25d8e",
    },
  };
  console.log(studentDummyData);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append();
  };

  return (
    <NTechFrom onSubmit={onSubmit}>
      <NTechInput name="name" label="Name" type="text" />
      <Button htmlType="submit">Submit</Button>
    </NTechFrom>
  );
};

export default CreateStudent;
