import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./style.css"
import { CiCircleRemove } from "react-icons/ci";

const Cv = () => {
    var [skl, setskl] = useState("");
    const [fullName, setfullName] = useState("BEWORK");
    const [mobileNo, setmobileNo] = useState("+91 9829805030");
    const [Email, setEmail] = useState("bework@gmail.com");
    const [cityCountry, setcityCountry] = useState("My Dinh, Ha Noi");
    const [leetcodeLink, setleetcodeLink] = useState("");
    const [githubLink, setgithubLink] = useState("");
    const [linkedLink, setlinkedLink] = useState("");


    var [skls, setskills] = useState(["React.JS"]);

    const handleAddSkill = () => {

        setskills((pre) => {
            pre.push(skl);

            setskl((p) => {
                p = "";

                return p;
            });

            return pre;
        });
    };

    const [allAchei, setallAchei] = useState([]);
    var [achei, setachei] = useState("");
    const handleAddAchei = () => {
        const newAch = {
            acheivement: achei,
        };

        if (achei !== "") {
            setallAchei((pre: any) => {
                return pre.concat(newAch);
            });

            setachei((p) => {
                p = "";
                return p;
            });
        }
    };

    const [edu, setedu] = useState([]);
    var [schoolName, setschoolName] = useState("");
    var [degree, setdegree] = useState("");
    var [startYear, setstartYear] = useState("");
    var [endYear, setendYear] = useState("");
    var [score, setscore] = useState("");

    const handleAddedu = () => {
        const newsdu = {
            schoolName: schoolName,
            degree: degree,
            startYear: startYear,
            endYear: endYear,
            score: score,
        };

        setedu((pre: any) => {
            return pre.concat(newsdu);
        });

        setschoolName((p) => {
            p = "";
            return p;
        });
        setdegree((p) => {
            p = "";
            return p;
        });
        setstartYear((p) => {
            p = "";
            return p;
        });
        setendYear((p) => {
            p = "";
            return p;
        });
        setscore((p) => {
            p = "";
            return p;
        });
    };

    // project add
    const [proj, setproj] = useState([]);
    var [projectName, setprojectName] = useState("");
    var [projectGithubLink, setprojectGithubLink] = useState("");
    var [projectLiveLink, setprojectLiveLink] = useState("");
    var [projectBulletedPoint1, setprojectBulletedPoint1] = useState("");
    var [projectBulletedPoint2, setprojectBulletedPoint2] = useState("");

    const handleAddProj = () => {
        const newpro = {
            projectName: projectName,
            projectGithubLink: projectGithubLink,
            projectLiveLink: projectLiveLink,
            projectBulletedPoint1: projectBulletedPoint1,
            projectBulletedPoint2: projectBulletedPoint2,
        };

        setproj((pre: any) => {
            return pre.concat(newpro);
        });

        setprojectName((p) => {
            p = "";
            return p;
        });
        setprojectGithubLink((p) => {
            p = "";
            return p;
        });
        setprojectLiveLink((p) => {
            p = "";
            return p;
        });
        setprojectBulletedPoint1((p) => {
            p = "";
            return p;
        });
        setprojectBulletedPoint2((p) => {
            p = "";
            return p;
        });
    };
    const handledeleteProject = (prj: any) => {
        setproj((p) => p.filter((k: any) => k.projectName !== prj));
    };

    const [exper, setexper] = useState([]);
    var [companyName, setcompanyName] = useState("");
    var [role, setrole] = useState("");
    var [expBulletedPoint1, setexpBulletedPoint1] = useState("");
    var [expBulletedPoint2, setexpBulletedPoint2] = useState("");

    const handleAddexper = () => {
        const newexp = {
            companyName: companyName,
            role: role,
            projectLiveLink: projectLiveLink,
            expBulletedPoint1: expBulletedPoint1,
            expBulletedPoint2: expBulletedPoint2,
        };

        setexper((pre: any) => {
            return pre.concat(newexp);
        });

        setcompanyName((p) => {
            p = "";
            return p;
        });
        setrole((p) => {
            p = "";
            return p;
        });

        setexpBulletedPoint1((p) => {
            p = "";
            return p;
        });
        setexpBulletedPoint2((p) => {
            p = "";
            return p;
        });
    };

    const handledeleteExper = (ex: any) => {
        setexper((p) => p.filter((k: any) => k.companyName !== ex));
    };

    const handledeleteEdu = (ed: any) => {
        setedu((p) => p.filter((k: any) => k.schoolName !== ed));
    };

    const handleDeletes = (pp: any) => {

        setskills((p) => p.filter((k) => k !== pp));
    };

    const handledeleteAcheivement = (ah: any) => {
        setallAchei((p) => p.filter((k: any) => k.acheivement !== ah));
    };

    var [adprom, setadprom] = useState("invi");

    const handleChangeVisibility = () => {
        setadprom((pre) => {
            if (pre === "invi") {
                pre = "vis";
            } else {
                pre = "invi";
            }

            return pre;
        });
    };

    var [adem, setadem] = useState("invi");

    const handleChangeVisibilitye = () => {
        setadem((pre) => {
            if (pre === "invi") {
                pre = "vis";
            } else {
                pre = "invi";
            }

            return pre;
        });
    };

    var [adedum, setadedum] = useState("invi");

    const handleChangeVisibilityedu = () => {
        setadedum((pre) => {
            if (pre === "invi") {
                pre = "vis";
            } else {
                pre = "invi";
            }

            return pre;
        });
    };

    var [adachm, setadachm] = useState("invi");

    const handleChangeVisibilityach = () => {
        setadachm((pre) => {
            if (pre === "invi") {
                pre = "vis";
            } else {
                pre = "invi";
            }

            return pre;
        });
    };

    const handleDownload = () => {
        var content: any = document.getElementById("MYRESUME");
        var pri: any = document.getElementById("ifmcontentstoprint").contentWindow;

        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    };

    return (
        <div className="builder-container   max-w-screen-2xl">
            <div className={"new-project-mondel " + adprom}>
                <div className="Mondel-heading">
                    {" "}
                    <div>Dự án </div>{" "}
                    <div
                        className="cancal-div"
                        onClick={() => {
                            handleChangeVisibility();
                        }}
                    >
                        <div className="text-2xl text-red-500 ml-10"><CiCircleRemove /></div>{" "}
                        {" "}
                    </div>{" "}
                </div>

                <div className="Input-container-div">
                    <TextField
                        id="outlined-basic"
                        label="Tên dự án"
                        value={projectName}
                        onChange={(e) => {
                            setprojectName(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Link github"
                        value={projectGithubLink}
                        onChange={(e) => {
                            setprojectGithubLink(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Link webiste"
                            value={projectLiveLink}
                            onChange={(e) => {
                                setprojectLiveLink(e.target.value);
                            }}
                            style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                            variant="outlined"
                        />
                    </div>

                    <TextField
                        id="outlined-basic"
                        label="Mô tả dự án của bạn"
                        value={projectBulletedPoint1}
                        onChange={(e) => {
                            setprojectBulletedPoint1(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Mô tả chi tiết dự án"
                        value={projectBulletedPoint2}
                        onChange={(e) => {
                            setprojectBulletedPoint2(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        onClick={handleAddProj}
                        style={{ width: "50%", marginLeft: "25%", marginTop: "10px" }}
                    >
                        {" "}
                        Thêm dự án{" "}
                    </Button>
                </div>
            </div>
            <div className={"new-project-mondel " + adem}>
                <div className="Mondel-heading">
                    {" "}
                    <div> Thêm kinh nghiệm </div>{" "}
                    <div
                        className="cancal-div"
                        onClick={() => {
                            handleChangeVisibilitye();
                        }}
                    >
                        <div className="text-2xl text-red-500 ml-10"><CiCircleRemove /></div>{" "}
                        {" "}
                    </div>{" "}
                </div>

                <div className="Input-container-div">
                    <TextField
                        id="outlined-basic"
                        label="Công ty"
                        value={companyName}
                        onChange={(e: any) => {
                            setcompanyName(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Chức vụ"
                        value={role}
                        onChange={(e: any) => {
                            setrole(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Công việc đã làm"
                        value={expBulletedPoint1}
                        onChange={(e: any) => {
                            setexpBulletedPoint1(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Học được những gì tron dự án đó"
                        value={expBulletedPoint2}
                        onChange={(e: any) => {
                            setexpBulletedPoint2(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        onClick={handleAddexper}
                        style={{ width: "50%", marginLeft: "25%", marginTop: "10px" }}
                    >
                        {" "}
                        Thêm kinh nghiệm{" "}
                    </Button>
                </div>
            </div>
            <div className={"new-project-mondel " + adedum}>
                <div className="Mondel-heading">
                    {" "}
                    <div> Thêm học vấn </div>{" "}
                    <div
                        className="cancal-div"
                        onClick={() => {
                            handleChangeVisibilityedu();
                        }}
                    >
                        <div className="text-2xl text-red-500 ml-10"><CiCircleRemove /></div>{" "}
                        {" "}
                    </div>{" "}
                </div>

                <div className="Input-container-div">
                    <TextField
                        id="outlined-basic"
                        label="Trường học"
                        value={schoolName}
                        onChange={(e: any) => {
                            setschoolName(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Cấp bậc"
                        value={degree}
                        onChange={(e: any) => {
                            setdegree(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Ngày bắt đầu"
                        value={startYear}
                        onChange={(e: any) => {
                            setstartYear(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Ngày kết thúc"
                        value={endYear}
                        onChange={(e: any) => {
                            setendYear(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-basic"
                        label="GPA"
                        value={score}
                        onChange={(e: any) => {
                            setscore(e.target.value);
                        }}
                        style={{ width: "100%", marginBottom: "30px", height: "40px" }}
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        onClick={handleAddedu}
                        style={{ width: "50%", marginLeft: "25%", marginTop: "10px" }}
                    >
                        {" "}
                        Thêm học vấn{" "}
                    </Button>
                </div>
            </div>
            <div className={"new-project-mondel " + adachm}>
                <div className="Mondel-heading">
                    {" "}
                    <div> Thành tích </div>{" "}
                    <div className="flex justify-between  items-center">
                        <div
                            className="cancal-div"
                            onClick={() => {
                                handleChangeVisibilityach();
                            }}
                        >
                            <div className="text-2xl text-red-500 ml-10"><CiCircleRemove /></div>{" "}
                        </div>

                    </div>
                </div>{" "}
                <TextField
                    id="outlined-basic"
                    label="Thành tích của bạn"
                    value={achei}
                    onChange={(e) => {
                        setachei(e.target.value);
                    }}
                    style={{ width: "100%", marginTop: "20px" }}
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    onClick={handleAddAchei}
                    style={{ width: "50%", marginLeft: "25%", marginTop: "10px" }}
                >
                    {" "}
                    Thêm{" "}
                </Button>
            </div>
            <div className="builder-container-nav  bg-blue-500 overflow-y-hidden">
                <div className="builder-name"> Tạo CV </div>
                <div className="other-links-builder">
                    <Link
                        style={{
                            textDecoration: "none",
                            color: "white",
                            paddingTop: "5px",
                            marginRight: "20px",
                        }}
                        to="/"
                    >
                        {" "}
                        Trang chủ{" "}
                    </Link>

                    <Button className="" onClick={handleDownload} variant="contained">
                        {" "}
                        Download{" "}
                    </Button>
                </div>{" "}
            </div>{" "}
            <div className="main-container-resume ">
                <div className="left-forms-div">

                    <div> Họ tên </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <TextField
                            id="outlined-basic"
                            label="Họ tên"
                            value={fullName}
                            onChange={(e) => {
                                setfullName(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            variant="outlined"
                        />{" "}
                    </div>
                    <div> Số điện thoại </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <TextField
                            id="outlined-basic"
                            label="Số điện thoại."
                            value={mobileNo}
                            onChange={(e) => {
                                setmobileNo(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            variant="outlined"
                        />{" "}
                    </div>
                    <div> Địa chỉ Email </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            value={Email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            variant="outlined"
                        />{" "}
                    </div>
                    <div> Địa chỉ </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <TextField
                            id="outlined-basic"
                            label="Địa chỉ"
                            value={cityCountry}
                            onChange={(e) => {
                                setcityCountry(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            variant="outlined"
                        />{" "}
                    </div>
                    <div> Leetcode Link </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <TextField
                            id="outlined-basic"
                            label="Leetcode Link"
                            value={leetcodeLink}
                            onChange={(e) => {
                                setleetcodeLink(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            variant="outlined"
                        />{" "}
                    </div>
                    <div> GitHub Link </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <TextField
                            id="outlined-basic"
                            label="GitHub Link"
                            value={githubLink}
                            onChange={(e) => {
                                setgithubLink(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            variant="outlined"
                        />{" "}
                    </div>
                    <div> Linkedin Link </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <TextField
                            id="outlined-basic"
                            label="Linkedin Link"
                            value={linkedLink}
                            onChange={(e) => {
                                setlinkedLink(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            variant="outlined"
                        />{" "}
                    </div>
                    <div> Thêm kỹ năng </div>{" "}
                    <div className="full-name-div-skill">
                        {" "}
                        <TextField
                            id="outlined-basic"
                            label="eg: project manager"
                            style={{ width: "60%" }}
                            value={skl}
                            onChange={(e) => {
                                setskl(e.target.value);
                            }}
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddSkill}
                            style={{ width: "40%" }}
                        >
                            {" "}
                            Thêm{" "}
                        </Button>
                    </div>
                    <div className="skills-div-container">
                        {" "}
                        {skls.map((s: any, index) => {
                            return (
                                <div>
                                    {" "}
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            handleDeletes(s, index);
                                        }}
                                        style={{ minWidth: "20%", margin: "10px" }}
                                    >
                                        {" "}
                                        {s}
                                        <span className="Cross-red-color"> {"   X"} </span>
                                    </Button>{" "}
                                </div>
                            );
                        })}
                    </div>
                    <div className=""> Dự án </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleChangeVisibility();
                            }}
                            style={{ width: "100%" }}
                        >
                            {" "}
                            Thêm mới dự án{" "}
                        </Button>
                    </div>
                    <div className="Project-list-left">
                        {proj.map((pr: any, index) => {
                            return (
                                <div
                                    style={{
                                        padding: "4px",
                                        border: "1px solid #9c27b0",
                                        marginTop: "4px",
                                    }}
                                >
                                    {" "}
                                    {index + 1} {pr.projectName}
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            handledeleteProject(pr.projectName);
                                        }}
                                        style={{
                                            width: "20%",
                                            marginBottom: "10px",
                                            marginLeft: "10px",
                                            height: "25px",
                                        }}
                                    >
                                        {" "}
                                        Delete{" "}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                    <div> Kinh Nghiệm </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleChangeVisibilitye();
                            }}
                            style={{ width: "100%" }}
                        >
                            {" "}
                            Thêm mới kinh nghiệm{" "}
                        </Button>{" "}
                    </div>
                    <div className="exp-list-left">
                        <div className="Project-list-left">
                            {" "}
                            {exper.map((e: any, index) => {
                                return (
                                    <div
                                        style={{
                                            padding: "4px",
                                            border: "1px solid #9c27b0",
                                            marginTop: "4px",
                                        }}
                                    >
                                        {" "}
                                        {index + 1} {e.companyName}
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                handledeleteExper(e.companyName);
                                            }}
                                            style={{
                                                width: "20%",
                                                marginBottom: "10px",
                                                marginLeft: "10px",
                                                height: "25px",
                                            }}
                                        >
                                            {" "}
                                            Delete{" "}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>Học vấn </div>{" "}
                    <div className="full-name-div">
                        {" "}
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleChangeVisibilityedu();
                            }}
                            style={{ width: "100%" }}
                        >
                            {" "}
                            Thêm học vấn{" "}
                        </Button>{" "}
                    </div>
                    <div className="edu-list-left">
                        <div className="Project-list-left">
                            {edu.map((ed: any, index) => {
                                return (
                                    <div
                                        style={{
                                            padding: "4px",
                                            border: "1px solid #9c27b0",
                                            marginTop: "4px",
                                        }}
                                    >
                                        {" "}
                                        {index + 1} {ed.schoolName}
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                handledeleteEdu(ed.schoolName);
                                            }}
                                            style={{
                                                width: "20%",
                                                marginBottom: "10px",
                                                marginLeft: "10px",
                                                height: "25px",
                                            }}
                                        >
                                            {" "}
                                            Delete{" "}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="">Thành tích </div>{" "}
                    <div className="full-name-div ">
                        {" "}
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleChangeVisibilityach();
                            }}
                            style={{ width: "100%" }}
                        >
                            {" "}
                            Thêm thành tích{" "}
                        </Button>{" "}
                    </div>
                    <div className="ach-list-left mb-20">
                        {allAchei.map((ac: any, index) => {
                            return (
                                <div
                                    style={{
                                        padding: "4px",
                                        border: "1px solid #9c27b0",
                                        marginTop: "4px",
                                    }}
                                >
                                    {" "}
                                    {index + 1}. {ac.acheivement}
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            handledeleteAcheivement(ac.acheivement);
                                        }}
                                        style={{
                                            width: "20%",
                                            marginBottom: "10px",
                                            marginLeft: "10px",
                                            height: "25px",
                                        }}
                                    >
                                        {" "}
                                        Delete{" "}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>{" "}
                <div className="right-resume-div">
                    <div className="Resume">
                        <div id="MYRESUME" className="Resume-inside">
                            <div className="full-name"> {fullName}</div>{" "}
                            <div className="social-links-div">
                                <span className="social-items"> {mobileNo} </span>{" "}
                                <span className="social-items"> {Email} </span>{" "}
                                <span className="social-items"> {cityCountry} </span>{" "}
                                <a href={leetcodeLink} className="social-items">
                                    Leetcode{" "}
                                </a>{" "}
                                <a href={githubLink} className="social-items">
                                    Github{" "}
                                </a>{" "}
                                <a href={linkedLink} className="social-items">
                                    Linkedin{" "}
                                </a>
                            </div>{" "}
                            <div className="All-skills">
                                <div className="skills-section-heading">Kỹ năng </div>

                                <div className="All-skills-container-box">
                                    {skls.map((es) => {
                                        return <span className="each-skill-class"> {es} </span>;
                                    })}
                                </div>
                            </div>{" "}
                            <div>
                                <div className="projects-section-heading">Dự án </div>

                                <div className="all-projects">
                                    {" "}
                                    {proj.map((p: any, index) => {
                                        return (
                                            <div key={index} className="">
                                                <div className="project-name-and-links">
                                                    {" "}
                                                    {p.projectName} |{" "}
                                                    <a href={p.projectGithubLink}> Github </a> |{" "}
                                                    <a href={p.projectLiveLink}> Live </a>{" "}
                                                </div>

                                                <div className="bulleted-points-project">
                                                    <ul className="mt-5">
                                                        <li> {p.projectBulletedPoint1} </li>{" "}
                                                        <li> {p.projectBulletedPoint2} </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <div className="skills-section-heading">Kinh nghiệm làm việc </div>

                                <div className="all-experience">
                                    {exper.map((e: any, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="experience-name-heading">
                                                    {" "}
                                                    {e.companyName} | {e.role}
                                                </div>

                                                <div className="bulleted-points-project">
                                                    <ul className="mt-5">
                                                        <li> {e.expBulletedPoint1} </li>{" "}
                                                        <li> {e.expBulletedPoint2} </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>{" "}
                            <div>
                                <div className="skills-section-heading">Học vấn </div>

                                <div className="All-education">
                                    {edu.map((edu: any, index) => {
                                        return (
                                            <div className="each-school-div" key={index}>
                                                <div className="degree-name">
                                                    <div> {edu.degree} </div>{" "}
                                                    <div className="start-and-end-year">
                                                        {" "}
                                                        {edu.startYear} - {edu.endYear}{" "}
                                                    </div>
                                                </div>

                                                <div className="degree-school">
                                                    <div> {edu.schoolName} </div>{" "}
                                                    <div className="start-and-end-year">
                                                        {" "}
                                                        {edu.score}{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>{" "}
                            <div>
                                <div className="skills-section-heading ">
                                    Thành tích{" "}
                                </div>

                                <div className="All-other-acheivements">
                                    {allAchei.map((ache: any, index) => {
                                        return (
                                            <div key={index} className="each-acheivement ">
                                                <ul>
                                                    <li className="mt-5"> {ache.acheivement}</li>{" "}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <style>
                                {" "}
                                {`@media print {
        .full-name{
            font-family: Poppins;
            font-style: normal;
            width: 100%;
            font-weight: 800;
            font-size: 48px;
            line-height: 52px;
            color: #000000;
            text-align: center;
        }
        .social-links-div {
            font-family: Poppins;
            font-style: normal;
            width: 100%;
            color: #000000;
            text-align: center;
            margin-top: 10px;
        }
        
        .social-items {
            margin-left: 10px;
            margin-right: 10px;
            
        }
        
.All-skills {
    margin-top: 10px;
    min-height: 100px;
}

.skills-section-heading {
    padding: 1px 12px;
    height: 45px;
    font-family: Poppins;
    font-style: normal;
    width: 100%;
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    color: #000000;
    text-transform: uppercase;
    margin-top: 10px;
    border-bottom: 2px solid black;
}

.All-skills-container-box {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
}
*{
    -webkit-print-color-adjust: exact; 
}

.each-skill-class {
    padding: 2px 7px;
    background-color: #3A4458 !important;
    font-size: 18px;
    margin: 5px 7px;
    color: white;
    border-radius: 4px;
    text-transform: capitalize;
}

.projects-section-heading {
    padding: 1px 12px;
    height: 45px;
    font-family: Poppins;
    font-style: normal;
    width: 100%;
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    color: #000000;
    text-transform: uppercase;
    margin-top: 10px;
    border-bottom: 2px solid black;
}

.project-name-and-links {
    font-family: Poppins;
    font-style: normal;
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
    padding: 5px;
}
.bulleted-points-project {
    margin-top: -17px;
    margin-left: 30px;
    width: 100%;
    padding-right: 40px;
}
.experience-name-heading {
    font-family: Poppins;
    font-style: normal;
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
    padding: 5px;
}

.degree-name {
    font-family: Poppins;
    font-style: normal;
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
    padding: 10px;
    display: flex;
    flex-direction: row;
}

.start-and-end-year {
    font-family: Poppins;
    font-style: normal;
    margin: auto;
    margin-right: 20px;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
    padding: 10px;
    margin-top: -5px;
}

.degree-school {
    font-family: Poppins;
    font-style: normal;
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
    padding: 10px;
    display: flex;
    flex-direction: row;
    margin-top: -20px;
}

.each-school-div {
    margin-top: -5px;
}

.All-other-acheivements {
    width: 100%;
    padding-left: 40px;
    padding-right: 40px;
}

.each-acheivement {
    margin-top: -10px;
}
 
        
        }`}{" "}
                            </style>
                        </div>
                    </div>
                </div>
            </div>
            <iframe
                id="ifmcontentstoprint"
                type="application/pdf"
                title="my-frame"
                style={{ height: "0px", width: "0px", position: "absolute" }}
            >
                {" "}
            </iframe>
        </div>
    );
}

export default Cv;
