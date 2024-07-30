import React from "react";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table, TableColumnsType } from "antd";

type TAcademicFacultyTableData = {
  name: string;
};

const AcademicFaculty: React.FC = () => {
  const {
    data: academicFaculties,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultyQuery(undefined);

  const tableData = academicFaculties?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TAcademicFacultyTableData> = [
    {
      title: "Academic Faculty Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }
  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

export default AcademicFaculty;
