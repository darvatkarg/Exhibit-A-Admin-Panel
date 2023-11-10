import moment from "moment";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import ReactExport from "react-export-excel";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "reactstrap/es/Button";
import DialogActions from "@material-ui/core/DialogActions";

const Invoice = React.forwardRef((props, ref) => {
  const componentRef = useRef();
  const [userData, setUserData] = useState(props.userData);
  const [boolenUnblock, SetboolenUnblock] = useState(false);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  console.log("userData", userData);
  const location = useLocation();
  console.log("location.state", location.state);
  return (
    <div ref={ref}>
      <div id="capture">
        <Row>
          <Col md={12}>
            <Card style={{ border: "none" }}>
              <CardBody>
                <div className="text-primary" style={{ fontSize: "16px" }}>
                  Course Details
                </div>
                <Row>
                  <Col>
                    <Table
                      style={{
                        border: "1px solid",
                      }}
                      className="mt-3"
                    >
                      <thead>
                        <tr>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Course{" "}
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Date
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Start Time
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            End Time
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Total Student
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="t_border">
                            {userData && userData[0]?.course}
                          </td>
                          <td className="t_border">
                            {userData &&
                              moment(userData[0]?.date).format("DD-MM-YYYY")}
                          </td>
                          <td className="t_border">
                            {userData && userData[0]?.start_time}
                          </td>
                          <td className="t_border">
                            {userData && userData[0]?.end_time}
                          </td>
                          <td className="t_border">
                            {userData && userData[0]?.userCount}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
              <p className="p-2-25 mb-0">
                Meeting URL :-{" "}
                <span
                  className="text-primary"
                  onClick={() => window.open(userData[0]?.shortMeetingURL)}
                >
                  {userData[0]?.shortMeetingURL}
                </span>
              </p>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card style={{ border: "none" }}>
              <CardBody>
                <div className="d-flex justify-content-between">
                <div className="text-primary" style={{ fontSize: "16px" }}>
                  Student Information
                </div>
                <div className="btn btn-primary" onClick={()=> SetboolenUnblock(!boolenUnblock)}>Export ExcelSheet</div>
                </div>
                
                <Row>
                  <Col>
                    <Table
                      style={{
                        border: "1px solid",
                      }}
                      className="mt-3"
                    >
                      <thead>
                        <tr>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Name{" "}
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Email
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Phone
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData &&
                          userData[0]?.userData?.map((item) => (
                            <>
                              <tr>
                                <td>{item?.name}</td>
                                <td>{item?.email}</td>
                                <td>{item?.phoneNumber}</td>
                              </tr>
                            </>
                          ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
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
                      <ExcelSheet data={userData?.[0]?.userData} name="Employees">
                        <ExcelColumn
                          label="Name"
                          value={(col) => col?.name}
                        />
                        <ExcelColumn
                          label="Email"
                          value={(col) => col?.email}
                        />
                        <ExcelColumn
                          label="Phone Number"
                          value={(col) => col?.phoneNumber}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default Invoice;
