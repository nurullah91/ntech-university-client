import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";

const StudentDetails: React.FC = () => {
  const { studentId } = useParams();
  const { data: studentData, isLoading } = useGetSingleStudentQuery(studentId);

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  console.log(studentData);
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Details Of {studentData?.data?.fullName}
      </h1>
    </div>
  );
};

export default StudentDetails;
