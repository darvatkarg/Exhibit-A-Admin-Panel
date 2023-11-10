import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import { ApiDelete, ApiGet, ApiPost } from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { Col, Container, Row, Table } from "reactstrap";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AsignSlotEdit from "./AsignSlotEdit";
import ReactExport from "react-export-excel";

import { HiDownload } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

import moment from "moment";
import CopyToClipboard from "react-copy-to-clipboard";
const spacing = {
  margin: "3%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};

export default function SellerDashboard(props) {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [meeting, setMeeting] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [accountData, setaccountData] = useState({});
  const [block, setBlock] = useState(true);
  const [verify, setVerify] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [slot, setSlot] = useState({});
  const [userId, setUserId] = useState();
  const [genratePdf, setGenratePdf] = useState([]);

  const history = useHistory();

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const columns = [
    { title: "Course", field: "course" },
    { title: "Date", field: "date" },
    { title: "Start Time", field: "start_time" },
    { title: "End Time", field: "end_time" },
    { title: "Total Student", field: "totalStudent" },
    { title: "Student Information", field: "userData" },
  ];
  const [columns2, setcolumn2] = useState([
    {
      Header: "Course",
      filterable: false,
      minWidth: 250,
      Cell: (row) => {
        return <div>{row?.original?.course}</div>;
      },
    },
    {
      Header: "Date",
      filterable: false,
      Cell: (row) => {
        return <div>{moment(row.original.date).format("YYYY-MM-DD")}</div>;
      },
    },

    {
      Header: "Start Time",
      filterable: false,
      Cell: (row) => {
        return <div>{row.original.start_time}</div>;
      },
    },
    {
      Header: "End Time",
      filterable: false,
      Cell: (row) => {
        return <div>{row.original.end_time}</div>;
      },
    },

    {
      Header: "Total Student",
      minWidth: 100,
      filterable: false,

      Cell: (row) => {
        return <div>{row.original.userCount}</div>;
      },
    },
    {
      Header: "Assign Faculty",
      minWidth: 150,
      filterable: false,

      Cell: (row) => {
        return row.original.faculty ? (
          <button
            className="btn btn-light-success"
            // onClick={() => handleClickOpen1(row.original)}
          >
            {" "}
            {row.original.faculty}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => handleClickOpen1(row.original)}
          >
            {" "}
            Assign Faculty
          </button>
        );
      },
    },
    {
      Header: "",
      minWidth: 150,
      filterable: false,

      Cell: (row) => {
        let a = [];
        // // let b = [];
        a.push(row.original);
        // b.push(row.original.userData);
        // console.log("Download Faculty", a);

        return (
          <>
            <button
              className="btn btn-light-primary mr-2"
              // onClick={() => {
              //   history.push({
              //     pathname: "invoice",
              //     state: a,
              //   });
              // }}
              onClick={() => downloadSheet(row)}
            >
              {/* <HiDownload fontSize={20} /> */}
              View
            </button>
            {/* {!row.original.faculty && (
              <button
                className="btn btn-light-danger"
                onClick={() => {
                  deleteBatch(row.original);
                }}
              >
                <AiOutlineDelete fontSize={20} />
              </button>
            )} */}
          </>
        );
      },
    },
  ]);
  const downloadSheet = (row) => {
    setLoading(true);
    console.log("rowwwwwwwwwwwwwwwwwwwwwwwwwwwww", row?.original?._id);
    ApiGet(`/assign_faculty/get_user_batch_data/${row?.original?._id}`)
      .then((res) => {
        console.log("res", res.data.data);
        setGenratePdf(res.data.data);
        history.push({
          pathname: "invoice",
          state: res.data.data,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const deleteBatch = (row) => {
    console.log(row);
    setToggler(!toggler);
    setUserId(row._id);
  };
  const handleClickOpen1 = (row) => {
    setModal(!modal);
    setSlot(row);
    console.log("row", row);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleonChange1 = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };

  console.log(category);
  const contectus = (i) => {
    setLoading(true);
    ApiGet("/assign_faculty")
      .then((res) => {
        setCategory(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    contectus("true");
  }, []);

  const deleted = () => {
    console.log("deleted", userId);
    ApiDelete("/user_batch/delete/" + userId)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          setToggler(!toggler);
          toast.success(res.message);
          setTimeout(function() {
            contectus();
            // window.location.reload();
          }, 1000);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };

  var connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  var type = connection.effectiveType;

  function updateConnectionStatus() {
    console.log(
      "Connection type changed from " + type + " to " + connection.effectiveType
    );
    type = connection.effectiveType;
  }

  let preloadVideo = true;
  var connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (connection) {
    if (connection.effectiveType === "slow-2g") {
      preloadVideo = false;
    }
  }
  console.log("preloadVideo", preloadVideo);
  connection.addEventListener("change", updateConnectionStatus);

  const handleonChange = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    setLoading(true);
    let body = {
      // time_slotId: slot.slotId,
      // facultyId: accountData.facultyId,
      // date: slot.date,
      // meeting_link: accountData.meeting_link,
      // subjectId: slot.courseId,
      // isFaculty: verify,
      // isStudent: block,
      id: slot._id,
      // time_slotId: slot.time_slotId,
      facultyId: accountData.facultyId,
      // shortMeetingURL: shortLink,
      // fullMeetingURL: slot?.meetingURL,
      // date: slot.date,
      // meeting_link: accountData.meeting_link,
      // subjectId: slot.subjectId,
      isFaculty: verify,
      isStudent: block,
    };
    console.log(body);
    ApiPost("/assign_faculty/add", body)
      .then((res) => {
        toast.success(res.data.message);
        // setMeeting(res.data?.data)
        history.push("/slotList");
        contectus();
        setModal(!modal);
        // setLinkModal(!linkModal)

        setLoading(false);
      })
      .catch((err) => {
        // disableLoading();
        // setbutton(false);
        setModal(!modal);
        // setLinkModal(!linkModal)
        setLoading(false);
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  };

  return (
    <>
      <Container style={position}>
        <Row></Row>
        <Row>
          <Col md={12}>
            <ToastContainer />
            <Breadcrumb>
              <BreadcrumbItem active>
                List of all Assigned Faculty
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>

          <Col md={12}>
            <Card>
              <CardBody>
                <Row className="justify-content-end">
                  <button
                    className="btn btn-light-primary"
                    onClick={() => history.push("batchManagment")}
                  >
                    Batch Create
                  </button>
                </Row>

                <div style={spacing}>
                  <ReactTable
                    data={category}
                    columns={columns2}
                    sortable={true}
                    loading={loading}
                    filterable={true}
                    defaultFilterMethod={filterMethod}
                    showPagination={true}
                    defaultPageSize={10}
                    resizable={true}
                    className="-striped -highlight"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={modal}
        centered
        // onHide={() => setModal(!modal)}
        size="xl"
        // aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          className="d-flex justify-content-end
        "
        >
          <Modal.Title id="contained-modal-title-vcenter " className="">
            <button
              className="btn btn-light-danger"
              onClick={() => setModal(!modal)}
            >
              X
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AsignSlotEdit
            slot={slot}
            contectus={contectus}
            setModal={setModal}
            modal={modal}
            linkModal={linkModal}
            setLinkModal={setLinkModal}
            onSubmit={onSubmit}
            handleonChange={handleonChange}
            loading={loading}
            setBlock={setBlock}
            setVerify={setVerify}
            block={block}
            verify={verify}
            setShortLink={setShortLink}
          />
        </Modal.Body>
        <Modal.Footer>
          <div></div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={linkModal}
        centered
        // onHide={() => setModal(!modal)}
        size="md"
        // aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          className="d-flex justify-content-between
        "
        >
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <h2>Share Link</h2>
            <button
              className="btn btn-light-danger"
              onClick={() => setLinkModal(!linkModal)}
            >
              X
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3 d-flex justify-content-between">
            <div className="">{meeting.meetingURL}</div>
            <CopyToClipboard
              text={meeting.meetingURL}
              onCopy={() => console.log()}
            >
              <button className="btn btn-light-primary">Copy</button>
            </CopyToClipboard>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={toggler}
        centered
        // onHide={() => setModal(!modal)}
        size="md"
        // aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          className="d-flex
        "
        >
          <Modal.Title id="contained-modal-title-vcenter " className="">
            Are you want delete this batch...?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-end">
          <button className="btn btn-light-danger mr-2" onClick={deleted}>
            Ok
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setToggler(!toggler)}
          >
            Cancel
          </button>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
