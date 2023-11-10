import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiGetNoAuth,
} from "../../../helpers/API/ApiData";
import queryString from "query-string";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Col,
  Container,
  CardBody,
  Card,
  Row,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const position = {
  maxWidth: "1322px",
  marginTop: "0px",
  marginBottom: "2%",
};

let extra;
export default function CreateSubCategory() {
  const history = useHistory();
  const [accountData, setaccountData] = useState({});
  const [errors, setError] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [update, getUpdate] = useState(true);
  const [category, setCategory] = useState([]);
  const [Software, setSoftware] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);

  const handleonChange = (e) => {
    let { name, value } = e.target;
    if (name === "canShareWithDifferent") {
      accountData[name] = e.target.checked;
      setaccountData({ ...accountData });
    } else if (name === "canShareWithSame") {
      accountData[name] = e.target.checked;
      setaccountData({ ...accountData });
    } else if (name === "requestSignature") {
      accountData[name] = e.target.checked;
      setaccountData({ ...accountData });
    } else {
      setaccountData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const fetchData = async (id) => {
    ApiGet("/main_category/" + id)
      .then((res) => {
        setaccountData(res.data.data);
      })
      .catch((err) => {
        if (err.status === 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });

    getUpdate(false);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!accountData.name) {
      formIsValid = false;
      errors["name"] = "*Please enter main category name";
    }

    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    if (validateForm()) {
      try {
        const Id3 = JSON.parse(localStorage.getItem("token"));

        const body = {
          // image: setimage,
          name: accountData.name,
        };

        ApiPost("/main_category/add", body)
          .then((res) => {
            history.push("/mainCategoryList");
            toast.success(res.data.message);
          })
          .catch((err) => {
            if (err.status === 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } catch (err) {}
    }
  };

  const onUpdate = async (e) => {
    const idValue = queryString.parse(window.location.search);

    // if (validateForm()) {
    //   try {
    //     if (setimage.length != 0) {
    //       accountData.image = setimage;
    //     }

    const body = {
      // image: accountData.image,
      // name: accountData.name,
      // username: accountData.username,
      // bio: accountData.bio,
      // websiteURL: accountData.websiteURL,
      // twitterURL: accountData.twitterURL,
      // instagramURL: accountData.instagramURL,
      // dribbbleURL: accountData.dribbbleURL,
      // behanceURL: accountData.behanceURL,
      // githubURL: accountData.githubURL,
      // mail_notification: {},
      id: idValue.id,
      // image: accountData.image,
      name: accountData.name,
    };
    console.log(body);

    ApiPut("/main_category/update", body)
      .then((res) => {
        // toast.success(res.data.message);
        toast.success("Main Category Successfully Updated");
        setTimeout(() => {
          history.push("/mainCategorylist");
        }, 2000);
      })
      .catch((err) => {
        if (err.status === 410) {
          history.push("/postlist");
          toast.success("Congrats");
        } else {
          toast.error(err.message);
        }
      });
    //   } catch (err) {}
    // }
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userinfo"))[0]);
    const idValue = queryString.parse(window.location.search);

    extra = [];

    if (
      idValue.id ||
      !idValue.id === undefined ||
      !idValue.id === "undefined"
    ) {
      fetchData(idValue.id);
    }
    ApiGetNoAuth("category")
      .then((res) => {
        setCategory(res.data.data.menu_categories);
        setSoftware(res.data.data.software_categories);
      })
      .catch((err) => {
        if (err.status === 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
    ApiGet("sub_category")
      .then((res) => {
        setSubCategory(res.data.data.menu_categories);
      })
      .catch((err) => {
        if (err.status === 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  return (
    <Container style={position}>
      <ToastContainer position="top-right" />
      <Row>
        <Col md={12}>
          <Col md={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to={"/mainCategorylist"}>Main category</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add main category</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit main category</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add main category</b>
                  ) : (
                    <b>Edit main category</b>
                  )}
                </h2>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Main category name
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.name}
                        name="name"
                        placeholder="Enter Main Category Name"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["name"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Image<span style={{ color: "red" }}> * </span>
                      </Label>
                      <DropzoneComponent
                        init={() => {}}
                        config={componentConfig2}
                        eventHandlers={eventHandlers2}
                        djsConfig={djsConfig2}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col>
                    {update === false ? (
                      <div style={{ paddingTop: "16px" }}>
                        <img
                          src={Bucket + accountData.image}
                          style={{
                            backgroundColor: "lightgray",
                            borderRadius: "10px",
                            width: "auto",
                            height: "165px",
                          }}
                          alt=""
                        />
                      </div>
                    ) : null}
                  </Col>
                </Row> */}
                <Row>
                  {update === true ? (
                    <>
                      <Col className="d-flex justify-content-center">
                        <Button
                          onClick={onSubmit}
                          className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
                          style={{
                            marginTop: "19px",
                            width: "166px",
                            backgroundColor: "#3699ff",
                            color: "white",
                          }}
                        >
                          Add{" "}
                        </Button>
                        <Button
                          onClick={() => history.push("/mainCategoryList")}
                          className={`ml-3 btn btn-primary font-weight-bold px-8 py-2 my-3`}
                          style={{
                            marginTop: "19px",
                            width: "166px",
                            backgroundColor: "#e4e6ef",
                            color: "#3f4254",
                          }}
                        >
                          Cancel{" "}
                        </Button>
                      </Col>
                      {/* <Col md='1'>  <button
                         id="kt_login_signin_submit"
                         type="submit"
                         className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
                         // onClick={() => history.push("/genreEdit")}
                          onClick={onSubmit}
  
                       >
                         <span>&nbsp;Add&nbsp;</span>
                         {loading && (
                           <span className="ml-3 spinner spinner-white"></span>
                         )}
                       </button></Col>
  
                        <Col md='1'>  <button
                         id="kt_login_signin_submit"
                         type="submit"
                         className={`btn btn-secondary font-weight-bold px-8 py-2 my-3`}
                         onClick={() => history.push("/mainCategoryList")}
                          // onClick={onSubmit}
  
                       >
                         <span>&nbsp;Cancel&nbsp;</span>
                         {loading && (
                           <span className="ml-3 spinner spinner-white"></span>
                         )}
                       </button></Col> */}
                    </>
                  ) : (
                    <Col className="d-flex justify-content-center">
                      <Button
                        onClick={onUpdate}
                        style={{ marginTop: "19px", width: "166px" }}
                      >
                        Update{" "}
                      </Button>
                    </Col>
                  )}
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
