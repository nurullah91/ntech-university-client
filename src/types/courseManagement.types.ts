import { TAcademicSemester } from "./academicManagement.type";

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
