import { TAcademicSemester } from "./academicManagement.type";

export type TCourse = {
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: { course: TCourse; isDeleted: boolean }[];
  prefix: string;
  title: string;
  _id: string;
};

export type TSemesterRegistration = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  cratedAt: string;
  updatedAt: string;
};
