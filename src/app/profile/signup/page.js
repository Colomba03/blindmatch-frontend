"use client";
import { Button, Chip, Link, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import Papa from "papaparse";
// import {promise as fs} from 'fs';
// import * as hobbies from "../../../../public/data/hobbies.csv";

export default function SignUpPage() {
  const styles = {
    container: {
      display: "flex",
      backgroundColor: "white",
      flexDirection: "column",
      alignItems: "center",
      height: "50pc",
    },
    interests: {
      display: "flex",
      flexDirection: "row",
      flexWrap:"wrap",
      width:"600px",
      height: "300px",
      overflow:"scroll"
    },
    selected_interests: {
      display: "flex",
      flexDirection: "column",
      flexWrap:"wrap",
      width:"400px",
      height: "100px",
      overflow:"scroll"
    }
  };
  const [page,setPage] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [fname,setFname] = useState("");
  const [lname, setLname] = useState("");
  const [interests,setInterests] = useState([]);
  const [selectedInts,setSelectedInts] = useState([]);
  const router = useRouter();
  const birthday = new Date();

  async function readInterests(){
    const file = "../../../../public/data/hobbies.csv";
    await fetch(`http://localhost:3003/interest/getHobbies`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setInterests(data);
    });
    // Papa.parse(file, {
    //   download: false,
    //   delimiter: '\n',
    //   complete: function(results) {
    //     console.log(results);
    //   }
    // });

  }

  // const router = useRouter();
  const handleDelete = (chipToDelete) => () => {
    setSelectedInts((chips) => chips.filter((chip) => chip !== chipToDelete));
  };
  return (
    <div style={styles.container}>
      <h2 style={{ color: "black", marginTop: 50 }}>Sign Up</h2>
      {page == 0 ? (
        <>
          <TextField
            id="standard-basic"
            sx={{ width: 300 }}
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
          />
          <TextField
            id="standard-basic"
            sx={{ width: 300 }}
            label="Username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="small"
          />
          <TextField
            id="standard-basic"
            sx={{ width: 300 }}
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
          />
          <TextField
            id="standard-basic"
            sx={{ width: 300 }}
            label="Confirm Password"
            variant="standard"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            size="small"
          />
          <TextField
            id="standard-basic"
            sx={{ width: 300 }}
            label="First Name"
            variant="standard"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            size="small"
          />
          <TextField
            id="standard-basic"
            sx={{ width: 300 }}
            label="Last Name"
            variant="standard"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            size="small"
          />
          <label style={{ color: "gray", marginTop: 5 }}>Birthday</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Controlled picker"
              value={dayjs(birthday)}
              onChange={(e) => birthday.setFullYear(e)}
            />
          </LocalizationProvider>
        </>
      ) : null}
      {page == 1 ? (
        <>
          <div>
            {interests.length > 0 ? (
              <>
                <h2 style={{ color: "gray", marginTop: 5 }}>Interests</h2>
                <h3 style={{ color: "gray", marginTop: 5 }}>Your interests</h3>
                <div style={styles.selected_interests}>
                  {selectedInts.length > 0 ? (
                    <>
                    {selectedInts.map((inter, index) => {
                      return (
                        <>
                          <div>
                            {/* <p>{inter}</p> */}
                            <Chip
                              key={index}
                              // icon={icon}
                              label={inter}
                              onDelete={handleDelete(inter)}
                              size="small"
                            />
                          </div>
                        </>
                      )
                    })}
                    </>
                  ):(
                    <p style={{ color: "black", marginTop: 5 }}>No selected Interests</p>
                  )}
                </div>
                <div style={styles.interests}>
                  {interests.map((inter, index) => {
                    return (
                      <>
                        <div>
                          {/* <p>{inter}</p> */}
                          <Chip
                            key={index}
                            // icon={icon}
                            label={inter}
                            color={selectedInts.findIndex((i) => inter == i) >= 0 ? "warning" : "secondary"}
                            onClick={() => {
                              selectedInts.push(inter);
                              setSelectedInts([...selectedInts]);
                            }}
                            size="small"
                          />
                        </div>
                      </>
                    )
                  })}
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
      <div style={{ flexDirection: "row", marginTop:10 }}>
        <Button
          variant="contained"
          onClick={() => {
            page > 0 ? setPage(page - 1) : null;
          }}
          color="warning"
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            page == 0 ? readInterests() : router.push("../../feed/");
            setPage(page + 1);
          }}
          color={page == 0 ? "secondary" : "success"}
        >
          {page == 0 ? "Next" : "Sign Up"}
        </Button>
      </div>
    </div>
  );
}
