import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../../Firebaseinit'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { Button, Card, Row, Col, Form } from 'react-bootstrap'

const ReadPage = () => {
    const loginEmail = sessionStorage.getItem('email');
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const db = getFirestore(app);
    const callAPI = async() => {
        setLoading(true);
        const res = await getDoc(doc(db,`posts/${id}`));
        console.log(res.data());
        setPost(res.data());
        setLoading(false);
      }
      const {email, date, title, contents} = post;

      useEffect(()=>{
        callAPI();
      }, []);


  return (
    <Row className='my-5 justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <h1 className='mb-5'>게시글 상세보기</h1>
        {loginEmail==email &&
        <div className='mb-2 text-end'>
        <Button variant='success' size="sm" className='px-3 me-1'>수정</Button>
        <Button variant='danger' size="sm" className='px-3'>삭제</Button>
      </div>
        }
            <Card>
                <Card.Body>
                    <h5>{title}</h5>
                    <div className='text-muted'>
                        <span className='me-3'>{date}</span>
                        <span>{email}</span>
                    </div>
                    <hr/>
                    <div style={{whiteSpace:'pre-wrap'}}>{contents}</div>
                </Card.Body>
            </Card>
      </Col>
    </Row>
  )
}

export default ReadPage
