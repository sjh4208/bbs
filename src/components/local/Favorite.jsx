import React, { useEffect, useState } from 'react'
import { app } from '../../Firebaseinit'
import { ref, getDatabase, onValue, remove } from 'firebase/database'
import { Table, Button } from 'react-bootstrap'

const Favorite = () => {
    const [loading, setLoading] = useState(false);
    const db = getDatabase(app);
    const uid = sessionStorage.getItem('uid');
    const [locals, setLocals] = useState([]);

    const callAPI = () => {
        setLoading(true);
        onValue(ref(db, `favorite/${uid}`), snapshot => {
            let rows=[];
            snapshot.forEach(row => {
                rows.push({...row.val()});
            });
            console.log(rows);
            setLocals(rows);
            setLoading(false);
        });
    }

    const onClickDelete = async(local)=>{
        if(window.confirm(`${local.id} 번을 삭제하실래요?`)){
            setLoading(true);
            await remove(ref(db, `favorite/${uid}/${local.id}`));
            setLoading(false);
        }
    }

    useEffect(()=>{
        callAPI();
    }, []);

    if(loading) return <h1 className='my-5'>로딩중입니다...</h1>

    return (
        <div>
        <h1 className='my-5'>즐겨찾기</h1>
            <Table>
                <thead>
                    <tr>
                        
                    </tr>
                </thead>
                <tboby>
                    {locals.map(local=>
                        <tr key={local.id}>
                            <td>{local.id}</td>
                            <td>{local.place_name}</td>
                            <td>{local.address_name}</td>
                            <td>{local.phone}</td>
                            <td><Button variant='danger' className='btn-sm' onClick={()=>onClickDelete(local)}>즐겨찾기 삭제</Button></td>
                        </tr>
                    )}
                </tboby>
            </Table>
        </div>
    )
}

export default Favorite
