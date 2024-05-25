import { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { app } from '../Firebaseinit'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, setDoc, doc } from 'firebase/firestore';


const ModalPhoto = ({form, setForm, setLoading}) => {
    const uid = sessionStorage.getItem('uid');
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const style1={
        cursor:'pointer',
        borderRadius: '50%',
        width:'80px',
        marginBottom:'10px'
    }
    const style2={
        borderRadius: '50%',
        width:'200px',
        marginBottom:'10px'
    }

    const onChangeFile = (e) => {
        setFileName(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onClickSave = async() => {
      if(!file){
        alert("변경할 이미지을 선택하세요!");
        return;
    }
      if(!window.confirm("이미지를 저장하실래요?")) return;
      setLoading(true);
      const res = await uploadBytes(ref(storage, `/photo/${Date.now()}.jpg`), file);
      const url = await getDownloadURL(res.ref);
      await setDoc(doc(db, `users/${uid}`), {...form, photo: url});
      setForm({
        ...form,
        photo: url
      });
      setLoading(false);
    }

    return (
        <>
          <img src={form.photo || "http://via.placeholder.com/100x100"} style={style1} onClick={handleShow}/>
          <Modal
            style={{top:'30%'}}
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>

            <Modal.Header closeButton>
              <Modal.Title>이미지 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
              <img src={fileName || "http://via.placeholder.com/200x200"} style={style2}/>
              <Form.Control type='file' onChange={onChangeFile}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={onClickSave}>Save</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }

export default ModalPhoto
