import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import {
  ApiPost,
  ApiDelete,
  ApiPostNoAuth,
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
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Modal,
  Label,
  Input,
} from "reactstrap";
import Card from "reactstrap/es/Card";
import Button from "reactstrap/es/Button";
import CardBody from "reactstrap/es/CardBody";
import { useHistory, Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import * as authUtil from "../../../utils/auth.util";
import { HiDownload } from "react-icons/hi";
import BootstrapTable from "react-bootstrap-table-next";
import ReactPaginate from "react-paginate";
import { FcPrevious, FcNext } from "react-icons/fc";
import ReactExport from "react-export-excel";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { ThreeCircles } from "react-loader-spinner";
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory from "react-bootstrap-table2-paginator";
const spacing = {
  margin: "1%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};

export default function District_wise(props) {
  const [category, setCategory] = useState([]);

  const [exportData, setExportData] = useState([]);
  const [loading, setloading] = useState(false);
  const [modal, setModal] = useState(false);
  const [city, setCity] = useState('');
  const [values, setValue] = useState("");
  const [values2, setValue2] = useState("");
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(100);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


  const options = {
    // pageStartIndex: 0,
    sizePerPage: 100,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
  };

  const columns = [

    {
      dataField: "region",
      text: "Show list of region",
      sort: true,
      // filter: textFilter()

    },
    {
      dataField: "_id",
      text: "Show list of city",
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: "count",
      text: "Teacher count",
      sort: true,

    },

    {
      dataField: "action",
      text: "action",
      sort: true,
      formatter: (cell, row) => {
        return (<div className="d-flex justify-content-center" >
          <center>
            <button
              disabled={loading}
              className="btn btn-light-primary mr-2"
              onClick={(e) => EditItem(row)}
            >
              {loading ? "...." : <HiDownload fontSize={20} />}

            </button>

          </center>
        </div >)

      }
    },

  ];

  const pageChange = (e) => {
    console.log(e);
    setCurrentPage(e.selected + 1);
  };

  const postData = (city) => {
    setCity(city)

    ApiPost(`/report/export_user_data`, { city })
      .then(async (res) => {
        setModal(!modal)
        setExportData(res.data.data);
        setloading(false)

      })
      .catch((err) => {
        setloading(false)
        if (err.status == 410) {
        } else {
          toast.error(err.message);
        }
      });
  }

  const EditItem = (value) => {
    setloading(true)
    postData(value._id)
  }



  useEffect(() => {
    ApiGet("/report/cityWise")
      .then((res) => {


        setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/mcqList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = category?.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <Container style={position}>
      <Row></Row>
      <Row>
        <Col md={12}>
          <ToastContainer />
          <Breadcrumb className="breNav">
            <div className="d-flex">
              <BreadcrumbItem>
                <Link >Report</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>List of District</BreadcrumbItem>
            </div>

          </Breadcrumb>
        </Col>

        <Col md={12}>
          <Card>
            <CardBody>
              <Row className="float-right">
                {/* <FormGroup className="d-flex flex-column mx-1">
                  <Label>
                    Search Region
                    <span style={{ color: "red" }}> * </span>
                  </Label>
                  <Input onChange={(e) => setValue(e.target.value)} />
                </FormGroup> */}
                <FormGroup className="d-flex flex-column mx-1">
                  <Label>
                    Search City
                  </Label>
                  <Input type="text" onChange={(e) => setValue2(e.target.value)} />
                </FormGroup>
              </Row>
              <div style={spacing}>

                <BootstrapTable
                  keyField="_id"
                  data={category.filter(val => {
                    console.log('val', val)
                    if (values2 == '') {
                      return val
                    } else if (val?._id?.toLowerCase().includes(values2?.toLowerCase())) {
                      return val
                    }
                  })}
                  columns={columns}
                  pagination={paginationFactory(options)}
                  classes="modifyTable"
                  rowClasses="rowClass"
                  wrapperClasses="table-responsive"
                  headerClasses="header_style"
                  // filter={filterFactory()}
                  overlay={overlayFactory({ spinner: true, styles: { overlay: (base) => ({ ...base, background: 'rgba(0, 0, 0, 0.1)', marginTop: '75px' }) } })}
                  loading={loading}

                />

                {/* <div className="d-flex justify-content-end my-3 ">
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
                    pageCount={Math.ceil(category.length / postPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={pageChange}
                    containerClassName="pagination"
                    activeClassName="active rounded"
                  />


                </div> */}
              </div>


            </CardBody>
          </Card>
        </Col>
      </Row>
      <Dialog
        open={modal}
        onClick={() => setModal(!modal)}
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
              disabled={loading}

              outline
            >
              Export ExcelSheet
            </Button>}
            filename={`District_wise_report_${city}`}
          >


            <ExcelSheet data={exportData} name="Employees">
              <ExcelColumn
                label="Region name"
                value={(col) => col?.region}
              />
              <ExcelColumn
                label="City name"
                value={(col) => col?.city}
              />
              <ExcelColumn
                label="Teacher Name"
                value={(col) => col?.name}
              />
              <ExcelColumn
                label="Teacher Email"
                value={(col) => col?.email}
              />
              <ExcelColumn
                label="Teacher ID"
                value={(col) => col?.teacherID}
              />
              <ExcelColumn
                label="School Name"
                value={(col) => col?.schoolName}
              />
              <ExcelColumn
                label="Phone Number"
                value={(col) => col?.phoneNumber}
              />

              <ExcelColumn
                label="Course Status"
                value={(col) =>
                  col.isExamGiven === true && col.isDocument === true ? "Exam Done" : col.isExamGiven === false && col.isDocument === true ? "Attestation done" : col.isDocument === false && "Attendees"

                }
              />


            </ExcelSheet>


          </ExcelFile>


          <button
            onClick={() => setModal(!modal)}
            className='btn btn-light-danger'
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
