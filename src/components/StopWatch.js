import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import UserData from "./UserData";


function StopWatch() {
    const [modal, setModal] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [Tittle, setTittle] = useState('')
    const [description, setDescription] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('watchData')) != null) {
            let userData = JSON.parse(localStorage.getItem('watchData'))
            // console.log("dataaa ", userData)
            setData(userData)
        }

        let interval = null;
        if (isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isPaused]);

    const handleStart = () => {
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        // console.log("resume function call", isPaused)
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setTime(0);
    };

    const handleSave = () => {
        setModal(true)
    }
    function SaveFunc() {
        handleReset()
        setTittle('')
        setDescription('')
        setModal(false)
        // setIsPaused(false);
        setIsPaused(!isPaused);
        let newData = {
            'id': (data.length) + 1,
            'tittle': Tittle,
            'description': description,
            'time': time
        }
        if (JSON.parse(localStorage.getItem('watchData')) != null) {
            let userData = JSON.parse(localStorage.getItem('watchData'))
            userData.push(newData)
            localStorage.setItem('watchData', JSON.stringify(userData))
            setData(userData)
        } else {
            let userData = [];
            userData.push(newData)
            localStorage.setItem('watchData', JSON.stringify(userData))
        }
        window.location.reload();
    }
    return (
        <div>
            <div>
                <div className="stop-watch">
                    <span>
                        {("0" + Math.floor((time / (60000 * 60)) % 60)).slice(-2)}:
                    </span>
                    <span>
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span>
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                    </span>
                </div>

                <button className='btn' onClick={handleStart} disabled={isPaused ? false : true}>Start</button>
                <button className='btn' onClick={handlePauseResume} disabled={isPaused ? true : false} >Pause</button>
                <button className='btn' onClick={handleSave}>Save</button>
            </div>

            <Modal
                isOpen={modal}
                modalTransition={{ timeout: 1000 }}
                backdropTransition={{ timeout: 2000 }}
                toggle={() => setModal(!modal)}
            >
                <ModalHeader>
                    Your Timer Task
                </ModalHeader>
                <ModalBody>
                    <div>
                        <h6>Tittle</h6>
                        <input type={'text'} className='navbar-input' placeholder="Tittle" onChange={(e) => setTittle(e.target.value)} /><br></br>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <h6>Description</h6>
                        <textarea type={'text'} className='navbar-input' placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button className="btn" onClick={SaveFunc} >
                        Save
                    </button>
                    <button className="btn" onClick={() => setModal(false)}>
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>

            <UserData data={data} />
        </div>
    );
}

export default StopWatch;

