import React, { useEffect, useState } from "react";
import {
  ApiPost,
  ApiGet,
} from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import Card from "reactstrap/es/Card";
import Button from "reactstrap/es/Button";
import CardBody from "reactstrap/es/CardBody";
import { useHistory, Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { HiDownload } from "react-icons/hi";
import BootstrapTable from "react-bootstrap-table-next";
import ReactPaginate from "react-paginate";
import { FcPrevious, FcNext } from "react-icons/fc";
import ReactExport from "react-export-excel";
import overlayFactory from 'react-bootstrap-table2-overlay';
import { Modal } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
import Spinner from "../../components/Spinner";

const spacing = {
  margin: "1%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};

export default function Feedback(props) {

  const [feedBack, setFeedback] = useState([]);
  const [loading, setloading] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewData, setViewData] = useState({});
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [pageLimit, setPageLimit] = useState(0);
  const [questionData, setQuetionData] = useState([]);
  const [rattingData, setRattingData] = useState([]);
  const [val, setVal] = useState([])
  const [review, setReview] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [boolenUnblock, SetboolenUnblock] = useState(false);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


  const columns = [

    {
      dataField: "user",
      text: "Users",
      sort: true,
      formatter: (cell, row) => {
        return (<div className="d-flex " >
          <div>{row.user[0]?.name}</div>
        </div >)

      }

    },
    {
      dataField: "user",
      text: "Email",
      sort: true,
      formatter: (cell, row) => {
        return (<div className="d-flex " >
          <div>{row.user[0]?.email}</div>
        </div >)

      }
    },
    // {
    //   dataField: "count",
    //   text: "Teacher count",
    //   sort: true,

    // },

    {
      dataField: "action",
      text: "action",
      sort: true,
      formatter: (cell, row) => {
        return (<div className="d-flex r" >
          <center>
            <div>
              <button
                className="border-0 btn btn-primary px-3 py-2 text-white bg-primary rounded"
                onClick={() => viewDetails(row)}
              >
                View
              </button>
            </div>

          </center>
        </div >)

      }
    },

  ];

  const viewDetails = (data) => {
    console.log(
      "🚀 ~ file: attendiesList.js ~ line 288 ~ viewDetails ~ data",
      data
    );
    setOpenViewModal(!openViewModal);


    ApiGet(`/feedback_answer/${data._id}`)
      .then((res) => {
        console.log(res.data.data);
        setViewData(res.data?.data[0]?.subject[0]);
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

  const pageChange = (e) => {
    getFeedBack(limit, e.selected + 1);
  };


  const exportSheet = async () => {
    setIsLoading(true)
    let body = {
      limit: pageLimit * limit,
      page
    }
    await ApiPost("/feedback_answer/pagination", body)
      .then((res) => {
        let newFeed = res.data.data?.feedback_data.map(v => {
          return { ...v, question: v.question?.map(que => { return { ...que, name: v.user[0]?.name, email: v.user[0]?.email } }) }
        })
        // console.log('newFeed', newFeed)
        const arrayIncludesInObj = (arr, key, valueToCheck) => {
          return arr.some((value) => {
            return value?.questionId === valueToCheck

          });
        };
        let check = res.data.data?.feedback_data.map(val => {
          return {
            ...val,
            question: review?.map(que => {
              if (arrayIncludesInObj(val.question, "questionId", que?._id)) {
                let filterData = val.question.filter((v, i) => {
                  return v.questionId === que?._id && { ...v, index: i };
                });
                return { filterData }
              }
            }
              // review.map(val => val?._id === que?.questionId && que)
            )
          }
        }
        )
        setFeedback(check)
        setPage(res.data.data.state.page)
        // setLimit(res.data.data.state.limit)
        setPageLimit(res.data.data.state.page_limit)
        SetboolenUnblock(!boolenUnblock)
        setIsLoading(false)


        console.log('check :>> ', check);

      })
      .catch((err) => {
        setIsLoading(false)
        if (err.status == 410) {
          // reftoken();
        } else {
          toast.error(err.message);
        }
      });


  }
  console.log('val', val)
  const getFeedBackQues = async (feeds) => {
    ApiGet("/feedback_question")
      .then((res) => {
        let newArr = res.data.data.map((val, i) => {
          return { ...val, index: i }
        })
        setReview(newArr)
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  }
  const getFeedBack = async (limit, page) => {
    let body = {
      limit,
      page
    }
    await ApiPost("/feedback_answer/pagination", body)
      .then(async (res) => {
        console.log('res.data.data :>> ', res.data.data);
        setFeedback(res.data.data?.feedback_data)
        setPage(res.data.data.state.page)
        // setLimit(res.data.data.state.limit)
        setPageLimit(res.data.data.state.page_limit)
        await getFeedBackQues(res.data.data?.feedback_data)


      })
      .catch((err) => {
        if (err.status == 410) {
        } else {
          toast.error(err.message);
        }
      });
  }


  useEffect(() => {
    getFeedBack(limit, page)

  }, []);


  return (
    <Container style={position}>
      <Row></Row>
      <Row>
        <Col md={12}>
          <ToastContainer />
          <Breadcrumb className="breNav">
            <div className="row px-5 justify-content-between w-100 align-items-center">
              <BreadcrumbItem active>List of Feedback</BreadcrumbItem>
              {!loading && <button className="btn btn-primary d-flex align-items-center" disabled={isLoading} onClick={exportSheet}>Export ExcelSheet</button>}
            </div>


          </Breadcrumb>
        </Col>

        <Col md={12}>
          <Card>
            <CardBody>

              <div style={spacing}>

                <BootstrapTable
                  keyField="_id"
                  data={feedBack}
                  columns={columns}
                  classes="modifyTable"
                  rowClasses="rowClass"
                  wrapperClasses="table-responsive"
                  headerClasses="header_style"
                  // filter={filterFactory()}
                  noDataIndication={feedBack.length === 0 ? <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}> No Data</div> : <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}> <Spinner /></div>}
                  overlay={overlayFactory({ spinner: true, styles: { overlay: (base) => ({ ...base, background: 'rgba(0, 0, 0, 0.5)' }) } })}
                  loading={loading}

                />

                <div className="d-flex justify-content-end my-3 ">
                  <ReactPaginate
                    previousLabel={<FcPrevious className="primary_light" />}
                    nextLabel={<FcNext className="primary_light" />}
                    pageClassName="page-item rounded mx-1"
                    pageLinkClassName="page-link rounded"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item "
                    breakLinkClassName="page-link rounded"
                    pageCount={pageLimit}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={pageChange}
                    containerClassName="pagination"
                    activeClassName="active rounded"
                  />


                </div>
              </div>


            </CardBody>
          </Card>
        </Col>
      </Row>
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
            Feedback Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center ">
            <div className="w-100 p-3">

              <Row>
                <Col>

                  <div
                    className="py-3 color_light_gray my-3 px-2"
                    style={{ fontSize: "16px" }}
                  >
                    Subject : {viewData.title}
                  </div>
                  <div className="py-3 row">
                    <div className="col-md-12">
                      {questionData?.map((ratting) => {

                        return (
                          <div className="d-flex align-items-center bg-light px-2 my-2 rounded">
                            <div className="mx-2">
                              <GoPrimitiveDot color="#00bde2" />
                            </div>
                            <div className="d-flex align-items-center justify-content-between w-100">
                              <span
                                class="color_light_gray my-2"
                                style={{ fontSize: "14px" }}
                              >
                                {ratting?.question} :
                              </span>
                              {rattingData?.map((question) => {
                                return (
                                  question?.questionId === ratting._id &&
                                  <div
                                    class=" my-3 bg-primary text-white px-2 py-1 rounded"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {
                                      question?.ans
                                    }
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {/* <div className="col-md-2">

                    </div> */}
                  </div>
                </Col>
              </Row>
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
            element={<Button
              color="primary"
              className="square"
              outline
            >
              Export ExcelSheet
            </Button>}
            filename='Feedback Details'
          >


            <ExcelSheet data={feedBack} name="Employees">

              <ExcelColumn
                label="Name"
                value={(col) => col.user[0]?.name}
              />
              <ExcelColumn
                label="Email"
                value={(col) => col.user[0]?.email}
              />
              {/* <ExcelColumn
                label="Ans"
                value={(col) => col?.ans}
              /> */}

              <ExcelColumn
                // label={(col) => col.question[1]?.question}
                label="Which Of The Following Age Categories Apply To You?"
                value={(col) => col.question && col.question[0] === undefined ? 'No Given Answer' : col.question[0]?.filterData[0]?.ans}
              />
              <ExcelColumn
                // label={(col) => col.question[1]?.question}
                label="What Is The Name Of Your District?"
                value={(col) => col.question && col.question[1] === undefined ? 'No Given Answer' : col.question[1]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label=' What Is The Name Of Your School?'
                value={(col) => col.question && col.question[2] === undefined ? 'No Given Answer' : col.question[2]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='How Did You Get To Know About The Training?'
                value={(col) => col.question && col.question[3] === undefined ? 'No Given Answer' : col.question[3]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='How Would You Rate Your ICT Skills Before The Training?'
                value={(col) => col.question && col.question[4] === undefined ? 'No Given Answer' : col.question[4]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='What Type Of Device Did You Use For The ICT Training?'
                value={(col) => col.question && col.question[5] === undefined ? 'No Given Answer' : col.question[5]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='The ICT Training Content Was Very Useful'
                value={(col) => col.question && col.question[6] === undefined ? 'No Given Answer' : col.question[6]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='I Acquired New Skills From The Training'
                value={(col) => col.question && col.question[7] === undefined ? 'No Given Answer' : col.question[7]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='The Training Content Was Too Basic'
                value={(col) => col.question && col.question[8] === undefined ? 'No Given Answer' : col.question[8]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='Facilitation For The Training Was Excellent'
                value={(col) => col.question && col.question[9] === undefined ? 'No Given Answer' : col.question[9]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='Facilitators Took Time To Explain Key Topics'
                value={(col) => col.question && col.question[10] === undefined ? 'No Given Answer' : col.question[10]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='Training Resources Were Readily Accessible On KATon'
                value={(col) => col.question && col.question[11] === undefined ? 'No Given Answer' : col.question[11]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='The KATon Platform Is User Friendly'
                value={(col) => col.question && col.question[12] === undefined ? 'No Given Answer' : col.question[12]?.filterData[0]?.ans}
              />

              <ExcelColumn
                label='Materials On The KATon Platform Are Useful For Teaching Needs In School'
                value={(col) => col.question && col.question[13] === undefined ? 'No Given Answer' : col.question[13]?.filterData[0]?.ans}
              />
              <ExcelColumn
                label='How Would You Rate Your ICT Skills After The Training?'
                value={(col) => col.question && col.question[14] === undefined ? 'No Given Answer' : col.question[14]?.filterData[0]?.ans}
              />
              <ExcelColumn
                label='Do You Have Any Additional Feedback For The Training Team?'
                value={(col) => col.question && col.question[15] === undefined ? 'No Given Answer' : col.question[15]?.filterData[0]?.ans}
              />




            </ExcelSheet>


          </ExcelFile>


          <button
            onClick={() => SetboolenUnblock(!boolenUnblock)}
            className='btn btn-light-danger'
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
