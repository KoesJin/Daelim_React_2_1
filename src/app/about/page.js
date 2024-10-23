import React from 'react';
import Galxy1 from '/public/images/galxy1.jpg';
import Image from 'next/image';

const page = () => {
    return (
        <>
            <h1>About</h1>
            <h2> This is about Page</h2>
            <Image src={Galxy1} alt="galxy1" width={1720} height={1024} />
            <Image src="/images/galxy2.jpg" alt="galxy2" width={1720} height={1024} />
            {/* 외부 서버 이미지 출력 */}
            <Image
                src={'https://cdn.pixabay.com/photo/2016/08/04/14/04/space-1569133_1280.jpg'}
                width={1720}
                height={1024}
            />
        </>
    );
};

export default page;
