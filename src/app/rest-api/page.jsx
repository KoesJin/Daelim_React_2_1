'use client'; // Next.js에서 클라이언트 컴포넌트로 설정

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function RestApi() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, postsRes] = await Promise.all([
                    axios.get('https://jsonplaceholder.typicode.com/users'),
                    axios.get('https://jsonplaceholder.typicode.com/posts'),
                ]);

                setUsers(usersRes.data); // users 데이터를 상태에 저장
                setPosts(postsRes.data); // posts 데이터를 상태에 저장
            } catch (error) {
                setError('데이터를 불러오는 데 실패했습니다.'); // 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>데이터를 불러오는 중입니다...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Axios로 불러온 JSONPlaceholder 데이터</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <h2>ID: {user.id}</h2>
                    <h3>이름: {user.name}</h3>
                    <p>이메일: {user.email}</p>
                    <p>
                        주소: {user.address.street}, {user.address.city}
                    </p>
                    <p>경도 : {user.address.geo.lat}</p>

                    <h3>Posts</h3>
                    {posts
                        .filter((post) => post.userId === user.id)
                        .map((post) => (
                            <div key={post.id} style={{ marginLeft: '20px' }}>
                                <h4>Post ID: {post.id}</h4>
                                <p>제목: {post.title}</p>
                                <p>내용: {post.body}</p>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}
