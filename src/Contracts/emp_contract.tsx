export interface EmpContract {
  emp_name: string;
  emp_email: string;
  emp_mobile: string;
  emp_designation: string;
  emp_gender: string;
  emp_course: string[];
  emp_file: File | null;
  created_date: string;
  userId: string;
}
