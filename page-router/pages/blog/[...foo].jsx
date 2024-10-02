import { useRouter } from 'next/router';

export default function Foo() {
    const router = useRouter(); // 함수 호출 필요
    const { foo, id, name, pid } = router.query;
    console.log({ foo, id, name, pid });

    return (
        <div>
            {/* foo가 배열인지 확인 후 접근 */}
            {foo && Array.isArray(foo) ? (
                <>
                    <h1>foo[0] : {foo[0]}</h1>
                    <h1>foo[1] : {foo[1]}</h1>
                    <h1>foo[2] : {foo[2]}</h1>
                </>
            ) : (
                <h1>foo is not an array or is undefined</h1>
            )}
            <h1>id : {id}</h1>
            <h1>name : {name}</h1>
            <h1>pid : {pid}</h1>
        </div>
    );
}
