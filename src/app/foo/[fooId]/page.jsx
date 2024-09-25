export default function FooId({ params, searchParams }) {
    return (
        <div>
            <h1>App Router</h1>
            <h1>
                foo {params.fooId} / {searchParams.contry}
            </h1>
        </div>
    );
}
