import * as RiIcons from "react-icons/ri";

export const menu = [
  {
    title: 'Dashboard',
    pathname: 'dashboard',
    img: `/media/svg/icons/Design/Layers.svg`,
    flag: true,
  },
  {
    title: 'Books',
    pathname: 'bookList',
    img: `/media/svg/icons/Home/Book.svg`,
    flag: true,
  },
  {
    title: 'Students',
    pathname: 'studentList',
    img: `/media/svg/icons/General/User.svg`,
    flag: true,
  },
  {
    title: 'Teachers',
    pathname: 'teacherList',
    img: `/media/svg/icons/General/Star.svg`,
    flag: true,
  },
  {
    title: 'Schools',
    pathname: 'schoolList',
    img: `/media/svg/icons/General/Bookmark.svg`,
    flag: true,
  },
  {
    title: 'Topics',
    pathname: 'topicList',
    img: `/media/svg/icons/General/Shield-check.svg`,
    flag: true,
  },
  {
    title: 'Training Program',
    pathname: '',
    img: `/media/svg/icons/Code/Error-circle.svg`,
    flag: true,
    subMenu: [
      {
        title: 'Manage Course',
        pathname: 'courseList',
      },
      {
        title: 'Manage Content',
        pathname: 'contentList',
      },
      {
        title: 'Faculty',
        pathname: 'facultyList',
      },
      {
        title: 'Training Log',
        pathname: 'traningLog',
      },
      {
        title: 'Assign Faculty',
        pathname: 'slotList',
      },
      {
        title: 'Exam Results',
        pathname: 'exam-results',
      },
      {
        title: 'Certified Teacher',
        pathname: 'certified-teacher',
      },
      {
        title: 'Attendees',
        pathname: 'attendiesList',
      },
      {
        title: 'Attestation Done',
        pathname: 'attestation_Done',
      },
      {
        title: 'Time Slot',
        pathname: 'timeSlotList',
      },
      {
        title: 'Question Bank',
        pathname: 'questionBank',
      },
      {
        title: 'Training Type',
        pathname: 'trainingTypeList',
      },
    ]
  },
  {
    title: 'Report',
    pathname: '',
    img: `/media/svg/icons/Media/Repeat.svg`,
    flag: true,
    subMenu: [
      {
        title: 'District wise',
        pathname: 'districtWise',
      },

    ]
  },
  {
    title: 'Manage Genre',
    pathname: 'genreList',
    img: `/media/svg/icons/General/Folder.svg`,
    flag: true,
  },
  {
    title: 'Feedback',
    pathname: 'feedback',
    img: `/media/svg/icons/General/Star.svg`,
    flag: true,
  },
  {
    title: 'Main Category',
    pathname: 'mainCategorylist',
    img: `/media/svg/icons/General/Save.svg`,
    flag: true,
  },
  {
    title: 'Category',
    pathname: 'categoryList',
    img: `/media/svg/icons/General/Duplicate.svg`,
    flag: true,
  },
  {
    title: 'Sub Category',
    pathname: 'subCategoryList',
    img: `/media/svg/icons/Design/Layers.svg`,
    flag: true,
  },
  {
    title: 'Manage Auditor',
    pathname: 'auditorList',
    img: `/media/svg/icons/General/Settings-1.svg`,
    flag: false,
  },
  {
    title: 'Manage Sub-Admin',
    pathname: 'subAdminList',
    img: `/media/svg/icons/General/Shield-check.svg`,
    flag: false,
  },
]