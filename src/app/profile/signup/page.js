"use client";
import { Button, Chip, Link, MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import Papa from "papaparse";
import { getCookie, setCookie } from "cookies-next";
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
  const [sex, setSex] = useState("");
  const [interests,setInterests] = useState([]);
  const [selectedInts,setSelectedInts] = useState([]);
  const router = useRouter();
  const [birthday,setBirthday] = useState(new Date());
  const [uid,setUid] = useState(0);

  async function readInterests(){
    const file = "../../../../public/data/hobbies.csv";
    await fetch(`${process.env.NEXT_PUBLIC_URL}/interest/getHobbies`)
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

  function check(){
    if(username != '' && fname != '' && email != '' && password != '' && password == confirm && birthday != null && sex != ''){
      return true
    }
    return false
  }

  async function setHobbies(){
    const file = "../../../../public/data/hobbies.csv";
    const id = getCookie("user_id");
    console.log(id);
    await fetch(`${process.env.NEXT_PUBLIC_URL}/interest/selectHobbies/${id}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(selectedInts),
      headers: { "Content-Type": "application/json" },
    });

  }

  async function register(){
    const file = "../../../../public/data/hobbies.csv";
    // const uid = getCookie("user_id");
    await fetch(`${process.env.NEXT_PUBLIC_URL}/users/`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        name: `${fname} ${lname}`,
        username: username,
        email: email,
        password: password,
        birthdate: new Date(birthday),
        sex: sex,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      setCookie("user_id",data.id);
    });

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
              onChange={(e) => {birthday.setFullYear(e);setBirthday(birthday)}}
            />
          </LocalizationProvider>
          <label style={{ color: "gray", marginTop: 5 }}>Sex</label>
          <Select
            value={sex}
            label="Sex"
            onChange={(e)=>setSex(e.target.value)}
          >
            <MenuItem value={'male'}>Male</MenuItem>
            <MenuItem value={'female'}>Female</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>
          </Select>
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
            if(page == 0 && check()){
              readInterests();
              register();
            } else if(check()) {
              router.push("../../feed/");
            } 
            if(page != 0){
              setHobbies();
            }
            // page == 0 ? readInterests() : router.push("../../feed/");
            check() ? setPage(page + 1) : null;
          }}
          color={page == 0 ? "secondary" : "success"}
        >
          {page == 0 ? (check() ? "Register Info" : "Missing Info"):("Complete Account")} 
        </Button>
      </div>
    </div>
  );
}
