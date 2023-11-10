import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import {
  ApiPost,
  ApiDelete,
  ApiPostNoAuth,
  ApiGet,
  Bucket,
  ApiUpload,
} from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiBlock } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { BsFileEarmarkPdfFill, BsFileEarmarkPlusFill } from "react-icons/bs";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

import {
  Col,
  Container,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Card from "reactstrap/es/Card";
import Button from "reactstrap/es/Button";
import CardBody from "reactstrap/es/CardBody";
import { useHistory, Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { SiReadthedocs } from "react-icons/si";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Alert, Space, Spin, Tag } from "antd";
import ReactExport from "react-export-excel";
import * as authUtil from "../../../utils/auth.util";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import { Modal } from "react-bootstrap";
import moment from "moment";
import Spinner from "../../components/Spinner";
const spacing = {
  margin: "1%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};
const imagePosition = {
  width: "50%",
  height: "50%",
  marginLeft: "25%",
};
let search = "";
export default function SellerDashboard(props) {
  const [category, setCategory] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [rowid, SetID] = useState();
  const [statusp, Setstatusp] = useState("");
  const [courses, setCourse] = useState("");
  const [loading, setloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, SetPage] = useState(5);
  const [pages, SetPages] = useState(0);
  const [pagesize, SetPageSize] = useState(100);
  const [sorted1, setSorted] = useState([]);
  const [questionData, setQuetionData] = useState([]);
  const [rattingData, setRattingData] = useState([]);
  const [file, setFiles] = useState([]);
  const [subject, setSubject] = useState([]);
  const history = useHistory();
  const [rowidblock, SetIDBlock] = useState();
  const [boolen, Setboolen] = useState();
  const [openblock, setOpenBlock] = useState(false);
  const [modal, setModal] = useState(false);
  const [blockButton, SetblockButton] = useState();
  const [rowid1, SetID1] = useState();
  const [boolenUnblock, SetboolenUnblock] = useState();
  const [open, setOpen] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [accountData, setaccountData] = useState({});
  const [viewData, setViewData] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const [count, setCount] = useState(100);
  const [button, setbutton] = useState(false);
  const [loadings, setLoading] = useState(false);
  const [recordCount, setRecordCount] = useState();
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const uploadFiles = () => {
    const formData = new FormData();

    formData.append("file", file[0]);

    ApiUpload("upload/file_upload/form_image", formData)
      .then((res) => console.log("image", res))
      .catch((err) => console.log("err", err));
  };
  const imageUpload = (e) => {
    let fileVal = e.target.files[0];
    let fileURL = URL.createObjectURL(fileVal);
    fileVal.fileURL = fileURL;
    setFiles([fileVal]);
    // uploadFiles()
  };

  const openModal = () => {
    setModal(!modal);
  };
  console.log("files", file);
  const [columns, setcolumn] = useState([
    {
      Header: "Name",
      filterable: false,
      Cell: (row) => {
        // console.log("document", row);
        return (
          <div>
            {row.original.user.map((user) => {
              // console.log("user", user.name);
              return <div>{user.name}</div>;
            })}
          </div>
        );
      },
    },
    {
      Header: "Email",
      filterable: false,
      Cell: (row) => {
        // console.log("document", row);
        return (
          <div>
            {row?.original?.user.map((user) => {
              // console.log("user", user.name);
              return <div>{user.email}</div>;
            })}
          </div>
        );
      },
    },
    {
      Header: "Teacher ID",
      filterable: false,
      Cell: (row) => {
        // console.log("document", row);
        return (
          <div>
            {row?.original?.user.map((user) => {
              // console.log("user", user.name);
              return <div>{user.teacherID}</div>;
            })}
          </div>
        );
      },
    },
    // {
    //   Header: "Course",
    //   filterable: false,
    //   Cell: (row) => {
    //     // console.log("document", row);
    //     return (
    //       <div>
    //         {row.original.isCourse === true ? (
    //           <div>{row.original.subjectName}</div>
    //         ) : (
    //           <div>No Select Course</div>
    //         )}
    //         {/* {row.original.subject.map((user) => {
    //           // console.log("user", user.name);
    //           return <div>{user.title}</div>;
    //         })} */}
    //       </div>
    //     );
    //   },
    // },
    {
      Header: "Training Option",
      filterable: false,
      Cell: (row) => {
        // console.log("document", row);
        return (
          <div>
            {row.original?.training_option[0]?.optionType === 0 ? (
              <div>Recorded Video Training</div>
            ) : row.original?.training_option[0]?.optionType === 1 ? (
              <div>Live Video Training</div>
            ) : (
              <div>Physical Training</div>
            )}
          </div>
        );
      },
    },
    {
      Header: "Document",
      // accessor: "name",
      filterable: false,
      Cell: (row) => {
        return (
          <div>
            {row.original.isDocument === true ? (
              row.original.documents[0].document_image === null ? (
                <div>
                  {/* <input type="file" hidden id="fileUpload" onChange={imageUpload} /> */}
                  <label htmlFor="" onClick={openModal}>
                    <BsFileEarmarkPlusFill fontSize={30} color="#3699FF" />
                  </label>
                </div>
              ) : row.original.documents[0]?.document_image
                  ?.toLowerCase()
                  ?.includes("pdf") ? (
                <a
                  href={Bucket + row?.original?.documents[0]?.document_image}
                  target="_blank"
                >
                  <BsFileEarmarkPdfFill fontSize={30} />
                </a>
              ) : row.original.documents[0]?.document_image
                  ?.toLowerCase()
                  ?.includes("docx") ? (
                <a
                  href={Bucket + row?.original?.documents[0]?.document_image}
                  target="_blank"
                >
                  <SiReadthedocs fontSize={30} />
                </a>
              ) : (
                <a
                  href={Bucket + row?.original?.documents[0]?.document_image}
                  target="_blank"
                >
                  <img
                    src={Bucket + row?.original?.documents[0]?.document_image}
                    height="30px"
                    width="30px"
                    className="mx-1 rounded"
                  />
                </a>
              )
            ) : (
              <div>
                <BsFileEarmarkPlusFill />
              </div>
            )}
          </div>
        );
      },
    },

    // {
    //   Header: "Exam Given",
    //   filterable: false,

    //   Cell: (row) => {
    //     return (
    //       <div>
    //         <center>
    //           {row.original.isExamGiven ? (
    //             <div>
    //               <FcApproval
    //                 size="25"
    //                 color="green"
    //                 style={{ marginRight: "19px" }}
    //               />
    //             </div>
    //           ) : (
    //             <div>
    //               <BiBlock
    //                 size="25"
    //                 color="red"
    //                 style={{ marginRight: "19px" }}
    //               />
    //             </div>
    //           )}
    //         </center>
    //       </div>
    //     );
    //   },
    // },
    {
      Header: "Exam Date",
      filterable: false,

      Cell: (row) => {
        return (
          <div>
            <center>
              {row.original.createdAt &&
                moment(row.original?.createdAt.split("T")[0]).format(
                  "DD-MM-YYYY"
                )}
            </center>
          </div>
        );
      },
    },
    {
      Header: "Score",
      filterable: false,

      Cell: (row) => {
        return (
          <div>
            <center>
              {row.original.score && (
                <Tag color="#2db7f5">{row.original?.score}</Tag>
              )}
            </center>
          </div>
        );
      },
    },
    {
      Header: "Details",
      filterable: false,
      Cell: (row) => {
        // console.log("document", row);
        return (
          <div>
            <button
              className="border-0 btn btn-primary px-3 py-2 text-white bg-primary rounded"
              onClick={() => viewDetails(row)}
            >
              View
            </button>
          </div>
        );
      },
    },
    {
      Header: "Action",
      filterable: false,

      Cell: (row) => {
        return (
          <div>
            {row?.original?.isApprove === false ? (
              <a
                title="Approve"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => approval(row.original)}
              >
                <span title="Approve" className="svg-icon svg-icon-md svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Navigation/Check.svg")}
                    title="Approve"
                  />
                </span>
              </a>
            ) : (
              <button
                className="border-0 btn btn-success px-3 py-2 text-white bg-success rounded"
                // onClick={() => approval(row.original)}
              >
                Certified
              </button>
            )}
            <a
              title="Remove"
              className="btn btn-icon btn-light btn-hover-danger btn-sm"
              onClick={() => disApprove(row.original)}
            >
              <span title="Remove" className="svg-icon svg-icon-md svg-icon-danger">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Navigation/Close.svg")}
                  title="Remove"
                />
              </span>
            </a>
          </div>
        );
      },
    },

    // {
    //   Header: "Action",
    //   filterable: false,
    //   Cell: (row) => {
    //     return (
    //       <center>

    //         {row.original.status == "pending" ?
    //         <AiFillInteraction size="25" color="red" onClick={(e) => PandingQuestion(row.original._id)}
    //         style={{ marginRight: "19px" }}/>
    //         : ""}
    //       </center>
    //     );
    //   },
    // },
  ]);

  const viewDetails = (data) => {
    console.log(
      "🚀 ~ file: attendiesList.js ~ line 288 ~ viewDetails ~ data",
      data
    );
    setOpenViewModal(!openViewModal);
    setViewData(data.original);
    const body = {
      createdBy: data.original?.user[0]?._id,
      subjectId: data.original?.subjectId,
    };
    ApiPost(`/review_answer/subject/get`, body)
      .then((res) => {
        console.log(res.data.data);
        setQuetionData(res.data?.data[0]?.questionId);
        setRattingData(res.data?.data[0]?.question);
        // toast.success(res.data.message);
        // getDate(1, 10);
      })
      .catch((err) => {
        // disableLoading();
        // setbutton(false);

        if (err.status == 410) {
          // history.push("/courseList");
        } else {
          toast.error(err.message);
        }
      });
  };
  const disApprove = (v) => {
    console.log("rowwwwwwwwww", v._id);
    ApiDelete(`/student/result/delete_result/${v._id}`)
      .then((res) => {
        toast.success(res.data.message);
        getDate(1, 100, statusp, courses);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const approval = (v) => {
    console.log("v", v);
    const body = {
      resultId: v._id,
      email: v.user[0].email,
    };
    console.log(body);
    ApiPost("/student/approve", body)
      .then((res) => {
        toast.success(res.data.message);
        getDate(1, 100, statusp, courses);
      })
      .catch((err) => {
        // disableLoading();
        // setbutton(false);

        if (err.status == 410) {
          // history.push("/courseList");
        } else {
          toast.error(err.message);
        }
      });
  };

  const reftoken = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const rtoken = JSON.parse(localStorage.getItem("ref_token"));
    const body = {
      old_token: token,
      refresh_token: rtoken,
    };
    ApiPostNoAuth("user/generate_token", body)
      .then(async (res) => {
        authUtil.setToken(res.data.data.token);
        authUtil.setRToken(res.data.data.refresh_token);
        getDate(1, 10, statusp, courses);
      })
      .catch((err) => {});
  };
  const handleonChange1 = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheck = (checked) => {
    console.log("check", checked);
  };

  const handleClickOpenBlock = (row) => {
    SetIDBlock(row);
    Setboolen("false");
    setOpenBlock(true);
    SetblockButton(true);
  };
  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleClickOpenUnblock = (row) => {
    SetID1(row);
    SetboolenUnblock("true");
    setOpen(true);
    SetblockButton(true);
  };

  const handleCloseUnblock = () => {
    setOpen(false);
  };

  const handleonChange = (e) => {
    let { name, value } = e.target;
    setCourse(value);
    getDate(page, pagesize, statusp, value);
  };

  const EditQuestion = (row) => {
    history.push("/bookEdit?id=" + row);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleonChangeSearch = (e) => {
    const { name, value } = e.target;
    Setstatusp(value);
  };

  const handleClickOpen1 = (row) => {
    SetID(row);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };
  const BlockPage = (row) => {
    console.log("/book/delete/" + row);
    ApiDelete("/book/delete/" + row)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.message);
          toast.success("Book Successfully Deleted");
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(res.message);
          console.log("This .then Block");
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };
  const UnBlockPage = (row) => {
    const Id3 = JSON.parse(localStorage.getItem("token"));
    ApiGet("/" + row + "-" + boolenUnblock)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Error Occured");
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  };
  const BlockPageBlock = (row) => {
    const Id3 = JSON.parse(localStorage.getItem("token"));
    ApiGet("/" + row + "-" + boolen)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Error Occured");
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
    console.log("Thisiisisisisi");
    console.log("/" + row + "-" + boolen);
  };
  const BlockPage1 = (row, i) => {
    var body = {
      postId: row,
      status: i,
      message: accountData.description,
    };
    ApiPost("post/action_on_post", body)
      .then((res) => {
        handleClose2();
        toast.success(res.data.message);
        setTimeout(function() {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  };
  const getDate = (s, p, search, subjectId) => {
    setloading(true);
    var body = {
      limit: p,
      page: s,
      search,
      date: "",
      subjectId: subjectId === "select" ? "" : subjectId,
    };
    console.log("body", body);
    const Id2 = JSON.parse(localStorage.getItem("token"));
    ApiPost("/student/result_status", body)
      .then((res) => {
        console.log("res", res);
        setRecordCount(res?.data?.data);
        setCategory(res?.data?.data?.student_data);
        SetPage(res?.data?.data?.state?.page);
        SetPages(res?.data?.data?.state?.page_limit);
        SetPageSize(res?.data?.data?.state?.limit);
        disableLoading();
        setbutton(false);
        setloading(false);

        console.log("/student/status", res.data.data);
      })
      .catch((err) => {
        disableLoading();
        setbutton(false);
        setloading(false);
        if (err.status == 410) {
          reftoken();
        } else {
          toast.error(err.message);
        }
      });
  };

  const fetchData = (state) => {
    setloading(true);
    if (state.page == 0) {
      getDate(state.pageshow, state.pageSize, statusp, courses);
    } else {
      getDate(state.page + 1, state.pageSize, statusp, courses);
    }
  };
  useEffect(() => {
    ApiGet("/course_subject")
      .then((res) => {
        setSubject(res.data.data);
        console.log("subject", res.data.data);
      })

      .catch((err) => {
        if (err.status == 410) {
          history.push("/contentList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  const exportSheet = async () => {
    setIsLoading(true);
    var body = {
      limit: pagesize,
      page: page,
      search,
    };
    console.log("getDdata", body);
    const Id2 = JSON.parse(localStorage.getItem("token"));
    ApiPost("/student/result_status", body)
      .then((res) => {
        setCategory(res?.data?.data?.student_data);
        SetboolenUnblock(!boolenUnblock);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.status == 410) {
          reftoken();
        } else {
          toast.error(err.message);
        }
      });
  };
  const submit = (e) => {
    e.preventDefault();
    setbutton(true);
    enableLoading();
    getDate(page, pagesize, statusp, courses);
  };
  // const dateChange = (e,s, p, search, subjectId) => {
  //   var body = {
  //     limit: 10,
  //     page: 1,
  //     search :"",
  //     date: moment(e.target.value).format("DD-MM-YYYY"),
  //     subjectId: subjectId === "select" ? "" : subjectId,
  //   };
  //   console.log("body", body);
  //   const Id2 = JSON.parse(localStorage.getItem("token"));
  //   ApiPost("/student/result_status", body)
  //     .then((res) => {
  //       console.log("res", res);
  //       setRecordCount(res?.data?.data);
  //       setCategory(res?.data?.data?.student_data);
  //       SetPage(res?.data?.data?.state?.page);
  //       SetPages(res?.data?.data?.state?.page_limit);
  //       SetPageSize(res?.data?.data?.state?.limit);
  //       disableLoading();
  //       setbutton(false);
  //       setloading(false);

  //       console.log("/student/status", res.data.data);
  //     })
  //     .catch((err) => {
  //       disableLoading();
  //       setbutton(false);
  //       setloading(false);
  //       if (err.status == 410) {
  //         reftoken();
  //       } else {
  //         toast.error(err.message);
  //       }
  //     });
  // };
  const onChange123 = (date, dateString) => {
    console.log(
      "1111111111111111111111111111111111111",
      moment(date?._d).format("DD-MM-YYYY")
    );
  };
  console.log("res?.data?.data?.state?.page", page);
  const dateChange = async (date, search, subjectId) => {
    SetPage(1);
    setloading(true);
    var startDate = moment(date?._d).format("YYYY-MM-DD");
    var endDate = new Date(moment(date?._d).format("YYYY-MM-DD"));
    endDate.setDate(endDate.getDate() + 1);
    console.log("startDate", startDate);
    console.log("endDate", moment(endDate).format("YYYY-MM-DD"));
    let body = {
      startDate: startDate,
      endDate: moment(endDate).format("YYYY-MM-DD"),
      limit: pagesize,
      page: 1,
      search: "",
      subjectId: subjectId === "select" ? "" : subjectId,
    };
    console.log("body", body);
    await ApiPost("/student/result_status/filter_date", body)
      .then((res) => {
        console.log("res", res);
        setRecordCount(res?.data?.data);
        setCategory(res?.data?.data?.student_data);
        SetPage(res?.data?.data?.state?.page);
        SetPages(res?.data?.data?.state?.page_limit);
        setloading(false);
        SetPageSize(res?.data?.data?.state?.limit);
      })
      .catch((err) => setloading(false));
  };
  return (
    <Container style={position}>
      <Row></Row>
      <Row>
        <Col md={12}>
          <ToastContainer />
          <Breadcrumb>
            <BreadcrumbItem active>List of All Exam Results</BreadcrumbItem>
          </Breadcrumb>
        </Col>

        <Col md={12}>
          {console.log("category", category)}
          <Card>
            <CardBody>
              <div className="row">
                <Col>
                  <Breadcrumb className="m-0 breadcrumbItem">
                    Recorded: &nbsp;{" "}
                    {loading === true ? (
                      <Space size="middle">
                        <Spin size="small" />
                      </Space>
                    ) : (
                      <Tag color="#2db7f5">{recordCount?.recorded_count}</Tag>
                    )}
                  </Breadcrumb>
                </Col>
                <Col>
                  <Breadcrumb className="m-0 breadcrumbItem">
                    Live: &nbsp;{" "}
                    {loading === true ? (
                      <Space size="middle">
                        <Spin size="small" />
                      </Space>
                    ) : (
                      <Tag color="#2db7f5">{recordCount?.live_count}</Tag>
                    )}
                  </Breadcrumb>
                </Col>
                <Col>
                  <Breadcrumb className="m-0 breadcrumbItem">
                    Physical: &nbsp;{" "}
                    {loading === true ? (
                      <Space size="middle">
                        <Spin size="small" />
                      </Space>
                    ) : (
                      <Tag color="#2db7f5">{recordCount?.physical_count}</Tag>
                    )}
                  </Breadcrumb>
                </Col>
                <Col>
                  <button
                    className="btn btn-primary d-flex align-items-center"
                    disabled={isLoading}
                    onClick={exportSheet}
                  >
                    Export ExcelSheet
                  </button>
                </Col>
              </div>
              <div className="row mt-3">
                <Col md={4}>
                  <FormGroup className="d-flex align-items-end ">
                    <div className="w-100">
                      <Label>Search</Label>
                      <Input
                        type="select"
                        onChange={handleonChange}
                        // value={accountData.subjectId}
                        name="subjectId"
                        placeholder=""
                        required
                      >
                        <option value="select" selected>
                          Select Course
                        </option>
                        {subject.map((sub, i) => {
                          return <option value={sub._id}>{sub.title}</option>;
                        })}
                      </Input>
                    </div>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="d-flex align-items-end ">
                    <div className="w-100">
                      <Label>Filter By Date</Label>
                      {/* <Input
                        type="date"
                        onChange={dateChange}
                        // value={accountData.subjectId}
                        name="date"
                        placeholder=""
                        required
                      ></Input> */}
                      <DatePicker
                        onChange={dateChange}
                        style={{
                          width: "100%",
                          outline: "none",
                          borderRadius: "3px",
                          padding: "7px 10px",
                        }}
                      />
                    </div>
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <form onSubmit={submit}>
                    <FormGroup className="d-flex align-items-end ">
                      <div className="w-100">
                        <Label>Search</Label>
                        <Input
                          type="text"
                          onChange={handleonChangeSearch}
                          placeholder="Enter Name"
                          // required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mx-2"
                        disabled={button}
                      >
                        {loadings ? (
                          <div
                            className="spinner-border text-light"
                            style={{ width: "19px", height: "19px" }}
                            role="status"
                          >
                            {/* <span className="sr-only">Loading...</span> */}
                          </div>
                        ) : (
                          "search"
                        )}
                      </button>
                    </FormGroup>
                  </form>
                </Col>
              </div>

              <div style={spacing}>
                <ReactTable
                  columns={columns}
                  sortable={true}
                  defaultFilterMethod={filterMethod}
                  showPagination={true}
                  defaultPageSize={100}
                  pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                  manual
                  data={category}
                  pages={pages}
                  pageshow={1}
                  loading={loading}
                  LoadingComponent={Spinner}
                  onFetchData={fetchData}
                  sorted={sorted1}
                  onSortedChange={(newSort, column) => {
                    setSorted(newSort);
                  }}
                />
              </div>
              <Dialog
                open={open}
                onClick={handleCloseUnblock}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Unblock the User?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => UnBlockPage(rowid1, boolenUnblock)}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    YES
                  </Button>
                  <Button
                    onClick={handleCloseUnblock}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    NO
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openblock}
                onClick={handleCloseBlock}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Block the User?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => BlockPageBlock(rowidblock, boolen)}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    YES
                  </Button>
                  <Button
                    onClick={handleCloseBlock}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    NO
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Delete this Book?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => BlockPage(rowid)}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    YES
                  </Button>
                  <Button
                    onClick={handleClose1}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    NO
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    please give your response?
                  </DialogContentText>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label>
                          Message<span style={{ color: "red" }}> * </span>
                        </Label>
                        <Input
                          type="textarea"
                          onChange={handleonChange1}
                          value={accountData.description}
                          name="description"
                          placeholder="Enter description"
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => BlockPage1(rowid, "public")}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    Public
                  </Button>
                  <Button
                    onClick={() => BlockPage1(rowid, "reject")}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    Reject
                  </Button>
                </DialogActions>
              </Dialog>
              <Modal
                show={openViewModal}
                centered
                onHide={() => setOpenViewModal(!openViewModal)}
                size="xl"
                // aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header>
                  <Modal.Title
                    id="contained-modal-title-vcenter "
                    className="color_blue font_size_20"
                  >
                    Attendees Details
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex flex-column align-items-center ">
                    <div className="w-100 p-3">
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Name</Label>
                            <Input
                              type="text"
                              // onChange={handleonChange}
                              value={viewData?.user && viewData?.user[0]?.name}
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              // onChange={handleonChange}
                              value={viewData?.user && viewData?.user[0]?.email}
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Training Option</Label>
                            <Input
                              type="email"
                              // onChange={handleonChange}
                              value={
                                viewData?.optionType === 0
                                  ? "Recorded Video"
                                  : viewData?.optionType === 0
                                  ? "Live Taining"
                                  : "Physical Training"
                              }
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Exam Date</Label>
                            <Input
                              type="text"
                              // onChange={handleonChange}
                              value={
                                viewData?.user &&
                                moment(viewData?.createdAt).format("DD-MM-YYYY")
                              }
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Score</Label>
                            <Input
                              type="email"
                              // onChange={handleonChange}
                              value={viewData?.user && viewData?.score}
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Exam Given</Label>
                            <Input
                              type="email"
                              // onChange={handleonChange}
                              value={
                                viewData?.isExamGiven === true ? "Yes" : "No"
                              }
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup className="d-flex flex-column mt-1">
                            <Label>Document</Label>
                            {viewData?.documents &&
                            viewData?.documents[0]?.document_image.includes(
                              "pdf"
                            ) ? (
                              <a
                                href={
                                  viewData?.documents &&
                                  Bucket +
                                    viewData?.documents[0]?.document_image
                                }
                                target="_blank"
                              >
                                <BsFileEarmarkPdfFill fontSize={80} />
                              </a>
                            ) : (
                              <a
                                href={
                                  viewData?.documents &&
                                  Bucket +
                                    viewData?.documents[0]?.document_image
                                }
                                target="_blank"
                              >
                                <img
                                  src={
                                    viewData?.documents &&
                                    Bucket +
                                      viewData?.documents[0]?.document_image
                                  }
                                  className="img-fluid rounded border"
                                  width="80px"
                                  height="120px"
                                />
                              </a>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
                        <Col>
                          <div
                            className="py-3 border-bottom font-weight-bold"
                            style={{ fontSize: "18px" }}
                          >
                            Review Detailsffff
                          </div>
                          <div
                            className="py-3 color_light_gray my-3 px-2"
                            style={{ fontSize: "16px" }}
                          >
                            Subject : {viewData.subjectName}
                          </div>
                          <div className="py-3 row">
                            <div className="col-md-10">
                              {questionData?.map((ratting) => (
                                <div className="d-flex align-items-center">
                                  <div className="mx-2">
                                    <GoPrimitiveDot color="#00bde2" />
                                  </div>
                                  <span
                                    class="color_light_gray my-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {ratting?.question} :
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="col-md-2">
                              {rattingData?.map((question) => (
                                <div
                                  class="color_light_gray my-3"
                                  style={{ fontSize: "14px" }}
                                >
                                  {question?.ans}
                                </div>
                              ))}
                            </div>
                          </div>
                        </Col>
                      </Row> */}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div>
                    <button
                      className="btn text-white linear_gradient text-decoration-none text-center border_none rounded py-1 mx-1"
                      // disabled={rattingSubmit}
                      onClick={() => setOpenViewModal(!openViewModal)}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal.Footer>
              </Modal>
              <Dialog
                open={boolenUnblock}
                onClick={() => SetboolenUnblock(!boolenUnblock)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Export Excel Sheet?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <ExcelFile
                    element={
                      <Button color="primary" className="square" outline>
                        Export ExcelSheet
                      </Button>
                    }
                    filename="Exam Results"
                  >
                    <ExcelSheet data={category} name="Employees">
                      <ExcelColumn
                        label="Name"
                        value={(col) => col.user[0]?.name}
                      />
                      <ExcelColumn
                        label="Email"
                        value={(col) => col.user[0]?.email}
                      />
                      <ExcelColumn
                        label="Phone Number"
                        value={(col) => col.user[0]?.phoneNumber}
                      />
                      <ExcelColumn
                        label="Teacher ID"
                        value={(col) => col.user[0]?.teacherID}
                      />
                      <ExcelColumn
                        label="Region"
                        value={(col) => col.user[0]?.region}
                      />
                      <ExcelColumn
                        label="City"
                        value={(col) => col.user[0]?.city}
                      />
                      <ExcelColumn
                        label="Course"
                        value={(col) =>
                          col.isCourse === true
                            ? col.subjectName
                            : "No Select Course"
                        }
                      />
                      <ExcelColumn
                        label="Training Option"
                        value={(col) =>
                          col.training_option[0]?.optionType === 0
                            ? "Recorded Video Training"
                            : col.training_option[0]?.optionType === 1
                            ? "Live Video Training"
                            : "Physical Training"
                        }
                      />

                      <ExcelColumn
                        label="Exam Date"
                        value={(col) =>
                          moment(col?.createdAt).format("DD-MM-YYYY")
                        }
                      />
                    </ExcelSheet>
                  </ExcelFile>

                  <button
                    onClick={() => SetboolenUnblock(!boolenUnblock)}
                    className="btn btn-light-danger"
                  >
                    Cancel
                  </button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={modal}
                onClick={() => setModal(!modal)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    File Upload
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <div className="">
                    <input
                      type="file"
                      hidden
                      id="fileUpload"
                      onChange={imageUpload}
                    />
                    <label htmlFor="fileUpload">
                      <BsFileEarmarkPlusFill fontSize={30} color="#3699FF" />
                    </label>
                  </div>

                  <button
                    onClick={() => uploadFiles()}
                    className="btn btn-light-danger"
                  >
                    Submit
                  </button>
                </DialogActions>
              </Dialog>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
