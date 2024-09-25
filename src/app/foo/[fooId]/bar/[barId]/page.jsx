export default function BarId({ params, searchParams }) {
    return (
        <div>
            <h1>App Router</h1>
            <h1>
                foo {params.fooId} {params.barId} / {searchParams.date}
            </h1>
        </div>
    );
}
