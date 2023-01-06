import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';

export default function UserData(props) {
    const [modal, setModal] = useState(false);
    const [description, setDescription] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [data, setData] = useState([])

    function editData(data) {
        setUserInfo(data)
        setDescription(data.description)
        setModal(true)
        // console.log('data', data)
    }

    function SaveFunc() {
        setModal(false)
        if (JSON.parse(localStorage.getItem('watchData')) != null) {
            let userData = JSON.parse(localStorage.getItem('watchData'))
            let newArr = [];
            userData.map((ele) => {
                if (ele.id == userInfo.id) {
                    newArr.push({
                        'id': ele.id,
                        'tittle': ele.tittle,
                        'description': description,
                        'time': ele.time
                    })
                } else {
                    newArr.push(ele)
                }
            })
            localStorage.setItem('watchData', JSON.stringify(newArr))
        }
        window.location.reload();
    }

    return (
        <>
            <table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tittle</th>
                        <th>Time(HH:mm:ss)</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((ele, index) => (
                        <tr>
                            <td><b>{index + 1}</b></td>
                            <td>{ele.tittle}</td>
                            <td>
                                <span className="digits">
                                    {("0" + Math.floor((ele.time / (60000 * 60)) % 60)).slice(-2)}:
                                </span>
                                <span className="digits">
                                    {("0" + Math.floor((ele.time / 60000) % 60)).slice(-2)}:
                                </span>
                                <span className="digits">
                                    {("0" + Math.floor((ele.time / 1000) % 60)).slice(-2)}
                                </span>
                            </td>
                            <td>{ele.description}</td>
                            <td> <button className="btn edit-margin" onClick={() => editData(ele)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modal}
                modalTransition={{ timeout: 1000 }}
                backdropTransition={{ timeout: 2000 }}
                toggle={() => setModal(!modal)}
            >
                <ModalHeader>
                    Edit Timer Task
                </ModalHeader>
                <ModalBody>
                    <div>
                        <h6>Tittle</h6>
                        <input type={'text'} className='navbar-input' placeholder="Tittle" value={userInfo.tittle} /><br></br>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <h6>Description</h6>
                        <textarea type={'text'} className='navbar-input' placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
        </>
    );
}