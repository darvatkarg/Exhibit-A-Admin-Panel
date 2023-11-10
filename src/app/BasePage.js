import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import Assign_Faculty from "./pages/AsignSlot/Assign_Faculty";
import Betch_managment from "./pages/AsignSlot/Betch_managment";
import ComponentToPrint from "./pages/AsignSlot/ComponentToPrint";
import Attestation_Done from "./pages/Attestation Done/Attestation_Done";

import { DashboardPage } from "./pages/DashboardPage";
import Video_Counter from "./pages/Video Counter/Video_Counter";
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const categorylist = lazy(() => import("./pages/category/categorylist"));
const categoryedit = lazy(() => import("./pages/category/categoryedit"));

const contectlist = lazy(() => import("./pages/contectus/contectuslist"));
const CertifiedTeacher = lazy(()=> import("./pages/courseAttendies/CertifiedTeacher"))

const bookCategory = lazy(() => import("./pages/BookCategory/BookCategory"));
const genreList = lazy(() => import("./pages/Genre/genreList"));
const genreEdit = lazy(() => import("./pages/Genre/genreEdit"));

const categoryEditNew = lazy(() => import("./pages/category/categoryedit"));

const categoryEdit = lazy(() => import("./pages/category/categoryedit"));
const categoryList = lazy(() => import("./pages/category/categorylist"));

const bookList = lazy(() => import("./pages/Book/BookList"));
const bookEdit = lazy(() => import("./pages/Book/BookEdit"));

const topicEdit = lazy(() => import("./pages/Test/TestEdit"));
const topicList = lazy(() => import("./pages/Test/TestList"));

const slotList = lazy(() => import("./pages/AsignSlot/AsignSlotList"));
const slotEdit = lazy(() => import("./pages/AsignSlot/AsignSlotEdit"));

const Feedback = lazy(() => import('./pages/Feedback/Feedback'))

const theoryQuestionEdit = lazy(() =>
  import("./pages/TheoryQuestion/theoryQuestionEdit")
);
const theoryQuestionList = lazy(() =>
  import("./pages/TheoryQuestion/theoryQuestionList")
);

const schoolList = lazy(() => import("./pages/School/SchoolList"));
const schoolEdit = lazy(() => import("./pages/School/SchoolEdit"));
const teacherEdit = lazy(() => import("./pages/Teacher/TeacherEdit"));
const teacherList = lazy(() => import("./pages/Teacher/TeacherList"));
const studentList = lazy(() => import("./pages/Student/StudentList"));
const studentEdit = lazy(() => import("./pages/Student/StudentEdit"));
const theoryEdit = lazy(() => import("./pages/Theory/TheoryEdit"));
const theoryList = lazy(() => import("./pages/Theory/TheoryList"));
const mcqList = lazy(() => import("./pages/MCQTest/mcqTestList"));
const mcqEdit = lazy(() => import("./pages/MCQTest/mcqTestEdit"));

const questionList = lazy(() => import("./pages/Question/QuestionList"));
const questionEdit = lazy(() => import("./pages/Question/QuestionEdit"));

const subAdminList = lazy(() => import("./pages/subAdmin/subAdminList"));
const subAdminEdit = lazy(() => import("./pages/subAdmin/subAdminEdit"));

const auditorList = lazy(() => import("./pages/Auditor/auditorList"));
const auditorEdit = lazy(() => import("./pages/Auditor/auditorEdit"));

const facultyList = lazy(() => import("./pages/Faculty/FacultyList"));
const facultyEdit = lazy(() => import("./pages/Faculty/FacultyEdit"));

const timeSlotEdit = lazy(() => import("./pages/TimeSlot/timeSlotEdit"));
const timeSlotList = lazy(() => import("./pages/TimeSlot/timeSlotList"));

const contentList = lazy(() => import("./pages/Content/contentList"));
const contentEdit = lazy(() => import("./pages/Content/contentEdit"));

const courseList = lazy(() => import("./pages/Course/CourseList"));
const CourseEdit = lazy(() => import("./pages/Course/CourseEdit"));

const trainingTypeEdit = lazy(() =>
  import("./pages/TrainingType/trainingTypeEdit")
);
const trainingTypeList = lazy(() =>
  import("./pages/TrainingType/trainingTypeList")
);

const attendiesEdit = lazy(() =>
  import("./pages/courseAttendies/attendiesEdit")
);
const attendiesList = lazy(() =>
  import("./pages/courseAttendies/attendiesList")
);
const attendiesListNew = lazy(() =>
  import("./pages/courseAttendies/attendiesListNew")
);

const questionBankEdit = lazy(() =>
  import("./pages/ComputerTraining/ComputerTrainingEdit")
);
const questionBank = lazy(() =>
  import("./pages/ComputerTraining/ComputerTrainingList")
);

