export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  description?: string;
}

export interface CourseNormalPart extends CoursePartBase {
  type: "normal";
}

export interface CourseProjectPart extends Omit<CoursePartBase, "description"> {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

export default CoursePart;
