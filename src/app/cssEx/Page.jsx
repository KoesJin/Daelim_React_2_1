'use client';

export default function CssEx() {
    return (
        <>
            <h1>CssEx Page</h1>
            <button className="button">버튼1</button>
            <style jsx>
                {`
                    .button {
                        background: green;
                        color: white;
                    }
                `}
            </style>
        </>
    );
}
