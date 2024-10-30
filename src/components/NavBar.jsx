import Link from 'next/link';
import React from 'react';

export default function Navbar() {
    return (
        <nav>
            <div>
                <Link href="/">HOME</Link>
            </div>
            <div>
                <Link href="/foo">Foo</Link>
            </div>
            <div>
                <Link href="/about">About</Link>
            </div>
            <div>
                <Link href="/rest-api">Axios</Link>
            </div>
            <div>
                <Link href="/bar/this_is_slug_Page">Slug</Link>
            </div>
        </nav>
    );
}
