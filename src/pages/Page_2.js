import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { Link, useParams } from "react-router-dom";

function Page_2() {
  const { id } = useParams();
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentWordexplore, setCurrentWordexplore] = useState(0);

  const fetchItem = async (id) => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        `https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`
      );
      console.log(res.data);
      if (res.data) {
        setApiData(res.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchItem(id);
    }
  }, [id]);

  const handleNextClick = () => {
    if (apiData && apiData.Wordexplore && apiData.Wordexplore.length > 0) {
      let allLength = apiData.Wordexplore.length - 1;
      if (currentWordexplore < allLength) {
        setCurrentWordexplore(currentWordexplore + 1);
      }
      console.log(allLength, currentWordexplore);
    }
  };

  const handlePriveClick = () => {
    if (apiData && apiData.Wordexplore && apiData.Wordexplore.length > 0) {
      let allLength = apiData.Wordexplore.length - 1;
      if (currentWordexplore >= allLength) {
        setCurrentWordexplore(currentWordexplore - 1);
      }
      console.log(allLength, currentWordexplore);
    }
  };

  const [currentTab, setCurrentTab] = useState(0);

  const [userClik, setUserClick] = useState([]);
  const [correctAns, setCurrectAns] = useState([]);
  const [falseAns, setFalseAns] = useState([]);

  const handleUserSelectAns = (questionId, ans) => {
    let userQuestion = apiData?.Brainquest[questionId];
    console.log(questionId,ans)
    setUserClick([...userClik, questionId]);
    if (userQuestion.Answer === ans) {
      setCurrectAns([...correctAns, ans]);
    } else {
      setFalseAns([...falseAns, ans]);
    }
  };

  return (
    <>
      <Container fluid className="bg-transparent m-0 p-0 mb-5">
        <div className="d-flex align-items-center justify-content-between px-5  py-2">
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
        <div className="home-section-2 d-flex align-items-center justify-content-center gap-2 flex-column">
          <h4 className="colorBlue fw-bolder">
            The Lost City of <span className="text-white">Future Earth</span>
          </h4>
        </div>
        <div className="blur-section py-3 m-0 p-0 d-flex align-items-center justify-content-center gap-2 flex-column">
          <div className="d-flex align-items-center justify-content-between gap-3">
            <button
              onClick={() => setCurrentTab(0)}
              className={`px-5 py-2 rounded-5 border-0 ${
                currentTab === 0 ? "primary-bg" : "blur-button"
              } text-white`}
            >
              Word Explorer
            </button>
            <button
              onClick={() => setCurrentTab(1)}
              className={`px-5 py-2 rounded-5 border-0 ${
                currentTab === 1 ? "primary-bg" : "blur-button"
              } text-white`}
            >
              Story Adventure
            </button>
            <button
              onClick={() => setCurrentTab(2)}
              className={`px-5 py-2 rounded-5 border-0 ${
                currentTab === 2 ? "primary-bg" : "blur-button"
              } text-white`}
            >
              Brain Quest
            </button>
          </div>

          <p className="text-white mt-3">
            As they traveled further, the landscape changed...
          </p>
        </div>
        <Col className="d-flex align-items-center justify-content-center">
          {isLoading && <Spinner size="lg" variant="primary" />}
        </Col>

        {currentTab === 0 &&
          !isLoading &&
          apiData &&
          apiData.Wordexplore &&
          apiData.Wordexplore.length > 0 && (
            <div className="blur-section py-2 px-5">
              <Row className="d-flex">
                <Col md={3}>
                  <div className="rounded-3 border-2-dotted card-box-bg py-2 px-3">
                    <div className="d-flex align-items-center justify-content-start">
                      <h5 className="colorBlue">
                        {apiData?.Wordexplore[currentWordexplore]?.Storytitle ||
                          "N/A"}{" "}
                        &nbsp;
                      </h5>
                      <sup className="text-white">
                        ({" "}
                        {apiData?.Wordexplore[currentWordexplore]?.Noun ||
                          "N/A"}{" "}
                        )
                      </sup>
                    </div>
                    <p style={{ fontSize: "10px" }} className="text-white">
                      {apiData?.Wordexplore[currentWordexplore]?.Storyttext ||
                        "N/A"}
                    </p>
                    <img
                      style={{
                        width: "100%",
                        height: "200px",
                        maxHeight: "200px",
                      }}
                      className="rounded-3"
                      src={`https://ik.imagekit.io/dev24/${
                        apiData?.Wordexplore[currentWordexplore]
                          ?.Storyimage[0] ||
                        "Unruffled_8d7KCZQ8L_kEd5rBnpv.webp"
                      }`}
                      alt="card-profile"
                    />
                    <div
                      style={{ fontSize: "10px" }}
                      className="color-custom-green mt-2"
                    >
                      Synonyms &nbsp;{" "}
                      <span className="text-white">
                        {apiData?.Wordexplore[currentWordexplore]?.Synonyms ||
                          "N/A"}
                      </span>
                    </div>
                    <div
                      style={{ fontSize: "10px" }}
                      className="color-custom-violet"
                    >
                      Antonyms &nbsp;{" "}
                      <span className="text-white">
                        {apiData?.Wordexplore[currentWordexplore]?.Antonyms ||
                          "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
                    <div onClick={handlePriveClick} className="my-icon active">
                      <IoIosArrowBack size={22} color="#fff" />{" "}
                    </div>
                    <div onClick={handleNextClick} className="my-icon">
                      <IoIosArrowForward size={22} color="#fff" />{" "}
                    </div>
                  </div>
                </Col>
                <Col md={9} className="">
                  <Row>
                    {apiData &&
                      apiData.Wordexplore &&
                      apiData.Wordexplore.length > 0 &&
                      apiData.Wordexplore.map(
                        (item, index) =>
                          index !== currentWordexplore && (
                            <Col key={index} className="px-3 py-0" md={3}>
                              <div className="primary-bg h-100 px-2 py-2 rounded-3">
                                <img
                                  style={{
                                    width: "100%",
                                    height: "140px",
                                    maxHeight: "140px",
                                    objectFit: "cover",
                                  }}
                                  className="rounded-3"
                                  src={`https://ik.imagekit.io/dev24/${
                                    item.Storyimage[0] ||
                                    "Unruffled_8d7KCZQ8L_kEd5rBnpv.webp"
                                  }`}
                                  alt="card-profile"
                                />
                                <p
                                  style={{ fontSize: "10px" }}
                                  className="text-white mt-2"
                                >
                                  {item?.Storyttext || "N/A"}
                                </p>
                              </div>
                            </Col>
                          )
                      )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}

        {currentTab === 1 &&
          !isLoading &&
          apiData &&
          apiData.Storyadvenure &&
          apiData.Storyadvenure.content.length > 0 && (
            <div className="blur-section py-2 px-5">
              <Row className="d-flex py-3">
                <Col md={12} className="">
                  <Row>
                    {apiData &&
                      apiData.Storyadvenure &&
                      apiData.Storyadvenure.content &&
                      apiData.Storyadvenure.content.length > 0 &&
                      apiData.Storyadvenure.content.map((item, index) => (
                        <Col key={index} className="px-3 py-0" md={3}>
                          <div className="primary-bg h-100 px-2 py-2 rounded-3">
                            <img
                              style={{
                                width: "100%",
                                height: "140px",
                                maxHeight: "140px",
                                objectFit: "cover",
                              }}
                              className="rounded-3"
                              src={`https://ik.imagekit.io/dev24/${
                                item.Storyimage[0] ||
                                item.Storyimage[1] ||
                                "Unruffled_8d7KCZQ8L_kEd5rBnpv.webp"
                              }`}
                              alt="card-profile"
                            />
                            <p
                              style={{ fontSize: "10px" }}
                              className="text-white mt-2"
                            >
                              {item?.Paragraph[0] ||
                                item?.Paragraph[1] ||
                                "N/A"}
                            </p>
                          </div>
                        </Col>
                      ))}
                  </Row>
                </Col>
              </Row>
            </div>
          )}

        {currentTab === 2 &&
          !isLoading &&
          apiData &&
          apiData.Brainquest &&
          apiData.Brainquest.length > 0 &&
          apiData.Brainquest.map((item, QIndex) => (
            <Container
              fluid
              className="d-flex align-items-center justify-content-center py-3 blur-section"
            >
              <Col md={6}>
                <h5 className="text-white m-0 p-0">
                  Question. {item.Question || "N/A"}
                </h5>
                <Row className="mt-3 justify-content-between">
                  {item.Option &&
                    item.Option.length > 0 &&
                    item.Option.map((item, index) => (
                      <Col
                        onClick={
                          !userClik.includes(QIndex)
                            ? () => handleUserSelectAns(QIndex, item)
                            : null
                        }
                        key={index}
                        className={`border ${
                          userClik.includes(QIndex) &&
                          falseAns.includes(item) &&
                          "border-danger"
                        } ${
                          userClik.includes(QIndex) &&
                          correctAns.includes(item) &&
                          "border-success"
                        } 
                        ${
                          !userClik.includes(QIndex) &&
                          !falseAns.includes(item) &&
                          !correctAns.includes(item) &&
                          "border-primary"
                        }
                        bg-transparent text-white py-2 rounded-3 mt-2 cursor-pointer `}
                        md={5}
                      >
                        {item}
                      </Col>
                    ))}
                </Row>
              </Col>
            </Container>
          ))}

        {!isLoading &&
          apiData &&
          apiData.Wordexplore &&
          apiData.Wordexplore.length === 0 && (
            <h5 className="text-white text-center mt-3">No Data Found.</h5>
          )}
        {!isLoading &&
          apiData &&
          apiData.Storyadvenure &&
          apiData.Storyadvenure.content &&
          apiData.Storyadvenure.content.length === 0 && (
            <h5 className="text-white text-center mt-3">No Data Found.</h5>
          )}
      </Container>
    </>
  );
}

export default Page_2;