const subCategoryList = lazy(() =>
  import("./pages/subcategory/subcategorylist")
);
const subCategoryEdit = lazy(() =>
  import("./pages/subcategory/subcategoryedit")
);

const mainCategoryedit = lazy(() =>
  import("./pages/MainCategory/mainCategoryedit")
);
const mainCategorylist = lazy(() =>
  import("./pages/MainCategory/mainCategorylist")
);
const mainCategoryview = lazy(() =>
  import("./pages/MainCategory/mainCategoryview")
);
const districtWise = lazy(() =>
  import("./pages/District wise/District_wise")
);

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/category" component={bookCategory} />
        <ContentRoute path="/mainCategoryview" component={mainCategoryview} />
        <ContentRoute path="/mainCategorylist" component={mainCategorylist} />
        <ContentRoute path="/mainCategoryedit" component={mainCategoryedit} />
        <ContentRoute path="/categoryedit" component={categoryEdit} />
        <ContentRoute path="/categorylist" component={categoryList} />
        <ContentRoute path="/contectuslist" component={contectlist} />
        <ContentRoute path="/genreList" component={genreList} />
        <ContentRoute path="/genreEdit" component={genreEdit} />
        <ContentRoute path="/schoolEdit" component={schoolEdit} />
        <ContentRoute path="/schoolList" component={schoolList} />
        <ContentRoute path="/teacherEdit" component={teacherEdit} />
        <ContentRoute path="/teacherList" component={teacherList} />
        <ContentRoute path="/studentList" component={studentList} />
        <ContentRoute path="/studentEdit" component={studentEdit} />
        <ContentRoute path="/theoryList" component={theoryList} />
        <ContentRoute path="/theoryEdit" component={theoryEdit} />
        <ContentRoute path="/subAdminList" component={subAdminList} />
        <ContentRoute path="/subAdminEdit" component={subAdminEdit} />

        <ContentRoute path="/topicList" component={topicList} />
        <ContentRoute path="/topicEdit" component={topicEdit} />

        <ContentRoute path="/auditorList" component={auditorList} />
        <ContentRoute path="/auditorEdit" component={auditorEdit} />

        <ContentRoute path="/facultyList" component={facultyList} />
        <ContentRoute path="/facultyEdit" component={facultyEdit} />

        <ContentRoute path="/slotList" component={slotList} />
        <ContentRoute path="/slotEdit" component={slotEdit} />

        <ContentRoute path="/timeSlotEdit" component={timeSlotEdit} />
        <ContentRoute path="/timeSlotList" component={timeSlotList} />

        <ContentRoute path="/contentList" component={contentList} />
        <ContentRoute path="/contentEdit" component={contentEdit} />

        <ContentRoute path="/courseList" component={courseList} />
        <ContentRoute path="/CourseEdit" component={CourseEdit} />


        <ContentRoute path="/districtWise" component={districtWise} />

        <ContentRoute path="/feedback" component={Feedback} />

        <ContentRoute path="/attendiesEdit" component={attendiesEdit} />
        <ContentRoute path="/exam-results" component={attendiesList} />
        <ContentRoute path="/certified-teacher" component={CertifiedTeacher} />
        <ContentRoute path="/attendiesList" component={attendiesListNew} />
        <ContentRoute path="/attestation_Done" component={Attestation_Done} />

        <ContentRoute
          path="/theoryQuestionList"
          component={theoryQuestionList}
        />
        <ContentRoute
          path="/theoryQuestionEdit"
          component={theoryQuestionEdit}
        />

        <ContentRoute path="/categoryEditNew" component={categoryEditNew} />
        <ContentRoute path="/subCategoryList" component={subCategoryList} />
        <ContentRoute path="/subCategoryEdit" component={subCategoryEdit} />

        <ContentRoute path="/bookList" component={bookList} />
        <ContentRoute path="/bookEdit" component={bookEdit} />

        <ContentRoute path="/mcqEdit" component={mcqEdit} />
        <ContentRoute path="/mcqList" component={mcqList} />

        <ContentRoute path="/questionList" component={questionList} />
        <ContentRoute path="/questionEdit" component={questionEdit} />

        <ContentRoute path="/trainingTypeEdit" component={trainingTypeEdit} />
        <ContentRoute path="/trainingTypeList" component={trainingTypeList} />

        <ContentRoute path="/questionBankEdit" component={questionBankEdit} />
        <ContentRoute path="/questionBank" component={questionBank} />
        <ContentRoute path="/invoice" component={ComponentToPrint} />
        <ContentRoute path="/assignFaculty" component={Assign_Faculty} />
        <ContentRoute path="/traningLog" component={Video_Counter} />
        <ContentRoute path="/batchManagment" component={Betch_managment} />

        <Route path="/e-commerce" component={ECommercePage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
