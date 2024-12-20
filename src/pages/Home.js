import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        `https://mxpertztestapi.onrender.com/api/sciencefiction`
      );
      if (res.data && res.data.length > 0) {
        setAllData(res.data);
      } else {
        console.log("Invalid Data....!");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Published") {
      return "color-custom-green";
    } else if (status === "In Progress") {
      return "text-warning";
    } else if (status === "Draft") {
      return "text-primary";
    } else if (status === "Completed") {
      return "text-success";
    } else {
      return "text-danger";
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(allData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Container className="bg-transparent mb-5">
        <div className="d-flex align-items-center justify-content-between  py-2">
          <h5 className="text-white d-flex align-items-center justify-content-center gap-2">
            <img
              style={{ width: "20px", height: "20px" }}
              src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAmCAYAAAA1MOAmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARBSURBVHgBtVbNi1xFEK/q2Y/sRs0E1BgQfOtpN6dVFAKCzhI8CILrXXBy8yAkf4AwqzdPq6B4yGF2QEguGvQiKuvm5E2TW3LKbE5DshNIQiAfM68r1dXV3e/NTnYfy2zBzPvq7l/9qn5V3QiHbIt/9DKcnW4j2Y6BQ7RTWzut2uzMVb79wD1PwSHY4t87DTTYBguZBQJA9zdhsOxytz7/0ovrfNu04AEQ3Q3CRMGWtu6eQ4IWAdXd0igAxMZ4/mEyYEubd9fB0nly4eLFPSX9iMiA1hGEyQiE8uP+KiwEgEl5OCJBtmRoImCEhkQEwqL4Qf4F1KDFyUrfs0msHE30UZ0YM/Q5QV0YR8DFKjH76Kvbq/uNIdDUyOIU2fir3hpDz1Xj6vleltdq7QFCo+TtOHM5C7AqDhEKZzPkMM/HSH91tVufqb9wbviE1vJ5qGYcRjBGWkWsYFC24gxwviyWwD77uNegWWYDNvNzkCrCuZGlwZb5xTxq7gTsi9O9bHgU20PExiC4gzId9wlgIjfyhIChziRxUtRfLt9uoan9zx8bVJpEFWEgOZceCg1EgovW5YzDueYqUUMtLmlE0IWCKlDzM1n+LO5Q1QG5WOQGJFZSiXEezxHXeJtwDu+PZgyUBOsmFaqtAEYSXlS+oK1618g9zYaJOslGyYdVTU2ZkedFEj70CqLA9UAWUoIxC65dTbkoagARgcrjRY1V5G/GIxJFXMNrySgsSCcAxxzw5cy3/c9hT7N61Q7iGUneSBf0jRhDXnzgEjD4PLo6Qdp4/4d+9/RPvWwshdCuQgHLD3A0D8aOpMbLXuFd5jSMfJfBkemb717st5cvl0GtHTNZ3VdIeWdEiAZT9WHMXig9X6EoXdVlsUm1mX9O/XWnOYZiUfLRAffFWN1igvIIYESDgZU+YPCWFnh6e2mz35VDKO9VI4sro9i0wHKjNuzKhi4avaLYSWKxlKqGgsoQ3sCZ6a6h2ica96ReglILk83zx/9OnLX54G0O0K3YuENrS4WeWEuoMLFAt0/Tsfgm7GVBXCEwuRbIhX9fv9b+87UFwvwbX9DhgEkBTRcAVWch0OCVl6iDlhdh4ZUPIxTs519PrlGev8nDf4sloeKI8fBH3NRoIdVVcS0fxnT4GXsGuXTp5PYvF058ym40efB2ymAsAShWERbrSsMRnSu82/N09fv6qx1r8xVeukOqn9AdYiYLvQ8gNQEY3ZZItHd//+2DrbG+0xjM8U4+R9nTeSQ+m+DwiFRdOg5gakA+guAbArHwLJ298eErVyqBBXuns7Nm56E1OIo0nPVkit9TLxRB37PWfv946uF32ysL93YNrmLLF/mId2y6zWCNXR+VHf+uwFytef2947fKnw9oi5v9JueoxVQy/8bp3WxTbiVk4+Yc+Ph948zLG4RPV3hX7jgksvD1I3zw1vOAJmbZVrdeZdwzyR0fnM7lZCkAAAAASUVORK5CYII=`}
              alt="logo"
            />
            BrainyLingo
          </h5>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <Link className="text-white text-decoration-none" to="/">
              Home
            </Link>
            <Link className="text-white text-decoration-none" to="/">
              Leaderboard
            </Link>
            <Link className="text-white text-decoration-none" to="/">
              Daily Quiz
            </Link>
            <Link className="text-white text-decoration-none d-flex align-items-center justify-content-between gap-2">
              Genre <IoIosArrowDown color="#fff" />
            </Link>
          </div>
          <button className="px-3 py-2 rounded-5 border-0 text-white primary-bg">
            Sign Out
          </button>
        </div>
        <div className="home-section-1 d-flex align-items-center justify-content-center gap-3 flex-column">
          <h4 className="text-center text-white fw-bolder">
            Science Fiction Stories
          </h4>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <button className="px-5 py-2 rounded-5 border-0 bg-primary text-white">
              New
            </button>
            <button className="px-5 py-2 rounded-5 border-0 bg-warning text-white">
              In Progress
            </button>
            <button className="px-5 py-2 rounded-5 border-0 btn-custom-green text-white">
              Completed
            </button>
            <button className="px-5 py-2 rounded-5 border-0 primary-bg text-white">
              Clear All
            </button>
          </div>
        </div>
        <Row className="mt-3">
          {!isLoading &&
            currentItems &&
            currentItems.length > 0 &&
            currentItems.map((item, index) => (
              <Col
                onClick={() => navigate(`/item/${item._id}`)}
                key={index}
                className="mt-3"
                md={3}
              >
                <div className="px-3 primary-bg py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 flex-column">
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      maxHeight: "200px",
                    }}
                    className="rounded-3"
                    src={`https://ik.imagekit.io/dev24/${
                      item.Image[0] ||
                      item.Image[1] ||
                      "Unruffled_8d7KCZQ8L_kEd5rBnpv.webp"
                    }`}
                    alt="card-profile"
                  />
                  <p className="m-0 p-0 mt-2 text-white">
                    {item.Title || "N/A"}
                  </p>
                  <button
                    className={`w-100 py-1 rounded-5 border-0 m-0 ${getStatusColor(
                      item.Status
                    )} `}
                  >
                    {item.Status || "N/A"}
                  </button>
                </div>
              </Col>
            ))}
          <Col
            md={12}
            className="d-flex align-items-center justify-content-center"
          >
            {isLoading && <Spinner size="lg" variant="primary" />}
          </Col>
          <Col
            md={12}
            className="d-flex align-items-center justify-content-center"
          >
            {!isLoading && currentItems.length === 0 && (
              <h5 className="text-white">No Data Found.</h5>
            )}
          </Col>
        </Row>
        {!isLoading && allData && allData.length > 0 && (
          <Col
            md={12}
            className="d-flex align-items-center justify-content-between px-3 mt-4"
          >
            <p
              className="text-primary cursor-pointer"
              onClick={handlePrevPage}
              style={{ cursor: "pointer" }}
            >
              <IoIosArrowBack size={22} color="#fff" /> &nbsp; Previous
            </p>
            <p
              className="text-primary cursor-pointer"
              onClick={handleNextPage}
              style={{ cursor: "pointer" }}
            >
              Next &nbsp; <IoIosArrowForward size={22} color="#fff" />
            </p>
          </Col>
        )}
      </Container>
    </>
  );
}

export default Home;
